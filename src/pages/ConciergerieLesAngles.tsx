import LocalSeoPage from "./LocalSeoPage";
import heroImage from "@/assets/seo-les-angles.jpg";

const ConciergerieLesAngles = () => (
  <LocalSeoPage
    city="Les Angles"
    slug="conciergerie-les-angles"
    heroImage={heroImage}
    heroAlt="Village provençal de Les Angles avec maisons en pierre et cyprès"
    metaTitle="Conciergerie Airbnb Les Angles | Gestion Location Saisonnière | Chevalier"
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
  />
);

export default ConciergerieLesAngles;
