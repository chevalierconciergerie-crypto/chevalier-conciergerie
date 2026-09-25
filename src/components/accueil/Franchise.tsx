import { useT } from "@/i18n/langue";
import ContenuFranchise from "./ContenuFranchise";
import { TitreAnime } from "./Primitives";

/*
  Section « Devenir franchisé » de l'accueil. Elle rend exactement le même
  contenu que la page /franchise — même liste, mêmes profils, même
  chronologie, même FAQ — via ContenuFranchise : le visiteur doit voir la même
  chose qu'il arrive par le menu ou par la page.
*/
export default function Franchise() {
  const t = useT();
  return (
    <section id="franchise" className="chv-section chv-franchise" aria-label="Devenir franchisé Chevalier Conciergerie">
      <TitreAnime lignes={[t("Devenir"), t("franchisé.")]} />
      <ContenuFranchise />
    </section>
  );
}
