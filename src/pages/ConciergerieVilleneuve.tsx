import LocalSeoPage from "./LocalSeoPage";
import heroImage from "@/assets/seo-villeneuve.jpg";

const ConciergerieVilleneuve = () => (
  <LocalSeoPage
    city="Villeneuve-lès-Avignon"
    slug="conciergerie-villeneuve-les-avignon"
    heroImage={heroImage}
    heroAlt="Vue panoramique de Villeneuve-lès-Avignon avec le Fort Saint-André"
    metaTitle="Conciergerie Airbnb Villeneuve-lès-Avignon | Gestion Locative | Chevalier"
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
  />
);

export default ConciergerieVilleneuve;
