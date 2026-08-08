import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const SITE = "https://chevalier-conciergerie.com";

// Les pages fixes. `title` / `description` doivent rester alignés sur le <Helmet>
// de la page correspondante dans src/pages/.
const STATIC_ROUTES = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
    title: "Conciergerie Avignon | Gestion Locative & Sous-location | Chevalier Conciergerie",
    description:
      "Conciergerie Airbnb à Avignon, Villeneuve-lès-Avignon et Les Angles. Gestion locative saisonnière haut de gamme et sous-location professionnelle avec loyer garanti. Devis gratuit.",
    keywords:
      "conciergerie Avignon, gestion locative Avignon, Airbnb Avignon, location saisonnière Avignon, sous-location Avignon, conciergerie Villeneuve-lès-Avignon, gestion Airbnb",
    ogTitle: "Conciergerie Avignon | Gestion Locative Saisonnière | Chevalier Conciergerie",
    ogDescription:
      "Conciergerie Airbnb haut de gamme à Avignon. Gestion locative saisonnière et sous-location avec loyer garanti. Consultation gratuite.",
  },
  {
    path: "/conciergerie",
    changefreq: "weekly",
    priority: "0.9",
    title: "Conciergerie Airbnb Avignon | Gestion Location Saisonnière | Chevalier",
    description:
      "Conciergerie Airbnb premium à Avignon et Villeneuve-lès-Avignon. Accueil voyageurs, ménage professionnel, gestion des annonces. Commission sur-mesure selon votre bien. Devis gratuit.",
    keywords:
      "conciergerie Airbnb Avignon, gestion location saisonnière Avignon, accueil voyageurs Avignon, ménage Airbnb Avignon",
    ogTitle: "Conciergerie Airbnb Avignon | Gestion Location Saisonnière",
    ogDescription:
      "Service de conciergerie premium pour locations Airbnb à Avignon. Gestion complète de votre bien.",
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
  },
  {
    path: "/a-propos",
    changefreq: "monthly",
    priority: "0.8",
    title: "À propos | Chevalier Conciergerie — Conciergerie & gestion locative à Avignon",
    description:
      "Découvrez Chevalier Conciergerie : une conciergerie indépendante et locale à Avignon, fondée par Victor Chevalier, spécialiste de la location courte durée et de la sous-location avec loyer garanti.",
    keywords: "Victor Chevalier, conciergerie indépendante Avignon, qui sommes-nous conciergerie Avignon",
  },
  {
    path: "/partenaires",
    changefreq: "monthly",
    priority: "0.7",
    title: "Nos Partenaires | Chevalier Conciergerie Avignon",
    description:
      "Découvrez nos partenaires de confiance à Avignon. Un réseau soigneusement sélectionné pour une expérience d'exception.",
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
  {
    path: "/conciergerie-avignon",
    changefreq: "monthly",
    priority: "0.9",
    title: "Conciergerie Avignon Intra-Muros | Gestion Airbnb Locale | Chevalier",
    description:
      "Conciergerie Airbnb premium à Avignon intra-muros. Gestion complète de votre location saisonnière : accueil voyageurs, ménage professionnel, optimisation des revenus. Devis gratuit.",
    keywords: "conciergerie Avignon, conciergerie intra-muros Avignon, gestion Airbnb Avignon",
  },
  {
    path: "/conciergerie-villeneuve-les-avignon",
    changefreq: "monthly",
    priority: "0.8",
    title: "Conciergerie Airbnb Villeneuve-lès-Avignon | Gestion Locative | Chevalier",
    description:
      "Conciergerie Airbnb à Villeneuve-lès-Avignon. Gestion complète de votre location saisonnière face à Avignon. Accueil voyageurs, ménage pro, revenus optimisés. Devis gratuit.",
    keywords: "conciergerie Villeneuve-lès-Avignon, gestion Airbnb Villeneuve, location saisonnière Gard",
  },
  {
    path: "/conciergerie-les-angles",
    changefreq: "monthly",
    priority: "0.8",
    title: "Conciergerie Airbnb Les Angles | Gestion Location Saisonnière | Chevalier",
    description:
      "Conciergerie Airbnb aux Angles, près d'Avignon. Gestion locative complète pour propriétaires : accueil voyageurs, ménage professionnel, revenus optimisés. Estimation gratuite.",
    keywords: "conciergerie Les Angles, gestion Airbnb Les Angles, location saisonnière Les Angles",
  },
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

export const ROUTES = [...STATIC_ROUTES, ...readProperties()];
