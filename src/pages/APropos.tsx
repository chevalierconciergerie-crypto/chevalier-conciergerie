import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Fondateur from "@/components/accueil/Fondateur";

/*
  /a-propos — « Qui sommes-nous ».

  Le corps est la section « Qui sommes-nous / Le fondateur » de l'accueil (Fondateur), dans
  le nouveau design : même principe que /franchise, /conciergerie, /sous-location, /blog et
  /contact. L'ancienne page, d'un autre design, est remplacée.

  Le texte lisible sans JavaScript (scripts/seo-routes.mjs) reprend celui de la section.
*/
const APropos = () => {
  return (
    <>
      <Helmet>
        <title>Qui sommes-nous | Conciergerie Avignon | Chevalier</title>
        <meta
          name="description"
          content="Découvrez Chevalier Conciergerie : une conciergerie indépendante et locale à Avignon, fondée par Victor Chevalier, spécialiste de la location courte durée et de la sous-location avec loyer garanti."
        />
        <link rel="canonical" href="https://chevalier-conciergerie.com/a-propos" />
      </Helmet>

      <Header />

      <main className="chv">
        <Fondateur commeH1 />
      </main>

      <Footer />
    </>
  );
};

export default APropos;
