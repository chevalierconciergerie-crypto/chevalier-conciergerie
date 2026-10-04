import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      /*
        Arrivée sur une ancre de l'accueil depuis une autre page (menu « Conciergerie »,
        « Sous-location », « Contact »). Un scrollIntoView lisse calcule sa cible au
        départ, avant que polices et images aient fini de décaler la mise en page : la
        page s'arrêtait plusieurs centaines de pixels trop haut. On saute donc
        directement, avec le même décalage que allerA (la barre fait 72 px), et on
        recale quelques fois pour absorber ces décalages.
      */
      const id = decodeURIComponent(hash.slice(1));
      let essais = 0;
      let minuterie = 0;
      const caler = () => {
        const el = document.getElementById(id);
        if (el) {
          const haut = el.getBoundingClientRect().top + window.scrollY - 72;
          if (Math.abs(haut - window.scrollY) > 4) {
            // La feuille de style impose scroll-behavior: smooth sur <html> : sans cette
            // neutralisation, « auto » reste animé, et chaque recalage relance l'animation.
            const html = document.documentElement;
            const avant = html.style.scrollBehavior;
            html.style.scrollBehavior = "auto";
            window.scrollTo(0, haut);
            html.style.scrollBehavior = avant;
          }
        }
        if (++essais < 6) minuterie = window.setTimeout(caler, 200);
      };
      minuterie = window.setTimeout(caler, 60);
      return () => window.clearTimeout(minuterie);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
