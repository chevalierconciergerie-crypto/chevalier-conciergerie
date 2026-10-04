import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServiceSousLocation } from "@/components/accueil/Services";

/*
  /sous-location — la formule à loyer garanti.

  Le corps est exactement celui de la section « Notre service de sous-location » de
  l'accueil : les deux rendent ServiceSousLocation. Même principe que /franchise et
  /conciergerie. L'ancienne page, d'un autre design, a été supprimée ; l'adresse est
  conservée pour que Google garde une page à indexer pour cette recherche.

  Le texte lisible sans JavaScript (scripts/seo-routes.mjs) reprend celui de la
  section : toute modification de la section doit y être répercutée.
*/
const SousLocation = () => {
  return (
    <>
      <Helmet>
        <title>Sous-location Avignon : loyer garanti | Chevalier</title>
        <meta
          name="description"
          content="Sous-location à Avignon : un loyer fixe versé chaque mois, 0 % de commission, sans vacance locative ni gestion. Estimation gratuite de votre bien."
        />
        <meta
          name="keywords"
          content="sous-location Avignon, loyer garanti Avignon, gestion locative Avignon, location meublée Avignon"
        />
        <meta property="og:title" content="Sous-location Avignon : loyer garanti" />
        <meta
          property="og:description"
          content="Un loyer fixe chaque mois, 0 % de commission, sans vacance locative ni gestion."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <link rel="canonical" href="https://chevalier-conciergerie.com/sous-location" />
      </Helmet>

      <Header />

      <main className="chv">
        <ServiceSousLocation commeH1 />
      </main>

      <Footer />
    </>
  );
};

export default SousLocation;
