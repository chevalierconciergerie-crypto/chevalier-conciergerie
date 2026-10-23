import { PageLegale } from "@/components/accueil/PageLegale";
import { CONFIDENTIALITE } from "@/data/pagesLegales.js";

/* /politique-confidentialite — RGPD et cookies (src/data/pagesLegales.js). */
const PolitiqueConfidentialite = () => (
  <PageLegale
    contenu={CONFIDENTIALITE}
    chemin="/politique-confidentialite"
    titre="Politique de confidentialité | RGPD | Chevalier Conciergerie"
    description="Politique de confidentialité de Chevalier Conciergerie : quelles données sont collectées, dans quel but, combien de temps elles sont conservées, et comment exercer vos droits RGPD."
  />
);

export default PolitiqueConfidentialite;
