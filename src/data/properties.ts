import appartCoeurAvignon from "@/assets/appart-coeur-avignon.png";
import appartCoeurAvignon2 from "@/assets/appart-coeur-avignon-2.jpg";
import appartCoeurAvignon3 from "@/assets/appart-coeur-avignon-3.png";
import appartCoeurAvignon4 from "@/assets/appart-coeur-avignon-4.png";

import appartRenoveIntramuros from "@/assets/appart-renove-intramuros.jpg";
import appartRenoveIntramuros2 from "@/assets/appart-renove-intramuros-2.jpg";
import appartRenoveIntramuros3 from "@/assets/appart-renove-intramuros-3.jpg";
import appartRenoveIntramuros4 from "@/assets/appart-renove-intramuros-4.jpg";

import appartProvencal1 from "@/assets/appart-provencal-1.png";
import appartProvencal2 from "@/assets/appart-provencal-2.jpg";
import appartProvencal3 from "@/assets/appart-provencal-3.jpg";
import appartProvencal4 from "@/assets/appart-provencal-4.jpg";

import authentique1 from "@/assets/authentique-1.jpg";
import central1 from "@/assets/central-1.jpg";

import epi from "@/assets/epi.avif";
import laCoulisse from "@/assets/la-coulisse.avif";
import leVernet from "@/assets/le-vernet.jpg";
import hypercentre from "@/assets/hypercentre.avif";

export interface Property {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  location: string;
  guests: number;
  bedrooms: string;
  beds: number;
  bathrooms: number;
  priceFrom: number;
  images: string[];
  amenities: string[];
  highlights: string[];
  airbnbUrl: string;
  /** ID Beds24 du logement (propid) — sert au bouton "Réserver" par bien. À renseigner. */
  beds24PropId?: string;
}

export const properties: Property[] = [
  {
    slug: "appartement-coeur-avignon",
    beds24PropId: "322449",
    name: "La Scène – Lumineux – Cœur d'Avignon",
    shortDescription: "Studio rénové avec poutres apparentes et vue sur les toits, en plein centre historique.",
    description: "Bienvenue dans ce charmant studio entièrement rénové au cœur d'Avignon intra-muros, alliant cachet et modernité. Poutres apparentes, belle hauteur sous plafond et grande fenêtre lumineuse avec vue sur les toits et les pierres anciennes. Situé au 2ème étage d'une rue calme intra-muros, commerces, restaurants, Les Halles, théâtres et gare SNCF sont accessibles à pied en quelques minutes.",
    location: "Avignon intra-muros",
    guests: 2,
    bedrooms: "Studio",
    beds: 1,
    bathrooms: 1,
    priceFrom: 45,
    images: [appartCoeurAvignon, appartCoeurAvignon2, appartCoeurAvignon3, appartCoeurAvignon4],
    amenities: ["WiFi gratuit", "Netflix", "Cuisine équipée", "Cafetière", "Linge fourni", "Cour intérieure vélos"],
    highlights: ["Poutres apparentes", "Vue sur les toits", "Netflix inclus"],
    airbnbUrl: "https://www.airbnb.fr/rooms/1619568173869846739",
  },
  {
    slug: "appartement-renove-intramuros",
    beds24PropId: "322462",
    name: "L'Intramuros – Charmant & Climatisé",
    shortDescription: "Studio design entièrement rénové avec climatisation, au cœur d'Avignon.",
    description: "Bienvenue dans ce studio chaleureux et fonctionnel, entièrement rénové avec soin pour vous offrir un séjour confortable et agréable. Situé dans un quartier calme et pratique, ce logement combine design moderne, équipements complets et ambiance cosy. Coin nuit douillet avec literie de qualité, cuisine entièrement équipée, salle de bain élégante avec douche à effet pluie.",
    location: "Avignon intra-muros",
    guests: 2,
    bedrooms: "Studio",
    beds: 1,
    bathrooms: 1,
    priceFrom: 45,
    images: [appartRenoveIntramuros, appartRenoveIntramuros2, appartRenoveIntramuros3, appartRenoveIntramuros4],
    amenities: ["Climatisation", "Cuisine complète", "Four", "Machine à café", "Sèche-cheveux", "Fer à repasser"],
    highlights: ["Climatisation", "Design moderne", "Douche effet pluie"],
    airbnbUrl: "https://www.airbnb.fr/rooms/1444130890507558607",
  },
  {
    slug: "appartement-provencal-charme",
    beds24PropId: "322497",
    name: "La Loge – Lumineux & Parking",
    shortDescription: "T2 entièrement rénové de 57m², lumineux et moderne, au cœur d'Avignon.",
    description: "Bienvenue dans ce charmant T2 entièrement rénové au cœur d'Avignon, alliant cachet et modernité. De grandes fenêtres lumineuses ainsi qu'une cuisine bien équipée, le tout dans un bel appartement de 57m².",
    location: "Avignon intra-muros",
    guests: 4,
    bedrooms: "2 chambres",
    beds: 2,
    bathrooms: 1,
    priceFrom: 65,
    images: [appartProvencal3, appartProvencal4, appartProvencal2, appartProvencal1],
    amenities: ["WiFi gratuit", "Cuisine équipée", "Climatisation", "Linge fourni", "TV", "Machine à café", "Parking gratuit"],
    highlights: ["Lumineux", "57m² rénové", "Parking gratuit"],
    airbnbUrl: "https://www.airbnb.fr/rooms/1638378037680518333",
  },
  {
    slug: "authentique-palais-des-papes",
    beds24PropId: "322500",
    name: "L'Authentique – 2 min Palais des Papes",
    shortDescription: "Appartement de caractère à 2 minutes du Palais des Papes, en plein cœur d'Avignon.",
    description: "Appartement authentique au cachet préservé, à seulement 2 minutes à pied du Palais des Papes. Hauts plafonds, grandes verrières lumineuses, parquet d'origine et vue dégagée sur les façades historiques d'Avignon. L'emplacement idéal pour découvrir la cité des Papes, ses ruelles, ses restaurants et son patrimoine exceptionnel.",
    location: "Avignon intra-muros",
    guests: 2,
    bedrooms: "1 chambre",
    beds: 1,
    bathrooms: 1,
    priceFrom: 75,
    images: [authentique1],
    amenities: ["WiFi gratuit", "Cuisine équipée", "Linge fourni", "TV", "Chauffage"],
    highlights: ["2 min Palais des Papes", "Cachet authentique", "Lumineux"],
    airbnbUrl: "#",
  },
  {
    slug: "le-central-navette-parking",
    beds24PropId: "322531",
    name: "Le Central – Centre ville – Navette parking",
    shortDescription: "Appartement cosy en plein centre-ville d'Avignon, avec navette parking gratuite.",
    description: "Appartement chaleureux et fonctionnel en plein centre-ville d'Avignon, idéalement situé pour profiter de tous les commerces, restaurants et monuments à pied. Cuisine équipée, espace repas convivial et grandes fenêtres lumineuses. Service de navette parking inclus pour stationner facilement à proximité.",
    location: "Avignon centre-ville",
    guests: 2,
    bedrooms: "1 chambre",
    beds: 1,
    bathrooms: 1,
    priceFrom: 65,
    images: [central1],
    amenities: ["WiFi gratuit", "Cuisine équipée", "Micro-ondes", "Linge fourni", "Navette parking", "Chauffage"],
    highlights: ["Centre-ville", "Navette parking", "Cuisine équipée"],
    airbnbUrl: "#",
  },
  {
    slug: "le-vernet-hypercentre",
    beds24PropId: "330521",
    name: "Le Vernet – Hypercentre Avignon – Climatisé",
    shortDescription: "Appartement de caractère climatisé en hypercentre d'Avignon.",
    description: "",
    location: "Avignon hypercentre",
    guests: 0,
    bedrooms: "",
    beds: 0,
    bathrooms: 0,
    priceFrom: 0,
    images: [leVernet],
    amenities: [],
    highlights: [],
    airbnbUrl: "#",
  },
  {
    slug: "la-coulisse",
    beds24PropId: "326306",
    name: "La Coulisse – Lumineux – Cœur d'Avignon",
    shortDescription: "Studio lumineux au cœur d'Avignon.",
    description: "",
    location: "Avignon intra-muros",
    guests: 0,
    bedrooms: "",
    beds: 0,
    bathrooms: 0,
    priceFrom: 0,
    images: [laCoulisse],
    amenities: [],
    highlights: [],
    airbnbUrl: "#",
  },
  {
    slug: "epi",
    beds24PropId: "328000",
    name: "L'Epi – Climatisé – Wifi – 10 min centre-ville",
    shortDescription: "Logement climatisé avec Wifi à 10 minutes du centre-ville d'Avignon.",
    description: "",
    location: "Avignon – 10 min centre-ville",
    guests: 0,
    bedrooms: "",
    beds: 0,
    bathrooms: 0,
    priceFrom: 0,
    images: [epi],
    amenities: [],
    highlights: [],
    airbnbUrl: "#",
  },
  {
    slug: "hypercentre-local-velo",
    beds24PropId: "328217",
    name: "Hypercentre – Local à Vélo – Au calme & central !",
    shortDescription: "Appartement central et calme avec local à vélo, en hypercentre d'Avignon.",
    description: "",
    location: "Avignon hypercentre",
    guests: 0,
    bedrooms: "",
    beds: 0,
    bathrooms: 0,
    priceFrom: 0,
    images: [hypercentre],
    amenities: [],
    highlights: [],
    airbnbUrl: "#",
  },
];
