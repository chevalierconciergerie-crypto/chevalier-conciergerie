import { Helmet } from "@/lib/seo";
import EnTete from "@/components/accueil/EnTete";
import PiedDePage from "@/components/accueil/PiedDePage";
import { Etiquette, TitreAnime } from "@/components/accueil/Primitives";
import FormulaireEstimation from "@/components/accueil/FormulaireEstimation";

/*
  Estimation gratuite, conciergerie comme sous-location. Même URL que
  l'ancienne page (déjà indexée). Le formulaire est aussi sur /contact.
*/
const Estimation = () => {
  return (
    <>
      <Helmet>
        <title>Estimation gratuite | Conciergerie et sous-location à Avignon | Chevalier</title>
        <meta
          name="description"
          content="Estimation gratuite et sans engagement de votre bien à Avignon, Villeneuve-lès-Avignon et Les Angles, en conciergerie comme en sous-location. Réponse sous 48 h."
        />
        <link rel="canonical" href="https://chevalier-conciergerie.com/estimation-sous-location" />
      </Helmet>

      <div className="chv">
        <EnTete />
        <main className="chv-section chv-estimation">
          <div className="chv-entete-section">
            <Etiquette>Estimation gratuite</Etiquette>
            <TitreAnime as="h1" lignes={["Estimons", "votre bien"]} />
            <p className="chv-estimation__intro">
              Décrivez votre logement : nous vous disons ce qu'il peut rapporter, en conciergerie comme en sous-location.
              Réponse sous 48 h, sans engagement.
            </p>
          </div>

          <FormulaireEstimation />
        </main>
        <PiedDePage />
      </div>
    </>
  );
};

export default Estimation;
