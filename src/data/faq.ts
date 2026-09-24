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
  personnalisée ») contredisait le bloc tarif de l'accueil.

  Chaque réponse doit rester sur une ligne "q" puis "a" : scripts/seo-routes.mjs
  les lit telles quelles pour le balisage FAQPage.
*/
export const faqConciergerie: QuestionFaq[] = [
  {
    q: "Quelle est votre commission ?",
    a: "25 % HT, prélevés uniquement sur ce que vous touchez vraiment. Les commissions des plateformes, le ménage et la taxe de séjour sont déduits d'abord : notre commission ne s'applique qu'au net qui reste, jamais au chiffre d'affaires brut. Le ménage est payé par le voyageur, pas par vous. Aucun frais caché.",
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

/*
  Franchise. Décision de Victor (24 septembre 2026) : aucun chiffre public —
  ni droit d'entrée, ni redevance. Le modèle se détaille à l'appel. La page
  vend ce qui est compris, pas un prix.
*/
export const faqFranchise: QuestionFaq[] = [
  {
    q: "Faut-il de l'expérience en conciergerie ?",
    a: "Non. La formation part du début : trouver ses premiers propriétaires, fixer ses prix, monter son équipe de ménage, tenir la relation voyageur, suivre sa comptabilité. Ce qui compte n'est pas le diplôme, c'est d'être présent sur sa ville et de répondre quand on vous appelle.",
  },
  {
    q: "Combien coûte l'entrée dans le réseau ?",
    a: "Le droit d'entrée et la redevance sont détaillés lors du premier appel, avec le contrat et le modèle économique complet. Nous préférons en parler une fois que votre ville et votre situation sont sur la table, parce que ce qui compte est ce que ça rapporte chez vous, pas le montant seul.",
  },
  {
    q: "Comment est définie ma zone ?",
    a: "Votre territoire vous est réservé : aucun autre membre du réseau ne peut s'y implanter. Le découpage tient compte de la taille de la ville et du nombre de logements saisonniers qu'elle compte, pour qu'une zone reste exploitable par une seule personne.",
  },
  {
    q: "Combien de temps avant mon premier mandat ?",
    a: "La formation se suit à votre rythme, la plupart la bouclent en trois à quatre semaines. La prospection commence pendant, pas après : l'objectif est d'avoir signé votre premier propriétaire avant la fin du parcours.",
  },
  {
    q: "Peut-on démarrer en gardant son emploi ?",
    a: "Les premiers mois, oui, beaucoup le font. La conciergerie demande de la disponibilité aux entrées et aux sorties, mais le reste se pilote depuis un téléphone. Le passage à temps plein vient en général avec le cinquième ou le sixième mandat.",
  },
  {
    q: "Le logiciel est-il vraiment compris ?",
    a: "Oui, l'accès à Chevalier PMS est inclus pendant toute la durée du contrat, sans abonnement séparé. C'est le logiciel que nous utilisons nous-mêmes tous les jours : calendrier multicanal, suivi des ménages, messagerie voyageurs, CRM propriétaires.",
  },
  {
    q: "Quel statut juridique faut-il créer ?",
    a: "Une société ou une entreprise individuelle à votre nom : vous restez chef d'entreprise, la franchise n'est pas un contrat de travail. Nous vous indiquons le montage qui convient à votre situation lors du dossier, mais le choix et sa validation par votre comptable vous appartiennent.",
  },
  {
    q: "Qui recrute et paie l'équipe de ménage ?",
    a: "Vous. La formation couvre exactement ça : où trouver des prestataires fiables dans votre ville, comment les rémunérer, comment contrôler la qualité sans repasser derrière eux. Le ménage est refacturé au voyageur, donc il ne pèse pas sur votre trésorerie.",
  },
  {
    q: "Que se passe-t-il si je veux arrêter ?",
    a: "Le contrat prévoit ses conditions de sortie, et elles sont dans le dossier que vous recevez avant toute signature, pas découvertes en cours de route. Vous conservez votre société et vos relations commerciales ; ce que vous rendez, c'est l'usage de la marque, du logiciel et du territoire.",
  },
  {
    q: "Combien de franchisés comptez-vous ouvrir ?",
    a: "Peu, et lentement. Un réseau qui recrute vite recrute mal, et chaque franchisé mal accompagné abîme le nom de tous les autres. Les premiers entrants bénéficient de conditions que nous ne reconduirons pas, précisément parce qu'ils prennent le risque d'arriver les premiers.",
  },
  {
    q: "Pourquoi ouvrir un réseau plutôt que de grandir seul ?",
    a: "Parce que la conciergerie est un métier de présence. On ne gère pas Bordeaux depuis Avignon : il faut quelqu'un qui connaisse la ville, qui puisse être sur place en vingt minutes et que les propriétaires croisent au marché. Une agence à distance ne tient pas cette promesse, un franchisé local si.",
  },
];
