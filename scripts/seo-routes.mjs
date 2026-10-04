import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const SITE = "https://chevalier-conciergerie.com";

/**
 * Contenu servi aux robots qui n'exécutent pas de JavaScript.
 *
 * GPTBot, PerplexityBot et ClaudeBot lisent le HTML brut. Or `scripts/prerender.mjs`
 * n'injectait de contenu dans `<div id="root">` que pour les articles du Journal :
 * mesuré le 8 août 2026, une page commerciale servait 20 mots à ces robots contre
 * 1 170 pour un article. Le `robots.txt` les invitait, ils trouvaient une page vide.
 *
 * ⚠️ Ce contenu doit dire la MÊME chose que la page rendue par React. Servir aux
 * robots autre chose qu'aux visiteurs est du cloaking, et c'est sanctionné. Quand une
 * page change, ce texte change avec elle.
 */

/** Fil d'Ariane : aide Google à comprendre la hiérarchie et alimente les rich snippets. */
const breadcrumb = (...trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
    ...trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: t.name,
      item: SITE + t.path,
    })),
  ],
});

/** Schéma FAQPage — c'est la portion la plus reprise par les moteurs de réponse. */
const faqPage = (pairs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pairs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});

/** Schéma Service, rattaché à la fiche LocalBusiness déjà posée dans index.html. */
const service = ({ name, description, areas }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: name,
  provider: { "@type": "LocalBusiness", "@id": SITE, name: "Chevalier Conciergerie" },
  areaServed: areas.map((a) => ({ "@type": "City", name: a })),
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${SITE}/contact`,
    servicePhone: "+33783198341",
  },
});

/** Rend un bloc question/réponse en HTML, pour que le texte des FAQ soit lisible sans JS. */
const faqHtml = (pairs) =>
  pairs.map(([q, a]) => `<h3>${q}</h3>\n      <p>${a}</p>`).join("\n      ");

const ZONE = ["Avignon", "Villeneuve-lès-Avignon", "Les Angles"];

/**
 * Lit les questions/réponses directement dans la page React.
 *
 * Recopier la FAQ ici la ferait diverger de la page au premier changement, et un schéma
 * FAQPage qui ne correspond pas au contenu affiché est une infraction aux consignes de
 * Google. On la lit donc à la source. Si le format de la page change, le build échoue
 * bruyamment plutôt que de publier un schéma faux.
 */
function readFaq(file, qKey, aKey, liste) {
  let src = readFileSync(path.join(root, file), "utf8");
  // src/data/faq.ts porte plusieurs listes : on ne lit que celle demandée.
  if (liste) {
    const debut = src.indexOf(`export const ${liste}`);
    const fin = src.indexOf("export const", debut + 1);
    src = debut < 0 ? "" : src.slice(debut, fin < 0 ? undefined : fin);
  }
  const re = new RegExp(`${qKey}:\\s*"([^"]+)"\\s*,\\s*${aKey}:\\s*"([^"]+)"`, "g");
  const pairs = [...src.matchAll(re)].map((m) => [m[1], m[2]]);
  if (!pairs.length) {
    throw new Error(
      `[seo-routes] Aucune FAQ trouvée dans ${file} (clés « ${qKey} » / « ${aKey} »). ` +
        `Le format de la page a changé : mets à jour readFaq() avant de publier.`,
    );
  }
  return pairs;
}

// Les FAQ de /conciergerie et /sous-location vivent dans src/data/faq.ts, partagées avec l'accueil.
const CONCIERGERIE_FAQ = readFaq("src/data/faq.ts", "q", "a", "faqConciergerie");
const FRANCHISE_FAQ = readFaq("src/data/faq.ts", "q", "a", "faqFranchise");
const SOUSLOCATION_FAQ = readFaq("src/data/faq.ts", "q", "a", "faqSousLocation");

/**
 * Lit le contenu d'une page locale (Avignon, Villeneuve, Les Angles) dans le fichier
 * qui alimente <LocalSeoPage>. Même raison que readFaq : ces pages sont les meilleures
 * candidates sur les requêtes longues, et recopier leur texte ici le condamnerait à
 * vieillir en silence.
 */
function readLocalPage(file) {
  const src = readFileSync(path.join(root, file), "utf8");
  const one = (key) => src.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1];
  const list = (key) => {
    const block = src.match(new RegExp(`${key}(?:=\\{|:\\s*)\\[([\\s\\S]*?)\\]`))?.[1] ?? "";
    return [...block.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  };

  const page = {
    city: src.match(/city="([^"]+)"/)?.[1],
    slug: src.match(/slug="([^"]+)"/)?.[1],
    headline: one("headline")?.replace(/\\n/g, " "),
    subheadline: one("subheadline"),
    paragraphs: list("paragraphs"),
    attractions: list("attractions"),
    neighborhoods: list("neighborhoods"),
    whyUs: list("whyUs"),
    avgNightPrice: one("avgNightPrice"),
    occupancyRate: one("occupancyRate"),
    avgMonthlyRevenue: one("avgMonthlyRevenue"),
  };

  if (!page.city || !page.slug || page.paragraphs.length === 0) {
    throw new Error(
      `[seo-routes] Contenu illisible dans ${file}. Le format de <LocalSeoPage> a changé : ` +
        `mets à jour readLocalPage() avant de publier.`,
    );
  }
  return page;
}

const LOCAL_PAGES = [
  { file: "src/pages/ConciergerieAvignon.tsx", priority: "0.9" },
  { file: "src/pages/ConciergerieVilleneuve.tsx", priority: "0.8" },
  { file: "src/pages/ConciergerieLesAngles.tsx", priority: "0.8" },
  // Ajoutées le 27 septembre 2026 après audit SEO : l'accueil listait Aix-en-Provence
  // et Montpellier comme zones desservies mais aucune page dédiée n'existait, laissant
  // les requêtes correspondantes aux concurrents nationaux. Priorité 0.7 (elles ne sont
  // pas encore aussi étoffées que les pages du cœur de zone), à monter à 0.8 quand du
  // contenu local supplémentaire y sera ajouté.
  { file: "src/pages/ConciergerieAixEnProvence.tsx", priority: "0.7" },
  { file: "src/pages/ConciergerieMontpellier.tsx", priority: "0.7" },
].map(({ file, priority }) => {
  const p = readLocalPage(file);
  const li = (items) => items.map((x) => `<li>${x}</li>`).join("\n        ");
  // La FAQ locale est lue dans le même fichier que le reste de la page : le schéma ne
  // peut donc pas décrire autre chose que ce qui est affiché.
  const faq = readFaq(file, "question", "answer");

  return {
    path: `/${p.slug}`,
    changefreq: "monthly",
    priority,
    title: readLocalMeta(file, "metaTitle"),
    description: readLocalMeta(file, "metaDescription"),
    keywords: readLocalMeta(file, "metaKeywords"),
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › ${p.headline}</nav>
      <h1>${p.headline}</h1>
      <p>${p.subheadline}</p>
      ${p.paragraphs.map((x) => `<p>${x}</p>`).join("\n      ")}

      ${
        p.avgNightPrice
          ? `<h2>Le marché de la location courte durée à ${p.city}</h2>
      <p>Prix moyen constaté : ${p.avgNightPrice} la nuit. Taux d'occupation moyen :
      ${p.occupancyRate}. Revenu mensuel moyen : ${p.avgMonthlyRevenue}.</p>`
          : ""
      }

      <h2>À voir à ${p.city}</h2>
      <ul>
        ${li(p.attractions)}
      </ul>

      <h2>Quartiers couverts</h2>
      <ul>
        ${li(p.neighborhoods)}
      </ul>

      <h2>Pourquoi nous confier votre bien à ${p.city}</h2>
      <ul>
        ${li(p.whyUs)}
      </ul>

      <h2>Trois choses que nous faisons autrement</h2>
      <h3>Chevalier PMS : notre outil, pas un logiciel revendu</h3>
      <p>Chevalier PMS est l'outil propriétaire que nous avons développé pour la
      gestion de nos propres biens. Il centralise les calendriers multi-plateformes,
      la messagerie voyageurs, les ménages, les photos par séjour et le rapport
      mensuel. Nous ne revendons pas une licence, nous ne payons pas une licence :
      l'outil est développé et maintenu en interne. Concrètement : moins d'allers-retours,
      des réponses plus rapides, un historique de votre bien consultable à tout moment.</p>
      <h3>Réservation directe : pas de commission en plus</h3>
      <p>Sur une réservation directe, nous ne prenons aucune commission supplémentaire.
      Notre rémunération reste 25 % HT du net perçu, point. La commission de plateforme,
      elle, disparaît sur ces réservations. À prix de nuitée identique, le net qui vous
      revient est plus élevé en direct qu'en passant par une plateforme.</p>
      <h3>Un revenue management humain, pas un algorithme</h3>
      <p>Nous ne laissons pas un algorithme fixer vos prix. Les tarifs sont ajustés à
      la main, selon la saison, les événements locaux et le taux d'occupation réel de
      votre bien. Un outil propose, un humain décide.</p>

      <h2>Vos questions sur la location courte durée à ${p.city}</h2>
      ${faqHtml(faq)}

      <p><a href="/contact">Demander une estimation gratuite</a> ·
      <a href="/conciergerie">Le détail de la formule conciergerie</a> ·
      <a href="/sous-location">La sous-location avec loyer garanti</a> ·
      <a href="/journal/declarer-location-saisonniere-avignon">Les démarches obligatoires</a></p>
    </main>`,
    jsonLd: [
      breadcrumb({ name: `Conciergerie ${p.city}`, path: `/${p.slug}` }),
      service({
        name: `Conciergerie Airbnb à ${p.city}`,
        description: p.subheadline,
        areas: [p.city],
      }),
      faqPage(faq),
    ],
  };
});

function readLocalMeta(file, key) {
  const src = readFileSync(path.join(root, file), "utf8");
  const value = src.match(new RegExp(`${key}="([^"]+)"`))?.[1];
  if (!value) throw new Error(`[seo-routes] ${key} introuvable dans ${file}.`);
  return value;
}

// Les pages fixes. `title` / `description` doivent rester alignés sur le <Helmet>
// de la page correspondante dans src/pages/.
const STATIC_ROUTES = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
    title: "Conciergerie Avignon | Gestion Locative & Sous-location | Chevalier Conciergerie",
    description:
      "Conciergerie Airbnb à Avignon, Villeneuve-lès-Avignon et Les Angles. Gestion locative saisonnière complète, ou sous-location avec loyer garanti chaque mois. Estimation gratuite sous 24 h.",
    keywords:
      "conciergerie Avignon, gestion locative Avignon, Airbnb Avignon, location saisonnière Avignon, sous-location Avignon, conciergerie Villeneuve-lès-Avignon, gestion Airbnb",
    ogTitle: "Conciergerie Avignon | Gestion Locative Saisonnière | Chevalier Conciergerie",
    ogDescription:
      "Conciergerie Airbnb à Avignon. Gestion locative saisonnière complète, ou loyer garanti chaque mois. Estimation gratuite.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Chevalier Conciergerie",
        alternateName: "Chevalier Conciergerie Avignon",
        url: SITE,
        inLanguage: "fr-FR",
        publisher: { "@type": "Organization", "@id": SITE, name: "Chevalier Conciergerie" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE}/journal?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
    bodyHtml: `<main>
      <h1>Votre conciergerie à Avignon</h1>
      <p>Gestion locative saisonnière et revenus garantis, sans contrainte. Chevalier
      Conciergerie intervient à Avignon, Villeneuve-lès-Avignon, Les Angles,
      Aix-en-Provence et Montpellier. Réponse sous 24 h, sans engagement.</p>

      <h2>Ils nous font confiance</h2>
      <p>Note de 5,0 sur 5 pour 12 avis Google. Extraits publics :</p>
      <blockquote><p>« Je confie mon appartement en centre-ville d'Avignon à Chevalier
      Conciergerie depuis plusieurs mois et je ne regrette pas. Communication fluide,
      réactivité au top et mes voyageurs sont toujours très bien accueillis. Je ne
      m'occupe plus de rien et mes revenus locatifs ont augmenté. » — Baptiste
      Mailharrancin</p></blockquote>
      <blockquote><p>« J'ai fait appel à Chevalier Conciergerie pour mon appartement et je
      suis absolument ravi de la manière dont j'ai été accompagné par Victor. Je
      recommande à 100 %. » — Clément Pailler</p></blockquote>
      <blockquote><p>« Excellente conciergerie, très professionnelle et à l'écoute des
      clients. Je recommande vivement pour tout projet de location courte durée sur le
      secteur Gard et Vaucluse. » — Félicien Arnoux</p></blockquote>

      <h2>Le fondateur</h2>
      <p>Victor Chevalier a suivi des études de mathématiques et de physique à la CUPGE
      d'Avignon avant de réaliser son premier investissement immobilier à 19 ans.
      Originaire d'Avignon, il en connaît les quartiers, le patrimoine et la
      saisonnalité — c'est cette connaissance locale qui l'a conduit à créer Chevalier
      Conciergerie. <a href="/a-propos">En savoir plus</a>.</p>

      <h2>Aller plus loin</h2>
      <ul>
        <li><a href="/conciergerie">Notre service de conciergerie</a></li>
        <li><a href="/sous-location">Notre service de sous-location</a></li>
        <li><a href="/franchise">Devenir franchisé</a></li>
        <li><a href="/villes">Les villes où nous intervenons</a></li>
        <li><a href="/conciergerie-avignon">Conciergerie Airbnb à Avignon</a></li>
        <li><a href="/conciergerie-villeneuve-les-avignon">Conciergerie à Villeneuve-lès-Avignon</a></li>
        <li><a href="/conciergerie-les-angles">Conciergerie aux Angles</a></li>
        <li><a href="/journal/declarer-location-saisonniere-avignon">Déclarer sa location saisonnière à Avignon : les 3 démarches obligatoires</a></li>
        <li><a href="/journal/calculer-rentabilite-reelle-location-courte-duree">Calculer la rentabilité réelle de sa location courte durée</a></li>
        <li><a href="/journal">Blog : tous nos guides</a></li>
        <li><a href="/contact">Nous contacter — estimation gratuite sous 24 h</a></li>
      </ul>
    </main>`,
  },
  /*
    /conciergerie et /sous-location rendent les mêmes sections que l'accueil (composants
    ServiceConciergerie et ServiceSousLocation, dans le nouveau design). Le texte ci-dessous
    reprend celui de ces sections, tiré de src/data/accueil.ts : toute modification de l'un
    doit être répercutée sur l'autre, sinon le contenu servi aux robots diverge de celui
    servi aux visiteurs.
  */
  {
    path: "/conciergerie",
    changefreq: "weekly",
    priority: "0.9",
    title: "Conciergerie Airbnb à Avignon : gestion complète | Chevalier",
    description:
      "Conciergerie Airbnb à Avignon : annonce, accueil des voyageurs, ménage et tarification. 25 % HT du net perçu, sans engagement. Estimation gratuite.",
    keywords:
      "conciergerie Airbnb Avignon, gestion location saisonnière Avignon, accueil voyageurs Avignon, ménage Airbnb Avignon",
    ogTitle: "Conciergerie Airbnb à Avignon : gestion complète",
    ogDescription:
      "Annonce, accueil des voyageurs, ménage et tarification : 25 % HT du net perçu, sans engagement.",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Conciergerie</nav>
      <h1>Notre service de conciergerie</h1>

      <h2>Votre annonce créée, publiée partout.</h2>
      <p>Tout commence par l'annonce : rédaction, mise en valeur du logement, réglage des règles
      de séjour et des tarifs, puis mise en ligne simultanée sur les plateformes. Diffusé et
      synchronisé sur Airbnb, Booking.com et Abritel.</p>

      <h2>Votre calendrier rempli, vos nuits vacantes comblées.</h2>
      <p>Notre travail, c'est de combler vos nuits vacantes. Airbnb, Booking et la réservation
      directe sont synchronisés dans les deux sens dans Chevalier PMS, notre propre logiciel.</p>
      <ul>
        <li>Airbnb, Booking et réservation directe synchronisés en temps réel</li>
        <li>Les doubles réservations deviennent impossibles</li>
        <li>Chaque canal travaille à remplir votre planning</li>
      </ul>

      <h2>Votre propre site, 0 % de commission.</h2>
      <p>Chaque logement dispose aussi de son propre site de réservation en direct, sans
      intermédiaire, synchronisé avec Airbnb et Booking.</p>
      <ul>
        <li>Aucun intermédiaire, aucune commission prélevée</li>
        <li>Caution et paiement en ligne sécurisés</li>
        <li>Synchronisé avec Airbnb et Booking, zéro double réservation</li>
      </ul>

      <h2>Vos prix ajustés, par de vraies personnes.</h2>
      <p>Nous sommes partenaires de J'Affiche Complet, agence de revenue management. Pas
      d'algorithme qui grignote deux euros par-ci par-là chaque jour sans effet réel : une vraie
      équipe humaine s'en occupe.</p>
      <ul>
        <li>Partenariat avec J'Affiche Complet, agence de revenue management</li>
        <li>Prix, promotions et durées minimales revus chaque semaine</li>
        <li>Aucun algorithme automatique à la place d'une vraie équipe</li>
      </ul>

      <h2>Le ménage géré, sans que vous y pensiez.</h2>
      <p>Chaque réservation déclenche son ménage, sa blanchisserie et le réassort des
      consommables : l'équipe est prévenue sur WhatsApp au bon moment.</p>
      <ul>
        <li>Ménage, blanchisserie et consommables à chaque réservation</li>
        <li>L'équipe prévenue sur WhatsApp au bon moment</li>
        <li>Une vidéo prise à chaque passage, pour un suivi optimal</li>
      </ul>

      <h2>Vos voyageurs, jour et nuit.</h2>
      <p>121 conversations suivies dans une seule boîte, Airbnb, Booking et WhatsApp réunis — une
      réponse à toute heure.</p>
      <ul>
        <li>121 conversations suivies dans une seule boîte</li>
        <li>Airbnb, Booking et WhatsApp réunis</li>
        <li>Réponse aux voyageurs 7 jours sur 7, 24 heures sur 24</li>
      </ul>

      <h2>Vos revenus, chaque mois, en clair.</h2>
      <p>Chaque propriétaire reçoit un rapport mensuel détaillé de son logement, et garde un
      accès direct à Chevalier PMS pour tout suivre lui-même, à tout moment.</p>
      <ul>
        <li>Rapport mensuel détaillé, logement par logement</li>
        <li>Canaux, occupation et chiffre d'affaires au même endroit</li>
        <li>Accès direct à Chevalier PMS, à tout moment</li>
      </ul>

      <h2>Notre tarif : 25 % HT</h2>
      <p>De commission, prélevée uniquement sur ce que vous touchez vraiment. Les commissions des
      plateformes, le ménage et la taxe de séjour sont déduits d'abord. Notre commission ne
      s'applique qu'au net qui reste — jamais au chiffre d'affaires brut. Et le ménage, lui, est
      payé par le voyageur — pas par vous.</p>

      <h2>Les questions qu'on nous pose</h2>
      ${faqHtml(CONCIERGERIE_FAQ)}

      <p><a href="/contact">Prendre rendez-vous</a> — estimation gratuite sous 24 h ·
      <a href="/sous-location">Voir aussi la sous-location avec loyer garanti</a> ·</p>
    </main>`,
    jsonLd: [
      breadcrumb({ name: "Conciergerie", path: "/conciergerie" }),
      service({
        name: "Conciergerie Airbnb et gestion locative saisonnière",
        description:
          "Gestion complète d'une location courte durée : création et optimisation de l'annonce, gestion des réservations et des voyageurs, accueil, ménage professionnel, linge, maintenance et suivi des revenus.",
        areas: ZONE,
      }),
      faqPage(CONCIERGERIE_FAQ),
    ],
  },
  {
    path: "/sous-location",
    changefreq: "weekly",
    priority: "0.9",
    title: "Sous-location Avignon : loyer garanti | Chevalier",
    description:
      "Sous-location à Avignon : un loyer fixe versé chaque mois, 0 % de commission, sans vacance locative ni gestion. Estimation gratuite de votre bien.",
    keywords:
      "sous-location Avignon, loyer garanti Avignon, gestion locative Avignon, location meublée Avignon",
    ogTitle: "Sous-location Avignon : loyer garanti",
    ogDescription: "Un loyer fixe chaque mois, 0 % de commission, sans vacance locative ni gestion.",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Sous-location</nav>
      <h1>Notre service de sous-location</h1>

      <h2>Vous ne gérez plus rien, vous encaissez un loyer fixe.</h2>
      <p>Nous devenons votre locataire principal : nous louons votre bien à l'année pour y
      accueillir des voyageurs de passage. Vous touchez votre loyer, nous gérons l'exploitation
      et portons le risque.</p>

      <h3>Loyer garanti</h3>
      <p>Un revenu fixe chaque mois, versé dès le premier jour du contrat, quelle que soit
      l'occupation.</p>
      <h3>Zéro risque</h3>
      <p>Nous assumons les risques locatifs : impayés, vacance, dégradations.</p>
      <h3>Zéro gestion</h3>
      <p>Ménage, maintenance, accueil des voyageurs : tout est pris en charge, de A à Z.</p>
      <h3>Valorisation</h3>
      <p>Votre bien est entretenu aux standards hôteliers, ce qui préserve sa valeur.</p>

      <h2>Comment ça se passe</h2>
      <ol>
        <li><strong>Estimation gratuite</strong> — Nous évaluons votre bien et vous proposons un
        loyer garanti mensuel.</li>
        <li><strong>Signature du bail</strong> — Un contrat de sous-location professionnel,
        conforme à la législation.</li>
        <li><strong>Mise en location</strong> — Nous préparons et photographions le logement,
        puis créons les annonces.</li>
        <li><strong>Revenus garantis</strong> — Votre loyer vous est versé chaque mois par
        virement, sans exception.</li>
      </ol>

      <h2>Notre tarif : 0 % de commission</h2>
      <p>Un loyer fixe, versé chaque mois, saison creuse comprise. Nous louons votre bien à
      l'année à notre nom : nos revenus viennent de l'exploitation du logement, pas de votre
      poche. Le montant dépend du logement, du quartier et de la durée du bail ; il est fixé
      avant signature et ne bouge plus.</p>

      <h2>Les questions qu'on nous pose</h2>
      ${faqHtml(SOUSLOCATION_FAQ)}

      <p><a href="/estimation-sous-location">Obtenir mon estimation gratuite</a> ·
      <a href="/conciergerie">Voir aussi la formule conciergerie</a> ·</p>
    </main>`,
    jsonLd: [
      breadcrumb({ name: "Sous-location", path: "/sous-location" }),
      service({
        name: "Sous-location professionnelle avec loyer garanti",
        description:
          "Nous prenons votre bien à bail et vous versons un loyer fixe chaque mois, quelle que soit l'occupation. Nous assumons les risques locatifs et l'exploitation.",
        areas: ZONE,
      }),
      faqPage(SOUSLOCATION_FAQ),
    ],
  },
  {
    path: "/contact",
    changefreq: "monthly",
    priority: "0.8",
    title: "Contact Conciergerie Avignon | Consultation Gratuite | Chevalier",
    description:
      "Contactez Chevalier Conciergerie à Avignon. Consultation gratuite pour votre projet de gestion locative ou sous-location. Réponse sous 24h.",
    keywords: "contact conciergerie Avignon, devis gestion locative Avignon, rendez-vous conciergerie",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Contact</nav>
      <h1>Parlons de votre logement</h1>
      <p>Estimation gratuite et sans engagement : nous évaluons votre bien et vous disons ce
      qu'il peut rapporter, en conciergerie comme en sous-location.</p>
      <ul>
        <li>Téléphone : <a href="tel:+33783198341">07 83 19 83 41</a></li>
        <li>Courriel : <a href="mailto:contact@chevalier-conciergerie.com">contact@chevalier-conciergerie.com</a></li>
      </ul>
    </main>`,
    jsonLd: [breadcrumb({ name: "Contact", path: "/contact" })],
  },
  {
    path: "/a-propos",
    changefreq: "monthly",
    priority: "0.8",
    title: "Qui sommes-nous | Conciergerie Avignon | Chevalier",
    description:
      "Découvrez Chevalier Conciergerie : une conciergerie indépendante et locale à Avignon, fondée par Victor Chevalier, spécialiste de la location courte durée et de la sous-location avec loyer garanti.",
    keywords: "Victor Chevalier, conciergerie indépendante Avignon, qui sommes-nous conciergerie Avignon",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › À propos</nav>
      <h1>Une conciergerie locale et exigeante à Avignon</h1>
      <p>Chevalier Conciergerie accompagne les propriétaires de la région d'Avignon dans
      la gestion de leur location courte durée. Notre métier : transformer votre bien en
      une source de revenus sereine, sans que vous ayez à vous occuper de quoi que ce
      soit.</p>

      <h2>Le mot du fondateur</h2>
      <blockquote>
        <p>« J'ai créé Chevalier Conciergerie avec une conviction simple : un propriétaire
        ne devrait jamais avoir à choisir entre la rentabilité de son bien et sa
        tranquillité d'esprit. Trop de propriétaires renoncent à la location courte durée
        par manque de temps, ou se font dépasser par les réservations, le ménage et les
        imprévus. Nous prenons tout en charge, de la création de l'annonce à l'accueil des
        voyageurs, avec un niveau de service digne de l'hôtellerie. Et nous le faisons en
        local, à taille humaine : à Avignon, nous sommes sur place, joignables, et nous
        traitons chaque logement comme s'il était le nôtre. »</p>
        <p>— Victor Chevalier, fondateur</p>
      </blockquote>

      <h2>Ce que nous faisons</h2>
      <p>Nous proposons deux formules complémentaires. Avec la
      <a href="/conciergerie">conciergerie</a>, nous gérons votre location courte durée de
      A à Z et vous reversons les revenus, en toute transparence. Avec la
      <a href="/sous-location">sous-location professionnelle</a>, nous prenons votre bien
      à bail et vous garantissons un loyer fixe chaque mois, que le logement soit occupé
      ou non. Dans les deux cas, vous bénéficiez d'un interlocuteur unique et d'un suivi
      clair de vos revenus. Nous intervenons à Avignon, Villeneuve-lès-Avignon, Les Angles
      et leurs environs.</p>

      <h2>Nos valeurs</h2>
      <p><strong>Transparence.</strong> Des comptes rendus clairs, des reversements à date
      fixe et aucune mauvaise surprise. La taxe de séjour, collectée pour la collectivité,
      n'est jamais comptée comme un revenu : vous touchez vos honoraires, votre ménage et
      vos suppléments, point.</p>
      <p><strong>Exigence.</strong> Accueil soigné, linge hôtelier, ménage professionnel
      et annonces optimisées. Chaque séjour est pensé pour décrocher les meilleures
      évaluations et fidéliser les voyageurs.</p>
      <p><strong>Ancrage local.</strong> Nous sommes installés à Villeneuve-lès-Avignon et
      intervenons sur place.</p>
    </main>`,
    jsonLd: [
      breadcrumb({ name: "À propos", path: "/a-propos" }),
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: SITE + "/a-propos",
        inLanguage: "fr-FR",
        mainEntity: {
          "@type": "Organization",
          "@id": SITE,
          name: "Chevalier Conciergerie",
          url: SITE,
          founder: { "@type": "Person", name: "Victor Chevalier" },
          areaServed: ZONE.map((a) => ({ "@type": "City", name: a })),
        },
      },
    ],
  },
  {
    path: "/franchise",
    changefreq: "monthly",
    priority: "0.8",
    title: "Devenir franchisé | Ouvrir sa conciergerie | Chevalier Conciergerie",
    description:
      "Ouvrez votre conciergerie avec le réseau Chevalier Conciergerie : marque et territoire réservé, plus de 40 h de formation, logiciel PMS et CRM compris, site web et référencement, kit marketing, accompagnement continu.",
    keywords:
      "franchise conciergerie, devenir franchisé conciergerie, ouvrir une conciergerie, réseau conciergerie Airbnb, franchise gestion locative, monter sa conciergerie",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Devenir franchisé</nav>
      <h1>Devenir franchisé Chevalier Conciergerie</h1>
      <p>Monter une conciergerie seul demande deux ans d'apprentissage par l'erreur. Le réseau
      Chevalier Conciergerie transmet la marque, la méthode et les outils que nous utilisons
      chaque jour sur nos propres logements.</p>

      <h2>Ce qui est compris</h2>
      <ul>
        <li>La marque Chevalier Conciergerie sur votre ville, avec un territoire réservé</li>
        <li>Plus de quarante heures de formation, de la prospection à la comptabilité</li>
        <li>Le logiciel Chevalier PMS : calendrier multicanal, ménages, messagerie, CRM</li>
        <li>Votre site web et la stratégie de référencement qui va avec</li>
        <li>Un kit marketing complet : logo, cartes de visite, flyers, modèles de publications</li>
        <li>Un accompagnement continu et un séminaire annuel de trois jours</li>
      </ul>

      <h2>À qui ça s'adresse</h2>
      <p>À ceux qui partent de zéro, à ceux qui gèrent déjà quelques biens sans méthode ni outil,
      et aux professionnels de l'immobilier qui veulent prolonger leur activité. Aucun diplôme
      n'est requis : ce qui compte est d'habiter la ville que vous voulez couvrir.</p>

      <h2>Le parcours, du premier appel à l'ouverture</h2>
      <ol>
        <li>Le premier appel, 45 minutes : votre ville, votre situation, le territoire disponible</li>
        <li>Le dossier complet sous 48 heures : modèle économique, contrat, droit d'entrée, redevance</li>
        <li>Vingt jours de réflexion au minimum, comme l'impose la loi Doubin avant toute signature</li>
        <li>La signature : contrat, territoire acté, accès au logiciel ouverts</li>
        <li>La formation, plus de quarante heures, la prospection commençant pendant</li>
        <li>L'ouverture : site en ligne, premiers mandats, points réguliers et séminaire annuel</li>
      </ol>

      ${faqHtml(FRANCHISE_FAQ)}
    </main>`,
    jsonLd: [
      breadcrumb({ name: "Devenir franchisé", path: "/franchise" }),
      faqPage(FRANCHISE_FAQ),
    ],
  },
  {
    path: "/partenaires",
    changefreq: "monthly",
    priority: "0.7",
    title: "Partenaires locaux | Chevalier Conciergerie Avignon",
    description:
      "Les partenaires locaux d'Avignon et Villeneuve-lès-Avignon avec qui nous travaillons pour l'entretien, la valorisation et la commercialisation des biens en gestion.",
    keywords: "partenaires conciergerie Avignon, prestataires location saisonnière Avignon, réseau local conciergerie Vaucluse",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Partenaires</nav>
      <h1>Partenaires locaux — Chevalier Conciergerie Avignon</h1>
      <p>Nous nous appuyons sur un réseau d'entreprises locales, choisies pour la
      qualité de leur travail et leur réactivité. Elles interviennent chaque semaine
      sur les logements que nous gérons à Avignon, Villeneuve-lès-Avignon et Les
      Angles.</p>

      <h2>ERA Immobilier — Rachel Lindo</h2>
      <p>Agence immobilière partenaire à Villeneuve-lès-Avignon. Rachel Lindo
      accompagne les propriétaires qui souhaitent acquérir ou vendre un bien destiné
      à la location courte durée dans le secteur Gard–Vaucluse. Elle nous adresse
      les acquéreurs qui cherchent un partenaire de gestion, et nous lui adressons
      les propriétaires qui envisagent d'arbitrer.</p>

      <h2>La Cave Réalpanier</h2>
      <p>Caviste indépendant du secteur, sélectionné pour les vins de bienvenue
      offerts à certains voyageurs. Les produits sont locaux, les allergènes signalés,
      la présentation soignée : ce sont ces détails que les voyageurs commentent
      dans leurs avis.</p>

      <h2>Devenir partenaire</h2>
      <p>Vous êtes artisan, commerçant ou professionnel indépendant sur Avignon,
      Villeneuve-lès-Avignon ou Les Angles et vous souhaitez travailler avec nous ?
      <a href="/contact">Contactez-nous</a>. Nous privilégions la proximité, la
      qualité du service et la stabilité du tarif dans la durée.</p>

      <p><a href="/conciergerie">La formule conciergerie</a> ·
      <a href="/sous-location">La sous-location avec loyer garanti</a> ·
      <a href="/a-propos">Notre approche</a></p>
    </main>`,
    jsonLd: [breadcrumb({ name: "Partenaires", path: "/partenaires" })],
  },
  {
    path: "/estimation-sous-location",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Estimation sous-location</nav>
      <h1>Estimez votre loyer garanti à Avignon</h1>
      <p>Décrivez votre bien, nous vous proposons une offre chiffrée sous 48 h.
      L'estimation est gratuite et sans engagement — vous ne recevrez pas
      d'appels commerciaux si vous ne donnez pas suite.</p>

      <h2>Localisation</h2>
      <p>Adresse ou quartier précis de votre bien (Avignon, Villeneuve-lès-Avignon,
      Les Angles ou communes limitrophes).</p>

      <h2>Caractéristiques</h2>
      <p>Décrivez votre logement pour que nous puissions établir une offre juste :</p>
      <ul>
        <li>Type de bien (studio, T2, T3, maison…) et surface habitable</li>
        <li>Meublé ou non — un bien meublé se met en exploitation immédiatement</li>
        <li>Parking, ascenseur, cave</li>
        <li>Extérieur : balcon, terrasse, jardin, piscine</li>
        <li>État général et travaux récents</li>
      </ul>

      <h2>Vos coordonnées</h2>
      <p>Pour vous recontacter avec notre proposition chiffrée. Précisez quand
      vous êtes disponible pour un appel de dix minutes.</p>
      <p>J'accepte que mes données soient utilisées pour traiter ma demande
      d'estimation, conformément à la
      <a href="/politique-confidentialite">politique de confidentialité</a>.</p>

      <p><a href="/sous-location">Le détail de la sous-location</a> ·
      <a href="/conciergerie">La formule conciergerie</a></p>
    </main>`,
    changefreq: "monthly",
    priority: "0.7",
    title: "Estimation sous-location Avignon | Loyer garanti sous 48h | Chevalier",
    description:
      "Estimation gratuite du loyer garanti pour votre bien à Avignon, Villeneuve-lès-Avignon ou Les Angles. Formulaire simple, réponse chiffrée sous 48 h, sans engagement.",
    keywords: "estimation sous-location Avignon, simulation loyer garanti Avignon, estimation gratuite location Avignon",
    jsonLd: [breadcrumb({ name: "Estimation sous-location", path: "/estimation-sous-location" })],
  },
  /*
    Page mère des villes. Le texte reprend celui de src/pages/Villes.tsx : les deux
    doivent dire la même chose (sinon, cloaking). Les liens relient les cinq pages
    locales, que seul le pied de page reliait jusqu'ici.
  */
  {
    path: "/villes",
    changefreq: "monthly",
    priority: "0.8",
    title: "Conciergerie Airbnb : villes desservies | Chevalier",
    description:
      "Conciergerie Airbnb à Avignon, Villeneuve-lès-Avignon, Les Angles, Aix-en-Provence et Montpellier. 25 % HT du net perçu, sans engagement. Estimation gratuite.",
    keywords:
      "conciergerie Avignon, conciergerie Villeneuve-lès-Avignon, conciergerie Les Angles, conciergerie Aix-en-Provence, conciergerie Montpellier",
    ogTitle: "Conciergerie Airbnb : villes desservies",
    ogDescription: "Cinq villes, un seul taux : 25 % HT du net perçu, sans engagement de durée.",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Villes</nav>
      <h1>Conciergerie Airbnb : les villes où nous intervenons</h1>
      <p>Cinq villes, la même formule partout : 25 % HT du net perçu par le propriétaire,
      sans abonnement ni engagement de durée, ou sous-location avec un loyer fixe et 0 % de
      commission.</p>

      <h2>Conciergerie Airbnb à Avignon</h2>
      <p>Intra-muros et alentours. Depuis le 1er janvier 2026, la ville exige un numéro
      d'enregistrement et, hors résidence principale, une autorisation de changement d'usage :
      nous montons le dossier avant la mise en ligne.</p>
      <p><a href="/conciergerie-avignon">Voir la conciergerie à Avignon</a></p>

      <h2>Conciergerie Airbnb à Villeneuve-lès-Avignon</h2>
      <p>Notre base, dans le Gard, face à Avignon. La déclaration se fait en mairie et nous
      nous en chargeons.</p>
      <p><a href="/conciergerie-villeneuve-les-avignon">Voir la conciergerie à Villeneuve-lès-Avignon</a></p>

      <h2>Conciergerie Airbnb à Les Angles</h2>
      <p>Commune gardoise face à Avignon, à environ dix minutes du centre historique, avec une
      clientèle plus familiale.</p>
      <p><a href="/conciergerie-les-angles">Voir la conciergerie à Les Angles</a></p>

      <h2>Conciergerie Airbnb à Aix-en-Provence</h2>
      <p>À environ une heure de route de notre base. Nous vérifions auprès de la mairie le
      cadre applicable à chaque bien.</p>
      <p><a href="/conciergerie-aix-en-provence">Voir la conciergerie à Aix-en-Provence</a></p>

      <h2>Conciergerie Airbnb à Montpellier</h2>
      <p>À un peu plus d'une heure de route de notre base. Nous vérifions auprès de la mairie
      le cadre applicable à chaque bien.</p>
      <p><a href="/conciergerie-montpellier">Voir la conciergerie à Montpellier</a></p>

      <p>Les règles applicables aux meublés de tourisme dépendent de chaque commune et
      évoluent : nous les vérifions avant toute mise en ligne. Le tarif de chaque formule figure
      sur les pages <a href="/conciergerie">Conciergerie</a> et <a href="/sous-location">Sous-location</a>.
      Pour un bien dans une autre commune, <a href="/contact">contactez-nous</a>.</p>
    </main>`,
    jsonLd: [breadcrumb({ name: "Villes", path: "/villes" })],
  },
  // Les trois pages locales sont générées plus bas depuis LOCAL_PAGES : leur titre,
  // leur description et leur contenu sont lus directement dans les fichiers
  // src/pages/Conciergerie*.tsx, ce qui les empêche de diverger de la page affichée.
  {
    path: "/cgv",
    changefreq: "yearly",
    priority: "0.3",
    title: "Conditions générales de vente | Chevalier Conciergerie Avignon",
    description:
      "Conditions générales de vente applicables aux prestations de conciergerie Airbnb et de sous-location avec loyer garanti proposées par CHEVALIER LOCABUSINESS à Avignon.",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Conditions générales de vente</nav>
      <h1>Conditions générales de vente</h1>
      <p>Conditions applicables aux prestations de conciergerie et de gestion locative
      fournies par CHEVALIER LOCABUSINESS.</p>

      <h2>Article 1 — Objet</h2>
      <p>Les présentes Conditions Générales de Vente régissent les relations
      contractuelles entre CHEVALIER LOCABUSINESS et tout propriétaire ou client
      souscrivant à ses services de conciergerie et de gestion locative. Toute
      commande implique l'acceptation sans réserve des présentes CGV.</p>

      <h2>Article 2 — Services proposés</h2>
      <p>Deux offres principales : (1) conciergerie et gestion locative courte durée
      (création et optimisation des annonces, gestion des réservations, accueil,
      ménage, linge, maintenance courante) ; (2) sous-location professionnelle avec
      loyer garanti, par laquelle le Prestataire prend à bail le bien du Client puis
      en assure l'exploitation.</p>

      <h2>Article 3 — Tarifs et honoraires</h2>
      <p>Honoraires exprimés en pourcentage des revenus locatifs générés ou sous
      forme de forfait, selon l'offre choisie. La taxe de séjour, collectée pour la
      collectivité, ne constitue jamais un revenu du Prestataire.</p>

      <h2>Article 4 — Obligations du Prestataire</h2>
      <p>Le Prestataire exécute les prestations avec professionnalisme et diligence,
      dans le respect de la réglementation applicable à la location de courte durée.
      Il rend compte régulièrement au Client de la gestion et lui reverse les sommes
      dues selon la périodicité convenue.</p>

      <h2>Article 5 — Obligations du Client</h2>
      <p>Le Client garantit être propriétaire du bien confié ou disposer des
      autorisations nécessaires (règlement de copropriété, changement d'usage,
      déclaration en mairie).</p>

      <h2>Article 6 — Durée et résiliation</h2>
      <p>Le contrat est conclu pour la durée stipulée entre les parties, résiliable
      par lettre recommandée avec accusé de réception moyennant le préavis fixé au
      contrat.</p>

      <h2>Article 7 — Responsabilité</h2>
      <p>Le Prestataire est tenu d'une obligation de moyens, non de résultat. Sa
      responsabilité n'est pas engagée en cas de force majeure, de fait d'un tiers
      ou de manquement du Client.</p>

      <h2>Article 8 — Données personnelles</h2>
      <p>Les données sont traitées conformément au RGPD, comme détaillé dans la
      <a href="/politique-confidentialite">politique de confidentialité</a>.</p>

      <h2>Article 9 — Droit applicable et litiges</h2>
      <p>Droit français. À défaut d'accord amiable, litige porté devant les
      tribunaux compétents du siège social du Prestataire.</p>

      <p><a href="/mentions-legales">Mentions légales</a> ·
      <a href="/politique-confidentialite">Politique de confidentialité</a></p>
    </main>`,
    jsonLd: [breadcrumb({ name: "Conditions générales de vente", path: "/cgv" })],
    stripBusinessSchema: true,
  },
  {
    path: "/mentions-legales",
    changefreq: "yearly",
    priority: "0.3",
    title: "Mentions légales | Chevalier Conciergerie Avignon",
    description:
      "Mentions légales de Chevalier Conciergerie (CHEVALIER LOCABUSINESS) — éditeur, siège social à Villeneuve-lès-Avignon, hébergeur et directeur de publication.",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Mentions légales</nav>
      <h1>Mentions légales</h1>
      <p>Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
      l'économie numérique.</p>

      <h2>Éditeur du site</h2>
      <ul>
        <li>Raison sociale : CHEVALIER LOCABUSINESS</li>
        <li>Forme juridique : SAS (Société par Actions Simplifiée)</li>
        <li>SIREN : 995 268 802</li>
        <li>SIRET : 995 268 802 00015</li>
        <li>TVA intracommunautaire : FR45995268802</li>
        <li>RCS : Nîmes</li>
        <li>Code NAF/APE : 6820A — Location de logements</li>
      </ul>

      <h2>Siège social</h2>
      <p>5 Lotissement Les Cades, 30400 Villeneuve-lès-Avignon, France</p>

      <h2>Contact</h2>
      <ul>
        <li>Téléphone : <a href="tel:+33783198341">+33 7 83 19 83 41</a></li>
        <li>Email : <a href="mailto:contact@chevalier-conciergerie.com">contact@chevalier-conciergerie.com</a></li>
      </ul>

      <h2>Publication</h2>
      <ul>
        <li>Directeur de la publication : CHEVALIER LOCABUSINESS</li>
        <li>Site web : chevalier-conciergerie.com</li>
      </ul>

      <h2>Hébergement</h2>
      <p>Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>

      <p><a href="/cgv">Conditions générales de vente</a> ·
      <a href="/politique-confidentialite">Politique de confidentialité</a></p>
    </main>`,
    jsonLd: [breadcrumb({ name: "Mentions légales", path: "/mentions-legales" })],
    stripBusinessSchema: true,
  },
  {
    path: "/politique-confidentialite",
    bodyHtml: `<main>
<nav><a href="/">Accueil</a> › Politique de Confidentialité</nav>
<h1>Protection des données</h1>
<p>Transparence et sécurité au cœur de notre engagement</p>

<h2>Donnée personnelle</h2>
<p>Définition</p>
<p>Une donnée personnelle est toute information permettant d'identifier directement ou indirectement une personne physique. Il peut s'agir de votre nom, prénom, adresse email, numéro de téléphone, adresse postale, ou encore de votre adresse IP.</p>

<h2>Données collectées</h2>
<p>Ce que nous recueillons</p>
<ul>
<li>Données d'identification : nom, prénom, adresse email, numéro de téléphone</li>
<li>Données relatives à votre bien : adresse, type de bien, caractéristiques</li>
<li>Données de navigation : adresse IP, type de navigateur, pages visitées</li>
<li>Données de correspondance : messages envoyés via le formulaire de contact</li>
</ul>

<h2>Responsable</h2>
<p>Qui traite vos données</p>
<p>CHEVALIER LOCABUSINESS (SASU)
Nom commercial : Chevalier Conciergerie
Siège social : Avignon, 84000 France
Email : contact@chevalier-conciergerie.com
Téléphone : +33 7 83 19 83 41</p>

<h2>Finalités</h2>
<p>Pourquoi nous collectons</p>
<h3>Traitements contractuels</h3>
<ul>
<li>Gestion des demandes de contact et de devis</li>
<li>Gestion de la relation client et de nos prestations</li>
<li>Communication relative à nos services</li>
</ul>
<h3>Traitements avec consentement</h3>
<ul>
<li>Communications marketing</li>
<li>Amélioration de votre expérience utilisateur</li>
</ul>
<p>Retrait du consentement : contact@chevalier-conciergerie.com</p>

<h2>Stockage</h2>
<p>Où sont vos données</p>
<p>Vos données sont stockées sur des serveurs sécurisés situés dans l'Union Européenne. Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données.</p>

<h2>Conservation</h2>
<p>Durées de rétention</p>
<ul>
<li>Données clients : durée de la relation + 3 ans</li>
<li>Données de prospection : 3 ans après dernier contact</li>
<li>Données de facturation : 10 ans (obligations légales)</li>
<li>Données de navigation : 13 mois maximum</li>
</ul>

<h2>Vos droits</h2>
<p>RGPD</p>
<ul>
<li>Droit d'accès : obtenir une copie de vos données</li>
<li>Droit de rectification : corriger des données inexactes</li>
<li>Droit à l'effacement : demander la suppression</li>
<li>Droit à la limitation : limiter le traitement</li>
<li>Droit à la portabilité : recevoir vos données</li>
<li>Droit d'opposition : vous opposer au traitement</li>
</ul>
<p>Contact : contact@chevalier-conciergerie.com
Réclamation CNIL : www.cnil.fr</p>

<h2>Cookies</h2>
<p>Navigation</p>
<h3>Types de cookies utilisés</h3>
<ul>
<li>Cookies essentiels : nécessaires au fonctionnement</li>
<li>Cookies analytiques : comprendre votre utilisation</li>
</ul>
<p>Vous pouvez configurer votre navigateur pour refuser les cookies.</p>

<p>Sélectionnez une catégorie pour en savoir plus</p>

<p>Mise à jour : Janvier 2026 · Questions ?</p>
</main>`,
    changefreq: "yearly",
    priority: "0.3",
    title: "Politique de confidentialité | RGPD | Chevalier Conciergerie",
    description:
      "Politique de confidentialité de Chevalier Conciergerie : quelles données sont collectées, dans quel but, combien de temps elles sont conservées, et comment exercer vos droits RGPD.",
    jsonLd: [breadcrumb({ name: "Politique de confidentialité", path: "/politique-confidentialite" })],
    stripBusinessSchema: true,
  },
];

// Les fiches logement sont lues directement dans src/data/properties.ts : ajouter un
// logement là-bas suffit, la page pré-rendue et le sitemap suivent au prochain build.
//
// ⚠️ DÉSACTIVÉ. Cette fonction générait 9 URLs /proprietes/<slug> dans le sitemap alors
// qu'aucune route /proprietes/:slug n'existe dans src/App.tsx depuis le retrait de la
// réservation en direct. Google recevait donc 9 pages sur 26 qui répondaient HTTP 200
// puis affichaient le composant NotFound — des soft-404, explicitement pénalisés, sur
// plus d'un tiers du sitemap. Rebrancher `...readProperties()` ci-dessous EN MÊME TEMPS
// que la route, jamais avant.
function readProperties() {
  const src = readFileSync(path.join(root, "src/data/properties.ts"), "utf8");
  const blocks = src.split(/\n\s{2}\{/).slice(1);
  const out = [];

  for (const block of blocks) {
    const slug = block.match(/\n\s+slug:\s*"([^"]+)"/)?.[1];
    const name = block.match(/\n\s+name:\s*"([^"]+)"/)?.[1];
    const short = block.match(/\n\s+shortDescription:\s*"([^"]+)"/)?.[1];
    if (!slug || !name) continue;
    out.push({
      path: `/proprietes/${slug}`,
      changefreq: "weekly",
      priority: "0.6",
      title: `${name} | Chevalier Conciergerie — Location Avignon`,
      description:
        short || `${name} — logement géré par Chevalier Conciergerie à Avignon. Réservation en direct.`,
    });
  }
  return out;
}

/*
  Dictionnaire SEO EN.

  Les traductions de titres, descriptions, mots-clés et OG sont ici — pas dans
  src/i18n/en.ts, qui sert le SPA. Le prérendu est un moment de build, il n'a pas
  besoin d'un mécanisme runtime.

  Convention : la clé est la chaîne française exacte. Une clé manquante fait
  ressortir le français plutôt que de laisser un trou, comme dans en.ts.
*/
const SEO_EN = {
  // Titres
  "Conciergerie Avignon | Gestion Locative & Sous-location | Chevalier Conciergerie":
    "Property Management Avignon | Guaranteed Rent & Holiday Lets | Chevalier Conciergerie",
  "Conciergerie Airbnb Avignon | Gestion Location Saisonnière | Chevalier":
    "Airbnb Property Management Avignon | Holiday Let Services | Chevalier",
  "Sous-location Avignon | Loyer Garanti & Zéro Vacance | Chevalier":
    "Guaranteed Rent Avignon | Fixed Monthly Income, Zero Vacancy | Chevalier",
  "Tarifs conciergerie Avignon | 25 % HT tout compris | Chevalier Conciergerie":
    "Property Management Fees Avignon | 25 % all-in | Chevalier Conciergerie",
  "Contact Conciergerie Avignon | Consultation Gratuite | Chevalier":
    "Contact Chevalier Conciergerie Avignon | Free Consultation",
  "Qui sommes-nous | Conciergerie Avignon | Chevalier":
    "About us | Property Management Avignon | Chevalier",
  "Devenir franchisé | Ouvrir sa conciergerie | Chevalier Conciergerie":
    "Become a franchisee | Open your own property management | Chevalier Conciergerie",
  "Nos Partenaires | Chevalier Conciergerie Avignon":
    "Our Partners | Chevalier Conciergerie Avignon",
  "Conciergerie Airbnb à Avignon : gestion complète | Chevalier":
    "Airbnb Property Management in Avignon: Full Service | Chevalier",
  "Conciergerie Airbnb à Avignon : annonce, accueil des voyageurs, ménage et tarification. 25 % HT du net perçu, sans engagement. Estimation gratuite.":
    "Airbnb property management in Avignon: listing, guest welcome, cleaning and pricing. 25 % (excl. VAT) of the net received, no lock-in. Free estimate.",
  "Conciergerie Airbnb à Avignon : gestion complète":
    "Airbnb Property Management in Avignon: Full Service",
  "Annonce, accueil des voyageurs, ménage et tarification : 25 % HT du net perçu, sans engagement.":
    "Listing, guest welcome, cleaning and pricing: 25 % (excl. VAT) of the net received, no lock-in.",
  "Sous-location Avignon : loyer garanti | Chevalier":
    "Guaranteed Rent Avignon: Fixed Monthly Income | Chevalier",
  "Sous-location à Avignon : un loyer fixe versé chaque mois, 0 % de commission, sans vacance locative ni gestion. Estimation gratuite de votre bien.":
    "Guaranteed rent in Avignon: a fixed monthly rent, 0 % commission, no vacancy and no management. Free estimate for your property.",
  "Sous-location Avignon : loyer garanti":
    "Guaranteed Rent Avignon",
  "Un loyer fixe chaque mois, 0 % de commission, sans vacance locative ni gestion.":
    "A fixed rent every month, 0 % commission, no vacancy and no management.",
  "Conciergerie Airbnb : villes desservies | Chevalier":
    "Airbnb Property Management: Cities We Serve | Chevalier",
  "Conciergerie Airbnb à Avignon, Villeneuve-lès-Avignon, Les Angles, Aix-en-Provence et Montpellier. 25 % HT du net perçu, sans engagement. Estimation gratuite.":
    "Airbnb property management in Avignon, Villeneuve-lès-Avignon, Les Angles, Aix-en-Provence and Montpellier. 25 % (excl. VAT) of the net received, no lock-in. Free estimate.",
  "Conciergerie Airbnb : villes desservies":
    "Airbnb Property Management: Cities We Serve",
  "Cinq villes, un seul taux : 25 % HT du net perçu, sans engagement de durée.":
    "Five cities, one rate: 25 % (excl. VAT) of the net received, no lock-in.",
  "Conciergerie Avignon intra-muros | Quartiers et règles 2026 | Chevalier":
    "Property Management Avignon Old Town | Neighbourhoods and 2026 Rules | Chevalier",
  "Conciergerie Airbnb Villeneuve-lès-Avignon | Chevalier":
    "Airbnb Property Management Villeneuve-lès-Avignon | Chevalier",
  "Conciergerie Airbnb Les Angles | Chevalier":
    "Airbnb Property Management Les Angles | Chevalier",

  // Descriptions
  "Conciergerie Airbnb à Avignon, Villeneuve-lès-Avignon et Les Angles. Gestion locative saisonnière complète, ou sous-location avec loyer garanti chaque mois. Estimation gratuite sous 24 h.":
    "Airbnb property management in Avignon, Villeneuve-lès-Avignon and Les Angles. Full holiday-let management, or guaranteed monthly rent with a fixed lease. Free estimate within 24 h.",
  "Conciergerie Airbnb à Avignon et Villeneuve-lès-Avignon : accueil voyageurs, ménage, linge, annonces, tarification. Commission sur-mesure, sans engagement. Estimation gratuite sous 24 h.":
    "Airbnb property management in Avignon and Villeneuve-lès-Avignon: guest welcome, cleaning, linen, listings, pricing. Custom commission, no lock-in. Free estimate within 24 h.",
  "Sous-location professionnelle à Avignon avec loyer garanti chaque mois. Zéro vacance locative, zéro gestion. Estimation gratuite de votre bien.":
    "Professional guaranteed-rent letting in Avignon with a fixed monthly rent. Zero vacancy, zero management. Free estimate for your property.",
  "Tarifs de conciergerie à Avignon : 25 % HT du net perçu par le propriétaire, tout compris, sans abonnement ni engagement. Sous-location : 0 % de commission, loyer fixe chaque mois.":
    "Property management fees in Avignon: 25 % (excl. VAT) of the net received by the owner, all in, no subscription or lock-in. Guaranteed rent: 0 % commission, fixed monthly rent.",
  "Contactez Chevalier Conciergerie à Avignon. Consultation gratuite pour votre projet de gestion locative ou sous-location. Réponse sous 24h.":
    "Get in touch with Chevalier Conciergerie in Avignon. Free consultation for your property management or guaranteed-rent project. Reply within 24 h.",
  "Découvrez Chevalier Conciergerie : une conciergerie indépendante et locale à Avignon, fondée par Victor Chevalier, spécialiste de la location courte durée et de la sous-location avec loyer garanti.":
    "Chevalier Conciergerie is an independent, local property manager in Avignon, founded by Victor Chevalier, specialising in short-let hosting and guaranteed-rent letting.",
  "Ouvrez votre conciergerie avec le réseau Chevalier Conciergerie : marque et territoire réservé, plus de 40 h de formation, logiciel PMS et CRM compris, site web et référencement, kit marketing, accompagnement continu.":
    "Open your own property management business with the Chevalier Conciergerie network: brand and protected territory, 40+ hours of training, PMS and CRM software included, website and SEO, marketing kit, ongoing support.",
  "Les partenaires locaux avec qui nous travaillons à Avignon et alentours pour l'entretien et la valorisation des biens que nous gérons.":
    "The local partners we work with in and around Avignon for the upkeep and staging of the properties we manage.",
  "Conciergerie Airbnb à Avignon intra-muros : quartiers couverts, marché local et règles applicables depuis le 1er janvier 2026. Enregistrement et changement d'usage pris en charge.":
    "Airbnb property management in Avignon old town: neighbourhoods covered, local market and rules in force since 1 January 2026. Registration and change-of-use handled for you.",
  "Conciergerie Airbnb à Villeneuve-lès-Avignon : gestion complète de votre location saisonnière face à Avignon, et des démarches plus simples que de l'autre côté du Rhône. Devis gratuit.":
    "Airbnb property management in Villeneuve-lès-Avignon: full holiday-let management across the river from Avignon, with lighter red tape than on the other side. Free quote.",
  "Conciergerie Airbnb aux Angles, près d'Avignon. Gestion locative complète pour propriétaires : accueil voyageurs, ménage professionnel, revenus optimisés. Estimation gratuite.":
    "Airbnb property management in Les Angles, near Avignon. Full holiday-let hosting for owners: guest welcome, professional cleaning, optimised income. Free estimate.",

  // OG variants
  "Conciergerie Avignon | Gestion Locative Saisonnière | Chevalier Conciergerie":
    "Property Management Avignon | Holiday-Let Hosting | Chevalier Conciergerie",
  "Conciergerie Airbnb à Avignon. Gestion locative saisonnière complète, ou loyer garanti chaque mois. Estimation gratuite.":
    "Airbnb property management in Avignon. Full holiday-let hosting, or guaranteed monthly rent. Free estimate.",
  "Conciergerie Airbnb Avignon | Gestion Location Saisonnière":
    "Airbnb Property Management Avignon | Holiday-Let Hosting",
  "Conciergerie Airbnb à Avignon : gestion complète de votre location saisonnière, commission sur-mesure.":
    "Airbnb property management in Avignon: full holiday-let hosting, custom commission.",
  "Sous-location Avignon | Loyer Garanti Chaque Mois":
    "Guaranteed Rent Avignon | Fixed Monthly Income",
  "Sous-location professionnelle à Avignon. Loyer garanti, zéro vacance, zéro risque.":
    "Professional guaranteed-rent letting in Avignon. Fixed rent, zero vacancy, zero risk.",
  "Tarifs conciergerie Avignon | 25 % HT tout compris":
    "Property Management Fees Avignon | 25 % all-in",
  "25 % HT du net perçu par le propriétaire, tout compris. Sous-location : 0 % de commission, loyer fixe chaque mois.":
    "25 % (excl. VAT) of the net received by the owner, all in. Guaranteed rent: 0 % commission, fixed monthly rent.",

  // Mots-clés
  "conciergerie Avignon, gestion locative Avignon, Airbnb Avignon, location saisonnière Avignon, sous-location Avignon, conciergerie Villeneuve-lès-Avignon, gestion Airbnb":
    "property management Avignon, holiday let Avignon, Airbnb Avignon, short-let Avignon, guaranteed rent Avignon, property management Villeneuve-lès-Avignon",
  "conciergerie Airbnb Avignon, gestion location saisonnière Avignon, accueil voyageurs Avignon, ménage Airbnb Avignon":
    "Airbnb property management Avignon, holiday-let hosting Avignon, guest welcome Avignon, Airbnb cleaning Avignon",
  "sous-location Avignon, loyer garanti Avignon, gestion locative Avignon, location meublée Avignon":
    "guaranteed rent Avignon, fixed monthly rent Avignon, property management Avignon, furnished let Avignon",
  "tarif conciergerie Avignon, prix conciergerie Avignon, commission conciergerie Airbnb, coût gestion locative Avignon, tarif sous-location Avignon":
    "property management fees Avignon, Airbnb management commission, cost of holiday-let hosting Avignon, guaranteed rent price Avignon",
  "contact conciergerie Avignon, devis gestion locative Avignon, rendez-vous conciergerie":
    "contact property management Avignon, holiday-let quote Avignon, book a call with a property manager",
  "Victor Chevalier, conciergerie indépendante Avignon, qui sommes-nous conciergerie Avignon":
    "Victor Chevalier, independent property management Avignon, about Chevalier Conciergerie",
  "franchise conciergerie, devenir franchisé conciergerie, ouvrir une conciergerie, réseau conciergerie Airbnb, franchise gestion locative, monter sa conciergerie":
    "property management franchise, become a franchisee, open a property management business, Airbnb management franchise network",
  "partenaires conciergerie Avignon, prestataires location saisonnière Avignon":
    "property management partners Avignon, holiday-let suppliers Avignon",
  "conciergerie Airbnb Avignon, gestion location saisonnière Avignon, conciergerie Avignon intra-muros, location courte durée Avignon, Airbnb Avignon":
    "Airbnb property management Avignon, holiday-let hosting Avignon, property management Avignon old town, short-let Avignon",
  "conciergerie Villeneuve-lès-Avignon, conciergerie Villeneuve lez Avignon, Airbnb Villeneuve Avignon, gestion locative Villeneuve, location saisonnière Villeneuve-lès-Avignon":
    "property management Villeneuve-lès-Avignon, Airbnb Villeneuve Avignon, holiday-let Villeneuve, short-let Villeneuve-lès-Avignon",
  "conciergerie Les Angles, Airbnb Les Angles Avignon, gestion locative Les Angles, location saisonnière Les Angles, conciergerie Gard":
    "property management Les Angles, Airbnb Les Angles, holiday-let Les Angles, short-let Les Angles, property management Gard",
};

const traduire = (fr) => (fr && typeof fr === "string" && SEO_EN[fr]) || fr;

/**
 * Produit la variante /en d'une route française.
 *
 * Le chemin est préfixé, les métadonnées textuelles passent par le dictionnaire SEO_EN.
 * Le bodyHtml français ne peut pas être servi sous /en : ce serait du cloaking (langue
 * différente de la <html lang>). À la place, on écrit un bodyHtml court en anglais qui
 * donne aux robots (GPTBot, PerplexityBot, ClaudeBot) un contenu réel dans la bonne
 * langue, avec un lien vers la version française pour l'équivalence.
 */
function traduireRoute(route) {
  const cheminEn = route.path === "/" ? "/en" : `/en${route.path}`;
  const titreEn = traduire(route.title);
  const descEn = traduire(route.description);
  const ogTitleEn = traduire(route.ogTitle) ?? titreEn;
  const ogDescEn = traduire(route.ogDescription) ?? descEn;

  return {
    ...route,
    path: cheminEn,
    title: titreEn,
    description: descEn,
    keywords: traduire(route.keywords),
    ogTitle: ogTitleEn,
    ogDescription: ogDescEn,
    lang: "en",
    fr: route.path,
    bodyHtml: `<main lang="en">
      <h1>${escSeo(titreEn)}</h1>
      <p>${escSeo(descEn || "")}</p>
      <p><strong>Pricing:</strong> 25 % (excl. VAT) of the net received by the owner, all in — no subscription, no lock-in. Guaranteed rent: 0 % commission, fixed monthly income.</p>
      <p><strong>Areas served:</strong> Avignon, Villeneuve-lès-Avignon, Les Angles.</p>
      <p><strong>Contact:</strong> +33 7 83 19 83 41 · contact@chevalier-conciergerie.com</p>
      <ul>
        <li><a href="/en">Home (English)</a></li>
        <li><a href="/en/conciergerie">Property management</a></li>
        <li><a href="/en/sous-location">Guaranteed rent</a></li>
        <li><a href="/en/franchise">Become a franchisee</a></li>
        <li><a href="/en/contact">Contact</a></li>
      </ul>
      <p><em>Version française : <a href="${escSeo(route.path)}">${escSeo(route.path)}</a></em></p>
    </main>`,
    // JSON-LD gardé en français : le SPA affiche les FAQ françaises tant que les pages
    // intérieures ne sont pas traduites. À traduire dans la phase 2, en même temps que
    // les <Helmet> des pages intérieures.
    jsonLd: route.jsonLd,
  };
}

function escSeo(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Les routes /en/* couvertes en priorité : celles qui vendent. Les mentions légales et
// l'estimation restent hors bilingue pour l'instant — leurs contenus techniques attendent
// la phase 2 (traduction des <Helmet> des pages intérieures).
const ROUTES_EN = STATIC_ROUTES
  .filter((r) => !["/cgv", "/mentions-legales", "/politique-confidentialite", "/estimation-sous-location"].includes(r.path))
  .map(traduireRoute)
  .concat(LOCAL_PAGES.map(traduireRoute));

export const ROUTES = [
  ...STATIC_ROUTES.map((r) => ({ ...r, lang: "fr" })),
  ...LOCAL_PAGES.map((r) => ({ ...r, lang: "fr" })),
  ...ROUTES_EN,
];

// Quand la route /proprietes/:slug existera à nouveau dans src/App.tsx :
//   export const ROUTES = [...STATIC_ROUTES, ...readProperties()];
void readProperties;
