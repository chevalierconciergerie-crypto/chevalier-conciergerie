import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EN } from "./en";

/*
  Bilingue français / anglais.

  Le français reste la langue du code : une chaîne se traduit en la passant
  par t(), et c'est le texte français lui-même qui sert de clé. Personne n'a
  à inventer ni à retenir des identifiants, et le code reste lisible tel quel
  pour Victor. Une chaîne absente du dictionnaire ressort en français plutôt
  que de laisser un trou.

  La langue vit dans l'adresse, pas dans un réglage caché : /conciergerie est
  français, /en/conciergerie est anglais. C'est ce que Google attend pour
  indexer les deux versions, et ça rend chaque page partageable dans sa langue.
*/
export type Langue = "fr" | "en";

interface Contexte {
  langue: Langue;
  /** Le même chemin dans l'autre langue, pour le sélecteur. */
  cheminAutreLangue: string;
  /** Préfixe un chemin interne de la langue courante : "/tarifs" → "/en/tarifs". */
  lien: (chemin: string) => string;
}

const LangueContexte = createContext<Contexte>({
  langue: "fr",
  cheminAutreLangue: "/en",
  lien: (c) => c,
});

/** Retire le préfixe /en d'un chemin. "/en/tarifs" → "/tarifs", "/en" → "/". */
export function sansPrefixe(chemin: string) {
  if (chemin === "/en") return "/";
  if (chemin.startsWith("/en/")) return chemin.slice(3);
  return chemin;
}

export function langueDuChemin(chemin: string): Langue {
  return chemin === "/en" || chemin.startsWith("/en/") ? "en" : "fr";
}

export function LangueProvider({ children }: { children: ReactNode }) {
  const { pathname, search, hash } = useLocation();
  const langue = langueDuChemin(pathname);

  const valeur = useMemo<Contexte>(() => {
    const nu = sansPrefixe(pathname);
    return {
      langue,
      cheminAutreLangue:
        (langue === "fr" ? (nu === "/" ? "/en" : `/en${nu}`) : nu) + search + hash,
      lien: (chemin: string) => {
        if (langue === "fr") return chemin;
        if (!chemin.startsWith("/")) return chemin;
        return chemin === "/" ? "/en" : `/en${chemin}`;
      },
    };
  }, [langue, pathname, search, hash]);

  /*
    Deux choses que Google et les lecteurs d'écran attendent, et qu'aucune page
    ne peut poser seule : la langue du document, et les liens hreflang qui
    disent que la même page existe dans l'autre langue. Sans eux, les deux
    versions se concurrencent au lieu de se compléter.
  */
  useEffect(() => {
    const site = "https://chevalier-conciergerie.com";
    const nu = sansPrefixe(pathname);
    document.documentElement.lang = langue;

    const poser = (hreflang: string, href: string) => {
      const sel = `link[rel="alternate"][hreflang="${hreflang}"]`;
      let el = document.head.querySelector<HTMLLinkElement>(sel);
      if (!el) {
        el = document.createElement("link");
        el.rel = "alternate";
        el.hreflang = hreflang;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    poser("fr", site + nu);
    poser("en", site + (nu === "/" ? "/en" : `/en${nu}`));
    poser("x-default", site + nu);
  }, [langue, pathname]);

  return <LangueContexte.Provider value={valeur}>{children}</LangueContexte.Provider>;
}

export function useLangue() {
  return useContext(LangueContexte);
}

/**
 * t("Nos tarifs") rend « Nos tarifs » en français et sa traduction en anglais.
 * Une chaîne non traduite ressort en français : jamais de trou dans la page.
 */
export function useT() {
  const { langue } = useLangue();
  return useCallback((fr: string) => (langue === "en" ? EN[fr] ?? fr : fr), [langue]);
}

/** Le sélecteur de langue de la barre : deux drapeaux, celui en cours marqué. */
export function Drapeaux({ dansMenu = false }: { dansMenu?: boolean }) {
  const { langue, cheminAutreLangue } = useLangue();
  const naviguer = useNavigate();

  const basculer = () => naviguer(cheminAutreLangue);

  return (
    <div className={`chv-langues ${dansMenu ? "chv-langues--menu" : ""}`} role="group" aria-label="Langue du site">
      <button
        type="button"
        className={`chv-langue ${langue === "fr" ? "est-active" : ""}`}
        onClick={langue === "fr" ? undefined : basculer}
        aria-current={langue === "fr" ? "true" : undefined}
        aria-label="Site en français"
        title="Français"
      >
        <DrapeauFr />
      </button>
      <button
        type="button"
        className={`chv-langue ${langue === "en" ? "est-active" : ""}`}
        onClick={langue === "en" ? undefined : basculer}
        aria-current={langue === "en" ? "true" : undefined}
        aria-label="Site in English"
        title="English"
      >
        <DrapeauEn />
      </button>
    </div>
  );
}

function DrapeauFr() {
  return (
    <svg viewBox="0 0 3 2" width="22" height="15" aria-hidden="true">
      <rect width="1" height="2" x="0" fill="#0055a4" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#ef4135" />
    </svg>
  );
}

function DrapeauEn() {
  return (
    <svg viewBox="0 0 60 30" width="22" height="15" aria-hidden="true">
      <clipPath id="chv-uk">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#chv-uk)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 60,30M60,0 0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 60,30M60,0 0,30" stroke="#c8102e" strokeWidth="4" />
        <path d="M30,0 V30M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30M0,15 H60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  );
}
