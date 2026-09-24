import { Helmet } from "@/lib/seo";
import EnTete from "@/components/accueil/EnTete";
import HeroAvignon from "@/components/accueil/HeroAvignon";
import Fondateur from "@/components/accueil/Fondateur";
import { ServiceConciergerie, ServiceSousLocation } from "@/components/accueil/Services";
import Franchise from "@/components/accueil/Franchise";
import { BlogAccueil, ContactAccueil, Temoignages } from "@/components/accueil/Journal";
import PiedDePage from "@/components/accueil/PiedDePage";

/*
  L'accueil tient sur une seule page, dans l'ordre voulu par Victor : la
  couverture, le fondateur, les deux offres (chacune avec sa FAQ), le blog,
  les témoignages, le contact. Chaque rubrique du menu est une ancre.

  L'ancienne composition (séquence cinématique, cartes de formules) reste
  dans l'historique git ; les pages intérieures sont inchangées.
*/
const Index = () => {
  return (
    <>
      <Helmet>
        <title>Conciergerie Avignon | Gestion Locative & Sous-location | Chevalier Conciergerie</title>
        <meta 
          name="description" 
          content="Conciergerie Airbnb à Avignon, Villeneuve-lès-Avignon et Les Angles. Gestion locative saisonnière complète, ou sous-location avec loyer garanti chaque mois. Estimation gratuite sous 24 h." 
        />
        <meta name="keywords" content="conciergerie Avignon, gestion locative Avignon, Airbnb Avignon, location saisonnière Avignon, sous-location Avignon, conciergerie Villeneuve-lès-Avignon, gestion Airbnb" />
        <meta property="og:title" content="Conciergerie Avignon | Gestion Locative Saisonnière | Chevalier Conciergerie" />
        <meta property="og:description" content="Conciergerie Airbnb à Avignon. Gestion locative saisonnière complète, ou loyer garanti chaque mois. Estimation gratuite." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="geo.region" content="FR-84" />
        <meta name="geo.placename" content="Avignon" />
        <link rel="canonical" href="https://chevalier-conciergerie.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://chevalier-conciergerie.com",
            "name": "Chevalier Conciergerie",
            "description": "Conciergerie Airbnb et gestion locative saisonnière à Avignon. Sous-location professionnelle avec loyer garanti chaque mois.",
            "url": "https://chevalier-conciergerie.com",
            "telephone": "+33783198341",
            "email": "contact@chevalier-conciergerie.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "5 Lotissement Les Cades",
              "addressLocality": "Villeneuve-lès-Avignon",
              "postalCode": "30400",
              "addressCountry": "FR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 43.9657,
              "longitude": 4.7956
            },
            "areaServed": [
              { "@type": "City", "name": "Avignon" },
              { "@type": "City", "name": "Villeneuve-lès-Avignon" },
              { "@type": "City", "name": "Les Angles" }
            ],
            "serviceType": ["Conciergerie Airbnb", "Gestion locative saisonnière", "Sous-location professionnelle"],
            "priceRange": "€€",
            /*
              La note manquait alors qu'elle existe et qu'elle est excellente.
              C'est le signal le plus lourd quand un moteur de réponse doit
              répondre à « meilleure conciergerie à Avignon » : sans note
              déclarée, l'entreprise n'a rien à opposer à un concurrent qui
              en publie une. Les valeurs correspondent exactement à la fiche
              Google affichée sur la page — un chiffre inventé ici ferait
              retirer l'ensemble du balisage.
            */
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": 12,
              "bestRating": "5",
              "worstRating": "1"
            },
            /*
              Les avis eux-mêmes, et pas seulement la moyenne. Un moteur de
              réponse qui doit justifier « c'est une bonne conciergerie » a
              besoin d'une phrase à citer, pas d'un chiffre : ce sont ces
              extraits qu'il reprend. Ils sont recopiés mot pour mot depuis la
              fiche Google et affichés tels quels sur la page — le balisage doit
              correspondre à ce que le visiteur voit, sans quoi Google retire
              l'ensemble des résultats enrichis du site.
            */
            "review": [
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Baptiste Mailharrancin" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Je confie mon appartement en centre-ville d'Avignon à CHEVALIER Conciergerie depuis plusieurs mois et je ne regrette pas. Communication fluide, réactivité au top et mes voyageurs sont toujours très bien accueillis. Je ne m'occupe plus de rien et mes revenus locatifs ont augmenté."
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Clément Pailler" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "J'ai fait appel à Chevalier Conciergerie pour mon appartement et je suis absolument ravi de la manière dont j'ai été accompagné par Victor. Je recommande à 100 % !"
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "felicien arnoux" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Excellente conciergerie, très professionnelle et à l'écoute des clients. Je recommande vivement pour tout projet de location courte durée sur le secteur Gard et Vaucluse."
              }
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            },
            /*
              sameAs était un tableau vide. C'est lui qui dit à un moteur que
              la fiche Google, la page Instagram et l'entreprise décrite ici
              sont une seule et même entité. Sans ces liens, chaque profil
              existe séparément et aucun ne renforce les autres — c'est une des
              raisons pour lesquelles une recherche « conciergerie
              Villeneuve-lès-Avignon » peut ignorer un site pourtant en ligne.
            */
            "sameAs": [
              "https://www.google.com/maps/place/CHEVALIER+CONCIERGERIE/@43.8680214,4.8327906,17z",
              "https://www.instagram.com/chevalier_conciergerie/",
              "https://www.facebook.com/share/1Eio3qasaM/",
              "https://www.linkedin.com/in/victor-chevalier-bba282356/"
            ]
          })}
        </script>
      </Helmet>

      <div className="chv">
        <EnTete />
        <main>
          <HeroAvignon />
          <Fondateur />
          <ServiceConciergerie />
          <ServiceSousLocation />
          <Franchise />
          <BlogAccueil />
          <Temoignages />
          <ContactAccueil />
        </main>
        <PiedDePage />
      </div>
    </>
  );
};

export default Index;
