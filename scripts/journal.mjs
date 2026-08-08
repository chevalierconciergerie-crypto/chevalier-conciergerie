/**
 * Source unique de vérité pour les articles du Journal.
 *
 * Les articles sont des fichiers Markdown dans content/journal/. Ce module les lit,
 * parse leur frontmatter et les trie du plus récent au plus ancien. Il est utilisé
 * au build par prerender.mjs (génération du HTML complet + sitemap) et par le script
 * de publication.
 *
 * Le corps de l'article est rendu en HTML **au build**, pas dans le navigateur :
 * c'est ce qui rend les articles lisibles par les robots IA (GPTBot, PerplexityBot,
 * ClaudeBot) qui n'exécutent pas de JavaScript.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { marked } from "marked";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const JOURNAL_DIR = path.join(root, "content", "journal");

/** Préfixe d'URL du journal. Changer ici le répercute partout (routes, sitemap, JSON-LD). */
export const JOURNAL_BASE = "/journal";

/**
 * Parse un frontmatter YAML simple (clé: valeur, une par ligne).
 * Volontairement minimal : pas de dépendance, pas de structures imbriquées.
 * Les valeurs peuvent être entre guillemets ; les listes s'écrivent [a, b, c].
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }
    data[kv[1]] = value;
  }
  return { data, body: match[2] };
}

/** Slug dérivé du nom de fichier : 2026-08-11-mon-titre.md -> mon-titre */
function slugFromFilename(filename) {
  return filename.replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

/** Estimation de temps de lecture, 200 mots/minute, minimum 1. */
function readingTime(body) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Premier titre de niveau 2 et suivants, pour un sommaire éventuel. */
function extractHeadings(body) {
  const out = [];
  for (const line of body.split(/\r?\n/)) {
    const h = line.match(/^(##+)\s+(.*)$/);
    if (h) out.push({ level: h[1].length, text: h[2].trim() });
  }
  return out;
}

/**
 * Charge tous les articles publiés, triés du plus récent au plus ancien.
 * Un article dont le frontmatter porte `draft: true` est ignoré.
 */
export function loadArticles({ includeDrafts = false } = {}) {
  if (!existsSync(JOURNAL_DIR)) return [];

  const articles = [];
  for (const filename of readdirSync(JOURNAL_DIR)) {
    if (!filename.toLowerCase().endsWith(".md")) continue;
    // Les fichiers préfixés par `_` sont de la documentation (ex. _TRAME.md), pas des articles.
    if (filename.startsWith("_")) continue;

    const raw = readFileSync(path.join(JOURNAL_DIR, filename), "utf8");
    const { data, body } = parseFrontmatter(raw);

    if (!includeDrafts && String(data.draft).toLowerCase() === "true") continue;
    if (!data.title || !data.date) {
      throw new Error(`content/journal/${filename} : 'title' et 'date' sont obligatoires.`);
    }

    const slug = data.slug || slugFromFilename(filename);
    articles.push({
      slug,
      path: `${JOURNAL_BASE}/${slug}`,
      title: data.title,
      description: data.description || "",
      date: data.date,
      updated: data.updated || data.date,
      category: data.category || "Conciergerie",
      image: data.image || "",
      author: data.author || "Victor Chevalier",
      keywords: Array.isArray(data.keywords) ? data.keywords : data.keywords ? [data.keywords] : [],
      readingTime: readingTime(body),
      headings: extractHeadings(body),
      html: marked.parse(body, { mangle: false, headerIds: true }),
      markdown: body,
      filename,
    });
  }

  return articles.sort((a, b) => String(b.date).localeCompare(String(a.date)));
}
