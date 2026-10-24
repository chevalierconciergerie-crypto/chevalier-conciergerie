import { useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { mouvementReduit } from "./effets";

/*
  Le passage d'une page à l'autre : au moment du changement de page, un voile
  cuivre couvre l'écran avec CHEVALIER au centre, puis remonte en découvrant la
  nouvelle page. Le voile est posé avant le premier affichage de la nouvelle page
  (useLayoutEffect), sinon elle apparaîtrait une image avant lui.

  Rien au premier chargement (la page doit s'afficher tout de suite), rien quand
  seule l'ancre change, rien si le visiteur a demandé de réduire les animations.
  Le voile ne capte aucun clic.
*/
export default function TransitionPages() {
  const { pathname } = useLocation();
  const precedent = useRef(pathname);
  const [passage, setPassage] = useState(0);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    if (precedent.current === pathname) return;
    precedent.current = pathname;
    if (mouvementReduit()) return;
    setPassage((n) => n + 1);
    setVisible(true);
  }, [pathname]);

  if (!visible) return null;
  return (
    <div key={passage} className="chv-voile" aria-hidden="true" onAnimationEnd={(e) => e.target === e.currentTarget && setVisible(false)}>
      <span className="chv-voile__mot">CHEVALIER</span>
    </div>
  );
}
