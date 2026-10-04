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

/*
  Table des équivalences FR ↔ EN, construite depuis la liste des routes. Sert à poser
  les balises `<link rel="alternate" hreflang="…">` dans le HEAD dès le HTML servi —
  les robots qui n'exécutent pas de JS (aperçus sociaux, GPTBot, PerplexityBot,
  ClaudeBot) les lisent, et Google les préfère à celles injectées après montage.
*/
function construireCorrespondances(routes) {
  const parFr = new Map();
  for (const r of routes) {
    if (r.lang === "en" && r.fr) parFr.set(r.fr, r.path);
  }
  return parFr;
}

function buildHtml(template, route, correspondances) {
  const url = SITE + (route.path === "/" ? "/" : route.path);
  const ogTitle = route.ogTitle || route.title;
  const ogDescription = route.ogDescription || route.description;
  const langue = route.lang || "fr";

  const cheminFr = langue === "fr" ? route.path : route.fr || "/";
  const cheminEn = langue === "en" ? route.path : (correspondances && correspondances.get(route.path));

  let html = template;
  // La langue du document. Le template statique dit "fr" ; pour /en, on la corrige au build.
  if (langue !== "fr") {
    html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${langue}"`);
  }

  /*
    Sur les pages légales (/cgv, /mentions-legales, /politique-confidentialite), la
    fiche LocalBusiness du template n'apporte rien : ce sont des pages utilitaires
    dont Google ne doit pas indexer un signal commercial. L'audit du 27 septembre
    2026 demande explicitement de la retirer pour ne pas parasiter la sémantique
    de ces pages. Le flag `stripBusinessSchema: true` déclaré dans seo-routes.mjs
    la supprime au build.
  */
  if (route.stripBusinessSchema) {
    html = html.replace(
      /\s*<script type="application\/ld\+json">[\s\S]*?"@type":\s*"LocalBusiness"[\s\S]*?<\/script>/,
      "",
    );
  }
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

  /*
    hreflang statiques dans le HEAD servi — présents dès la première réponse HTTP.
    Google, les aperçus sociaux et les robots IA les voient. LangueProvider les
    rejoue côté client, mais ces balises-ci sont celles qui font foi pour le crawl.
  */
  const hreflangs = [`<link rel="alternate" hreflang="fr" href="${esc(SITE + cheminFr)}" />`];
  if (cheminEn) {
    hreflangs.push(`<link rel="alternate" hreflang="en" href="${esc(SITE + cheminEn)}" />`);
  }
  hreflangs.push(`<link rel="alternate" hreflang="x-default" href="${esc(SITE + cheminFr)}" />`);
  html = html.replace("</head>", `    ${hreflangs.join("\n    ")}\n  </head>`);
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
      `<div id="root"><div class="prerendu">${route.bodyHtml}</div></div>`,
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
 * Écrit /llms.txt et /llms-full.txt.
 *
 * Un sitemap XML dit à un moteur classique *où* aller ; il ne lui dit pas ce
 * qu'il va y trouver. Les assistants (ChatGPT, Perplexity, Claude) ne parcourent
 * pas un site page après page : ils récupèrent quelques documents et composent
 * une réponse à partir de ce qu'ils y lisent. llms.txt leur donne, en une seule
 * requête, la carte du site en texte brut — qui est l'entreprise, où elle opère,
 * ce qu'elle facture, et quelle page répond à quelle question.
 *
 * Deux fichiers, deux usages :
 * - llms.txt : l'index, court, avec une ligne de contexte par page.
 * - llms-full.txt : le contenu entier des articles, pour l'assistant qui veut
 *   la source plutôt que le résumé. C'est ce fichier qui rend un chiffre
 *   citable sans que le robot ait à visiter dix URL.
 *
 * Le format suit la proposition llmstxt.org : du Markdown, un H1 pour le nom,
 * un blockquote pour le résumé, des H2 par section.
 *
 * Généré au build depuis les mêmes routes que le sitemap : ajouter une page ou
 * un article le fait apparaître ici sans intervention. Un fichier écrit à la
 * main aurait divergé au premier ajout, et un index qui ment sur le contenu est
 * pire que pas d'index du tout.
 */
function writeLlmsTxt(routes, journalRoutes, articles) {
  const ligne = (r) => {
    const titre = (r.title || r.path).split("|")[0].trim();
    return `- [${titre}](${SITE}${r.path}): ${r.description || ""}`;
  };

  const pages = routes.filter((r) => !r.path.startsWith("/journal"));
  const legales = pages.filter((r) =>
    ["/mentions-legales", "/politique-confidentialite", "/cgv"].includes(r.path),
  );
  const principales = pages.filter((r) => !legales.includes(r));

  const index = `# Chevalier Conciergerie

> Conciergerie Airbnb et gestion locative saisonnière à Avignon, Villeneuve-lès-Avignon
> et Les Angles (Vaucluse et Gard, France). Deux formules : conciergerie à 25 % HT du
> net perçu par le propriétaire, tout compris, ou sous-location avec un loyer fixe versé chaque mois
> et aucune commission. Noté 5,0 sur 5 sur Google (12 avis).

Entreprise : Chevalier Conciergerie (SASU), dirigée par Victor Chevalier.
Adresse : 5 Lotissement Les Cades, 30400 Villeneuve-lès-Avignon, France.
Téléphone : +33 7 83 19 83 41. Courriel : contact@chevalier-conciergerie.com.
Zone couverte : Avignon, Villeneuve-lès-Avignon, Les Angles.

Tarifs, en clair :
- Conciergerie : 25 % HT du net perçu par le propriétaire, tout compris. Sans
  abonnement, sans frais de dossier, sans engagement de durée. Le ménage est
  refacturé au voyageur, pas au propriétaire. La taxe de séjour est collectée
  auprès du voyageur puis reversée à la commune : elle n'est ni un revenu ni une
  charge pour le propriétaire.
- Sous-location : 0 % de commission. Bail au nom de Chevalier Conciergerie et
  loyer fixe versé chaque mois au propriétaire, saison creuse comprise.

## Pages principales

${principales.map(ligne).join("\n")}

## Journal

${journalRoutes.map(ligne).join("\n")}

## Mentions légales

${legales.map(ligne).join("\n")}

## Contenu intégral

- [Tous les articles en texte brut](${SITE}/llms-full.txt)
`;

  writeFileSync(path.join(dist, "llms.txt"), index, "utf8");

  /*
    Le contenu intégral part du Markdown source, pas du HTML rendu : c'est déjà
    du texte propre, sans balises à nettoyer ni menus à retirer.

    Le bloc « Top 15 questions » en tête, ajouté après l'audit du 27 septembre
    2026, est ce qu'un assistant IA (ChatGPT, Perplexity, Claude) cite le plus
    souvent : des paires question/réponse chiffrées, sourcées et brèves, sur
    les intentions dominantes du site. Répondre à la question posée gagne la
    citation ; les articles complets suivent en dessous pour l'assistant qui
    a besoin de la source elle-même.
  */
  const TOP_15 = [
    ["Combien coûte une conciergerie Airbnb à Avignon ?", "Chez Chevalier Conciergerie : 25 % HT du net perçu par le propriétaire, tout compris. Les commissions des plateformes (Airbnb 15 %, Booking 15 %), le ménage refacturé au voyageur et la taxe de séjour sont déduits d'abord ; la commission ne s'applique qu'au net qui reste. Aucun abonnement, aucun frais de dossier, aucun engagement de durée. Concrètement : sur 990 € bruts en été (studio 30 m² loué 9 nuits à 110 €), après commission Airbnb (149 €) et notre commission (168 €), le propriétaire reçoit 673 € nets."],
    ["Faut-il un numéro d'enregistrement pour louer un meublé de tourisme à Avignon ?", "Oui, depuis le 1er janvier 2026, sans exception. La déclaration passe par la plateforme changementdusage.fr/avignon. Le numéro obtenu doit figurer sur chaque annonce : Airbnb, Booking et Abritel le contrôlent et retirent celles qui n'en ont pas, y compris en pleine saison."],
    ["Combien de jours puis-je louer ma résidence principale à Avignon ?", "90 jours par année civile, et non 120. Avignon a abaissé le plafond national par délibération du conseil municipal du 22 février 2025, une faculté que le Code du tourisme laisse aux communes. Une résidence principale reste dispensée de l'autorisation de changement d'usage."],
    ["Ai-je besoin d'une autorisation de changement d'usage à Avignon ?", "Oui, pour tout logement qui n'est pas votre résidence principale, sur l'ensemble du territoire communal. Le régime vise les particuliers comme les sociétés. La ville motive ce durcissement par le doublement du parc en huit ans : près de 4 300 logements en 2023, dont 2 400 en intra-muros."],
    ["Comment est calculée la taxe de séjour à Avignon ?", "Elle est collectée par l'hébergeur auprès de chaque voyageur de plus de 18 ans, pour chaque nuitée. Le tarif dépend du classement du meublé. Elle est reversée à la commune avant le 15 janvier de l'année suivante. Ce n'est jamais un revenu du propriétaire ni de la conciergerie : elle transite, elle n'entre pas dans le calcul de la commission."],
    ["Quelle rentabilité pour un Airbnb à Avignon intra-muros ?", "Studio bien situé (30 m², centre historique, proche Palais des Papes) : 800 € à 1 500 € nets/mois selon la saison. T2 : 1 300 € à 2 200 € nets/mois. Taux d'occupation moyen constaté : 78 %. Prix moyen constaté à la nuit : 95 € intra-muros, avec des pointes à 130-150 € pendant le Festival d'Avignon en juillet."],
    ["Faut-il classer son meublé de tourisme à Avignon ?", "Le classement (1 à 5 étoiles) est facultatif mais rentable : l'abattement fiscal en micro-BIC passe de 30 % à 50 % pour un meublé classé, ce qui compense largement le coût du classement (150-300 €, valable 5 ans). Il apporte aussi une baisse de la taxe de séjour applicable et un signal de qualité aux voyageurs."],
    ["Conciergerie ou sous-location : que choisir à Avignon ?", "Conciergerie : vous restez propriétaire de la relation avec le voyageur, vos revenus varient selon la saison, commission de 25 % HT du net. Sous-location : Chevalier Conciergerie prend votre bien à bail et vous verse un loyer fixe chaque mois, saison creuse comprise, sans commission. La conciergerie plafonne plus haut sur une bonne année ; la sous-location protège contre la mauvaise et supprime toute gestion."],
    ["Quel est le régime fiscal LMNP à Avignon ?", "Micro-BIC (défaut jusqu'à 77 700 € de recettes) : abattement forfaitaire de 30 % pour un meublé non classé, 50 % pour un meublé classé. Régime réel (option ou obligatoire au-delà du plafond) : déduction des charges réelles et amortissement du bien, souvent plus avantageux dès qu'il y a un emprunt ou des travaux. Bilan à faire chaque année : le meilleur régime dépend du bien, pas d'une règle générale."],
    ["Le ménage est-il compris dans la commission d'une conciergerie ?", "Cela dépend du prestataire. Chez Chevalier Conciergerie, le ménage est refacturé au voyageur comme le veut l'usage sur Airbnb et Booking : il n'entame pas vos revenus. Certains réseaux le prélèvent sur les vôtres — c'est la première chose à demander explicitement lors d'une comparaison de tarifs."],
    ["Un mandat de conciergerie inclut-il une durée minimale ?", "Chez Chevalier Conciergerie, non : le mandat est résiliable à tout moment, sans préavis lourd. Beaucoup de réseaux nationaux imposent 12 à 24 mois d'engagement — c'est la première ligne du contrat à lire, parce qu'elle transforme un test en enfermement."],
    ["Quelle conciergerie choisir à Villeneuve-lès-Avignon ?", "Chevalier Conciergerie est basée à Villeneuve-lès-Avignon même, 5 Lotissement Les Cades, et notée 5,0 sur 5 sur Google (12 avis). Critères à comparer entre prestataires : taux annoncé, ce qu'il inclut réellement (ménage, linge, assistance 7 j/7), engagement de durée, présence effective sur place plutôt que sous-traitance à un opérateur distant."],
    ["Est-il plus simple de louer à Villeneuve-lès-Avignon qu'à Avignon ?", "Administrativement, oui pour l'instant. Avignon impose depuis janvier 2026 un enregistrement obligatoire, une autorisation de changement d'usage pour tout bien qui n'est pas résidence principale, et un plafond de 90 jours pour les résidences principales. Villeneuve-lès-Avignon s'en tient à une déclaration en mairie (formulaire Cerfa 14004, service Police Administrative, 2 rue de la République). Pour un propriétaire hésitant entre les deux rives du Rhône, la différence est réelle."],
    ["Quel est le tarif de la sous-location proposée par Chevalier Conciergerie ?", "0 % de commission. Nous louons votre bien à l'année à notre nom et vous versons un loyer fixe chaque mois. Le montant dépend du logement, du quartier et de la durée du bail ; il est fixé avant signature et ne bouge plus. Nos revenus viennent de l'exploitation du logement, pas d'une commission prélevée sur vous."],
    ["Comment comparer deux conciergeries sur la même base ?", "Reconstituez le coût total sur douze mois : commission, plus ménage s'il est à votre charge (et non à celle du voyageur), plus linge, plus frais d'entrée, plus abonnement mensuel éventuel. Ajoutez la durée d'engagement — un contrat de 24 mois transforme une erreur de choix en piège. Le taux le plus bas est très souvent le plus cher une fois l'addition faite."],
  ];

  const topQuestions = TOP_15.map(([q, r], i) => `## ${i + 1}. ${q}\n\n${r}`).join("\n\n");

  const complet = `# Chevalier Conciergerie — contenu intégral

> Conciergerie Airbnb et gestion locative saisonnière à Avignon, Villeneuve-lès-Avignon
> et Les Angles. Ce fichier reprend les 15 questions les plus posées, puis l'intégralité
> des articles du Journal.
> Source : ${SITE}

# Top 15 questions

${topQuestions}

---

# Journal — articles complets

${articles
  .map(
    (a) => `---

# ${a.title}

URL : ${SITE}/journal/${a.slug}
Publié le ${a.date} · Catégorie : ${a.category} · Auteur : ${a.author}

${a.markdown || ""}`,
  )
  .join("\n\n")}
`;

  writeFileSync(path.join(dist, "llms-full.txt"), complet, "utf8");
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
        // author.sameAs pointe sur le profil LinkedIn de l'auteur : signal E-E-A-T
        // demandé par l'audit du 27 septembre 2026 pour que les moteurs relient
        // chaque article à une identité vérifiable et non à un simple nom.
        author: {
          "@type": "Person",
          name: a.author,
          url: "https://www.linkedin.com/in/victor-chevalier-bba282356/",
          sameAs: ["https://www.linkedin.com/in/victor-chevalier-bba282356/"],
        },
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
      // Suffixe court « | Chevalier » plutôt que « | Chevalier Conciergerie » : Google
      // tronque les titres au-delà d'environ 60 caractères (580 px), et l'audit du
      // 27 septembre 2026 comptait 21 titres au-dessus de ce seuil sur le Journal.
      // La marque reste visible ; le sujet de l'article passe en clair.
      title: `${a.title} | Chevalier`,
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

const CORRESPONDANCES = construireCorrespondances(ALL_ROUTES);

const template = readFileSync(path.join(dist, "index.html"), "utf8");
const seen = new Set();
const titres = new Map();

for (const route of ALL_ROUTES) {
  if (seen.has(route.path)) throw new Error(`Route en double dans seo-routes.mjs : ${route.path}`);
  seen.add(route.path);

  // Deux pages indexées sous le même <title> se disputent la même requête : Google
  // partage les signaux entre elles et n'en classe souvent aucune. Le cas s'est produit
  // en août 2026 entre /conciergerie et /conciergerie-avignon, sans que rien ne le
  // signale. Le build échoue désormais plutôt que de publier le doublon.
  //
  // Exception : deux langues peuvent porter un même titre (ex. « Journal | … »). On
  // ne les compare qu'entre routes de la même langue.
  const cle = `${route.lang || "fr"}::${route.title}`;
  if (titres.has(cle)) {
    throw new Error(
      `Titre en double : « ${route.title} » (langue ${route.lang || "fr"})\n` +
        `  → ${titres.get(cle)}\n  → ${route.path}\n` +
        `Chaque page doit viser une intention de recherche distincte.`,
    );
  }
  titres.set(cle, route.path);

  const html = buildHtml(template, route, CORRESPONDANCES);
  if (route.path === "/") {
    writeFileSync(path.join(dist, "index.html"), html, "utf8");
  } else {
    // Une seule forme, volontairement.
    //
    // On écrivait aussi dist/<route>.html « au cas où ». Résultat : chaque page était
    // servie en HTTP 200 sous /route, /route.html ET /route/ — une cinquantaine d'URLs
    // pour dix-sept pages. Le canonical évitait le contenu dupliqué, mais Google
    // dépensait son budget d'exploration à re-parcourir des doublons. Sur un domaine
    // récent, ce budget est minuscule : au 8 août 2026, 3 pages seulement étaient
    // indexées sur 11 connues, avec « Autre page avec balise canonique correcte » en
    // motif. Les anciennes URLs en .html sont redirigées depuis vercel.json.
    const dir = path.join(dist, route.path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "index.html"), html, "utf8");
  }
}

/**
 * Page d'erreur statique.
 *
 * `vercel.json` ne réécrit plus tout vers /index.html : chaque route valide a son propre
 * fichier ci-dessus, et une URL inconnue tombe donc sur ce 404.html — que Vercel sert
 * avec un vrai code HTTP 404. Avant, une adresse inexistante répondait 200 puis
 * affichait le composant NotFound : un « soft 404 », explicitement pénalisé par Google.
 *
 * ⚠️ Corollaire : toute route ajoutée à src/App.tsx doit être déclarée dans
 * scripts/seo-routes.mjs, sinon elle renverra un vrai 404 en production.
 */
const notFoundHtml = buildHtml(template, {
  path: "/404",
  title: "Page introuvable | Chevalier Conciergerie",
  description: "Cette page n'existe pas ou a été déplacée.",
  bodyHtml: `<main>
    <h1>Cette page n'existe pas.</h1>
    <p>Elle a peut-être été déplacée, ou l'adresse comporte une erreur.</p>
    <ul>
      <li><a href="/">Accueil</a></li>
      <li><a href="/#notre-service">Conciergerie</a></li>
      <li><a href="/#sous-location">Sous-location</a></li>
      <li><a href="/journal">Journal</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </main>`,
}, CORRESPONDANCES).replace("</head>", `    <meta name="robots" content="noindex, follow" />\n  </head>`);

writeFileSync(path.join(dist, "404.html"), notFoundHtml, "utf8");

writeSitemap(ALL_ROUTES, new Date().toISOString().slice(0, 10));
// llms.txt reste français : le corps du document est en français, et le mêler d'entrées
// anglaises rendrait l'index illisible pour un assistant qui vient chercher un fait
// dans une langue précise. Les entrées /en/* sortent aux robots via le sitemap.
const ROUTES_FR = ROUTES.filter((r) => (r.lang || "fr") === "fr");
writeLlmsTxt(ROUTES_FR, JOURNAL_ROUTES, loadArticles());

console.log(
  `[prerender] ${ALL_ROUTES.length} pages générées ` +
    `(${ROUTES.length} fixes + ${JOURNAL_ROUTES.length} journal) + 404.html + sitemap.xml + llms.txt + llms-full.txt`,
);
