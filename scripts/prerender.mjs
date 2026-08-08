/**
 * Pré-rendu SEO.
 *
 * Vite produit un seul dist/index.html : toutes les URLs servaient donc le même
 * <title>, la même description et un <link rel="canonical"> pointant vers l'accueil.
 * Google y voyait autant de copies de la page d'accueil et fusionnait le tout — d'où
 * l'absence de sitelinks dans les résultats de recherche.
 *
 * Ce script écrit, après le build, un dist/<route>/index.html par route, avec ses
 * propres balises <head>. Vercel sert le fichier statique quand il existe et retombe
 * sur le rewrite vers /index.html sinon. Il regénère aussi le sitemap depuis la même
 * liste de routes, pour qu'il ne puisse plus diverger.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ROUTES, SITE } from "./seo-routes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Remplace une balise existante du template, ou l'insère avant </head> si absente. */
function setTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `    ${replacement}\n  </head>`);
}

function buildHtml(template, route) {
  const url = SITE + (route.path === "/" ? "/" : route.path);
  const ogTitle = route.ogTitle || route.title;
  const ogDescription = route.ogDescription || route.description;

  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`);
  html = setTag(
    html,
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${esc(route.description)}" />`,
  );
  html = setTag(
    html,
    /<link\s+rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${esc(url)}" />`,
  );
  html = setTag(
    html,
    /<meta\s+property="og:title"[^>]*>/,
    `<meta property="og:title" content="${esc(ogTitle)}" />`,
  );
  html = setTag(
    html,
    /<meta\s+property="og:description"[^>]*>/,
    `<meta property="og:description" content="${esc(ogDescription)}" />`,
  );
  html = setTag(html, /<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${esc(url)}" />`);
  html = setTag(
    html,
    /<meta\s+name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${esc(ogTitle)}" />`,
  );
  html = setTag(
    html,
    /<meta\s+name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${esc(ogDescription)}" />`,
  );

  if (route.keywords) {
    html = setTag(
      html,
      /<meta\s+name="keywords"[^>]*>/,
      `<meta name="keywords" content="${esc(route.keywords)}" />`,
    );
  } else {
    html = html.replace(/\s*<meta\s+name="keywords"[^>]*>/, "");
  }

  return html;
}

function writeSitemap(lastmod) {
  const urls = ROUTES.map(
    (r) => `  <url>
    <loc>${esc(SITE + (r.path === "/" ? "/" : r.path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq || "monthly"}</changefreq>
    <priority>${r.priority || "0.5"}</priority>
  </url>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  writeFileSync(path.join(dist, "sitemap.xml"), xml, "utf8");
}

const template = readFileSync(path.join(dist, "index.html"), "utf8");
const seen = new Set();

for (const route of ROUTES) {
  if (seen.has(route.path)) throw new Error(`Route en double dans seo-routes.mjs : ${route.path}`);
  seen.add(route.path);

  const html = buildHtml(template, route);
  if (route.path === "/") {
    writeFileSync(path.join(dist, "index.html"), html, "utf8");
  } else {
    // Les deux formes que Vercel sait servir sur une URL sans extension. Écrire les
    // deux évite de dépendre de l'ordre de résolution du filesystem.
    const dir = path.join(dist, route.path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "index.html"), html, "utf8");

    const flat = path.join(dist, `${route.path}.html`);
    mkdirSync(path.dirname(flat), { recursive: true });
    writeFileSync(flat, html, "utf8");
  }
}

writeSitemap(new Date().toISOString().slice(0, 10));

console.log(`[prerender] ${ROUTES.length} pages générées + sitemap.xml`);
