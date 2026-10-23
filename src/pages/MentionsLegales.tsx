import { PageLegale } from "@/components/accueil/PageLegale";
import { MENTIONS_LEGALES } from "@/data/pagesLegales.js";

/* /mentions-legales — contenu dans src/data/pagesLegales.js. */
const MentionsLegales = () => (
  <PageLegale
    contenu={MENTIONS_LEGALES}
    chemin="/mentions-legales"
    titre="Mentions légales | Chevalier Conciergerie Avignon"
    description="Mentions légales de Chevalier Conciergerie (CHEVALIER LOCABUSINESS) — éditeur, siège social à Villeneuve-lès-Avignon, hébergeur et directeur de publication."
  />
);

export default MentionsLegales;
