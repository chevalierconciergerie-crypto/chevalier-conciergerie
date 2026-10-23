import { PageLegale } from "@/components/accueil/PageLegale";
import { CONDITIONS } from "@/data/pagesLegales.js";

/* /cgv — conditions de location des logements et prestations aux propriétaires (src/data/pagesLegales.js). */
const CGV = () => (
  <PageLegale
    contenu={CONDITIONS}
    chemin="/cgv"
    titre="Conditions générales de vente | Chevalier Conciergerie Avignon"
    description="Conditions générales de Chevalier Conciergerie : location de nos logements (réservation, paiement, annulation, séjour) et prestations de conciergerie et de sous-location aux propriétaires."
  />
);

export default CGV;
