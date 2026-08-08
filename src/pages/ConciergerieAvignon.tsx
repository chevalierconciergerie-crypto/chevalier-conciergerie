import LocalSeoPage from "./LocalSeoPage";
import heroImage from "@/assets/seo-avignon.jpg";

const ConciergerieAvignon = () => (
  <LocalSeoPage
    city="Avignon"
    slug="conciergerie-avignon"
    heroImage={heroImage}
    heroAlt="Vue aérienne d'Avignon avec le Palais des Papes et le Pont d'Avignon"
    metaTitle="Conciergerie Airbnb Avignon | Gestion Location Saisonnière | Chevalier"
    metaDescription="Conciergerie Airbnb à Avignon intra-muros : accueil voyageurs, ménage professionnel, optimisation des revenus. Enregistrement et changement d'usage pris en charge. Devis gratuit."
    metaKeywords="conciergerie Airbnb Avignon, gestion location saisonnière Avignon, conciergerie Avignon intra-muros, location courte durée Avignon, Airbnb Avignon"
    intro={{
      headline: "Conciergerie Airbnb\nà Avignon",
      subheadline: "Votre partenaire de confiance pour la gestion locative saisonnière dans la cité des Papes.",
      paragraphs: [
        "Avignon, classée au patrimoine mondial de l'UNESCO, attire chaque année plus de 4 millions de visiteurs. Entre le Festival d'Avignon, le Palais des Papes et les ruelles pittoresques de l'intra-muros, la ville offre un potentiel locatif exceptionnel pour les propriétaires.",
        "Avec une demande touristique soutenue tout au long de l'année et des pics remarquables en été, les locations saisonnières à Avignon affichent des taux d'occupation parmi les plus élevés de Provence. Un studio bien situé peut générer entre 800€ et 1 500€ par mois de revenus nets.",
        "Chevalier Conciergerie accompagne les propriétaires avignonnais dans la gestion intégrale de leur bien : de la création de l'annonce à l'accueil des voyageurs, en passant par le ménage professionnel et l'optimisation tarifaire.",
        "Depuis le 1er janvier 2026, louer un meublé de tourisme à Avignon suppose un numéro d'enregistrement, et une autorisation temporaire de changement d'usage pour tout logement qui n'est pas une résidence principale — sur l'ensemble du territoire communal. Une résidence principale, elle, est plafonnée à 90 jours de location par année civile et non 120 : la ville a abaissé le seuil par délibération du 22 février 2025. La municipalité motive ce durcissement par le doublement des locations saisonnières en huit ans, près de 4 300 logements en 2023 dont 2 400 en intra-muros. Nous vérifions le cadre applicable à votre bien et constituons le dossier avant toute mise en ligne.",
      ],
    }}
    stats={{
      avgNightPrice: "95€",
      occupancyRate: "78%",
      avgMonthlyRevenue: "1 200€",
      managedProperties: "15+",
    }}
    attractions={[
      "Palais des Papes",
      "Pont Saint-Bénézet",
      "Festival d'Avignon (juillet)",
      "Place de l'Horloge",
      "Rue des Teinturiers",
      "Marché des Halles",
    ]}
    neighborhoods={[
      "Intra-muros / Centre historique",
      "Quartier de la Balance",
      "Place Pie & les Halles",
      "Rue des Teinturiers",
      "Quartier Saint-Ruf",
      "Île de la Barthelasse",
    ]}
    whyUs={[
      "Expertise locale : nous connaissons Avignon, ses quartiers, sa saisonnalité et les attentes des voyageurs qui visitent la cité des Papes.",
      "Tarification dynamique adaptée aux événements locaux : Festival d'Avignon, Fête de la Musique, marchés de Noël. Vos revenus sont maximisés toute l'année.",
      "Accueil personnalisé, linge hôtelier et recommandations locales pour vos voyageurs — ce sont les évaluations qui font remonter une annonce, et elles se jouent sur ces détails.",
      "Transparence totale : commission sur-mesure adaptée à chaque bien, aucun frais caché, reporting mensuel détaillé de vos revenus.",
    ]}
  />
);

export default ConciergerieAvignon;
