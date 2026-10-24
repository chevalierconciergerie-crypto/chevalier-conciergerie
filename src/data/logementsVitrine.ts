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
  Chevalier PMS (chevalier-pms.com/shop/…) ; vide, le bouton mène à /contact.
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
  /** « Maison entière », etc. ; par défaut « Appartement entier ». */
  type?: string;
  /** Titre de la page, identique à celui du prérendu (scripts/logements-seo.json). */
  titrePage?: string;
  accroche: string;
  details: string[];
  /** Note publique de l'annonce, telle qu'affichée sur Airbnb. */
  /** `nouveau` : moins de 3 avis, on n'affiche pas de note (comme Airbnb). */
  note: { valeur: string; avis: number; nouveau?: boolean; categories: { nom: string; valeur: string }[] };
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
    numeroEnregistrement: "8400700271032",
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
    reservation: "https://chevalier-pms.com/shop/cmsq61itg000104ktepz5feex#reservation",
  },
{
  "slug": "l-adresse",
  "nom": "L'Adresse",
  "lieu": "Avignon intra-muros",
  "accroche": "Un appartement de 70 m² dans un immeuble bourgeois du quartier des Halles, au calme sur cour, à cinq minutes du Palais des Papes.",
  "details": [
    "4 voyageurs",
    "2 chambres",
    "4 lits",
    "1 salle de bain"
  ],
  "note": {
    "valeur": "4,79",
    "avis": 111,
    "nouveau": false,
    "categories": [
      {
        "nom": "Propreté",
        "valeur": "4,8"
      },
      {
        "nom": "Précision",
        "valeur": "4,9"
      },
      {
        "nom": "Arrivée",
        "valeur": "4,8"
      },
      {
        "nom": "Communication",
        "valeur": "4,9"
      },
      {
        "nom": "Emplacement",
        "valeur": "4,9"
      },
      {
        "nom": "Qualité-prix",
        "valeur": "4,8"
      }
    ]
  },
  "photo": {
    "src": "/logements/l-adresse/photo-carte.jpg",
    "largeur": 720,
    "hauteur": 900,
    "alt": "L'Adresse, Avignon"
  },
  "mosaique": [
    "chambre-1-2",
    "salon-3",
    "salon-5",
    "salon-6",
    "patio-2"
  ],
  "pieces": [
    {
      "piece": "Salon",
      "photos": [
        {
          "fichier": "salon-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-4",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-5",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-6",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Cuisine",
      "photos": [
        {
          "fichier": "cuisine-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "cuisine-2",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    },
    {
      "piece": "Chambre 1",
      "photos": [
        {
          "fichier": "chambre-1-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-1-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-1-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ],
      "equipements": [
        "Lit king size",
        "Lit queen size"
      ]
    },
    {
      "piece": "Chambre 2",
      "photos": [
        {
          "fichier": "chambre-2-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ],
      "equipements": [
        "2 lits simples",
        "Cintres",
        "Linge de lit",
        "Fer à repasser"
      ]
    },
    {
      "piece": "Salle de bain",
      "photos": [
        {
          "fichier": "salle-de-bain-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salle-de-bain-2",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    },
    {
      "piece": "Patio",
      "photos": [
        {
          "fichier": "patio-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "patio-2",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Autres photos",
      "photos": [
        {
          "fichier": "autres-photos-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-2",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "autres-photos-4",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-5",
          "largeur": 1600,
          "hauteur": 1068
        },
        {
          "fichier": "autres-photos-6",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "autres-photos-7",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "autres-photos-8",
          "largeur": 1600,
          "hauteur": 1065
        },
        {
          "fichier": "autres-photos-9",
          "largeur": 1600,
          "hauteur": 1198
        },
        {
          "fichier": "autres-photos-10",
          "largeur": 1600,
          "hauteur": 973
        },
        {
          "fichier": "autres-photos-11",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-12",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-13",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-14",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    }
  ],
  "couchages": [
    {
      "piece": "Chambre 1",
      "lit": "1 lit king size ; 1 lit queen size",
      "photo": "chambre-1-1"
    },
    {
      "piece": "Chambre 2",
      "lit": "2 lits simples",
      "photo": "chambre-2-1"
    }
  ],
  "description": {
    "intro": [
      "Bel appartement de 70 m2 dans immeuble ancien intra-muros, quartier des Halles-5 mn Palais des papes ; Au calme, sur cour intérieure arrière du bâtiment, rénové, confortable, il comprend un grand salon-SAM de 30m2 ainsi qu'une cuisine séparée intégralement équipée, deux chambres dont une avec un lit 160; Une douce lumière pénètre par ses grandes fenêtres et illumine le parquet, le voisinage est paisible; les équipements sont complets: WIFI, TV sur box , stéréo/CD, buffet-bar..."
    ],
    "titre": "Le logement",
    "texte": "Vous pénétrez dans la cour intérieure d'un immeuble bourgeois où se trouve l'appartement. En entrant, vous traversez la cour et vous entrez dans l'appartement par une grande entrée située au RDC ; Vous prenez l'escalier intérieur pour accéder aux pièces principales de l'appartement. Un couloir, très aéré et intégré dans le volume de l'escalier, dessert les différentes pièces ; un grand salon-Salle à manger de 30 m2 avec un plafond haut (à la française) éclairée par deux grandes fenêtres-WIFI- TV HD ; cuisine équipée avec mange debout ; une salle de bain avec baignoire ; un WC séparé ; une chambre parentale avec son lit 160 et son espace bureau ; une chambre d'amis avec deux lits d'1 place insérés dans une charmante alcôve ainsi qu'un portant muni de cintres. Bel appartement grand et lumineux (70m2) dans un immeuble ancien au cœur de la ville, proche des Halles. Il s'agit d'un endroit calme, donnant sur une cour intérieure entièrement rénovée. Confortable, il comprend une grande salle de vie (30m2) et une cuisine séparée et entièrement équipée, ainsi que deux chambres (4 personnes). Le salon est également entièrement équipé, avec Wi-Fi, télévision par satellite, chaîne stéréo/CD, buffet-bar, désodorisant... Le logement Entrez dans la cour intérieure d'un immeuble bourgeois où se trouve l'appartement. Traversez la cour et entrez dans l'appartement, prenez l'escalier intérieur privé pour accéder aux pièces principales de l'appartement. Le très grand couloir dessert les différentes pièces ; un grand salon-salle à manger de 30 m2 avec un très haut plafond (style français) éclairé par deux grandes fenêtres ; une cuisine équipée avec une table de stand-up ; une salle de bain avec baignoire ; un WC séparé ; une chambre principale avec son lit de 160 cm et son espace bureau ; une chambre d'amis avec deux lits simples insérés dans une charmante alcôve à côté d'un placard avec cintres. Accès facile pour les voyageurs L'appartement est facilement accessible en train. Depuis l'gare TGV d'Avignon : prendre une navette ou un train jusqu'à la gare d'Avignon Centre. Depuis la gare d'Avignon Centre, il est à 15 minutes à pied ou prenez une navette (10 minutes) vous emmenant à 5 minutes de l'appartement. À cet endroit, vous serez à deux pas du marché des Halles d'Avignon, de la Place Pie, de la Place de l'Horloge, du Palais des Papes... de tous les meilleurs endroits. Vous vivrez au cœur de la ville des Papes. Prenez le temps de faire le tour des remparts, de visiter le pont d'Avignon et les musées, asseyez-vous pour prendre un verre dans la célèbre rue des Teinturiers. Le quartier est très paisible et tout est à proximité (commerces, transports, parking (Halles), restaurants, artisans, petites boutiques...). Passez un bon séjour !",
    "listes": [],
    "fin": []
  },
  "equipements": [
    {
      "categorie": "Salle de bain",
      "elements": [
        "Sèche-cheveux",
        "Produits de nettoyage",
        "Savon pour le corps",
        "Eau chaude",
        "Gel douche"
      ]
    },
    {
      "categorie": "Chambre et linge",
      "elements": [
        "Produits de base",
        "Cintres",
        "Linge de lit",
        "Oreillers et couvertures supplémentaires",
        "Fer à repasser",
        "Étendoir à linge"
      ]
    },
    {
      "categorie": "Divertissement",
      "elements": [
        "TV HD avec télévision par câble haut de gamme",
        "Système audio chaine stéréo",
        "Livres et de quoi lire"
      ]
    },
    {
      "categorie": "Famille",
      "elements": [
        "Jeux de société"
      ]
    },
    {
      "categorie": "Chauffage et climatisation",
      "elements": [
        "Ventilateurs portables"
      ]
    },
    {
      "categorie": "Sécurité à la maison",
      "elements": [
        "Détecteur de fumée"
      ]
    },
    {
      "categorie": "Internet et bureau",
      "elements": [
        "Wifi",
        "Espace de travail dédié"
      ]
    },
    {
      "categorie": "Cuisine et salle à manger",
      "elements": [
        "Cuisine",
        "Réfrigérateur",
        "Four à micro-ondes",
        "Tout le nécessaire pour cuisiner",
        "Vaisselle et couverts",
        "Congélateur",
        "Lave-vaisselle",
        "Four",
        "Bouilloire électrique",
        "Cafetière : machine à expresso",
        "Verres à vin",
        "Grille-pain",
        "Plaques de cuisson",
        "Table à manger"
      ]
    },
    {
      "categorie": "Caractéristiques de l'emplacement",
      "elements": [
        "Entrée privée",
        "Laverie automatique à proximité"
      ]
    },
    {
      "categorie": "Services",
      "elements": [
        "Dépôt de bagages autorisé",
        "Clés remises par l'hôte"
      ]
    }
  ],
  "nonInclus": [
    "Lave-linge",
    "Climatisation"
  ],
  "arrivee": "entre 17:00 et 22:00",
  "depart": "avant 11:00",
  "annulation": "Annulation gratuite jusqu'à 5 jours avant l'arrivée. Ensuite, 50 % du prix des nuits est remboursé, sauf la première nuit.",
  "numeroEnregistrement": "840072110711E",
  "reglement": [
    "Jusqu'à 4 voyageurs",
    "Pas d'animaux (animaux d'assistance uniquement)",
    "Non fumeur (le vapotage et les cigarettes électroniques sont également concernés)",
    "Calme à respecter de 23:00 à 08:00",
    "Pas de fête ni de soirée",
    "Aucune photographie commerciale (les tournages à des fins commerciales sont également concernés)"
  ],
  "securite": [
    "Détecteur de monoxyde de carbone non requis",
    "Détecteur de fumée installé",
    "Certains espaces sont partagés",
    "Le logement comprend des marches ou escaliers"
  ],
  "quartier": [
    "Quartier piétonnier, parking gratuit avec navette centre ville 10 mn max",
    "Vous pouvez accéder par le train, il y a une navette entre la gare TGV et la gare centre qui est à 10 mn de l'appartement.",
    "Vous serez à deux pas du marché des Halles d'Avignon et de la place Pie, toujours très animée. En effet, vous pourrez vivre au cœur battant de la cité des Papes. Tout est à proximité (commerces, transports, parking (des Halles) , restaurants, artisans d'art, boutiques...)",
    "Les voyageurs disent que les environs sont calmes et que le logement est facilement accessible à pied.",
    "L'adresse exacte est communiquée après la réservation."
  ],
  "reservation": "https://chevalier-pms.com/shop/cmtof0yt3000304kyfby82ory#reservation"
},
{
  "slug": "le-cornue",
  "nom": "Le Cornue",
  "lieu": "Avignon intra-muros",
  "accroche": "Un appartement climatisé avec patio, au calme en plein hypercentre d'Avignon.",
  "details": [
    "2 voyageurs",
    "1 chambre",
    "1 lit",
    "1 salle de bain"
  ],
  "note": {
    "valeur": "4,80",
    "avis": 20,
    "nouveau": false,
    "categories": [
      {
        "nom": "Propreté",
        "valeur": "4,8"
      },
      {
        "nom": "Précision",
        "valeur": "4,6"
      },
      {
        "nom": "Arrivée",
        "valeur": "4,8"
      },
      {
        "nom": "Communication",
        "valeur": "4,8"
      },
      {
        "nom": "Emplacement",
        "valeur": "4,8"
      },
      {
        "nom": "Qualité-prix",
        "valeur": "4,8"
      }
    ]
  },
  "photo": {
    "src": "/logements/le-cornue/photo-carte.jpg",
    "largeur": 720,
    "hauteur": 900,
    "alt": "Le Cornue, Avignon"
  },
  "mosaique": [
    "exterieur-2",
    "chambre-1",
    "cuisine-1",
    "salle-de-bain-2",
    "exterieur-4"
  ],
  "pieces": [
    {
      "piece": "Salon",
      "photos": [
        {
          "fichier": "salon-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salon-2",
          "largeur": 1600,
          "hauteur": 1208
        }
      ]
    },
    {
      "piece": "Cuisine",
      "photos": [
        {
          "fichier": "cuisine-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-2",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "cuisine-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-4",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-5",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-6",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    },
    {
      "piece": "Chambre",
      "photos": [
        {
          "fichier": "chambre-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-3",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "chambre-4",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-5",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-6",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-7",
          "largeur": 1145,
          "hauteur": 1600
        },
        {
          "fichier": "chambre-8",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Salle de bain",
      "photos": [
        {
          "fichier": "salle-de-bain-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-2",
          "largeur": 1600,
          "hauteur": 1275
        },
        {
          "fichier": "salle-de-bain-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salle-de-bain-4",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    },
    {
      "piece": "Extérieur",
      "photos": [
        {
          "fichier": "exterieur-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "exterieur-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "exterieur-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "exterieur-4",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "exterieur-5",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Autres photos",
      "photos": [
        {
          "fichier": "autres-photos-1",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "autres-photos-2",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    }
  ],
  "couchages": [],
  "description": {
    "intro": [
      "Simplifiez-vous la vie dans ce logement paisible et central."
    ],
    "titre": "Le logement",
    "texte": "",
    "listes": [
      {
        "titre": "️ couchage",
        "elements": [
          "Chambre 1 : 1 lit double 140x190 cm, espace de rangement ,climatisation, salon"
        ]
      },
      {
        "titre": "️ cuisine équipée",
        "elements": [
          "Plaque de cuisson",
          "Four",
          "Réfrigérateur",
          "Cafetière (capsules offertes)",
          "Vaisselle et tout le nécessaire pour cuisiner"
        ]
      },
      {
        "titre": "Salle de bain",
        "elements": [
          "Douche",
          "Sèche-cheveux",
          "WC"
        ]
      },
      {
        "titre": "Linge de maison fourni",
        "elements": [
          "Draps, housse de couette, taies d'oreiller",
          "Serviettes de bain",
          "Tapis de bain",
          "Torchon de cuisine"
        ]
      },
      {
        "titre": "Équipements",
        "elements": [
          "WiFi gratuit et illimité",
          "TV, climatisation",
          "Ménage, lavage et blanchissage du linge inclus"
        ]
      }
    ],
    "fin": []
  },
  "equipements": [
    {
      "categorie": "Salle de bain",
      "elements": [
        "Eau chaude"
      ]
    },
    {
      "categorie": "Chambre et linge",
      "elements": [
        "Cintres",
        "Linge de lit",
        "Fer à repasser",
        "Espace de rangement pour les vêtements"
      ]
    },
    {
      "categorie": "Divertissement",
      "elements": [
        "Télévision"
      ]
    },
    {
      "categorie": "Chauffage et climatisation",
      "elements": [
        "Climatisation",
        "Chauffage"
      ]
    },
    {
      "categorie": "Sécurité à la maison",
      "elements": [
        "Détecteur de fumée"
      ]
    },
    {
      "categorie": "Internet et bureau",
      "elements": [
        "Wifi"
      ]
    },
    {
      "categorie": "Cuisine et salle à manger",
      "elements": [
        "Cuisine",
        "Réfrigérateur",
        "Tout le nécessaire pour cuisiner",
        "Vaisselle et couverts",
        "Congélateur",
        "Four",
        "Plaques de cuisson",
        "Table à manger",
        "Café"
      ]
    },
    {
      "categorie": "Extérieur",
      "elements": [
        "Patio ou balcon",
        "Jardin",
        "Mobilier d'extérieur",
        "Espace repas en plein air",
        "Barbecue"
      ]
    },
    {
      "categorie": "Services",
      "elements": [
        "Ménage disponible pendant le séjour"
      ]
    }
  ],
  "nonInclus": [
    "Lave-linge"
  ],
  "arrivee": "à partir de 17:00",
  "depart": "avant 11:00",
  "annulation": "Annulation gratuite jusqu'à la veille de l'arrivée, 17:00. Ensuite, toutes les nuits sont remboursées sauf la première.",
  "numeroEnregistrement": "84007003067UI",
  "reglement": [
    "Jusqu'à 2 voyageurs",
    "Pas d'animaux (animaux d'assistance uniquement)",
    "Non fumeur (le vapotage et les cigarettes électroniques sont également concernés)",
    "Pas de fête ni de soirée"
  ],
  "securite": [
    "Aucune indication de la présence d'un détecteur de monoxyde de carbone",
    "Détecteur de fumée installé"
  ],
  "quartier": [
    "Au cœur d'Avignon intra-muros.",
    "L'adresse exacte est communiquée après la réservation."
  ],
  "reservation": "https://chevalier-pms.com/shop/cmsqazyco000a04l1x8ugu0dv#reservation"
},
{
  "slug": "la-loge",
  "nom": "La Loge",
  "lieu": "Avignon intra-muros",
  "accroche": "Un studio climatisé de 33 m² sur la place de l'Horloge, à une minute du Palais des Papes.",
  "details": [
    "4 voyageurs",
    "Studio",
    "2 lits",
    "1 salle de bain"
  ],
  "note": {
    "valeur": "4,71",
    "avis": 125,
    "nouveau": false,
    "categories": [
      {
        "nom": "Propreté",
        "valeur": "4,8"
      },
      {
        "nom": "Précision",
        "valeur": "4,8"
      },
      {
        "nom": "Arrivée",
        "valeur": "4,9"
      },
      {
        "nom": "Communication",
        "valeur": "4,9"
      },
      {
        "nom": "Emplacement",
        "valeur": "4,9"
      },
      {
        "nom": "Qualité-prix",
        "valeur": "4,6"
      }
    ]
  },
  "photo": {
    "src": "/logements/la-loge/photo-carte.jpg",
    "largeur": 720,
    "hauteur": 900,
    "alt": "La Loge, Avignon"
  },
  "mosaique": [
    "espace-de-vie-4",
    "espace-de-vie-3",
    "espace-de-vie-5",
    "espace-de-vie-6",
    "cuisine-1"
  ],
  "pieces": [
    {
      "piece": "Espace de vie",
      "photos": [
        {
          "fichier": "espace-de-vie-1",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "espace-de-vie-2",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "espace-de-vie-3",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "espace-de-vie-4",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "espace-de-vie-5",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "espace-de-vie-6",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "espace-de-vie-7",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "espace-de-vie-8",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "espace-de-vie-9",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "espace-de-vie-10",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Cuisine",
      "photos": [
        {
          "fichier": "cuisine-1",
          "largeur": 1600,
          "hauteur": 1067
        }
      ]
    },
    {
      "piece": "Kitchenette",
      "photos": [
        {
          "fichier": "kitchenette-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "kitchenette-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "kitchenette-3",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "kitchenette-4",
          "largeur": 1600,
          "hauteur": 1067
        }
      ]
    },
    {
      "piece": "Espace repas",
      "photos": [
        {
          "fichier": "espace-repas-1",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "espace-repas-2",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "espace-repas-3",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "espace-repas-4",
          "largeur": 1600,
          "hauteur": 1067
        }
      ]
    },
    {
      "piece": "Salle de bain",
      "photos": [
        {
          "fichier": "salle-de-bain-1",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "salle-de-bain-2",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-3",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "salle-de-bain-4",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    },
    {
      "piece": "Espace chambre",
      "photos": [
        {
          "fichier": "espace-chambre-1",
          "largeur": 1600,
          "hauteur": 1200
        }
      ],
      "equipements": [
        "2 canapés convertibles"
      ]
    },
    {
      "piece": "Autres photos",
      "photos": [
        {
          "fichier": "autres-photos-1",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "autres-photos-2",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-3",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-4",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-5",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-6",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-7",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-8",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-9",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-10",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-11",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-12",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-13",
          "largeur": 1600,
          "hauteur": 1131
        },
        {
          "fichier": "autres-photos-14",
          "largeur": 1600,
          "hauteur": 1131
        }
      ]
    }
  ],
  "couchages": [
    {
      "piece": "Espace chambre",
      "lit": "2 canapés convertibles",
      "photo": "espace-chambre-1"
    }
  ],
  "description": {
    "intro": [
      "Profitez d'un logement à la DECORATION SOIGNEE pour votre séjour à Avignon.",
      "Bienvenue en plein cœur HISTORIQUE d'Avignon intra-muros, situé place de l’horloge, dans un logement agréable et LUMINEUX, à proximité immédiate du COEUR de ville, des commerces et transports. Vous pourrez découvrir et visiter la ville à pied.",
      "Tout le confort nécessaire se trouve dans l'appartement pour profiter au maximum de votre séjour."
    ],
    "titre": "Le logement",
    "texte": "Emplacement numéro 1 sur Avignon, venez profitez de ce MAGNFIQUE studio AVEC CLIM de 33 m2 ! LUMINEUX avec une BELLE vue donnant sur la SPLENDIDE place de l'Horloge et à quelques pas du Palais des Papes . Idéalement placé au cœur du CENTRE HISTORIQUE d'Avignon, classé au PATRIMOINE MONDIAL de l'Unesco . Ce JOLI STUDIO de 30m², pouvant accueillir jusqu'à 4 convives, entièrement meublé, offre à ses convives espace et tranquillité. DEUX canapés lits très CONFORTABLES. TV ECRAN PLAT pour se détendre devant un bon film. WIFI pour consulter internet à tout moment. FOUR, MICRO-ONDE et PLAQUE DE CUISSON pour jouer les chefs étoilés et savourer la gastronomie provençale. MACHINE à CAFE, BOUILLOIRE et GRILLE PAIN pour prendre des forces lors d'un petit déjeuner complet. MACHINE à LAVER le linge et LAVE VAISSELLE pour un séjour sans contrainte. Une SALLE DE BAIN avec DOUCHE pour se relaxer après une journée intense de visite. KIT DE REPASSAGE pour éviter les robes et chemises froissées. CLIMATISATION pour se rafraîchir en cas de grosses chaleurs. DRAPS et SERVIETTES fournis.",
    "listes": [],
    "fin": []
  },
  "equipements": [
    {
      "categorie": "Vues panoramiques",
      "elements": [
        "Vue panoramique sur la ville"
      ]
    },
    {
      "categorie": "Salle de bain",
      "elements": [
        "Sèche-cheveux",
        "Produits de nettoyage",
        "Eau chaude"
      ]
    },
    {
      "categorie": "Chambre et linge",
      "elements": [
        "Lave-linge (Gratuit) dans le logement",
        "Produits de base",
        "Cintres",
        "Linge de lit",
        "Oreillers et couvertures supplémentaires",
        "Fer à repasser",
        "Étendoir à linge",
        "Espace de rangement pour les vêtements"
      ]
    },
    {
      "categorie": "Divertissement",
      "elements": [
        "Connexion Ethernet",
        "Télévision"
      ]
    },
    {
      "categorie": "Famille",
      "elements": [
        "Lit pour bébé : disponible sur demande",
        "Lit parapluie : disponible sur demande"
      ]
    },
    {
      "categorie": "Chauffage et climatisation",
      "elements": [
        "Climatisation centrale",
        "Chauffage"
      ]
    },
    {
      "categorie": "Sécurité à la maison",
      "elements": [
        "Détecteur de fumée",
        "Trousse de premiers secours"
      ]
    },
    {
      "categorie": "Internet et bureau",
      "elements": [
        "Wifi",
        "Routeur wifi portable"
      ]
    },
    {
      "categorie": "Cuisine et salle à manger",
      "elements": [
        "Cuisine",
        "Réfrigérateur",
        "Four à micro-ondes",
        "Tout le nécessaire pour cuisiner",
        "Vaisselle et couverts",
        "Congélateur",
        "Cuisinière à induction",
        "Four",
        "Bouilloire électrique",
        "Cafetière",
        "Verres à vin",
        "Grille-pain",
        "Plaques de cuisson",
        "Table à manger",
        "Café"
      ]
    },
    {
      "categorie": "Caractéristiques de l'emplacement",
      "elements": [
        "Laverie automatique à proximité"
      ]
    },
    {
      "categorie": "Services",
      "elements": [
        "Séjours longue durée autorisés",
        "Arrivée autonome",
        "Boîte à clé sécurisée"
      ]
    }
  ],
  "nonInclus": [],
  "arrivee": "entre 17:00 et 21:00",
  "depart": "avant 11:00",
  "annulation": "Annulation gratuite jusqu'à 5 jours avant l'arrivée. Ensuite, 50 % du prix des nuits est remboursé, sauf la première nuit.",
  "numeroEnregistrement": "84007000456JH",
  "reglement": [
    "Jusqu'à 4 voyageurs",
    "Pas d'animaux (animaux d'assistance uniquement)",
    "Non fumeur (le vapotage et les cigarettes électroniques sont également concernés)",
    "Calme à respecter de 22:00 à 09:00",
    "Pas de fête ni de soirée",
    "Photographie commerciale autorisée (inclut les tournages à des fins commerciales)",
    "Fermeture à clé au moment du départ"
  ],
  "securite": [
    "Aucun détecteur de monoxyde de carbone",
    "Détecteur de fumée installé"
  ],
  "quartier": [
    "TOUT le logement est mis à disposition des voyageurs.",
    "La GARE d'Avignon - centre se trouve à 850m.",
    "La GARE TGV se trouve à 20 minutes en voiture.",
    "L'adresse exacte est communiquée après la réservation."
  ],
  "reservation": "https://chevalier-pms.com/shop/cmu475ly1000304jv7zauhaut#reservation"
},
{
  "slug": "le-vernet-lumineux",
  "nom": "Le Vernet Lumineux",
  "lieu": "Avignon intra-muros",
  "accroche": "Un T3 rénové et lumineux au deuxième étage, dans une rue calme d'Avignon intra-muros.",
  "details": [
    "4 voyageurs",
    "2 chambres",
    "2 lits",
    "1 salle de bain"
  ],
  "note": {
    "valeur": "4,50",
    "avis": 2,
    "nouveau": true,
    "categories": []
  },
  "photo": {
    "src": "/logements/le-vernet-lumineux/photo-carte.jpg",
    "largeur": 720,
    "hauteur": 900,
    "alt": "Le Vernet Lumineux, Avignon"
  },
  "mosaique": [
    "salon-1",
    "chambre-1-1",
    "cuisine-1",
    "chambre-2-1",
    "salle-de-bain-1"
  ],
  "pieces": [
    {
      "piece": "Salon",
      "photos": [
        {
          "fichier": "salon-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Cuisine",
      "photos": [
        {
          "fichier": "cuisine-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Chambre 1",
      "photos": [
        {
          "fichier": "chambre-1-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-1-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-1-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Chambre 2",
      "photos": [
        {
          "fichier": "chambre-2-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Salle de bain",
      "photos": [
        {
          "fichier": "salle-de-bain-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salle-de-bain-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salle-de-bain-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Autres photos",
      "photos": [
        {
          "fichier": "autres-photos-1",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    }
  ],
  "couchages": [],
  "description": {
    "intro": [
      "Bienvenue dans ce charmant T3 entièrement rénové au cœur d’Avignon intra-muros, alliant cachet et modernité. Belle hauteur sous plafond et grande fenêtre lumineuse.",
      "Situé au 2ème étage d’une rue calme intra-muros, vous profitez d’un emplacement privilégié : commerces, restaurants, Les Halles, théâtres et gare SNCF sont accessibles à pied en quelques minutes. Tout se fait facilement sans voiture."
    ],
    "titre": "Le logement",
    "texte": "Appartement chaleureux et confortable, parfait pour découvrir Avignon tout en profitant du calme. Capacité maximale : 4 personnes Une caméra de surveillance est installée à l'intérieur de l'immeuble, pour des raisons de sécurité. Elle ne filme aucun espace privé. Pour les séjours de moyenne durée, un ménage supplémentaire peut être organisé sur demande. Nous serons ravis de vous accueillir pour votre séjour à Avignon.",
    "listes": [
      {
        "titre": "Chambre 1",
        "elements": [
          "1 lit double 140x190 cm",
          "Espace de rangement"
        ]
      },
      {
        "titre": "Chambre 2",
        "elements": [
          "1 lit double 140x190 cm",
          "Espace de rangement",
          "Bureau"
        ]
      },
      {
        "titre": "Linge de maison fourni",
        "elements": [
          "Draps, housse de couette, taies d’oreiller",
          "Serviettes de bain",
          "Tapis de bain",
          "Torchon de cuisine"
        ]
      },
      {
        "titre": "Cuisine équipée",
        "elements": [
          "Plaque de cuisson",
          "Lave-vaisselle",
          "Four",
          "Réfrigérateur",
          "Cafetière (capsules offertes)",
          "Vaisselle et nécessaire pour cuisiner"
        ]
      },
      {
        "titre": "Salle de bain",
        "elements": [
          "Baignoire",
          "WC indépendante"
        ]
      },
      {
        "titre": "Équipements",
        "elements": [
          "WiFi gratuit et illimité",
          "Les frais de ménage incluent également le lavage et le blanchissage du linge.",
          "Seconde climatisation dans le salon"
        ]
      },
      {
        "titre": "Règlement intérieur",
        "elements": [
          "Enlever les chaussures à l'entrée",
          "Résidence calme",
          "Fêtes et soirées interdites",
          "Maximum 4 personnes",
          "Logement non-fumeur",
          "Pas d'animaux",
          "Merci de limiter le bruit après 22h"
        ]
      }
    ],
    "fin": []
  },
  "equipements": [
    {
      "categorie": "Salle de bain",
      "elements": [
        "Baignoire",
        "Produits de nettoyage",
        "Eau chaude"
      ]
    },
    {
      "categorie": "Chambre et linge",
      "elements": [
        "Linge de lit"
      ]
    },
    {
      "categorie": "Divertissement",
      "elements": [
        "Télévision"
      ]
    },
    {
      "categorie": "Chauffage et climatisation",
      "elements": [
        "Ventilateurs portables",
        "Chauffage"
      ]
    },
    {
      "categorie": "Sécurité à la maison",
      "elements": [
        "Détecteur de fumée"
      ]
    },
    {
      "categorie": "Internet et bureau",
      "elements": [
        "Wifi",
        "Espace de travail dédié"
      ]
    },
    {
      "categorie": "Cuisine et salle à manger",
      "elements": [
        "Cuisine",
        "Réfrigérateur",
        "Four à micro-ondes",
        "Tout le nécessaire pour cuisiner",
        "Vaisselle et couverts",
        "Lave-vaisselle",
        "Four",
        "Plaques de cuisson",
        "Table à manger",
        "Café"
      ]
    },
    {
      "categorie": "Services",
      "elements": [
        "Séjours longue durée autorisés",
        "Ménage disponible pendant le séjour"
      ]
    }
  ],
  "nonInclus": [
    "Lave-linge",
    "Climatisation"
  ],
  "arrivee": "entre 17:00 et 21:00",
  "depart": "avant 11:00",
  "annulation": "Annulation gratuite jusqu'à la veille de l'arrivée, 17:00. Ensuite, toutes les nuits sont remboursées sauf la première.",
  "numeroEnregistrement": "840070033908D",
  "reglement": [
    "Jusqu'à 4 voyageurs",
    "Non fumeur (le vapotage et les cigarettes électroniques sont également concernés)",
    "Calme à respecter de 20:00 à 08:00",
    "Pas de fête ni de soirée"
  ],
  "securite": [
    "Aucune indication de la présence d'un détecteur de monoxyde de carbone",
    "Détecteur de fumée installé"
  ],
  "quartier": [
    "Au cœur d'Avignon intra-muros.",
    "L'adresse exacte est communiquée après la réservation."
  ],
  "reservation": "https://chevalier-pms.com/shop/cmtv7xdl7000w04lavrqipkw4#reservation"
},
{
  "slug": "l-incontournable",
  "nom": "L'Incontournable",
  "lieu": "Avignon intra-muros",
  "accroche": "Un appartement lumineux sur la place Pie, au cœur d'Avignon, avec deux chambres au calme à l'arrière.",
  "details": [
    "4 voyageurs",
    "2 chambres",
    "2 lits",
    "1 salle de bain"
  ],
  "note": {
    "valeur": "4,00",
    "avis": 2,
    "nouveau": true,
    "categories": []
  },
  "photo": {
    "src": "/logements/l-incontournable/photo-carte.jpg",
    "largeur": 720,
    "hauteur": 900,
    "alt": "L'Incontournable, Avignon"
  },
  "mosaique": [
    "chambre-2-1",
    "autres-photos-2",
    "cuisine-1",
    "chambre-1-1",
    "chambre-2-3"
  ],
  "pieces": [
    {
      "piece": "Salon",
      "photos": [
        {
          "fichier": "salon-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Cuisine",
      "photos": [
        {
          "fichier": "cuisine-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-2",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Chambre 1",
      "photos": [
        {
          "fichier": "chambre-1-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-1-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-1-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-1-4",
          "largeur": 1600,
          "hauteur": 1200
        }
      ],
      "equipements": [
        "Lit double"
      ]
    },
    {
      "piece": "Chambre 2",
      "photos": [
        {
          "fichier": "chambre-2-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ],
      "equipements": [
        "Lit double"
      ]
    },
    {
      "piece": "Salle de bain",
      "photos": [
        {
          "fichier": "salle-de-bain-1",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Autres photos",
      "photos": [
        {
          "fichier": "autres-photos-1",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "autres-photos-2",
          "largeur": 1193,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-3",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    }
  ],
  "couchages": [
    {
      "piece": "Chambre 1",
      "lit": "1 lit double",
      "photo": "chambre-1-1"
    },
    {
      "piece": "Chambre 2",
      "lit": "1 lit double",
      "photo": "chambre-2-1"
    }
  ],
  "description": {
    "intro": [
      "Idéalement situé sur la place Pie, au cœur d'Avignon, cet appartement au 2e étage vous plonge dans l'ambiance vivante de la ville : cafés, halles gourmandes et commerces à vos pieds. Très lumineux, il offre un bel espace de vie agréable à tout moment de la journée. Les deux chambres, situées à l'arrière du logement et bien isolées, vous garantissent des nuits parfaitement calmes. Le compromis idéal entre l'animation provençale et le repos, à quelques minutes à pied du Palais des Papes."
    ],
    "titre": "Le logement",
    "texte": "",
    "listes": [
      {
        "titre": "️ couchage",
        "elements": [
          "Chambre 1 : 1 lit double 140x190 cm, espace de rangement, ventilateur, bureau, Une partie du plafond d'une chambre est un peu abîmé, mais cela est simplement esthétique.",
          "Chambre 2 : 1 lit double 140x190 cm, espace de rangement ,ventilateur"
        ]
      },
      {
        "titre": "️ cuisine équipée",
        "elements": [
          "Plaque de cuisson",
          "Four",
          "Boulloire",
          "Réfrigérateur",
          "Cafetière (capsules offertes)",
          "Vaisselle et tout le nécessaire pour cuisiner"
        ]
      },
      {
        "titre": "Salle de bain",
        "elements": [
          "Douche",
          "WC"
        ]
      },
      {
        "titre": "Linge de maison fourni",
        "elements": [
          "Draps, housse de couette, taies d'oreiller",
          "Serviettes de bain",
          "Tapis de bain",
          "Torchon de cuisine"
        ]
      },
      {
        "titre": "Équipements",
        "elements": [
          "WiFi gratuit et illimité",
          "TV, ventilateur",
          "Ménage, lavage et blanchissage du linge inclus"
        ]
      }
    ],
    "fin": []
  },
  "equipements": [
    {
      "categorie": "Salle de bain",
      "elements": [
        "Produits de nettoyage",
        "Eau chaude"
      ]
    },
    {
      "categorie": "Chambre et linge",
      "elements": [
        "Lave-linge",
        "Cintres",
        "Linge de lit",
        "Espace de rangement pour les vêtements"
      ]
    },
    {
      "categorie": "Divertissement",
      "elements": [
        "Télévision"
      ]
    },
    {
      "categorie": "Famille",
      "elements": [
        "Table à langer"
      ]
    },
    {
      "categorie": "Chauffage et climatisation",
      "elements": [
        "Ventilateurs portables",
        "Chauffage"
      ]
    },
    {
      "categorie": "Sécurité à la maison",
      "elements": [
        "Détecteur de fumée"
      ]
    },
    {
      "categorie": "Internet et bureau",
      "elements": [
        "Wifi",
        "Espace de travail dédié"
      ]
    },
    {
      "categorie": "Cuisine et salle à manger",
      "elements": [
        "Cuisine",
        "Réfrigérateur",
        "Tout le nécessaire pour cuisiner",
        "Vaisselle et couverts",
        "Congélateur",
        "Lave-vaisselle",
        "Four",
        "Bouilloire électrique",
        "Cafetière",
        "Plaques de cuisson",
        "Table à manger",
        "Café"
      ]
    },
    {
      "categorie": "Caractéristiques de l'emplacement",
      "elements": [
        "Laverie automatique à proximité"
      ]
    },
    {
      "categorie": "Parking et installations",
      "elements": [
        "Stationnement payant à l'extérieur de la propriété"
      ]
    },
    {
      "categorie": "Services",
      "elements": [
        "Séjours longue durée autorisés",
        "Ménage disponible pendant le séjour"
      ]
    }
  ],
  "nonInclus": [
    "Climatisation"
  ],
  "arrivee": "entre 17:00 et 23:00",
  "depart": "avant 11:00",
  "annulation": "Annulation gratuite jusqu'à la veille de l'arrivée, 17:00. Ensuite, toutes les nuits sont remboursées sauf la première.",
  "numeroEnregistrement": "84007003380Y2",
  "reglement": [
    "Jusqu'à 4 voyageurs",
    "Pas d'animaux (animaux d'assistance uniquement)",
    "Non fumeur (le vapotage et les cigarettes électroniques sont également concernés)",
    "Pas de fête ni de soirée"
  ],
  "securite": [
    "Aucune indication de la présence d'un détecteur de monoxyde de carbone",
    "Détecteur de fumée installé"
  ],
  "quartier": [
    "Des places de stationnement payantes sont disponibles à proximité immédiate de l’appartement, vous permettant de garer votre véhicule en toute sérénité, notamment le Parking des Halles, situé à environ 3 minutes à pied (≈ 250 m).",
    "Nous vous souhaitons un excellent séjour et espérons que vous profiterez pleinement de cet espace confortable idéalement situé au cœur de la ville d’Avignon.",
    "L'adresse exacte est communiquée après la réservation."
  ],
  "reservation": "https://chevalier-pms.com/shop/cmthpk9e5000404jvactbdynt#reservation"
},
{
  "slug": "la-bastide",
  "nom": "La Bastide",
  "lieu": "Villeneuve-lès-Avignon",
  "type": "Maison entière",
  "titrePage": "La Bastide — Maison à Villeneuve-lès-Avignon | Réservation directe | Chevalier Conciergerie",
  "accroche": "Une maison lumineuse et climatisée au cœur de Villeneuve-lès-Avignon, avec terrasse et parking, pour quatre voyageurs.",
  "details": [
    "4 voyageurs",
    "2 chambres",
    "2 lits",
    "1 salle de bain"
  ],
  "note": {
    "valeur": "4,71",
    "avis": 7,
    "nouveau": false,
    "categories": [
      {
        "nom": "Propreté",
        "valeur": "4,7"
      },
      {
        "nom": "Précision",
        "valeur": "4,9"
      },
      {
        "nom": "Arrivée",
        "valeur": "4,4"
      },
      {
        "nom": "Communication",
        "valeur": "4,6"
      },
      {
        "nom": "Emplacement",
        "valeur": "4,9"
      },
      {
        "nom": "Qualité-prix",
        "valeur": "4,9"
      }
    ]
  },
  "photo": {
    "src": "/logements/la-bastide/photo-carte.jpg",
    "largeur": 720,
    "hauteur": 900,
    "alt": "La Bastide, Avignon"
  },
  "mosaique": [
    "salon-1",
    "exterieur-1",
    "espace-repas-1",
    "chambre-2-1",
    "salle-de-bain-1"
  ],
  "pieces": [
    {
      "piece": "Salon",
      "photos": [
        {
          "fichier": "salon-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-4",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Cuisine",
      "photos": [
        {
          "fichier": "cuisine-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "cuisine-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-4",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Espace repas",
      "photos": [
        {
          "fichier": "espace-repas-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "espace-repas-2",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Chambre 1",
      "photos": [
        {
          "fichier": "chambre-1-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "chambre-1-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-1-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-1-4",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "chambre-1-5",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Chambre 2",
      "photos": [
        {
          "fichier": "chambre-2-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2-4",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2-5",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Salle de bain",
      "photos": [
        {
          "fichier": "salle-de-bain-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salle-de-bain-3",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-4",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-5",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salle-de-bain-6",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    },
    {
      "piece": "Extérieur",
      "photos": [
        {
          "fichier": "exterieur-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "exterieur-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "exterieur-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "exterieur-4",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    },
    {
      "piece": "Autres photos",
      "photos": [
        {
          "fichier": "autres-photos-1",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "autres-photos-2",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "autres-photos-4",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-5",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "autres-photos-6",
          "largeur": 1142,
          "hauteur": 1600
        }
      ]
    }
  ],
  "couchages": [],
  "description": {
    "intro": [
      "Au cœur de Villeneuve-lès-Avignon, Cette maison qui allie charme et confort. Une belle luminosité et hauteur sous plafond en pleine nature.",
      "Le matin, votre café sur la terrasse, avant de partir explorer la ville à pied. Le soir, vous rentrez dans un cocon calme, loin du bruit mais à deux pas de l'animation.",
      "Idéal pour une famille, jusqu'à 4 voyageurs."
    ],
    "titre": "Le logement",
    "texte": "Appartement chaleureux et confortable, pensé pour découvrir Villeneuve-lès-Avignon tout en profitant du calme. Capacité maximale : 4 personnes.",
    "listes": [
      {
        "titre": "️ couchage",
        "elements": [
          "Chambre 1 : 1 lit double 140x190 cm, espace de rangement",
          "Chambre 2 : 1 lit double 140x190 cm, espace de rangement"
        ]
      },
      {
        "titre": "️ cuisine équipée",
        "elements": [
          "Plaque de cuisson",
          "Four",
          "Lave-vaisselle",
          "Réfrigérateur",
          "Cafetière (capsules offertes)",
          "Vaisselle et tout le nécessaire pour cuisiner"
        ]
      },
      {
        "titre": "Salle de bain",
        "elements": [
          "Douche",
          "Sèche-cheveux",
          "WC"
        ]
      },
      {
        "titre": "Linge de maison fourni",
        "elements": [
          "Draps, housse de couette, taies d'oreiller",
          "Serviettes de bain",
          "Tapis de bain",
          "Torchon de cuisine"
        ]
      },
      {
        "titre": "Équipements",
        "elements": [
          "Climatisation salon",
          "Ménage, lavage et blanchissage du linge inclus"
        ]
      }
    ],
    "fin": []
  },
  "equipements": [
    {
      "categorie": "Chambre et linge",
      "elements": [
        "Lave-linge"
      ]
    },
    {
      "categorie": "Chauffage et climatisation",
      "elements": [
        "Climatisation"
      ]
    },
    {
      "categorie": "Sécurité à la maison",
      "elements": [
        "Détecteur de fumée"
      ]
    },
    {
      "categorie": "Cuisine et salle à manger",
      "elements": [
        "Cuisine"
      ]
    },
    {
      "categorie": "Extérieur",
      "elements": [
        "Espace repas en plein air"
      ]
    },
    {
      "categorie": "Parking et installations",
      "elements": [
        "Stationnement gratuit sur place"
      ]
    }
  ],
  "nonInclus": [
    "Wifi",
    "Télévision",
    "Chauffage"
  ],
  "arrivee": "entre 17:00 et 22:00",
  "depart": "avant 10:00",
  "annulation": "Annulation gratuite jusqu'à 5 jours avant l'arrivée. Ensuite, 50 % du prix des nuits est remboursé, sauf la première nuit.",
  "numeroEnregistrement": "",
  "reglement": [
    "Jusqu'à 4 voyageurs",
    "Pas d'animaux (animaux d'assistance uniquement)",
    "Non fumeur (le vapotage et les cigarettes électroniques sont également concernés)",
    "Calme à respecter de 17:00 à 09:00",
    "Pas de fête ni de soirée",
    "Aucune photographie commerciale (les tournages à des fins commerciales sont également concernés)"
  ],
  "securite": [
    "Aucune indication de la présence d'un détecteur de monoxyde de carbone",
    "Détecteur de fumée installé"
  ],
  "quartier": [
    "Emplacement privilégié : Piscine municipal, terrain de tennis, stade de foot accessibles à pied en quelques minutes. Tout se fait sans voiture.",
    "Stationnement : parking privée gratuit sur place.",
    "Arrivée autonome boîte à clés : vous accédez au logement en toute autonomie, à partir de 17h.",
    "L'adresse exacte est communiquée après la réservation."
  ],
  "reservation": "https://chevalier-pms.com/shop/cmsq8zwsj000104juv2u73rw1#reservation"
},
{
  "slug": "l-intramuros",
  "nom": "L'Intramuros",
  "lieu": "Avignon intra-muros",
  "type": "Appartement entier",
  "titrePage": "L'Intramuros — Appartement à Avignon intra-muros | Réservation directe | Chevalier Conciergerie",
  "accroche": "Un studio rénové et climatisé, au calme dans le centre historique d'Avignon, pour deux voyageurs.",
  "details": [
    "2 voyageurs",
    "Studio",
    "1 lit",
    "1 salle de bain"
  ],
  "note": {
    "valeur": "4,58",
    "avis": 12,
    "nouveau": false,
    "categories": [
      {
        "nom": "Propreté",
        "valeur": "4,4"
      },
      {
        "nom": "Précision",
        "valeur": "4,5"
      },
      {
        "nom": "Arrivée",
        "valeur": "4,8"
      },
      {
        "nom": "Communication",
        "valeur": "4,8"
      },
      {
        "nom": "Emplacement",
        "valeur": "4,8"
      },
      {
        "nom": "Qualité-prix",
        "valeur": "4,2"
      }
    ]
  },
  "photo": {
    "src": "/logements/l-intramuros/photo-carte.jpg",
    "largeur": 720,
    "hauteur": 900,
    "alt": "L'Intramuros, Avignon"
  },
  "mosaique": [
    "espace-chambre-1",
    "cuisine-1",
    "cuisine-2",
    "cuisine-3",
    "espace-repas-1"
  ],
  "pieces": [
    {
      "piece": "Cuisine",
      "photos": [
        {
          "fichier": "cuisine-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Espace repas",
      "photos": [
        {
          "fichier": "espace-repas-1",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Salle de bain",
      "photos": [
        {
          "fichier": "salle-de-bain-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salle-de-bain-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salle-de-bain-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salle-de-bain-4",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Extérieur",
      "photos": [
        {
          "fichier": "exterieur-1",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Espace chambre",
      "photos": [
        {
          "fichier": "espace-chambre-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "espace-chambre-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "espace-chambre-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Autres photos",
      "photos": [
        {
          "fichier": "autres-photos-1",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "autres-photos-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "autres-photos-3",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "autres-photos-4",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "autres-photos-5",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "autres-photos-6",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-7",
          "largeur": 1600,
          "hauteur": 900
        },
        {
          "fichier": "autres-photos-8",
          "largeur": 1600,
          "hauteur": 900
        },
        {
          "fichier": "autres-photos-9",
          "largeur": 1600,
          "hauteur": 900
        },
        {
          "fichier": "autres-photos-10",
          "largeur": 1600,
          "hauteur": 900
        },
        {
          "fichier": "autres-photos-11",
          "largeur": 1600,
          "hauteur": 900
        }
      ]
    }
  ],
  "couchages": [],
  "description": {
    "intro": [
      "Bienvenue dans ce studio chaleureux et fonctionnel, entièrement rénové avec soin pour vous offrir un séjour confortable et agréable. Situé dans un quartier calme et pratique, ce logement combine design moderne, équipements complets et ambiance cosy.",
      "Le logement a reçu quelques petits dégâts récemment au dessus de la porte d’entrée, ce n’est rien de dangereux seulement pas esthétique."
    ],
    "titre": "Le logement",
    "texte": "️ Coin nuit douillet avec un lit double , literie de qualité et espace séparé par une étagère design. Cuisine entièrement équipée : four, plaques, micro-ondes, machine à café, ustensiles… tout pour cuisiner comme à la maison. Espace repas lumineux avec table ronde et chaises design. Salle de bain élégante avec douche à effet pluie, faïence naturelle, et rangements . ️ Climatisation réversible pour un confort toute l’année. Équipements pratiques : fer à repasser vapeur, vaisselle, rangements, sèche-cheveux. Dans Avignon Intra muros. À quelques minutes à pied des commerces, restaurants et transports. Accès rapide au centre-ville / plage / gare / lieux touristiques. Couples ou solo travelers. Séjours pro ou week-ends détente. Voyageurs cherchant confort, calme et style. Nous restons disponibles tout au long de votre séjour pour vous conseiller et répondre à vos besoins. Ce logement est identique aux photos : ce que vous voyez, c’est ce que vous aurez !",
    "listes": [],
    "fin": []
  },
  "equipements": [
    {
      "categorie": "Salle de bain",
      "elements": [
        "Sèche-cheveux",
        "Eau chaude"
      ]
    },
    {
      "categorie": "Chambre et linge",
      "elements": [
        "Produits de base",
        "Cintres",
        "Linge de lit",
        "Fer à repasser",
        "Étendoir à linge",
        "Espace de rangement pour les vêtements"
      ]
    },
    {
      "categorie": "Divertissement",
      "elements": [
        "Télévision"
      ]
    },
    {
      "categorie": "Chauffage et climatisation",
      "elements": [
        "Climatisation",
        "Chauffage"
      ]
    },
    {
      "categorie": "Sécurité à la maison",
      "elements": [
        "Détecteur de fumée"
      ]
    },
    {
      "categorie": "Internet et bureau",
      "elements": [
        "Wifi"
      ]
    },
    {
      "categorie": "Cuisine et salle à manger",
      "elements": [
        "Cuisine",
        "Four à micro-ondes",
        "Vaisselle et couverts",
        "Mini réfrigérateur",
        "Four",
        "Plaques de cuisson",
        "Table à manger"
      ]
    },
    {
      "categorie": "Parking et installations",
      "elements": [
        "Stationnement payant sur place"
      ]
    },
    {
      "categorie": "Services",
      "elements": [
        "Clés remises par l'hôte"
      ]
    }
  ],
  "nonInclus": [
    "Lave-linge"
  ],
  "arrivee": "entre 17:00 et 00:00",
  "depart": "avant 10:00",
  "annulation": "Annulation gratuite jusqu'à 5 jours avant l'arrivée. Ensuite, 50 % du prix des nuits est remboursé, sauf la première nuit.",
  "numeroEnregistrement": "84007000935YC",
  "reglement": [
    "Jusqu'à 2 voyageurs",
    "Pas d'animaux (animaux d'assistance uniquement)",
    "Non fumeur (le vapotage et les cigarettes électroniques sont également concernés)",
    "Calme à respecter de 22:00 à 07:00",
    "Pas de fête ni de soirée",
    "Aucune photographie commerciale (les tournages à des fins commerciales sont également concernés)"
  ],
  "securite": [
    "Aucune indication de la présence d'un détecteur de monoxyde de carbone",
    "Détecteur de fumée installé"
  ],
  "quartier": [
    "Au cœur d'Avignon intra-muros.",
    "L'adresse exacte est communiquée après la réservation."
  ],
  "reservation": "https://chevalier-pms.com/shop/cmsq0pa51000104l8rluc0008#reservation"
},
{
  "slug": "le-havre",
  "nom": "Le Havre",
  "lieu": "Avignon intra-muros",
  "type": "Appartement entier",
  "titrePage": "Le Havre — Appartement à Avignon intra-muros | Réservation directe | Chevalier Conciergerie",
  "accroche": "Un appartement climatisé avec patio, au calme en plein hypercentre d'Avignon, pour deux voyageurs.",
  "details": [
    "2 voyageurs",
    "1 chambre",
    "1 lit",
    "1 salle de bain"
  ],
  "note": {
    "valeur": "",
    "avis": 0,
    "nouveau": true,
    "categories": []
  },
  "photo": {
    "src": "/logements/le-havre/photo-carte.jpg",
    "largeur": 720,
    "hauteur": 900,
    "alt": "Le Havre, Avignon"
  },
  "mosaique": [
    "chambre-1",
    "salon-1",
    "exterieur-1",
    "espace-repas-1",
    "exterieur-2"
  ],
  "pieces": [
    {
      "piece": "Salon",
      "photos": [
        {
          "fichier": "salon-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "salon-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Cuisine",
      "photos": [
        {
          "fichier": "cuisine-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "cuisine-2",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Espace repas",
      "photos": [
        {
          "fichier": "espace-repas-1",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Chambre",
      "photos": [
        {
          "fichier": "chambre-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2",
          "largeur": 1200,
          "hauteur": 1600
        }
      ],
      "equipements": [
        "Canapé-lit"
      ]
    },
    {
      "piece": "Salle de bain",
      "photos": [
        {
          "fichier": "salle-de-bain-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-2",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-3",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    },
    {
      "piece": "Extérieur",
      "photos": [
        {
          "fichier": "exterieur-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "exterieur-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "exterieur-3",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Autres photos",
      "photos": [
        {
          "fichier": "autres-photos-1",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "autres-photos-2",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    }
  ],
  "couchages": [
    {
      "piece": "Chambre",
      "lit": "1 canapé convertible",
      "photo": "chambre-1"
    }
  ],
  "description": {
    "intro": [
      "Simplifiez-vous la vie dans ce logement paisible et central."
    ],
    "titre": "Le logement",
    "texte": "",
    "listes": [],
    "fin": []
  },
  "equipements": [
    {
      "categorie": "Salle de bain",
      "elements": [
        "Eau chaude"
      ]
    },
    {
      "categorie": "Chambre et linge",
      "elements": [
        "Produits de base",
        "Cintres",
        "Linge de lit",
        "Espace de rangement pour les vêtements"
      ]
    },
    {
      "categorie": "Divertissement",
      "elements": [
        "Télévision"
      ]
    },
    {
      "categorie": "Chauffage et climatisation",
      "elements": [
        "Climatisation",
        "Chauffage"
      ]
    },
    {
      "categorie": "Sécurité à la maison",
      "elements": [
        "Détecteur de fumée"
      ]
    },
    {
      "categorie": "Internet et bureau",
      "elements": [
        "Wifi"
      ]
    },
    {
      "categorie": "Cuisine et salle à manger",
      "elements": [
        "Cuisine",
        "Réfrigérateur",
        "Tout le nécessaire pour cuisiner",
        "Vaisselle et couverts",
        "Congélateur",
        "Verres à vin",
        "Plaques de cuisson",
        "Table à manger"
      ]
    },
    {
      "categorie": "Extérieur",
      "elements": [
        "Espace repas en plein air"
      ]
    }
  ],
  "nonInclus": [
    "Lave-linge"
  ],
  "arrivee": "entre 17:00 et 21:00",
  "depart": "",
  "annulation": "Annulation gratuite jusqu'à la veille de l'arrivée, 17:00. Ensuite, toutes les nuits sont remboursées sauf la première.",
  "numeroEnregistrement": "840070033693V",
  "reglement": [
    "Jusqu'à 2 voyageurs",
    "Pas d'animaux (animaux d'assistance uniquement)",
    "Non fumeur (le vapotage et les cigarettes électroniques sont également concernés)",
    "Calme à respecter de 22:00 à 08:00",
    "Pas de fête ni de soirée",
    "Aucune photographie commerciale (les tournages à des fins commerciales sont également concernés)"
  ],
  "securite": [
    "Aucune indication de la présence d'un détecteur de monoxyde de carbone",
    "Détecteur de fumée installé"
  ],
  "quartier": [
    "Au cœur d'Avignon intra-muros.",
    "L'adresse exacte est communiquée après la réservation."
  ],
  "reservation": "https://chevalier-pms.com/shop/cmt79uy5z000604jsv3zr9gth#reservation"
},
{
  "slug": "la-coulisse",
  "nom": "La Coulisse",
  "lieu": "Avignon intra-muros",
  "type": "Appartement entier",
  "titrePage": "La Coulisse — Appartement à Avignon intra-muros | Réservation directe | Chevalier Conciergerie",
  "accroche": "Un studio rénové et lumineux en rez-de-chaussée, dans une rue calme du cœur d'Avignon, pour deux voyageurs.",
  "details": [
    "2 voyageurs",
    "1 chambre",
    "1 lit",
    "1 salle de bain"
  ],
  "note": {
    "valeur": "4,88",
    "avis": 8,
    "nouveau": false,
    "categories": [
      {
        "nom": "Propreté",
        "valeur": "4,8"
      },
      {
        "nom": "Précision",
        "valeur": "4,6"
      },
      {
        "nom": "Arrivée",
        "valeur": "5,0"
      },
      {
        "nom": "Communication",
        "valeur": "4,8"
      },
      {
        "nom": "Emplacement",
        "valeur": "4,9"
      },
      {
        "nom": "Qualité-prix",
        "valeur": "4,8"
      }
    ]
  },
  "photo": {
    "src": "/logements/la-coulisse/photo-carte.jpg",
    "largeur": 720,
    "hauteur": 900,
    "alt": "La Coulisse, Avignon"
  },
  "mosaique": [
    "chambre-1",
    "espace-repas-1",
    "cuisine-1",
    "exterieur-1",
    "chambre-2"
  ],
  "pieces": [
    {
      "piece": "Cuisine",
      "photos": [
        {
          "fichier": "cuisine-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "cuisine-2",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-3",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "cuisine-4",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "cuisine-5",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Espace repas",
      "photos": [
        {
          "fichier": "espace-repas-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "espace-repas-2",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    },
    {
      "piece": "Chambre",
      "photos": [
        {
          "fichier": "chambre-1",
          "largeur": 1600,
          "hauteur": 1200
        },
        {
          "fichier": "chambre-2",
          "largeur": 1600,
          "hauteur": 747
        },
        {
          "fichier": "chambre-3",
          "largeur": 1600,
          "hauteur": 1212
        },
        {
          "fichier": "chambre-4",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Salle de bain",
      "photos": [
        {
          "fichier": "salle-de-bain-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-2",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-3",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-4",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "salle-de-bain-5",
          "largeur": 1600,
          "hauteur": 1200
        }
      ]
    },
    {
      "piece": "Extérieur",
      "photos": [
        {
          "fichier": "exterieur-1",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "exterieur-2",
          "largeur": 720,
          "hauteur": 1600
        },
        {
          "fichier": "exterieur-3",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "exterieur-4",
          "largeur": 721,
          "hauteur": 1600
        },
        {
          "fichier": "exterieur-5",
          "largeur": 1600,
          "hauteur": 721
        }
      ]
    },
    {
      "piece": "Autres photos",
      "photos": [
        {
          "fichier": "autres-photos-1",
          "largeur": 1600,
          "hauteur": 1067
        },
        {
          "fichier": "autres-photos-2",
          "largeur": 1600,
          "hauteur": 1151
        },
        {
          "fichier": "autres-photos-3",
          "largeur": 1200,
          "hauteur": 1600
        },
        {
          "fichier": "autres-photos-4",
          "largeur": 1200,
          "hauteur": 1600
        }
      ]
    }
  ],
  "couchages": [],
  "description": {
    "intro": [
      "Charmant studio entièrement rénové il y a 2 ans, alliant cachet et modernité, baigné de lumière grâce à sa grande fenêtre.",
      "Au rez-de-chaussée d'une rue calme intra-muros, en plein cœur d'Avignon : commerces, restaurants, Palais des Papes et théâtres à quelques minutes à pied. Tout se fait sans voiture.",
      "Un cocon lumineux pour découvrir Avignon et vivre le Festival au plus près !"
    ],
    "titre": "Le logement",
    "texte": "Appartement chaleureux et confortable, parfait pour découvrir Avignon tout en profitant du calme. Capacité maximale : 2 personnes Une caméra de surveillance est installée à l'intérieur de l'immeuble, pour des raisons de sécurité. Elle ne filme aucun espace privé. Pour les séjours de moyenne durée, un ménage supplémentaire peut être organisé sur demande. Nous serons ravis de vous accueillir pour votre séjour à Avignon.",
    "listes": [
      {
        "titre": "Couchage",
        "elements": [
          "1 lit double 160x190 cm"
        ]
      },
      {
        "titre": "Linge de maison fourni",
        "elements": [
          "Draps, housse de couette, taies d’oreiller",
          "Serviettes de bain",
          "Tapis de bain",
          "Torchon de cuisine"
        ]
      },
      {
        "titre": "Cuisine équipée",
        "elements": [
          "Plaque de cuisson",
          "Micro-ondes/Four",
          "Réfrigérateur",
          "Cafetière (capsules offertes)",
          "Vaisselle et nécessaire pour cuisiner"
        ]
      },
      {
        "titre": "Salle de bain",
        "elements": [
          "Douche",
          "gel douche fournis"
        ]
      },
      {
        "titre": "Équipements",
        "elements": [
          "WiFi gratuit et illimité",
          "TV avec accès Netflix",
          "Les frais de ménage incluent également le lavage et le blanchissage du linge."
        ]
      },
      {
        "titre": "Règlement intérieur",
        "elements": [
          "Résidence calme",
          "Fêtes et soirées interdites",
          "Maximum 2 personnes",
          "Logement non-fumeur",
          "Merci de limiter le bruit après 22h"
        ]
      }
    ],
    "fin": []
  },
  "equipements": [
    {
      "categorie": "Salle de bain",
      "elements": [
        "Produits de nettoyage",
        "Eau chaude",
        "Gel douche"
      ]
    },
    {
      "categorie": "Chambre et linge",
      "elements": [
        "Linge de lit",
        "Fer à repasser",
        "Espace de rangement pour les vêtements"
      ]
    },
    {
      "categorie": "Divertissement",
      "elements": [
        "Télévision"
      ]
    },
    {
      "categorie": "Chauffage et climatisation",
      "elements": [
        "Climatisation",
        "Ventilateur au plafond",
        "Chauffage"
      ]
    },
    {
      "categorie": "Sécurité à la maison",
      "elements": [
        "Détecteur de fumée"
      ]
    },
    {
      "categorie": "Internet et bureau",
      "elements": [
        "Wifi",
        "Espace de travail dédié"
      ]
    },
    {
      "categorie": "Cuisine et salle à manger",
      "elements": [
        "Cuisine",
        "Réfrigérateur",
        "Four à micro-ondes",
        "Tout le nécessaire pour cuisiner",
        "Vaisselle et couverts",
        "Bouilloire électrique",
        "Cafetière",
        "Verres à vin",
        "Plaques de cuisson",
        "Table à manger",
        "Café"
      ]
    },
    {
      "categorie": "Parking et installations",
      "elements": [
        "Stationnement payant sur place"
      ]
    }
  ],
  "nonInclus": [
    "Lave-linge"
  ],
  "arrivee": "entre 17:00 et 00:00",
  "depart": "avant 10:00",
  "annulation": "Annulation gratuite jusqu'à 5 jours avant l'arrivée. Ensuite, 50 % du prix des nuits est remboursé, sauf la première nuit.",
  "numeroEnregistrement": "840070026342F",
  "reglement": [
    "Jusqu'à 2 voyageurs",
    "Pas d'animaux (animaux d'assistance uniquement)",
    "Non fumeur (le vapotage et les cigarettes électroniques sont également concernés)",
    "Pas de fête ni de soirée"
  ],
  "securite": [
    "Aucune indication de la présence d'un détecteur de monoxyde de carbone",
    "Détecteur de fumée installé"
  ],
  "quartier": [
    "Au cœur d'Avignon intra-muros.",
    "L'adresse exacte est communiquée après la réservation."
  ],
  "reservation": "https://chevalier-pms.com/shop/cmsq4ydh2000x04lc33zm5zjb#reservation"
}
];

export const logementParSlug = (slug: string | undefined) => LOGEMENTS_VITRINE.find((l) => l.slug === slug);
