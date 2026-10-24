import { useRef } from "react";
import { Helmet } from "@/lib/seo";
import EnTete from "@/components/accueil/EnTete";
import HeroAvignon from "@/components/accueil/HeroAvignon";
import Fondateur from "@/components/accueil/Fondateur";
import { Temoignages } from "@/components/accueil/Journal";
import { LogementsAccueil } from "@/components/accueil/Logements";
import PiedDePage from "@/components/accueil/PiedDePage";
import BandeauGeant from "@/components/accueil/BandeauGeant";
import OndesPhotos from "@/components/accueil/OndesPhotos";
import { useFondsSections } from "@/components/accueil/effets";
import { useInclinaisonTitres } from "@/components/accueil/vitesse";

/* La couleur du fond selon la section au milieu de l'écran. */
const FONDS = { accueil: "noir", bandeau: "creme", "qui-sommes-nous": "noir", avis: "creme", logements: "cuivre" };

/*
  L'accueil tient sur une seule page, dans l'ordre voulu par Victor : la
  couverture, le fondateur, les deux offres (chacune avec sa FAQ), le blog,
  les témoignages, le contact. Chaque rubrique du menu est une ancre.

  L'ancienne composition (séquence cinématique, cartes de formules) reste
  dans l'historique git ; les pages intérieures sont inchangées.
*/
const Index = () => {
  const page = useRef<HTMLDivElement>(null);
  useFondsSections(page, FONDS);
  useInclinaisonTitres(page);
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
        {/*
          Le schéma LocalBusiness est déjà servi par le template index.html sur
          toutes les pages, avec le même @id. L'audit du 27 septembre 2026 a
          identifié un doublon ici : deux blocs pour la même entité alourdissent
          le HTML sans gain SEO. Suppression volontaire — la source unique de
          vérité pour la fiche d'entreprise est index.html.
        */}
      </Helmet>

      <div ref={page} className="chv chv--fonds" data-fond="noir">
        <OndesPhotos />
        <EnTete />
        <main>
          <HeroAvignon />
          {/* Deux bandeaux de texte géant entraînés par le défilement. */}
          <BandeauGeant />
          <Fondateur />
          {/*
            Conciergerie, sous-location, franchise, blog et contact ont chacun leur page
            (/conciergerie, /sous-location, /franchise, /blog, /contact), ouverte depuis
            le menu : elles ne sont plus répétées ici.
          */}
          <Temoignages />
          {/* Sous les avis : les plus beaux logements, en visite filmée et en réservation directe. */}
          <LogementsAccueil />
        </main>
        <PiedDePage />
      </div>
    </>
  );
};

export default Index;
