/*
  Contenus de l'accueil en une seule page. Les textes sont ceux validés par
  Victor sur la maquette (septembre 2026) ; les FAQ et les avis viennent de
  src/data/faq.ts et src/data/avis.ts, partagés avec les pages intérieures.
*/

/* Les rubriques du menu : toutes des ancres de l'accueil. */
export const RUBRIQUES = [
  { libelle: "Accueil", ancre: "accueil" },
  { libelle: "Qui sommes-nous", ancre: "qui-sommes-nous" },
  { libelle: "Conciergerie", ancre: "notre-service" },
  { libelle: "Sous-location", ancre: "sous-location" },
  { libelle: "Blog", ancre: "blog" },
  { libelle: "Témoignages", ancre: "avis" },
  { libelle: "Contact", ancre: "contact" },
] as const;

export const TELEPHONE = { affiche: "07 83 19 83 41", international: "+33 7 83 19 83 41", lien: "tel:+33783198341" };
export const COURRIEL = { affiche: "contact@chevalier-conciergerie.com", lien: "mailto:contact@chevalier-conciergerie.com" };

/* Logos officiels fournis par Victor, en couleurs (public/accueil/reseau-*.png). */
export const RESEAUX = [
  { nom: "Instagram", lien: "https://www.instagram.com/chevalier_conciergerie/", logo: "/accueil/reseau-instagram.png" },
  { nom: "LinkedIn", lien: "https://www.linkedin.com/in/chevalier-conciergerie-7559b03a4/", logo: "/accueil/reseau-linkedin.png" },
  { nom: "Facebook", lien: "https://www.facebook.com/share/1GCBBTtP2R/", logo: "/accueil/reseau-facebook.png" },
];

/* Premier paragraphe de l'article de TV Sud Magazine du 23 juillet 2026. */
export const TEXTE_TV_SUD =
  "À seulement 20 ans, Victor Chevalier fait partie de cette nouvelle génération d'entrepreneurs qui osent concrétiser leurs ambitions. Originaire d'Avignon, il a fondé Chevalier Conciergerie, dans laquelle il propose ses services de conciergerie et de sous-location.";

export const CITATION_FONDATEUR =
  "« Mon premier investissement immobilier à 19 ans a été le déclic. En explorant le marché avignonnais, j'ai rapidement compris le potentiel extraordinaire de la location courte durée dans notre belle région »";

export interface BlocService {
  badge: string;
  ligne1: string;
  accent: string;
  image: string;
  largeur: number;
  hauteur: number;
  alt: string;
  texte: string;
  puces: string[];
}

export const BLOCS_SERVICES: BlocService[] = [
  {
    badge: "Le calendrier",
    ligne1: "Votre calendrier rempli,",
    accent: "vos nuits vacantes comblées.",
    image: "/accueil/calendrier-multicanal.webp",
    largeur: 1040,
    hauteur: 780,
    alt: "Calendrier Chevalier PMS : réservations Airbnb et Booking synchronisées",
    texte:
      "Notre travail, c'est de combler vos nuits vacantes. Airbnb, Booking et la réservation directe sont synchronisés dans les deux sens dans Chevalier PMS, notre propre logiciel.",
    puces: [
      "Airbnb, Booking et réservation directe synchronisés en temps réel",
      "Les doubles réservations deviennent impossibles",
      "Chaque canal travaille à remplir votre planning",
    ],
  },
  {
    badge: "La réservation directe",
    ligne1: "Votre propre site,",
    accent: "0 % de commission.",
    image: "/accueil/reservation-directe.webp",
    largeur: 1167,
    hauteur: 875,
    alt: "Site de réservation en direct Chevalier PMS",
    texte:
      "Chaque logement dispose aussi de son propre site de réservation en direct, sans intermédiaire, synchronisé avec Airbnb et Booking.",
    puces: [
      "Aucun intermédiaire, aucune commission prélevée",
      "Caution et paiement en ligne sécurisés",
      "Synchronisé avec Airbnb et Booking, zéro double réservation",
    ],
  },
  {
    badge: "La tarification",
    ligne1: "Vos prix ajustés,",
    accent: "par de vraies personnes.",
    image: "/accueil/tarification.webp",
    largeur: 1152,
    hauteur: 864,
    alt: "Tarification dynamique par canal dans Chevalier PMS",
    texte:
      "Nous sommes partenaires de J'Affiche Complet, agence de revenue management. Pas d'algorithme qui grignote deux euros par-ci par-là chaque jour sans effet réel : une vraie équipe humaine s'en occupe.",
    puces: [
      "Partenariat avec J'Affiche Complet, agence de revenue management",
      "Prix, promotions et durées minimales revus chaque semaine",
      "Aucun algorithme automatique à la place d'une vraie équipe",
    ],
  },
  {
    badge: "Le ménage",
    ligne1: "Le ménage géré,",
    accent: "sans que vous y pensiez.",
    image: "/accueil/gestion-menages.webp",
    largeur: 1189,
    hauteur: 892,
    alt: "Suivi des ménages dans Chevalier PMS",
    texte:
      "Chaque réservation déclenche son ménage, sa blanchisserie et le réassort des consommables : l'équipe est prévenue sur WhatsApp au bon moment.",
    puces: [
      "Ménage, blanchisserie et consommables à chaque réservation",
      "L'équipe prévenue sur WhatsApp au bon moment",
      "Une vidéo prise à chaque passage, pour un suivi optimal",
    ],
  },
  {
    badge: "Les voyageurs",
    ligne1: "Vos voyageurs,",
    accent: "jour et nuit.",
    image: "/accueil/reponses-voyageurs.webp",
    largeur: 1550,
    hauteur: 734,
    alt: "Messagerie voyageurs dans Chevalier PMS — 121 conversations",
    texte:
      "121 conversations suivies dans une seule boîte, Airbnb, Booking et WhatsApp réunis — une réponse à toute heure.",
    puces: [
      "121 conversations suivies dans une seule boîte",
      "Airbnb, Booking et WhatsApp réunis",
      "Réponse aux voyageurs 7 jours sur 7, 24 heures sur 24",
    ],
  },
  {
    badge: "Le tableau de bord",
    ligne1: "Vos revenus,",
    accent: "chaque mois, en clair.",
    image: "/accueil/rapport-mensuel.webp",
    largeur: 808,
    hauteur: 606,
    alt: "Rapport mensuel propriétaire dans Chevalier PMS : canaux, occupation, chiffre d'affaires",
    texte:
      "Chaque propriétaire reçoit un rapport mensuel détaillé de son logement, et garde un accès direct à Chevalier PMS pour tout suivre lui-même, à tout moment.",
    puces: [
      "Rapport mensuel détaillé, logement par logement",
      "Canaux, occupation et chiffre d'affaires au même endroit",
      "Accès direct à Chevalier PMS, à tout moment",
    ],
  },
];

/*
  Une fois détourés au plus juste, les trois logos n'ont plus rien de
  comparable : le bélo d'Airbnb est presque carré, Booking.com est six fois
  plus large que haut. Chacun reçoit la hauteur qui lui donne le même poids.
*/
export const LOGOS_PLATEFORMES = [
  { fichier: "/accueil/logo-airbnb.png", nom: "Airbnb", hauteur: "min(10vw, 92px)" },
  { fichier: "/accueil/logo-booking.png", nom: "Booking.com", hauteur: "min(5vw, 44px)" },
  { fichier: "/accueil/logo-abritel.png", nom: "Abritel", hauteur: "min(5.8vw, 52px)" },
];

export const AVANTAGES_SOUS_LOCATION = [
  { nom: "Loyer garanti", texte: "Un revenu fixe chaque mois, versé dès le premier jour du contrat, quelle que soit l'occupation." },
  { nom: "Zéro risque", texte: "Nous assumons les risques locatifs : impayés, vacance, dégradations." },
  { nom: "Zéro gestion", texte: "Ménage, maintenance, accueil des voyageurs : tout est pris en charge, de A à Z." },
  { nom: "Valorisation", texte: "Votre bien est entretenu aux standards hôteliers, ce qui préserve sa valeur." },
];

export const ETAPES_SOUS_LOCATION = [
  { numero: "01", nom: "Estimation gratuite", texte: "Nous évaluons votre bien et vous proposons un loyer garanti mensuel." },
  { numero: "02", nom: "Signature du bail", texte: "Un contrat de sous-location professionnel, conforme à la législation." },
  { numero: "03", nom: "Mise en location", texte: "Nous préparons et photographions le logement, puis créons les annonces." },
  { numero: "04", nom: "Revenus garantis", texte: "Votre loyer vous est versé chaque mois par virement, sans exception." },
];

/*
  Couvertures des articles sur l'accueil, choisies avec Victor : ses vraies
  photos (le Pont au drone, la tour Philippe le Bel) et ses captures de
  logiciel. Clé = slug de l'article.
*/
export const COUVERTURES_BLOG: Record<string, string> = {
  "tarif-conciergerie-airbnb": "/accueil/tarification.webp",
  "calculer-rentabilite-reelle-location-courte-duree": "/accueil/rapport-mensuel.webp",
  "conciergerie-ou-sous-location-avignon": "/accueil/tour-philippe-le-bel.webp",
  "classement-meuble-de-tourisme": "/accueil/calendrier-multicanal.webp",
  "declarer-location-saisonniere-avignon": "/accueil/hero-pont-avignon.webp",
};

export const LEGAL = {
  raisonSociale: "CHEVALIER LOCABUSINESS",
  forme: "SAS",
  siret: "995 268 802 00015",
  tva: "FR45995268802",
  rcs: "Nîmes",
  ape: "6820A",
  adresse: "5 Lotissement Les Cades, 30400 Villeneuve-lès-Avignon, France",
};
