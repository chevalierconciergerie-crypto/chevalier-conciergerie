/*
  Avis réels, recopiés mot pour mot depuis la fiche Google « CHEVALIER
  CONCIERGERIE » (5,0/5 · 12 avis) le 2026-07-29.

  Source unique : le carrousel des pages intérieures et le ruban de l'accueil
  lisent tous deux cette liste. Les six autres avis de la fiche ne sont pas
  encore recopiés ici ; le total affiché reste celui de la fiche.
*/
export interface Avis {
  id: number;
  name: string;
  rating: number;
  text: string;
}

export const AVIS_TOTAL_GOOGLE = 12;

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/CHEVALIER+CONCIERGERIE/@43.8680214,4.8327906,17z";

export const avis: Avis[] = [
  {
    id: 1,
    name: "Clément Pailler",
    rating: 5,
    text: "J'ai fait appel à Chevalier Conciergerie pour mon appartement et je suis absolument ravi de la manière dont j'ai été accompagné par Victor. Je recommande à 100 % !",
  },
  {
    id: 2,
    name: "Baptiste Mailharrancin",
    rating: 5,
    text: "Je confie mon appartement en centre-ville d'Avignon à CHEVALIER Conciergerie depuis plusieurs mois et je ne regrette pas. Communication fluide, réactivité au top et mes voyageurs sont toujours très bien accueillis. Je ne m'occupe plus de rien et mes revenus locatifs ont augmenté.",
  },
  {
    id: 3,
    name: "Sandrine David",
    rating: 5,
    text: "Très satisfait de Chevalier Conciergerie ! Équipe professionnelle, réactive et à l'écoute. Service de qualité et communication au top. Je recommande sans hésiter.",
  },
  {
    id: 4,
    name: "felicien arnoux",
    rating: 5,
    text: "Excellente conciergerie, très professionnelle et à l'écoute des clients. Je recommande vivement pour tout projet de location courte durée sur le secteur Gard et Vaucluse.",
  },
  {
    id: 5,
    name: "Solitchi",
    rating: 5,
    text: "Très satisfait de mon expérience avec Victor sur Avignon. Professionnalisme, réactivité et conseils au top du début à la fin.",
  },
  {
    id: 6,
    name: "Pierrick",
    rating: 5,
    text: "Excellente conciergerie sur Avignon, je recommande CHEVALIER Conciergerie.",
  },
];
