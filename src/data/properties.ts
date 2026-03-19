import appartCosyLumineux from "@/assets/appart-cosy-lumineux.png";
import appartCosyLumineux2 from "@/assets/appart-cosy-lumineux-2.png";
import appartCosyLumineux3 from "@/assets/appart-cosy-lumineux-3.jpg";
import appartCosyLumineux4 from "@/assets/appart-cosy-lumineux-4.jpg";

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
}

export const properties: Property[] = [
  {
    slug: "appartement-cosy-lumineux",
    name: "L'Atelier – Lumineux & Parking",
    shortDescription: "Studio chaleureux aux portes d'Avignon intra-muros, baigné de lumière naturelle.",
    description: "Bienvenue dans ce charmant studio, à deux pas d'Avignon intra-muros, où cachet et luminosité s'allient pour créer un espace chaleureux et accueillant. Une grande fenêtre inonde la pièce principale de lumière naturelle, offrant une sensation d'espace et de bien-être. Situé à quelques mètres des remparts, dans une résidence pleine de charme, ce studio bénéficie d'un emplacement privilégié.",
    location: "Avignon, proche remparts",
    guests: 2,
    bedrooms: "Studio",
    beds: 1,
    bathrooms: 1,
    priceFrom: 45,
    images: [appartCosyLumineux, appartCosyLumineux2, appartCosyLumineux3, appartCosyLumineux4],
    amenities: ["Cuisine équipée", "TV", "Parking gratuit", "Linge fourni", "Micro-ondes", "Réfrigérateur"],
    highlights: ["Lumineux", "Proche remparts", "Parking gratuit"],
    airbnbUrl: "https://www.airbnb.fr/rooms/1621783028951716813",
  },
  {
    slug: "appartement-coeur-avignon",
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
    name: "La Loge – Lumineux & Parking",
    shortDescription: "T2 entièrement rénové de 57m², lumineux et moderne, au cœur d'Avignon.",
    description: "Bienvenue dans ce charmant T2 entièrement rénové au cœur d'Avignon, alliant cachet et modernité. De grandes fenêtres lumineuses ainsi qu'une cuisine bien équipée, le tout dans un bel appartement de 57m².",
    location: "Avignon intra-muros",
    guests: 4,
    bedrooms: "2 chambres",
    beds: 2,
    bathrooms: 1,
    priceFrom: 65,
    images: [appartProvencal2, appartProvencal1, appartProvencal3, appartProvencal4],
    amenities: ["WiFi gratuit", "Cuisine équipée", "Climatisation", "Linge fourni", "TV", "Machine à café", "Parking gratuit"],
    highlights: ["Lumineux", "57m² rénové", "Parking gratuit"],
    airbnbUrl: "https://www.airbnb.fr/rooms/1638378037680518333",
  },
];
