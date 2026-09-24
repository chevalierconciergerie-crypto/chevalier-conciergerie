import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContenuFranchise from "@/components/accueil/ContenuFranchise";
import { TitreAnime } from "@/components/accueil/Primitives";

/*
  /franchise — la page de recrutement du réseau.

  Le corps est exactement celui de la section « Devenir franchisé » de
  l'accueil : les deux rendent ContenuFranchise. Arriver par le menu ou par la
  page donne donc la même chose, et rien ne peut diverger d'un côté ou de
  l'autre.

  Aucun chiffre publié : droit d'entrée, redevance et durée du contrat se
  détaillent à l'appel.
*/
const Franchise = () => {
  return (
    <>
      <Helmet>
        <title>Devenir franchisé | Ouvrir sa conciergerie | Chevalier Conciergerie</title>
        <meta
          name="description"
          content="Devenez franchisé Chevalier Conciergerie : marque et territoire réservé, plus de 40 h de formation, logiciel PMS et CRM compris, site web et référencement, kit marketing, accompagnement continu. Du premier appel à l'ouverture."
        />
        <meta
          name="keywords"
          content="devenir franchisé conciergerie, franchise conciergerie, ouvrir une conciergerie, réseau conciergerie Airbnb, franchise gestion locative, monter sa conciergerie"
        />
        <meta property="og:title" content="Devenir franchisé Chevalier Conciergerie" />
        <meta
          property="og:description"
          content="La marque, un territoire réservé, plus de 40 h de formation, le logiciel, le site et le kit marketing. Réservez un appel."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <link rel="canonical" href="https://chevalier-conciergerie.com/franchise" />
      </Helmet>

      <Header />

      <main className="chv chv-franchise">
        <section className="chv-section" aria-label="Devenir franchisé">
          <TitreAnime lignes={["Devenir", "franchisé."]} />
          <ContenuFranchise commeH1 />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Franchise;
