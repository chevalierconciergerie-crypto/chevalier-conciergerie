import { Children, isValidElement, useLayoutEffect, type ReactNode } from "react";

/**
 * Remplaçant de `react-helmet-async`, qui n'injectait plus rien en production :
 * aucune balise `data-rh` dans le <head>, le titre ne changeait jamais. Toutes les
 * pages envoyaient donc le <head> de l'accueil.
 *
 * Même API JSX (`<Helmet><title>…</title></Helmet>`), mais applique directement les
 * balises au document. Les balises du <head> pré-rendu (voir scripts/prerender.mjs)
 * sont mises à jour sur place plutôt que dupliquées — deux <link rel="canonical">
 * concurrents feraient plus de mal que pas de canonical du tout.
 */

type Tag =
  | { kind: "title"; text: string }
  | { kind: "el"; selector: string; tag: string; attrs: Record<string, string>; text?: string };

const MANAGED = "data-seo";

function collect(children: ReactNode, out: Tag[]) {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const type = child.type;
    const props = child.props as Record<string, unknown>;

    if (typeof type !== "string") {
      collect(props.children as ReactNode, out);
      return;
    }

    if (type === "title") {
      out.push({ kind: "title", text: String(flatten(props.children as ReactNode)) });
      return;
    }

    const attrs: Record<string, string> = {};
    for (const [key, value] of Object.entries(props)) {
      if (key === "children" || value == null) continue;
      attrs[key] = String(value);
    }

    // Identifie la balise pour pouvoir la retrouver et l'écraser au lieu d'en ajouter une.
    let selector: string | null = null;
    if (type === "meta" && attrs.name) selector = `meta[name="${attrs.name}"]`;
    else if (type === "meta" && attrs.property) selector = `meta[property="${attrs.property}"]`;
    else if (type === "link" && attrs.rel) selector = `link[rel="${attrs.rel}"]`;
    else if (type === "script" && attrs.type === "application/ld+json") selector = null;
    else return;

    const text = type === "script" ? String(flatten(props.children as ReactNode)) : undefined;
    out.push({
      kind: "el",
      selector: selector ?? `script:ld:${out.length}`,
      tag: type,
      attrs,
      text,
    });
  });
}

function flatten(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (Array.isArray(node)) return node.map(flatten).join("");
  if (typeof node === "object" && "props" in (node as never)) {
    return flatten((node as { props: { children?: ReactNode } }).props.children);
  }
  return String(node);
}

function apply(tags: Tag[]) {
  const head = document.head;
  const keep = new Set<string>();

  for (const tag of tags) {
    if (tag.kind === "title") {
      document.title = tag.text;
      continue;
    }

    keep.add(tag.selector);
    const isLd = tag.selector.startsWith("script:ld:");
    let el = isLd
      ? (head.querySelector(`script[${MANAGED}="${cssEscape(tag.selector)}"]`) as HTMLElement | null)
      : (head.querySelector(tag.selector) as HTMLElement | null);

    if (!el) {
      el = document.createElement(tag.tag);
      head.appendChild(el);
    }
    el.setAttribute(MANAGED, tag.selector);
    for (const [key, value] of Object.entries(tag.attrs)) el.setAttribute(key, value);
    if (tag.text !== undefined) el.textContent = tag.text;
  }

  // Retire ce qu'une page précédente avait posé et que celle-ci ne redéfinit pas.
  head.querySelectorAll(`[${MANAGED}]`).forEach((el) => {
    if (!keep.has(el.getAttribute(MANAGED) || "")) el.remove();
  });
}

const cssEscape = (s: string) => s.replace(/["\\]/g, "\\$&");

export const Helmet = ({ children }: { children?: ReactNode }) => {
  const tags: Tag[] = [];
  collect(children, tags);

  // Sérialisé pour ne réappliquer que quand le contenu change réellement.
  const key = JSON.stringify(tags);
  useLayoutEffect(() => {
    apply(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
};

/** Conservé pour ne pas avoir à toucher App.tsx : plus aucun contexte n'est nécessaire. */
export const HelmetProvider = ({ children }: { children?: ReactNode }) => <>{children}</>;
