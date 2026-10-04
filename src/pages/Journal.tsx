import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogAccueil } from "@/components/accueil/Journal";

/*
  /journal — la liste des articles.

  Le corps est la section « Blog » de l'accueil (BlogAccueil), dans le nouveau design,
  avec tous les articles au lieu de la sélection de cinq : même principe que /franchise,
  /conciergerie et /sous-location. L'ancienne page, d'un autre design, est remplacée.

  Le texte lisible sans JavaScript (buildJournalRoutes dans scripts/prerender.mjs) liste
  les mêmes articles avec les mêmes titres.
*/
const Journal = () => {
  return (
    <>
      <Helmet>
        <title>Journal : location courte durée à Avignon | Chevalier</title>
        <meta
          name="description"
          content="Nos guides sur la gestion locative saisonnière à Avignon : réglementation, rentabilité, conciergerie et sous-location. Publications régulières."
        />
        <meta property="og:title" content="Journal : location courte durée à Avignon" />
        <meta
          property="og:description"
          content="Réglementation, rentabilité, fiscalité : ce qu'il faut savoir avant de louer en courte durée à Avignon."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <link rel="canonical" href="https://chevalier-conciergerie.com/journal" />
      </Helmet>

      <Header />

      <main className="chv">
        <BlogAccueil commeH1 tous />
      </main>

      <Footer />
    </>
  );
};

export default Journal;
