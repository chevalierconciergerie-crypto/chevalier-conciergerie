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
import { loadArticles, JOURNAL_BASE } from "./journal.mjs";

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

  // Visuel de partage propre à la route : sans ça, chaque article afficherait l'image
  // générique du site dans les aperçus Facebook, LinkedIn ou WhatsApp.
  if (route.ogImage) {
    const abs = route.ogImage.startsWith("http") ? route.ogImage : SITE + route.ogImage;
    html = setTag(html, /<meta\s+property="og:image"[^>]*>/, `<meta property="og:image" content="${esc(abs)}" />`);
    html = setTag(html, /<meta\s+name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${esc(abs)}" />`);
  }
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

  // Schémas propres à la route (BlogPosting, FAQPage, Blog…), en plus du LocalBusiness
  // déjà présent dans le template.
  if (route.jsonLd?.length) {
    const blocks = route.jsonLd
      .map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`)
      .join("\n    ");
    html = html.replace("</head>", `    ${blocks}\n  </head>`);
  }

  // Contenu statique injecté dans #root. React le remplace au montage
  // (createRoot().render() écrase les enfants du conteneur), mais les robots qui
  // n'exécutent pas de JavaScript — GPTBot, PerplexityBot, ClaudeBot — le lisent.
  // Sans ça, un article servirait un <body> vide à tous les moteurs IA.
  if (route.bodyHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${route.bodyHtml}</div>`,
    );
  }

  return html;
}

function writeSitemap(routes, lastmod) {
  const urls = routes.map(
    (r) => `  <url>
    <loc>${esc(SITE + (r.path === "/" ? "/" : r.path))}</loc>
    <lastmod>${r.lastmod || lastmod}</lastmod>
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

/**
 * Extrait les paires question/réponse du bloc « Questions fréquentes ».
 * La trame impose la question en gras (**…**) ou en H3, la réponse juste en dessous.
 * Alimente le schéma FAQPage, la portion la plus reprise par les assistants IA.
 */
function extractFaq(markdown) {
  const section = markdown.split(/^##\s+Questions\s+fréquentes\s*$/im)[1];
  if (!section) return [];

  const stop = section.split(/^##\s+/m)[0];
  const faq = [];
  const re = /^(?:###\s+(.+)|\*\*(.+?)\*\*)\s*$/gm;
  let m;
  const marks = [];
  while ((m = re.exec(stop)) !== null) marks.push({ q: (m[1] || m[2]).trim(), end: re.lastIndex });

  for (let i = 0; i < marks.length; i++) {
    const answer = stop
      .slice(marks[i].end, i + 1 < marks.length ? stop.lastIndexOf(marks[i + 1].q, stop.length) : undefined)
      .replace(/^\s*[\r\n]+/, "")
      .split(/\n(?=###\s|\*\*)/)[0]
      .replace(/\*\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();
    if (answer) faq.push({ question: marks[i].q, answer });
  }
  return faq;
}

/** Construit les routes du Journal : la page liste + une page par article. */
function buildJournalRoutes() {
  const articles = loadArticles();
  const routes = [];

  const cards = articles
    .map(
      (a) => `<article>
      <p>${esc(a.category)} · ${esc(a.date)} · ${a.readingTime} min</p>
      <h2><a href="${esc(a.path)}">${esc(a.title)}</a></h2>
      <p>${esc(a.description)}</p>
      <a href="${esc(a.path)}">Lire l'article</a>
    </article>`,
    )
    .join("\n    ");

  routes.push({
    path: JOURNAL_BASE,
    changefreq: "weekly",
    priority: "0.8",
    title: "Journal | Conseils location courte durée à Avignon | Chevalier Conciergerie",
    description:
      "Nos guides sur la gestion locative saisonnière à Avignon : réglementation, rentabilité, conciergerie et sous-location. Publications régulières.",
    ogTitle: "Journal | Chevalier Conciergerie",
    ogDescription: "Guides et conseils sur la location courte durée à Avignon et alentours.",
    bodyHtml: `<main><h1>Journal</h1>
    <p>Nos guides sur la location courte durée à Avignon, Villeneuve-lès-Avignon et Les Angles.</p>
    ${cards}</main>`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Journal — Chevalier Conciergerie",
        url: SITE + JOURNAL_BASE,
        inLanguage: "fr-FR",
        publisher: { "@type": "Organization", name: "Chevalier Conciergerie", url: SITE },
        blogPost: articles.map((a) => ({
          "@type": "BlogPosting",
          headline: a.title,
          url: SITE + a.path,
          datePublished: a.date,
        })),
      },
    ],
  });

  for (const a of articles) {
    const url = SITE + a.path;
    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: a.title,
        description: a.description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        datePublished: a.date,
        dateModified: a.updated,
        inLanguage: "fr-FR",
        articleSection: a.category,
        wordCount: a.markdown.trim().split(/\s+/).length,
        timeRequired: `PT${a.readingTime}M`,
        author: { "@type": "Person", name: a.author },
        publisher: {
          "@type": "Organization",
          name: "Chevalier Conciergerie",
          url: SITE,
          logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
        },
        ...(a.image ? { image: SITE + a.image } : {}),
        ...(a.keywords.length ? { keywords: a.keywords.join(", ") } : {}),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
          { "@type": "ListItem", position: 2, name: "Journal", item: SITE + JOURNAL_BASE },
          { "@type": "ListItem", position: 3, name: a.title, item: url },
        ],
      },
    ];

    const faq = extractFaq(a.markdown);
    if (faq.length) {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      });
    }

    routes.push({
      path: a.path,
      changefreq: "monthly",
      priority: "0.7",
      title: `${a.title} | Chevalier Conciergerie`,
      description: a.description,
      ogTitle: a.title,
      ogDescription: a.description,
      keywords: a.keywords.join(", ") || undefined,
      ogImage: a.image || "/journal/journal-defaut.jpg",
      lastmod: a.updated,
      jsonLd,
      bodyHtml: `<main><nav><a href="/">Accueil</a> › <a href="${esc(JOURNAL_BASE)}">Journal</a></nav>
    <article>
      <p>${esc(a.category)} · ${esc(a.date)} · ${a.readingTime} min de lecture</p>
      <h1>${esc(a.title)}</h1>
      ${a.html}
      <p><a href="/contact">Nous contacter</a> · <a href="${esc(JOURNAL_BASE)}">Retour au Journal</a></p>
    </article></main>`,
    });
  }

  return routes;
}

const JOURNAL_ROUTES = buildJournalRoutes();
const ALL_ROUTES = [...ROUTES, ...JOURNAL_ROUTES];

const template = readFileSync(path.join(dist, "index.html"), "utf8");
const seen = new Set();

for (const route of ALL_ROUTES) {
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

writeSitemap(ALL_ROUTES, new Date().toISOString().slice(0, 10));

console.log(
  `[prerender] ${ALL_ROUTES.length} pages générées ` +
    `(${ROUTES.length} fixes + ${JOURNAL_ROUTES.length} journal) + sitemap.xml`,
);
