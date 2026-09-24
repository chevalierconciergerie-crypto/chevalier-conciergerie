/*
  Franchise — source unique du contenu, lue par la section de l'accueil
  (components/accueil/Franchise.tsx) et par la page /franchise.

  Choix de Victor, 24 septembre 2026 : la page ne publie aucun chiffre. Ni
  droit d'entrée, ni redevance, ni durée de contrat. Elle présente ce qui est
  compris dans le réseau et renvoie vers un appel, où le modèle se détaille.

  Deuxième passe : les six éléments ne sont plus des cartes mais une liste
  numérotée à filets, et le déroulé devient une vraie chronologie verticale
  du premier appel à l'ouverture — Victor trouvait la première version trop
  uniforme, trois grilles de cartes empilées.
*/

/** Destination du bouton « Réserver un appel ». Un lien Calendly le remplacera. */
export const LIEN_APPEL = "/contact";

export interface ElementInclus {
  nom: string;
  texte: string;
}

export const INCLUS: ElementInclus[] = [
  {
    nom: "La marque et le territoire",
    texte:
      "Le nom Chevalier Conciergerie sur votre ville, et personne d'autre du réseau dessus. Le découpage tient compte de la taille de la commune et du nombre de meublés qu'elle compte, pour qu'une zone reste exploitable par une seule personne.",
  },
  {
    nom: "Plus de quarante heures de formation",
    texte:
      "Du premier propriétaire signé au dixième : prospection, tarification, montage de l'équipe de ménage, relation voyageur, comptabilité, réglementation locale. Rien n'est laissé à votre interprétation.",
  },
  {
    nom: "Le logiciel, pas une licence",
    texte:
      "Chevalier PMS, celui que nous utilisons chaque jour sur nos propres logements : calendrier multicanal, suivi des ménages, messagerie voyageurs, CRM propriétaires. Compris pendant toute la durée du contrat, sans abonnement séparé.",
  },
  {
    nom: "Votre site et votre référencement",
    texte:
      "Un site bâti sur le nôtre, à votre ville, avec la stratégie de référencement qui va avec. L'objectif est simple : qu'un propriétaire de votre commune vous trouve sur Google sans jamais avoir entendu parler de vous.",
  },
  {
    nom: "Le kit marketing complet",
    texte:
      "Logo, cartes de visite, flyers, modèles de publications, charte de marque. De quoi être crédible au premier rendez-vous, pas au dixième.",
  },
  {
    nom: "Un accompagnement qui ne s'arrête pas",
    texte:
      "Des points réguliers, un accès direct quand ça coince, et un séminaire annuel de trois jours où tout le réseau se retrouve pour confronter ce qui marche et ce qui ne marche pas.",
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
      "Aucune expérience de la location courte durée. La formation commence au commencement, et la prospection démarre pendant le parcours, pas après.",
  },
  {
    nom: "Vous gérez déjà quelques biens",
    texte:
      "Seul, avec un tableur et beaucoup de bonne volonté. Ce que vous venez chercher, c'est la méthode, l'outil, et un nom qui rassure les propriétaires en face de vous.",
  },
  {
    nom: "Vous êtes déjà dans l'immobilier",
    texte:
      "Agent, investisseur, gestionnaire. La conciergerie prolonge ce que vous faites déjà et se nourrit du réseau que vous avez mis des années à construire.",
  },
];

export interface EtapeChrono {
  numero: string;
  nom: string;
  duree: string;
  texte: string;
}

/*
  Le parcours complet. L'étape 03 n'est pas une politesse commerciale : la loi
  Doubin (article L330-3 du code de commerce) impose de remettre le document
  d'information précontractuelle au moins vingt jours avant toute signature ou
  tout versement. L'afficher est un argument de sérieux autant qu'une obligation.
*/
export const CHRONOLOGIE: EtapeChrono[] = [
  {
    numero: "01",
    nom: "Le premier appel",
    duree: "45 minutes",
    texte:
      "Votre ville, votre situation, ce que vous voulez en faire. Nous regardons ensemble si le territoire est libre et s'il a de quoi faire vivre une conciergerie. Sans engagement et sans discours de vente.",
  },
  {
    numero: "02",
    nom: "Le dossier complet",
    duree: "Sous 48 heures",
    texte:
      "Le modèle économique, le contrat, le droit d'entrée, la redevance, le détail de ce qui est compris. Tout est transmis en entier, y compris ce qui n'est pas confortable à lire.",
  },
  {
    numero: "03",
    nom: "Vingt jours pour réfléchir",
    duree: "20 jours minimum",
    texte:
      "La loi Doubin impose de vous remettre le document d'information précontractuelle au moins vingt jours avant toute signature et tout versement. Nous ne raccourcissons pas ce délai, et nous répondons à vos questions pendant.",
  },
  {
    numero: "04",
    nom: "La signature",
    duree: "Une demi-journée",
    texte:
      "Le contrat de franchise, le territoire acté sur la carte, vos accès au logiciel ouverts et votre site mis en chantier le jour même.",
  },
  {
    numero: "05",
    nom: "La formation",
    duree: "Plus de 40 heures",
    texte:
      "À votre rythme, la plupart la bouclent en trois à quatre semaines. La prospection commence pendant, pas après : l'objectif est d'avoir signé votre premier propriétaire avant la fin du parcours.",
  },
  {
    numero: "06",
    nom: "L'ouverture",
    duree: "Et après",
    texte:
      "Votre site en ligne, vos outils en main, vos premiers mandats signés. Les points réguliers commencent, et vous retrouvez le réseau au séminaire annuel. Nous restons à côté, pas derrière.",
  },
];
