import LocalSeoPage from "./LocalSeoPage";
import heroImage from "@/assets/seo-avignon.jpg";

/*
  Page locale « conciergerie Aix-en-Provence ». L'accueil citait Aix comme zone
  desservie sans page dédiée.

  Règle de cette page : aucun chiffre de marché (prix, occupation, revenu) ni règle
  communale qui ne soit pas sourcé. Les pages d'Avignon s'appuient sur la délibération
  du conseil municipal ; ici aucune source équivalente n'a été vérifiée, donc le bloc
  de statistiques est omis et le cadre réglementaire est renvoyé à la mairie.
  À compléter avec des faits vérifiables avant d'ajouter des chiffres.

  L'image est celle d'Avignon, en attendant une photo d'Aix : l'alt décrit donc ce
  qu'elle montre réellement.
*/
const ConciergerieAixEnProvence = () => (
  <LocalSeoPage
    city="Aix-en-Provence"
    slug="conciergerie-aix-en-provence"
    heroImage={heroImage}
    heroAlt="Vue aérienne d'Avignon avec le Palais des Papes et le Pont d'Avignon"
    metaTitle="Conciergerie Airbnb Aix-en-Provence | Chevalier"
    metaDescription="Conciergerie Airbnb à Aix-en-Provence : gestion complète de votre location saisonnière, 25 % HT du net perçu, sans engagement. Accueil voyageurs, ménage, tarification. Estimation gratuite."
    metaKeywords="conciergerie Aix-en-Provence, gestion locative Aix, Airbnb Aix-en-Provence, location saisonnière Aix, conciergerie Provence"
    intro={{
      headline: "Conciergerie Airbnb\nà Aix-en-Provence",
      subheadline: "La gestion de votre location saisonnière confiée à une conciergerie provençale.",
      paragraphs: [
        "Aix-en-Provence est une ville universitaire et culturelle des Bouches-du-Rhône. Elle reçoit toute l'année un tourisme patrimonial, d'affaires et étudiant, et le Festival d'Aix, en juillet, rythme la haute saison.",
        "Chevalier Conciergerie intervient à Aix-en-Provence depuis sa base de Villeneuve-lès-Avignon, à environ une heure de route. Nous prenons en charge la gestion complète du bien : annonces, tarification, accueil des voyageurs, ménage, linge et maintenance, pour 25 % HT du net perçu par le propriétaire, sans engagement de durée.",
        "Chaque commune fixe ses propres règles pour les meublés de tourisme : enregistrement, autorisation de changement d'usage, plafond de jours pour une résidence principale. Ces règles évoluent. Nous vérifions auprès de la mairie d'Aix-en-Provence ce qui s'applique à votre bien avant toute mise en ligne, et nous constituons le dossier si nécessaire.",
      ],
    }}
    attractions={[
      "Cours Mirabeau",
      "Atelier de Cézanne",
      "Cathédrale Saint-Sauveur",
      "Festival d'Aix (juillet)",
      "Marché de la place Richelme",
      "Fondation Vasarely",
    ]}
    neighborhoods={[
      "Centre historique / Vieil Aix",
      "Mazarin",
      "Cours Mirabeau",
      "Quartier des Cardeurs",
      "Sextius-Mirabeau",
      "Puyricard (proximité)",
    ]}
    whyUs={[
      "Une conciergerie régionale, avec une base à Villeneuve-lès-Avignon, plutôt qu'un réseau national piloté à distance.",
      "Des tarifs ajustés à la main selon la saison et les événements locaux, comme le Festival d'Aix en juillet, et non par un algorithme.",
      "Accueil des voyageurs, linge hôtelier et ménage professionnel : ce sont les évaluations qui font remonter une annonce, et elles se jouent sur ces détails.",
      "Un taux unique, annoncé avant tout rendez-vous : 25 % HT du net perçu, sans engagement de durée, avec un rapport mensuel détaillé.",
    ]}
    faq={[
      {
        question: "Quelle conciergerie choisir à Aix-en-Provence ?",
        answer: "Chevalier Conciergerie est notée 5,0 sur 5 sur Google, sur 12 avis, et intervient à Aix-en-Provence depuis sa base de Villeneuve-lès-Avignon. L'entreprise propose deux formules : conciergerie à 25 % HT du net perçu par le propriétaire, tout compris, ou sous-location avec un loyer fixe versé chaque mois sans commission. Les critères à comparer entre prestataires sont le taux annoncé, ce qu'il inclut réellement (ménage, linge, assistance aux voyageurs), l'existence d'un engagement de durée et la présence effective sur place.",
      },
      {
        question: "Faut-il un numéro d'enregistrement pour louer à Aix-en-Provence ?",
        answer: "La réglementation des meublés de tourisme a été durcie et varie selon la commune : un numéro d'enregistrement est exigé dans un nombre croissant de communes. Nous vérifions auprès de la mairie d'Aix-en-Provence ce qui s'applique à votre bien et nous effectuons la démarche avant la mise en ligne de l'annonce.",
      },
      {
        question: "Ai-je besoin d'une autorisation de changement d'usage à Aix ?",
        answer: "Cela dépend de la commune, du statut du logement (résidence principale ou non) et de son emplacement. Nous vérifions le cadre applicable auprès de la mairie d'Aix-en-Provence et nous montons le dossier si nécessaire, avant toute mise en location.",
      },
      {
        question: "Comment estimer ce que rapporterait mon bien à Aix ?",
        answer: "Nous établissons une estimation gratuite à partir de l'adresse et des caractéristiques du logement, sous 24 h, sans engagement. Nous ne donnons pas de moyenne générale : le résultat dépend du bien et de son emplacement.",
      },
      {
        question: "Comment se passe la gestion à distance à Aix ?",
        answer: "Notre base est à Villeneuve-lès-Avignon, à environ une heure de route. L'accueil des voyageurs repose sur une boîte à clés automatisée, ce qui supprime les contraintes d'horaires d'arrivée. Nous précisons lors de l'estimation comment le ménage et la maintenance sont organisés sur votre secteur.",
      },
    ]}
  />
);

export default ConciergerieAixEnProvence;
