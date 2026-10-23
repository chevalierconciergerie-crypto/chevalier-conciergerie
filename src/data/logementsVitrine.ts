/*
  Les logements mis en avant sur l'accueil, sous les avis, et leur fiche
  complète (/logements/<slug>) : les plus beaux appartements de la
  conciergerie, réservables en direct.

  Le contenu du Vernet reprend son annonce Airbnb (octobre 2026) : photos
  par pièce, description, équipements, couchages, notes, règlement. Les
  photos sont dans public/logements/<slug>/photos (1600 px, plein écran) et
  /vignettes (800 px, grilles), sous le même nom de fichier.

  Pour ajouter un logement : une entrée de plus ici, ses photos dans
  public/logements/<slug>/, sa route dans scripts/seo-routes.mjs.
  `reservation` est la page de réservation directe du logement dans
  Chevalier PMS ; tant qu'elle est vide, le bouton mène à /contact.
*/
export interface Photo {
  fichier: string;
  largeur: number;
  hauteur: number;
}

export interface Piece {
  piece: string;
  equipements?: string[];
  photos: Photo[];
}

export interface LogementVitrine {
  slug: string;
  nom: string;
  lieu: string;
  accroche: string;
  details: string[];
  /** Note publique de l'annonce, telle qu'affichée sur Airbnb. */
  note: { valeur: string; avis: number; categories: { nom: string; valeur: string }[] };
  /** Photo de la carte sur l'accueil (recadrée en 4:5). */
  photo: { src: string; largeur: number; hauteur: number; alt: string };
  /** Les cinq photos de la mosaïque en tête de fiche, la première en grand. */
  mosaique: string[];
  pieces: Piece[];
  couchages: { piece: string; lit: string; photo: string }[];
  description: { intro: string[]; titre: string; texte: string; listes: { titre: string; elements: string[] }[]; fin: string[] };
  equipements: { categorie: string; elements: string[] }[];
  nonInclus: string[];
  arrivee: string;
  depart: string;
  /** Conditions d'annulation, en une phrase (le détail est dans /cgv#location). */
  annulation: string;
  /** Numéro d'enregistrement en mairie, obligatoire sur toute annonce ; affiché dès qu'il est renseigné. */
  numeroEnregistrement: string;
  reglement: string[];
  securite: string[];
  quartier: string[];
  reservation: string;
}

export const dossierLogement = (slug: string) => `/logements/${slug}`;
export const photoPleine = (slug: string, f: string) => `/logements/${slug}/photos/${f}.jpg`;
export const vignette = (slug: string, f: string) => `/logements/${slug}/vignettes/${f}.jpg`;

export const LOGEMENTS_VITRINE: LogementVitrine[] = [
  {
    slug: "le-vernet",
    nom: "Le Vernet",
    lieu: "Avignon intra-muros",
    accroche:
      "Un T3 rénové au deuxième étage, dans une rue calme du centre historique : hauts plafonds, moulures, cheminée en marbre et fenêtres sur une cour intérieure.",
    details: ["4 voyageurs", "2 chambres", "2 lits", "1 salle de bain"],
    note: {
      valeur: "4,77",
      avis: 13,
      categories: [
        { nom: "Propreté", valeur: "4,9" },
        { nom: "Précision", valeur: "4,9" },
        { nom: "Arrivée", valeur: "4,8" },
        { nom: "Communication", valeur: "4,7" },
        { nom: "Emplacement", valeur: "5,0" },
        { nom: "Qualité-prix", valeur: "4,8" },
      ],
    },
    photo: {
      src: "/logements/le-vernet/photo-table.jpg",
      largeur: 720,
      hauteur: 900,
      alt: "Le séjour du Vernet : table dressée devant une fenêtre ouverte sur la cour",
    },
    mosaique: ["salon-6", "salon-4", "chambre1-3", "chambre2-4", "salon-2"],
    pieces: [
      {
        piece: "Salon",
        equipements: ["Canapé-lit", "Livres et de quoi lire", "Système audio", "Chauffage", "Climatisation"],
        photos: [
          { fichier: "salon-1", largeur: 1200, hauteur: 1600 },
          { fichier: "salon-2", largeur: 1600, hauteur: 1200 },
          { fichier: "salon-3", largeur: 1200, hauteur: 1600 },
          { fichier: "salon-4", largeur: 1600, hauteur: 1200 },
          { fichier: "salon-5", largeur: 1600, hauteur: 1200 },
          { fichier: "salon-6", largeur: 1600, hauteur: 1200 },
        ],
      },
      {
        piece: "Cuisine",
        equipements: ["Plaques de cuisson", "Four", "Lave-vaisselle", "Réfrigérateur", "Congélateur", "Cafetière", "Café", "Bouilloire électrique", "Vaisselle et couverts", "Verres à vin", "Tout le nécessaire pour cuisiner"],
        photos: [
          { fichier: "cuisine-1", largeur: 1600, hauteur: 1200 },
          { fichier: "cuisine-2", largeur: 1200, hauteur: 1600 },
          { fichier: "cuisine-3", largeur: 1600, hauteur: 1200 },
          { fichier: "cuisine-4", largeur: 1200, hauteur: 1600 },
          { fichier: "cuisine-5", largeur: 1200, hauteur: 1600 },
          { fichier: "cuisine-6", largeur: 1200, hauteur: 1600 },
          { fichier: "cuisine-7", largeur: 1600, hauteur: 1200 },
        ],
      },
      {
        piece: "Espace repas",
        equipements: ["Table à manger", "Verres à vin", "Chauffage", "Climatisation"],
        photos: [
          { fichier: "repas-1", largeur: 1600, hauteur: 1067 },
        ],
      },
      {
        piece: "Chambre 1",
        equipements: ["Lit queen size", "Linge de lit", "Oreillers et couvertures supplémentaires", "Rideaux occultants", "Rangements pour les vêtements", "Cintres", "Fer à repasser", "Chauffage", "Climatisation"],
        photos: [
          { fichier: "chambre1-1", largeur: 1600, hauteur: 1200 },
          { fichier: "chambre1-2", largeur: 1600, hauteur: 1200 },
          { fichier: "chambre1-3", largeur: 1600, hauteur: 1200 },
          { fichier: "chambre1-4", largeur: 1600, hauteur: 1200 },
          { fichier: "chambre1-5", largeur: 1600, hauteur: 1200 },
          { fichier: "chambre1-6", largeur: 1600, hauteur: 1200 },
          { fichier: "chambre1-7", largeur: 1600, hauteur: 1200 },
          { fichier: "chambre1-8", largeur: 1200, hauteur: 1600 },
        ],
      },
      {
        piece: "Chambre 2",
        equipements: ["Lit queen size", "Bureau", "Climatisation"],
        photos: [
          { fichier: "chambre2-1", largeur: 1600, hauteur: 1281 },
          { fichier: "chambre2-2", largeur: 1600, hauteur: 1281 },
          { fichier: "chambre2-3", largeur: 1600, hauteur: 1200 },
          { fichier: "chambre2-4", largeur: 1600, hauteur: 1200 },
        ],
      },
      {
        piece: "Salle de bain",
        equipements: ["Douche", "Eau chaude", "Sèche-cheveux", "Shampoing", "Gel douche", "Savon pour le corps", "Chauffage"],
        photos: [
          { fichier: "sdb-1", largeur: 1200, hauteur: 1600 },
          { fichier: "sdb-2", largeur: 1200, hauteur: 1600 },
          { fichier: "sdb-3", largeur: 1200, hauteur: 1600 },
          { fichier: "sdb-4", largeur: 1200, hauteur: 1600 },
          { fichier: "sdb-5", largeur: 1600, hauteur: 1200 },
        ],
      },
      {
        piece: "Cour et jardin",
        photos: [
          { fichier: "jardin-1", largeur: 1200, hauteur: 1600 },
          { fichier: "jardin-2", largeur: 1200, hauteur: 1600 },
          { fichier: "jardin-3", largeur: 1200, hauteur: 1600 },
          { fichier: "jardin-4", largeur: 1200, hauteur: 1600 },
          { fichier: "jardin-5", largeur: 1200, hauteur: 1600 },
          { fichier: "jardin-6", largeur: 1600, hauteur: 900 },
        ],
      },
      {
        piece: "Entrée",
        photos: [
          { fichier: "entree-1", largeur: 1200, hauteur: 1600 },
          { fichier: "entree-2", largeur: 1281, hauteur: 1600 },
          { fichier: "entree-3", largeur: 1200, hauteur: 1600 },
          { fichier: "entree-4", largeur: 1600, hauteur: 1200 },
        ],
      },
    ],
    couchages: [
      { piece: "Chambre 1", lit: "1 lit queen size", photo: "chambre1-3" },
      { piece: "Chambre 2", lit: "1 lit queen size", photo: "chambre2-4" },
      { piece: "Salon", lit: "1 canapé convertible", photo: "salon-2" },
    ],
    description: {
      intro: [
        "Bienvenue dans ce charmant T3 entièrement rénové au cœur d'Avignon intra-muros, alliant cachet et modernité. Belle hauteur sous plafond et grande fenêtre lumineuse avec vue sur la cour intérieure.",
        "Situé au deuxième étage d'une rue calme intra-muros, vous profitez d'un emplacement privilégié : commerces, restaurants, Les Halles, théâtres et gare SNCF sont accessibles à pied en quelques minutes. Tout se fait facilement sans voiture.",
      ],
      titre: "Le logement",
      texte: "Appartement chaleureux et confortable, parfait pour découvrir Avignon tout en profitant du calme. Capacité maximale : 4 personnes.",
      listes: [
        { titre: "Chambre 1", elements: ["1 lit double 160 × 190 cm", "Espace de rangement"] },
        { titre: "Chambre 2", elements: ["1 lit double 160 × 190 cm", "Espace de rangement", "Bureau", "Climatisation"] },
        { titre: "Linge de maison fourni", elements: ["Draps, housse de couette, taies d'oreiller", "Serviettes de bain", "Tapis de bain", "Torchon de cuisine"] },
        { titre: "Cuisine équipée", elements: ["Plaque de cuisson", "Lave-vaisselle", "Four", "Réfrigérateur", "Cafetière (capsules offertes)", "Vaisselle et nécessaire pour cuisiner"] },
        { titre: "Salle de bain", elements: ["Douche", "Sèche-cheveux", "WC"] },
        { titre: "Équipements", elements: ["WiFi gratuit et illimité", "Seconde climatisation dans le salon", "Le ménage comprend le lavage et le blanchissage du linge"] },
      ],
      fin: [
        "Pour les séjours de moyenne durée, un ménage supplémentaire peut être organisé sur demande.",
        "Nous serons ravis de vous accueillir pour votre séjour à Avignon.",
      ],
    },
    equipements: [
      { categorie: "Cuisine et salle à manger", elements: ["Cuisine", "Réfrigérateur", "Congélateur", "Four", "Cuisinière", "Plaques de cuisson", "Lave-vaisselle", "Cafetière", "Café", "Bouilloire électrique", "Vaisselle et couverts", "Verres à vin", "Tout le nécessaire pour cuisiner", "Table à manger"] },
      { categorie: "Chambre et linge", elements: ["Linge de lit", "Oreillers et couvertures supplémentaires", "Rideaux occultants", "Rangements pour les vêtements", "Cintres", "Fer à repasser"] },
      { categorie: "Salle de bain", elements: ["Sèche-cheveux", "Shampoing", "Gel douche", "Savon pour le corps", "Eau chaude"] },
      { categorie: "Chauffage et climatisation", elements: ["Climatisation", "Chauffage"] },
      { categorie: "Internet et bureau", elements: ["Wifi", "Espace de travail dédié"] },
      { categorie: "Divertissement", elements: ["Système audio", "Livres et de quoi lire"] },
      { categorie: "Sécurité", elements: ["Détecteur de fumée", "Détecteur de monoxyde de carbone"] },
    ],
    nonInclus: ["Télévision", "Lave-linge"],
    arrivee: "entre 17:00 et 00:00",
    depart: "avant 10:00",
    annulation: "Annulation gratuite jusqu'à 5 jours avant l'arrivée. Ensuite, 50 % du prix des nuits est remboursé, sauf la première nuit.",
    numeroEnregistrement: "",
    reglement: [
      "Jusqu'à 4 voyageurs",
      "Pas d'animaux (animaux d'assistance uniquement)",
      "Logement non-fumeur, vapotage compris",
      "Pas de fête ni de soirée",
      "Calme à respecter de 22:00 à 08:00",
      "Chaussures retirées à l'entrée",
    ],
    securite: [
      "Une caméra de surveillance est installée à l'intérieur de l'immeuble, pour des raisons de sécurité. Elle ne filme aucun espace privé.",
      "Détecteur de fumée et détecteur de monoxyde de carbone installés.",
    ],
    quartier: [
      "Au deuxième étage d'une rue calme d'Avignon intra-muros. Commerces, restaurants, Les Halles, théâtres et gare SNCF sont à quelques minutes à pied.",
      "Les voyageurs disent que les environs sont calmes et que le logement est facilement accessible à pied. L'adresse exacte est communiquée après la réservation.",
    ],
    reservation: "",
  },
];

export const logementParSlug = (slug: string | undefined) => LOGEMENTS_VITRINE.find((l) => l.slug === slug);
