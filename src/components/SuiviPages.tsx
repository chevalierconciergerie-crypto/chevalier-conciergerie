import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { activerAnalytics, analyticsActif, consentementAccepte, envoyerPage } from "@/lib/analytics";

/*
  Envoie une vue de page à Google Analytics à chaque changement de route, mais
  seulement si le visiteur a accepté les cookies. Au premier chargement avec un
  accord déjà enregistré, activerAnalytics envoie lui-même la page : on ne la
  renvoie pas une seconde fois.
*/
const SuiviPages = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!consentementAccepte()) return;
    if (!analyticsActif()) {
      activerAnalytics();
      return;
    }
    // Le titre du document est mis à jour par Helmet juste après le rendu.
    const minuterie = window.setTimeout(envoyerPage, 150);
    return () => window.clearTimeout(minuterie);
  }, [pathname]);

  return null;
};

export default SuiviPages;
