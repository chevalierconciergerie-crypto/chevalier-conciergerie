/*
  Franchise — source unique du contenu, lue par la section de l'accueil
  (components/accueil/Franchise.tsx) et par la page /franchise.

  Choix de Victor, 24 septembre 2026 : la page ne publie aucun chiffre. Ni
  droit d'entrée, ni redevance, ni durée de contrat. Elle présente ce qui est
  compris dans le réseau et renvoie vers un appel, où le modèle se détaille.
*/

/** Destination du bouton « Réserver un appel ». Un lien Calendly le remplacera. */
export const LIEN_APPEL = "/contact";

export interface ElementInclus {
  nom: string;
  texte: string;
}

export const INCLUS: ElementInclus[] = [
  {
    nom: "La marque",
    texte:
      "Le nom Chevalier Conciergerie sur votre ville, et personne d'autre du réseau dessus. Votre territoire vous est réservé, découpé selon la taille de la ville.",
  },
  {
    nom: "La formation",
    texte:
      "Plus de quarante heures, du premier propriétaire signé au dixième : prospection, tarification, ménage, relation voyageur, comptabilité. Rien n'est laissé à votre interprétation.",
  },
  {
    nom: "Le logiciel",
    texte:
      "Chevalier PMS, celui que nous utilisons chaque jour : calendrier multicanal, suivi des ménages, messagerie voyageurs, CRM propriétaires. Vous ne le louez pas, il est compris.",
  },
  {
    nom: "Le site et le référencement",
    texte:
      "Votre propre site, bâti sur le nôtre, et la stratégie de référencement qui va avec. Objectif : qu'un propriétaire de votre ville vous trouve sur Google sans vous connaître.",
  },
  {
    nom: "Le kit marketing",
    texte:
      "Logo, cartes de visite, flyers, modèles de publications, charte complète. De quoi être crédible au premier rendez-vous, pas au dixième.",
  },
  {
    nom: "L'accompagnement",
    texte:
      "Des points réguliers, un accès direct quand ça coince, et un séminaire annuel de trois jours où tout le réseau se retrouve pour confronter ce qui marche.",
  },
];

export interface Profil {
  nom: string;
  texte: string;
}

export const PROFILS: Profil[] = [
  {
    nom: "Vous partez de zéro",
    texte:
      "Aucune expérience de la location courte durée. La formation commence au commencement, et la prospection démarre pendant, pas après.",
  },
  {
    nom: "Vous gérez déjà quelques biens",
    texte:
      "Seul, avec un tableur et beaucoup de bonne volonté. Ce que vous venez chercher, c'est la méthode, l'outil et le nom qui rassure les propriétaires.",
  },
  {
    nom: "Vous êtes déjà dans l'immobilier",
    texte:
      "Agent, investisseur, gestionnaire. La conciergerie prolonge ce que vous faites déjà et se nourrit du réseau que vous avez construit.",
  },
];

export interface EtapeFranchise {
  numero: string;
  nom: string;
  texte: string;
}

export const ETAPES_FRANCHISE: EtapeFranchise[] = [
  {
    numero: "01",
    nom: "Un premier appel",
    texte: "Votre ville, votre situation, ce que vous voulez en faire. Sans engagement et sans discours de vente.",
  },
  {
    numero: "02",
    nom: "Le dossier",
    texte: "Le modèle économique, le contrat et les chiffres, transmis en entier pour que vous décidiez à tête reposée.",
  },
  {
    numero: "03",
    nom: "La formation",
    texte: "Les quarante heures, à votre rythme, avec vos outils ouverts et votre première prospection déjà lancée.",
  },
  {
    numero: "04",
    nom: "L'ouverture",
    texte: "Votre site en ligne, vos logiciels en main, vos premiers propriétaires. Nous restons à côté, pas derrière.",
  },
];
