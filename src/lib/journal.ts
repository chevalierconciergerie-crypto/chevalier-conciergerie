/**
 * Chargement des articles du Journal côté client.
 *
 * Les mêmes fichiers Markdown que ceux lus au build par scripts/journal.mjs, importés
 * ici en brut par Vite. Le HTML statique généré au prérendu sert les robots ; ce module
 * sert la navigation interne, sans rechargement de page.
 *
 * Toute évolution du frontmatter doit être répercutée dans scripts/journal.mjs.
 */
import { marked } from "marked";

export type Article = {
  slug: string;
  path: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  image: string;
  author: string;
  keywords: string[];
  readingTime: number;
  html: string;
};

/** Les fichiers préfixés par `_` sont de la documentation (ex. _TRAME.md), pas des articles. */
const files = import.meta.glob<string>("/content/journal/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const value = kv[2].trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[kv[1]] = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[kv[1]] = value.replace(/^["']|["']$/g, "");
    }
  }
  return { data, body: match[2] };
}

const str = (v: unknown, fallback = "") => (typeof v === "string" && v ? v : fallback);

function build(): Article[] {
  const out: Article[] = [];

  for (const [filepath, raw] of Object.entries(files)) {
    const filename = filepath.split("/").pop() ?? "";
    if (filename.startsWith("_")) continue;

    const { data, body } = parseFrontmatter(raw);
    if (!data.title || !data.date) continue;

    const slug = str(data.slug) || filename.replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
    const words = body.trim().split(/\s+/).filter(Boolean).length;

    out.push({
      slug,
      path: `/journal/${slug}`,
      title: str(data.title),
      description: str(data.description),
      date: str(data.date),
      updated: str(data.updated) || str(data.date),
      category: str(data.category, "Conciergerie"),
      image: str(data.image),
      author: str(data.author, "Victor Chevalier"),
      keywords: Array.isArray(data.keywords) ? (data.keywords as string[]) : [],
      readingTime: Math.max(1, Math.round(words / 200)),
      html: marked.parse(body, { async: false }) as string,
    });
  }

  return out.sort((a, b) => b.date.localeCompare(a.date));
}

export const articles: Article[] = build();

export const getArticle = (slug?: string): Article | undefined =>
  slug ? articles.find((a) => a.slug === slug) : undefined;

/** Date lisible en français : 2026-08-08 -> 8 août 2026 */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
