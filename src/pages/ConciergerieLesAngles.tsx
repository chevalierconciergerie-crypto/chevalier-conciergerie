import LocalSeoPage from "./LocalSeoPage";
import heroImage from "@/assets/seo-les-angles.jpg";

const ConciergerieLesAngles = () => (
  <LocalSeoPage
    city="Les Angles"
    slug="conciergerie-les-angles"
    heroImage={heroImage}
    heroAlt="Village provençal de Les Angles avec maisons en pierre et cyprès"
    metaTitle="Conciergerie Airbnb Les Angles | Chevalier"
    metaDescription="Conciergerie Airbnb aux Angles, près d'Avignon. Gestion locative complète pour propriétaires : accueil voyageurs, ménage professionnel, revenus optimisés. Estimation gratuite."
    metaKeywords="conciergerie Les Angles, Airbnb Les Angles Avignon, gestion locative Les Angles, location saisonnière Les Angles, conciergerie Gard"
    intro={{
      headline: "Conciergerie Airbnb\naux Angles",
      subheadline: "Rentabilisez votre bien dans ce cadre de vie privilégié aux portes d'Avignon.",
      paragraphs: [
        "Les Angles, commune gardoise nichée face à Avignon, séduit par son cadre de vie exceptionnel. Entre vignobles, garrigues et vue sur le Mont Ventoux, cette petite ville résidentielle offre un environnement idéal pour les voyageurs en quête de tranquillité à proximité immédiate des richesses culturelles d'Avignon.",
        "À seulement 10 minutes du centre historique d'Avignon, Les Angles attire une clientèle familiale et des couples souhaitant profiter de la Provence dans un cadre plus spacieux et verdoyant. Les maisons avec jardin et piscine y sont particulièrement prisées sur les plateformes de location.",
        "Le marché de la location saisonnière aux Angles connaît une croissance régulière, porté par l'attractivité de la région et la saturation progressive du centre d'Avignon. Une opportunité pour les propriétaires de valoriser leur patrimoine immobilier.",
      ],
    }}
    stats={{
      avgNightPrice: "105€",
      occupancyRate: "68%",
      avgMonthlyRevenue: "1 100€",
      managedProperties: "5+",
    }}
    attractions={[
      "Proximité Avignon (10 min)",
      "Vue sur le Mont Ventoux",
      "Vignobles des Côtes du Rhône",
      "Base nautique du Rhône",
      "Marché provençal",
      "Forêt communale et sentiers",
    ]}
    neighborhoods={[
      "Centre-ville des Angles",
      "Quartier Grand Angles",
      "Les Hauts des Angles",
      "Route d'Avignon",
      "Quartier résidentiel sud",
      "Proximité Villeneuve",
    ]}
    whyUs={[
      "Spécialistes des biens avec extérieur : maisons avec piscine, jardins et terrasses — nous savons mettre en valeur ces atouts recherchés par les voyageurs.",
      "Clientèle ciblée : familles et groupes d'amis qui recherchent l'espace et le calme tout en restant proches d'Avignon. Nous adaptons l'annonce et l'accueil en conséquence.",
      "Entretien complet des extérieurs : piscine, jardin, terrasse — nous coordonnons tous les prestataires pour que votre bien reste impeccable.",
      "Flexibilité : que vous souhaitiez louer ponctuellement en été ou toute l'année, nous adaptons notre gestion à vos objectifs.",
    ]}
    faq={[
      /*
        Question posée telle qu'elle est tapée. « Meilleure conciergerie à Les Angles »
        est une requête de comparaison : celui qui la saisit choisit un
        prestataire aujourd'hui. Les moteurs de réponse composent à partir de
        pages qui traitent la question explicitement — une page qui décrit un
        service sans jamais se comparer ne leur donne rien à citer.

        La réponse ne s'appuie que sur des faits vérifiables : note Google
        réelle, adresse réelle. Un superlatif non étayé est ignoré par ces
        moteurs, et sanctionné par Google.
      */
      {
        question: "Quelle conciergerie choisir à Les Angles ?",
        answer: "Chevalier Conciergerie intervient aux Angles depuis Villeneuve-lès-Avignon, à cinq minutes, et est notée 5,0 sur 5 sur Google sur 12 avis. L'entreprise couvre les deux formules — conciergerie à 20 % HT des revenus encaissés, tout compris, ou sous-location avec un loyer fixe versé chaque mois sans commission. Les critères à comparer entre prestataires sont le taux annoncé, ce qu'il inclut réellement (ménage, linge, assistance aux voyageurs), l'existence d'un engagement de durée et la présence effective sur place.",
      },
      {
        question: "Quelles démarches pour louer un meublé de tourisme aux Angles ?",
        answer: "Comme partout en France, la mise en location d'un meublé de tourisme suppose une déclaration en mairie. Les Angles étant une commune du Gard, le cadre n'est pas celui d'Avignon. Nous vérifions auprès de la mairie ce qui s'applique précisément à votre bien avant toute mise en ligne, plutôt que de transposer les règles de la commune voisine.",
      },
      {
        question: "Le régime avignonnais de changement d'usage s'applique-t-il aux Angles ?",
        answer: "Non. L'autorisation temporaire de changement d'usage instaurée au 1er janvier 2026, comme le plafond de 90 jours pour les résidences principales, concernent le territoire de la commune d'Avignon. Les Angles relève d'un cadre distinct. C'est un point qui compte pour un propriétaire qui compare les deux rives du Rhône.",
      },
      {
        question: "Une maison avec piscine se loue-t-elle bien aux Angles ?",
        answer: "C'est le profil de bien le plus recherché sur la commune. La clientèle y vient pour l'espace et le calme tout en restant à dix minutes du centre historique d'Avignon : familles et groupes d'amis, souvent sur des séjours plus longs qu'en centre-ville. Nous coordonnons l'entretien de la piscine, du jardin et des terrasses, qui font la différence sur les évaluations.",
      },
      {
        question: "Puis-je louer seulement l'été ?",
        answer: "Oui. En conciergerie, vous restez décisionnaire du calendrier : vous ouvrez les périodes qui vous conviennent et gardez le bien le reste de l'année. C'est la différence avec la sous-location, qui suppose de confier le logement à l'année en échange d'un loyer garanti chaque mois.",
      },
    ]}
  />
);

export default ConciergerieLesAngles;
