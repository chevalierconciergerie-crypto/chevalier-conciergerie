/*
  Questions fréquentes, source unique : les pages /conciergerie et
  /sous-location (et leur balisage FAQPage) lisent ces listes, comme les FAQ
  de l'accueil. Une réponse corrigée ici l'est partout — c'est ce qui évite
  qu'une page annonce un tarif et une autre un autre.
*/
export interface QuestionFaq {
  q: string;
  a: string;
}

/*
  Première réponse alignée sur le tarif annoncé par Victor le 13 septembre
  2026 : 25 % HT, sur le net du propriétaire. L'ancienne réponse (« commission
  personnalisée ») contredisait le bloc tarif de l'accueil. Le TTC est indiqué
  parce que la plupart des propriétaires sont des particuliers.

  Chaque réponse doit rester sur une ligne "q" puis "a" : scripts/seo-routes.mjs
  les lit telles quelles pour le balisage FAQPage.
*/
export const faqConciergerie: QuestionFaq[] = [
  {
    q: "Quelle est votre commission ?",
    a:"25 % HT, soit 30 % TTC, prélevés uniquement sur ce que vous touchez vraiment. Les commissions des plateformes, le ménage et la taxe de séjour sont déduits d'abord : notre commission ne s'applique qu'au net qui reste, jamais au chiffre d'affaires brut. Le ménage est payé par le voyageur, pas par vous. Aucun frais caché.",
  },
  {
    q: "La taxe de séjour est-elle comprise dans vos honoraires ?",
    a: "Non. La taxe de séjour est collectée auprès des voyageurs pour le compte de la collectivité et reversée intégralement : elle n'est jamais comptée comme un revenu ni dans notre commission.",
  },
  {
    q: "Que comprend exactement la prestation de conciergerie ?",
    a: "Création et optimisation de vos annonces, gestion des réservations et des voyageurs, accueil, ménage professionnel, linge hôtelier, maintenance courante et suivi de vos revenus. Vous n'avez rien à gérer.",
  },
  {
    q: "Dans quelles zones intervenez-vous ?",
    a: "Principalement à Avignon, Villeneuve-lès-Avignon, Les Angles et leurs environs immédiats. Contactez-nous pour vérifier que votre bien est dans notre zone.",
  },
  {
    q: "Comment et quand suis-je payé ?",
    a: "Vous recevez vos revenus selon la périodicité convenue dans le mandat, accompagnés d'un reporting clair détaillant les réservations, les frais et le montant qui vous revient.",
  },
  {
    q: "Dois-je m'engager sur une longue durée ?",
    a: "Le mandat précise la durée et les conditions de résiliation, avec un préavis raisonnable. Les réservations déjà confirmées au moment d'un arrêt sont menées à leur terme.",
  },
  {
    q: "Faut-il une autorisation pour louer en courte durée à Avignon ?",
    a: "Depuis le 1er janvier 2026, tout meublé de tourisme à Avignon doit être déclaré et enregistré, sans exception. S'y ajoute une autorisation temporaire de changement d'usage pour tout logement qui n'est pas une résidence principale, sur l'ensemble du territoire communal et pour les particuliers comme pour les sociétés. Les deux démarches passent par la plateforme changementdusage.fr/avignon. Nous vous orientons et constituons le dossier.",
  },
  {
    q: "Combien de jours puis-je louer ma résidence principale à Avignon ?",
    a: "90 jours par année civile, et non 120. Avignon a abaissé le plafond national par délibération du 22 février 2025, une faculté que le Code du tourisme laisse aux communes. En contrepartie, une résidence principale n'est pas soumise à l'autorisation de changement d'usage. Les règles évoluant, vérifiez votre situation auprès de la mairie.",
  },
  {
    q: "Villeneuve-lès-Avignon et Les Angles suivent-elles les mêmes règles ?",
    a: "Non. Le régime d'enregistrement et de changement d'usage décrit ici est propre à la commune d'Avignon. Villeneuve-lès-Avignon et Les Angles, situées dans le Gard, relèvent de dispositifs distincts. Nous vérifions le cadre applicable à votre bien avant toute mise en ligne.",
  },
];

export const faqSousLocation: QuestionFaq[] = [
  {
    q: "Quel est le concept ?",
    a: "Nous devenons votre locataire principal. On loue votre bien à l'année pour y accueillir des voyageurs de passage. Vous touchez vos revenus, on gère l'exploitation.",
  },
  {
    q: "Est-ce autorisé ?",
    a: "Oui. La pratique est totalement légale. Elle est encadrée par un contrat spécifique qui nous autorise à sous-louer votre logement en toute transparence.",
  },
  {
    q: "Qui assure la gestion ?",
    a: "Nous gérons tout de A à Z. Ménage professionnel, maintenance et accueil des occupants. Vous n'avez plus aucune contrainte opérationnelle, on est votre unique interlocuteur.",
  },
  {
    q: "Le logement doit-il être meublé ?",
    a: "Pas forcément. On peut récupérer votre bien vide et l'équiper de A à Z. Le but est d'offrir un logement clé en main, équipé et entretenu aux standards hôteliers.",
  },
  {
    q: "Qui s'occupe des démarches obligatoires à Avignon ?",
    a: "Nous. Depuis le 1er janvier 2026, tout meublé de tourisme à Avignon doit être déclaré et enregistré, et une autorisation temporaire de changement d'usage s'ajoute pour tout logement qui n'est pas une résidence principale — le régime vise explicitement les personnes morales, donc nous. C'est la différence concrète avec la conciergerie : en sous-location, ces démarches ne reposent plus sur vous.",
  },
  {
    q: "Le plafond de 90 jours par an s'applique-t-il à mon bien ?",
    a: "Non. Ce plafond, abaissé de 120 à 90 jours par Avignon en février 2025, ne concerne que la résidence principale de celui qui loue. Un bien confié en sous-location n'est pas votre résidence principale : il n'a pas de limite de nuitées, mais il entre dans le champ de l'autorisation de changement d'usage.",
  },
  {
    q: "Puis-je confier un bien dont je suis moi-même locataire ?",
    a: "Uniquement avec l'accord écrit de votre propriétaire. Sous-louer sans cet accord expose à la résiliation de votre bail. Si vous êtes dans ce cas, dites-le-nous d'emblée : nous vérifions ce que votre contrat autorise avant d'aller plus loin.",
  },
  {
    q: "Conciergerie ou sous-location : laquelle choisir ?",
    a: "La conciergerie vous laisse propriétaire exploitant : vos revenus varient avec l'occupation et vous nous versez une commission. La sous-location vous verse un loyer fixe quelle que soit l'occupation, et nous portons le risque. La première rapporte davantage sur une bonne saison, la seconde ne dépend pas de la saison. Nous détaillons la comparaison chiffrée dans notre article sur le choix entre les deux formules.",
  },
];
