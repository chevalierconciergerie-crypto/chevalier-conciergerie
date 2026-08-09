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
function readFaq(file, qKey, aKey) {
  const src = readFileSync(path.join(root, file), "utf8");
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

const CONCIERGERIE_FAQ = readFaq("src/pages/Conciergerie.tsx", "q", "a");
const SOUSLOCATION_FAQ = readFaq("src/pages/SousLocation.tsx", "question", "answer");
const TARIFS_FAQ = readFaq("src/pages/Tarifs.tsx", "question", "answer");

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

      <h2>Le marché de la location courte durée à ${p.city}</h2>
      <p>Prix moyen constaté : ${p.avgNightPrice} la nuit. Taux d'occupation moyen :
      ${p.occupancyRate}. Revenu mensuel moyen : ${p.avgMonthlyRevenue}.</p>

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
    bodyHtml: `<main>
      <h1>Votre conciergerie à Avignon</h1>
      <p>Gestion locative saisonnière et revenus garantis, sans contrainte. Chevalier
      Conciergerie intervient à Avignon, Villeneuve-lès-Avignon, Les Angles,
      Aix-en-Provence et Montpellier. Réponse sous 24 h, sans engagement.</p>

      <h2>Deux formules</h2>
      <p>Que vous souhaitiez déléguer la gestion ou sécuriser vos revenus, nous avons la
      solution adaptée.</p>

      <h3><a href="/conciergerie">Conciergerie</a></h3>
      <p>Service complet de gestion locative. Accueil voyageurs, ménage professionnel,
      optimisation des revenus. Commission sur-mesure, adaptée à chaque bien.</p>

      <h3><a href="/sous-location">Sous-location</a></h3>
      <p>Loyer garanti chaque mois, zéro vacance locative. Aucune gestion, aucun risque.</p>

      <p>Vous hésitez entre les deux ? Nous les comparons chiffre en main dans
      <a href="/journal/conciergerie-ou-sous-location-avignon">notre article dédié</a>.</p>

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
        <li><a href="/conciergerie-avignon">Conciergerie Airbnb à Avignon</a></li>
        <li><a href="/conciergerie-villeneuve-les-avignon">Conciergerie à Villeneuve-lès-Avignon</a></li>
        <li><a href="/conciergerie-les-angles">Conciergerie aux Angles</a></li>
        <li><a href="/journal/declarer-location-saisonniere-avignon">Déclarer sa location saisonnière à Avignon : les 3 démarches obligatoires</a></li>
        <li><a href="/journal/calculer-rentabilite-reelle-location-courte-duree">Calculer la rentabilité réelle de sa location courte durée</a></li>
        <li><a href="/journal">Journal : tous nos guides</a></li>
        <li><a href="/contact">Nous contacter — estimation gratuite sous 24 h</a></li>
      </ul>
    </main>`,
  },
  {
    path: "/conciergerie",
    changefreq: "weekly",
    priority: "0.9",
    title: "Conciergerie Airbnb Avignon | Gestion Location Saisonnière | Chevalier",
    description:
      "Conciergerie Airbnb à Avignon et Villeneuve-lès-Avignon : accueil voyageurs, ménage, linge, annonces, tarification. Commission sur-mesure, sans engagement. Estimation gratuite sous 24 h.",
    keywords:
      "conciergerie Airbnb Avignon, gestion location saisonnière Avignon, accueil voyageurs Avignon, ménage Airbnb Avignon",
    ogTitle: "Conciergerie Airbnb Avignon | Gestion Location Saisonnière",
    ogDescription:
      "Conciergerie Airbnb à Avignon : gestion complète de votre location saisonnière, commission sur-mesure.",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Conciergerie</nav>
      <h1>Nous tenons vos appartements à Avignon, intra-muros.</h1>
      <p>Accueil des voyageurs, ménage, linge, annonces, tarification. Neuf appartements
      à Avignon, Villeneuve-lès-Avignon et Les Angles. Vous n'y touchez plus.</p>

      <h2>Service intégral — formule complète</h2>
      <p>Gestion complète de votre bien, de A à Z. Commission sur-mesure adaptée à chaque
      bien. Aucun frais caché, aucun engagement. Le ménage professionnel est payé par le
      voyageur.</p>

      <h3>Tout est inclus</h3>
      <ul>
        <li>Rencontre et visite du bien</li>
        <li>Création et gestion de l'annonce</li>
        <li>Optimisation de l'annonce et des prix</li>
        <li>Photos professionnelles</li>
        <li>Conseils décoration et travaux</li>
        <li>Gestion des messages</li>
        <li>Gestion des réservations</li>
        <li>Rédaction du contrat de location</li>
        <li>Check-in et check-out</li>
        <li>Automatisation de la boîte à clés</li>
        <li>Gestion des consommables</li>
        <li>Ménage professionnel</li>
      </ul>

      <h2>Un exemple chiffré</h2>
      <p>Un studio de 30 m² en centre-ville d'Avignon, à 5 minutes du Palais des Papes,
      loué 9 nuits en juillet pendant le Festival d'Avignon à 110 € la nuit, produit
      990 € bruts. Après la commission Airbnb (15 %, soit 149 €) et notre commission
      (168 € dans cet exemple), le propriétaire reçoit 673 € nets.</p>

      <h2>Ce qui a changé à Avignon au 1er janvier 2026</h2>
      <p>La ville a instauré un régime d'autorisation de changement d'usage et rendu
      l'enregistrement obligatoire pour tout meublé de tourisme. Elle motive la décision
      par ses propres chiffres : près de 4 300 logements en location saisonnière en 2023,
      dont 2 400 en intra-muros, soit un doublement en huit ans.</p>
      <ul>
        <li><strong>Enregistrement</strong> — obligatoire pour tout meublé de tourisme,
        sans exception. Le numéro doit figurer sur chaque annonce : les plateformes le
        contrôlent et retirent celles qui n'en ont pas.</li>
        <li><strong>Changement d'usage</strong> — une autorisation temporaire est requise
        pour tout logement qui n'est pas une résidence principale, sur l'ensemble du
        territoire communal, pour les particuliers comme pour les sociétés.</li>
        <li><strong>90 jours</strong> — le plafond annuel de location d'une résidence
        principale, abaissé de 120 à 90 jours par la ville.</li>
        <li><strong>Taxe de séjour</strong> — collectée auprès du voyageur et reversée à
        la ville avant le 15 janvier de l'année suivante. Ce n'est jamais un revenu.</li>
      </ul>
      <p>Nous vérifions ce qui s'applique à votre bien et constituons le dossier avant
      toute mise en ligne. <a href="/journal/declarer-location-saisonniere-avignon">Le
      détail des trois démarches</a>.</p>

      <h2>Questions fréquentes</h2>
      ${faqHtml(CONCIERGERIE_FAQ)}

      <p><a href="/contact">Prendre rendez-vous</a> — estimation gratuite sous 24 h ·
      <a href="/sous-location">Voir aussi la sous-location avec loyer garanti</a> ·
      <a href="/journal/conciergerie-ou-sous-location-avignon">Comparer les deux
      formules</a></p>
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
    title: "Sous-location Avignon | Loyer Garanti & Zéro Vacance | Chevalier",
    description:
      "Sous-location professionnelle à Avignon avec loyer garanti chaque mois. Zéro vacance locative, zéro gestion. Estimation gratuite de votre bien.",
    keywords:
      "sous-location Avignon, loyer garanti Avignon, gestion locative Avignon, location meublée Avignon",
    ogTitle: "Sous-location Avignon | Loyer Garanti Chaque Mois",
    ogDescription:
      "Sous-location professionnelle à Avignon. Loyer garanti, zéro vacance, zéro risque.",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Sous-location</nav>
      <h1>Un loyer garanti à Avignon</h1>
      <p>Nous louons votre bien à notre nom et vous versons un loyer fixe chaque mois.
      Zéro risque, zéro vacance, zéro gestion.</p>

      <h2>Pourquoi la sous-location ?</h2>
      <ul>
        <li><strong>Loyer garanti</strong> — un revenu fixe chaque mois, versé dès le
        premier jour du contrat, quelle que soit l'occupation.</li>
        <li><strong>Zéro risque</strong> — nous assumons tous les risques locatifs :
        impayés, vacance, dégradations.</li>
        <li><strong>Zéro gestion</strong> — nous gérons tout de A à Z.</li>
        <li><strong>Valorisation</strong> — votre bien est entretenu aux standards
        hôteliers, ce qui préserve sa valeur.</li>
      </ul>

      <h3>Tout est inclus</h3>
      <ul>
        <li>Loyer fixe versé chaque mois</li>
        <li>Aucune vacance locative</li>
        <li>Gestion 100 % déléguée</li>
        <li>Entretien régulier du bien</li>
        <li>État des lieux d'entrée et de sortie</li>
        <li>Contrat juridiquement sécurisé</li>
        <li>Ménage professionnel</li>
        <li>Accueil des voyageurs</li>
        <li>Maintenance et petites réparations</li>
      </ul>

      <h2>Comment ça marche</h2>
      <ol>
        <li><strong>Estimation gratuite</strong> — nous évaluons votre bien et vous
        proposons un loyer garanti mensuel basé sur son potentiel locatif.</li>
        <li><strong>Signature du bail</strong> — contrat de sous-location professionnel,
        conforme à la législation française.</li>
        <li><strong>Mise en location</strong> — nous préparons et photographions votre
        bien, puis créons les annonces sur toutes les plateformes.</li>
        <li><strong>Revenus garantis</strong> — vous recevez votre loyer chaque mois par
        virement, sans exception ni retard.</li>
      </ol>

      <h2>Sous-location contre location classique</h2>
      <p>En location classique, vous cherchez des locataires, vous supportez le risque
      d'impayés, la vacance locative, la gestion des litiges et l'entretien, pour des
      revenus variables. En sous-location professionnelle, vous avez un locataire unique
      — nous — un loyer garanti à 100 %, aucune vacance, aucun litige, l'entretien inclus
      et des revenus fixes et prévisibles.</p>

      <h2>Questions fréquentes</h2>
      ${faqHtml(SOUSLOCATION_FAQ)}

      <p><a href="/estimation-sous-location">Obtenir mon estimation gratuite</a> ·
      <a href="/conciergerie">Voir aussi la formule conciergerie</a></p>
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
  /*
    Page Tarifs. Le concurrent le mieux classé sur « conciergerie Avignon » en
    a une, en entrée de menu — mais sans y écrire le moindre chiffre. Celle-ci
    donne le taux : sur une requête de comparaison de prix, la page qui répond
    à la question posée est la seule qui puisse la gagner.

    Priorité 0.9 comme les deux pages de service : c'est une page de conversion,
    pas une page annexe. Quelqu'un qui cherche un tarif est plus avancé dans sa
    décision que quelqu'un qui découvre le métier.
  */
  {
    path: "/tarifs",
    changefreq: "monthly",
    priority: "0.9",
    title: "Tarifs conciergerie Avignon | 20 % HT tout compris | Chevalier Conciergerie",
    description:
      "Tarifs de conciergerie à Avignon : 20 % HT des revenus encaissés, tout compris, sans abonnement ni engagement. Sous-location : 0 % de commission, loyer fixe chaque mois.",
    keywords:
      "tarif conciergerie Avignon, prix conciergerie Avignon, commission conciergerie Airbnb, coût gestion locative Avignon, tarif sous-location Avignon",
    bodyHtml: `<main>
      <nav><a href="/">Accueil</a> › Tarifs</nav>
      <h1>Tarifs de conciergerie à Avignon</h1>
      <p>Un seul taux, annoncé avant tout rendez-vous. Pas d'abonnement, pas de frais
      de dossier, pas d'engagement de durée.</p>

      <h2>Conciergerie : 20 % HT des revenus encaissés</h2>
      <p>Soit 24 % TTC. Ce taux couvre l'intégralité du service à Avignon,
      Villeneuve-lès-Avignon et Les Angles :</p>
      <ul>
        <li>Annonces créées et diffusées sur Airbnb, Booking et Abritel</li>
        <li>Prix ajustés en continu selon la saison et les événements</li>
        <li>Échanges avec les voyageurs, remise des clés, assistance 7 j/7</li>
        <li>Ménage et linge d'hôtel entre chaque séjour</li>
        <li>Suivi des encaissements et récapitulatif mensuel</li>
      </ul>
      <p>Le ménage est refacturé au voyageur, pas au propriétaire. La taxe de séjour est
      collectée auprès du voyageur puis reversée à la commune : elle ne passe jamais par
      vos revenus.</p>

      <h2>Sous-location : 0 % de commission</h2>
      <p>Nous louons votre bien à l'année à notre nom et vous versons le même loyer
      chaque mois, saison creuse comprise. Vous ne payez aucune commission : nos revenus
      viennent de l'exploitation du logement. Le montant dépend du logement, du quartier
      et de la durée du bail ; il est fixé avant signature et ne bouge plus.</p>

      <h2>Questions fréquentes</h2>
      ${faqHtml(TARIFS_FAQ)}

      <p><a href="/estimation-sous-location">Estimer les revenus de mon logement</a> ·
      <a href="/conciergerie">Le détail de la formule conciergerie</a> ·
      <a href="/sous-location">Le détail de la sous-location</a></p>
    </main>`,
    jsonLd: [
      breadcrumb({ name: "Tarifs", path: "/tarifs" }),
      faqPage(TARIFS_FAQ),
    ],
  },
  // /logements et /reservation sont retirés le temps que le site de réservation soit
  // opérationnel. Les laisser dans le sitemap enverrait Google sur deux 404.
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
      <h1>Contacter Chevalier Conciergerie</h1>
      <p>Consultation gratuite et sans engagement pour votre projet de gestion locative
      ou de sous-location à Avignon. Réponse sous 24 h.</p>

      <h2>Nous joindre</h2>
      <ul>
        <li>Téléphone : <a href="tel:+33783198341">+33 7 83 19 83 41</a></li>
        <li>WhatsApp : <a href="https://wa.me/33783198341">+33 7 83 19 83 41</a></li>
        <li>Email : <a href="mailto:contact@chevalier-conciergerie.com">contact@chevalier-conciergerie.com</a></li>
        <li>Adresse : 5 Lotissement Les Cades, 30400 Villeneuve-lès-Avignon, France</li>
      </ul>

      <h2>Zone d'intervention</h2>
      <p>Avignon, Villeneuve-lès-Avignon, Les Angles et leurs environs immédiats.</p>

      <p><a href="/conciergerie">La formule conciergerie</a> ·
      <a href="/sous-location">La sous-location avec loyer garanti</a> ·
      <a href="/estimation-sous-location">Estimer mon loyer garanti</a></p>
    </main>`,
    jsonLd: [breadcrumb({ name: "Contact", path: "/contact" })],
  },
  {
    path: "/a-propos",
    changefreq: "monthly",
    priority: "0.8",
    title: "À propos | Chevalier Conciergerie — Conciergerie & gestion locative à Avignon",
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
    path: "/partenaires",
    changefreq: "monthly",
    priority: "0.7",
    title: "Nos Partenaires | Chevalier Conciergerie Avignon",
    description:
      "Les partenaires locaux avec qui nous travaillons à Avignon et alentours pour l'entretien et la valorisation des biens que nous gérons.",
    keywords: "partenaires conciergerie Avignon, prestataires location saisonnière Avignon",
  },
  {
    path: "/estimation-sous-location",
    changefreq: "monthly",
    priority: "0.7",
    title: "Estimation Sous-Location | Chevalier Conciergerie",
    description:
      "Obtenez une estimation gratuite pour la sous-location de votre bien à Avignon. Formulaire simple et rapide.",
    keywords: "estimation sous-location Avignon, simulation loyer garanti Avignon",
  },
  // Les trois pages locales sont générées plus bas depuis LOCAL_PAGES : leur titre,
  // leur description et leur contenu sont lus directement dans les fichiers
  // src/pages/Conciergerie*.tsx, ce qui les empêche de diverger de la page affichée.
  {
    path: "/cgv",
    changefreq: "yearly",
    priority: "0.3",
    title: "Conditions Générales de Vente | Chevalier Conciergerie",
    description:
      "Conditions Générales de Vente de Chevalier Conciergerie (CHEVALIER LOCABUSINESS) — conciergerie et gestion locative courte durée à Avignon.",
  },
  {
    path: "/mentions-legales",
    changefreq: "yearly",
    priority: "0.3",
    title: "Mentions Légales | Chevalier Conciergerie",
    description:
      "Mentions légales de Chevalier Conciergerie - CHEVALIER LOCABUSINESS, conciergerie et gestion locative à Avignon.",
  },
  {
    path: "/politique-confidentialite",
    changefreq: "yearly",
    priority: "0.3",
    title: "Politique de Confidentialité | Chevalier Conciergerie",
    description:
      "Politique de confidentialité de Chevalier Conciergerie - Protection de vos données personnelles conformément au RGPD.",
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

export const ROUTES = [...STATIC_ROUTES, ...LOCAL_PAGES];

// Quand la route /proprietes/:slug existera à nouveau dans src/App.tsx :
//   export const ROUTES = [...STATIC_ROUTES, ...readProperties()];
void readProperties;
