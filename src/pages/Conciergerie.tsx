import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServiceConciergerie } from "@/components/accueil/Services";

/*
  /conciergerie — la formule de gestion complète.

  Le corps est exactement celui de la section « Notre service de conciergerie » de
  l'accueil : les deux rendent ServiceConciergerie. Arriver par le menu ou par la page
  donne donc la même chose, et rien ne peut diverger. C'est le même principe que
  /franchise. L'ancienne page, d'un autre design, a été supprimée : l'adresse est
  conservée pour que Google garde une page à indexer pour cette recherche.

  Le texte lisible sans JavaScript (scripts/seo-routes.mjs) reprend celui de la
  section : toute modification de la section doit y être répercutée.
*/
const Conciergerie = () => {
  return (
    <>
      <Helmet>
        <title>Conciergerie Airbnb à Avignon : gestion complète | Chevalier</title>
        <meta
          name="description"
          content="Conciergerie Airbnb à Avignon : annonce, accueil des voyageurs, ménage et tarification. 25 % HT du net perçu, sans engagement. Estimation gratuite."
        />
        <meta
          name="keywords"
          content="conciergerie Airbnb Avignon, gestion location saisonnière Avignon, accueil voyageurs Avignon, ménage Airbnb Avignon"
        />
        <meta property="og:title" content="Conciergerie Airbnb à Avignon : gestion complète" />
        <meta
          property="og:description"
          content="Annonce, accueil des voyageurs, ménage et tarification : 25 % HT du net perçu, sans engagement."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <link rel="canonical" href="https://chevalier-conciergerie.com/conciergerie" />
      </Helmet>

      <Header />

      <main className="chv">
        <ServiceConciergerie commeH1 />
      </main>

      <Footer />
    </>
  );
};

export default Conciergerie;
