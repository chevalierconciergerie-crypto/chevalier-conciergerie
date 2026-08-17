import LocalSeoPage from "./LocalSeoPage";
import heroImage from "@/assets/seo-villeneuve.jpg";

const ConciergerieVilleneuve = () => (
  <LocalSeoPage
    city="Villeneuve-lès-Avignon"
    slug="conciergerie-villeneuve-les-avignon"
    heroImage={heroImage}
    heroAlt="Vue panoramique de Villeneuve-lès-Avignon avec le Fort Saint-André"
    metaTitle="Conciergerie Airbnb Villeneuve-lès-Avignon | Chevalier"
    metaDescription="Conciergerie Airbnb à Villeneuve-lès-Avignon : gestion complète de votre location saisonnière face à Avignon, et des démarches plus simples que de l'autre côté du Rhône. Devis gratuit."
    // « Villeneuve lez Avignon » est l'orthographe que la commune emploie elle-même :
    // les deux graphies sont recherchées, autant couvrir les deux.
    metaKeywords="conciergerie Villeneuve-lès-Avignon, conciergerie Villeneuve lez Avignon, Airbnb Villeneuve Avignon, gestion locative Villeneuve, location saisonnière Villeneuve-lès-Avignon"
    intro={{
      headline: "Conciergerie Airbnb\nà Villeneuve-lès-Avignon",
      subheadline: "Valorisez votre bien dans l'un des plus beaux villages face à la cité des Papes.",
      paragraphs: [
        "Villeneuve-lès-Avignon, surnommée la « Cité des Cardinaux », offre un cadre exceptionnel face au Palais des Papes. Son patrimoine remarquable — Fort Saint-André, Chartreuse du Val de Bénédiction, Tour Philippe le Bel — attire une clientèle à la recherche d'authenticité et de calme.",
        "Située à seulement 5 minutes d'Avignon, Villeneuve bénéficie de la même dynamique touristique tout en offrant un environnement plus résidentiel et verdoyant. Les voyageurs apprécient particulièrement ses vues panoramiques sur le Rhône et le Palais des Papes.",
        "Les propriétaires de Villeneuve profitent d'un marché locatif en plein essor, avec des tarifs compétitifs et une demande croissante de la part de voyageurs internationaux souhaitant découvrir la Provence authentique.",
        "Côté démarches, Villeneuve — que la commune orthographie elle-même Villeneuve lez Avignon — est aujourd'hui plus simple qu'Avignon. La déclaration se fait auprès du service Police Administrative de la mairie, 2 rue de la République, avec le formulaire Cerfa 14004. La commune ne publie pas de régime d'autorisation de changement d'usage, contrairement à Avignon depuis le 1er janvier 2026 : un propriétaire du Gard échappe donc à la démarche la plus longue. La taxe de séjour reste due, collectée par l'hébergeur pour chaque personne de plus de 18 ans et par nuitée. Le cadre évolue commune par commune : nous le vérifions avant chaque mise en ligne.",
      ],
    }}
    stats={{
      avgNightPrice: "85€",
      occupancyRate: "72%",
      avgMonthlyRevenue: "950€",
      managedProperties: "8+",
    }}
    attractions={[
      "Fort Saint-André",
      "Chartreuse du Val de Bénédiction",
      "Tour Philippe le Bel",
      "Jardins de l'Abbaye",
      "Vue panoramique sur Avignon",
      "Marché provençal du samedi",
    ]}
    neighborhoods={[
      "Centre historique",
      "Quartier de la Tour",
      "Les Angles (proximité)",
      "Route de Nîmes",
      "Quartier Saint-André",
      "Les hauteurs du Fort",
    ]}
    whyUs={[
      "Connaissance approfondie de Villeneuve-lès-Avignon et de sa clientèle : couples, familles et voyageurs culturels à la recherche d'un séjour paisible face à Avignon.",
      "Mise en valeur des atouts uniques de votre bien : vues sur le Rhône, proximité des monuments historiques, charme provençal authentique.",
      "Gestion optimisée selon la saisonnalité locale : Festival d'Avignon, Rencontres de la Chartreuse, tourisme estival et week-ends prolongés.",
      "Service de proximité : notre équipe intervient rapidement à Villeneuve pour l'accueil, le ménage et la maintenance de votre bien.",
    ]}
    faq={[
      /*
        Question posée telle qu'elle est tapée. « Meilleure conciergerie à Villeneuve-lès-Avignon »
        est une requête de comparaison : celui qui la saisit choisit un
        prestataire aujourd'hui. Les moteurs de réponse composent à partir de
        pages qui traitent la question explicitement — une page qui décrit un
        service sans jamais se comparer ne leur donne rien à citer.

        La réponse ne s'appuie que sur des faits vérifiables : note Google
        réelle, adresse réelle. Un superlatif non étayé est ignoré par ces
        moteurs, et sanctionné par Google.
      */
      {
        question: "Quelle conciergerie choisir à Villeneuve-lès-Avignon ?",
        answer: "Chevalier Conciergerie est basée à Villeneuve-lès-Avignon même, 5 Lotissement Les Cades, et notée 5,0 sur 5 sur Google sur 12 avis. L'entreprise couvre les deux formules — conciergerie à 20 % HT des revenus encaissés, tout compris, ou sous-location avec un loyer fixe versé chaque mois sans commission. Les critères à comparer entre prestataires sont le taux annoncé, ce qu'il inclut réellement (ménage, linge, assistance aux voyageurs), l'existence d'un engagement de durée et la présence effective sur place.",
      },
      {
        question: "Quelles démarches pour louer un meublé de tourisme à Villeneuve-lès-Avignon ?",
        answer: "La déclaration se fait auprès du service Police Administrative de la mairie, 2 rue de la République, au moyen du formulaire Cerfa 14004. Un formulaire distinct existe pour les chambres d'hôtes. La taxe de séjour reste due : elle est collectée par l'hébergeur pour chaque personne de plus de 18 ans et par nuitée.",
      },
      {
        question: "Ai-je besoin d'une autorisation de changement d'usage à Villeneuve ?",
        answer: "La commune ne publie pas de régime d'autorisation de changement d'usage, contrairement à Avignon qui en a instauré un au 1er janvier 2026. Concrètement, un propriétaire de Villeneuve échappe aujourd'hui à la démarche la plus longue. Le cadre évoluant commune par commune, nous le vérifions auprès de la mairie avant chaque mise en ligne.",
      },
      {
        question: "Est-il plus simple de louer à Villeneuve qu'à Avignon ?",
        answer: "Administrativement, oui pour l'instant. Avignon impose depuis janvier 2026 un enregistrement obligatoire, une autorisation de changement d'usage pour tout bien qui n'est pas une résidence principale, et un plafond de 90 jours pour les résidences principales. Villeneuve s'en tient à la déclaration en mairie. Pour un propriétaire hésitant entre les deux rives du Rhône, la différence est réelle.",
      },
      {
        question: "Écrit-on Villeneuve-lès-Avignon ou Villeneuve lez Avignon ?",
        answer: "Les deux se rencontrent. La commune emploie elle-même Villeneuve lez Avignon sur son site officiel, tandis que Villeneuve-lès-Avignon est la graphie la plus répandue. Il s'agit de la même ville, dans le Gard, face à Avignon.",
      },
    ]}
  />
);

export default ConciergerieVilleneuve;
