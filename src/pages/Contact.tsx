import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContactAccueil } from "@/components/accueil/Journal";

/*
  /contact — la page de contact.

  Le corps est la section « Parlons de votre logement » de l'accueil (ContactAccueil), dans
  le nouveau design : même principe que /franchise, /conciergerie, /sous-location et
  /journal. L'ancienne page, d'un autre design, est remplacée.

  Le texte lisible sans JavaScript (scripts/seo-routes.mjs) reprend celui de la section.
*/
const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Conciergerie Avignon | Consultation Gratuite | Chevalier</title>
        <meta
          name="description"
          content="Contactez Chevalier Conciergerie à Avignon. Consultation gratuite pour votre projet de gestion locative ou sous-location. Réponse sous 24h."
        />
        <meta
          name="keywords"
          content="contact conciergerie Avignon, devis gestion locative Avignon, rendez-vous conciergerie"
        />
        <meta property="og:title" content="Contact Conciergerie Avignon | Consultation Gratuite" />
        <meta
          property="og:description"
          content="Estimation gratuite et sans engagement de votre bien, en conciergerie comme en sous-location."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <link rel="canonical" href="https://chevalier-conciergerie.com/contact" />
      </Helmet>

      <Header />

      <main className="chv">
        <ContactAccueil commeH1 />
      </main>

      <Footer />
    </>
  );
};

export default Contact;
