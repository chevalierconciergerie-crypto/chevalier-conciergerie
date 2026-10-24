import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { abonner, mouvementReduit } from "./effets";

/*
  Les effets qui suivent le défilement, sur tout le site :
  - défilement adouci à la molette (Lenis ; le tactile garde le défilement natif) ;
  - fine barre cuivre en haut de l'écran, qui avance avec la lecture de la page ;
  - photos marquées data-zoom : elles se resserrent (zoom arrière) et glissent
    légèrement dans leur cadre pendant qu'elles traversent l'écran, dans les deux sens.
  Rien de tout ça si le visiteur a demandé de réduire les animations.
*/
export default function EffetsDefilement() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (mouvementReduit()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let image = requestAnimationFrame(function boucle(temps) {
      lenis.raf(temps);
      image = requestAnimationFrame(boucle);
    });
    return () => {
      cancelAnimationFrame(image);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (mouvementReduit()) return;
    const barre = document.querySelector<HTMLElement>(".chv-progression-page");
    let photos: HTMLElement[] = [];
    let attente = 0;
    const chercher = () => {
      attente = 0;
      photos = [...document.querySelectorAll<HTMLElement>("[data-zoom]")];
    };
    chercher();
    // Les sections arrivent après coup (pages chargées à la demande) : on recherche à chaque ajout.
    const observateur = new MutationObserver(() => {
      if (!attente) attente = requestAnimationFrame(chercher);
    });
    observateur.observe(document.body, { childList: true, subtree: true });

    const arreter = abonner(() => {
      const h = window.innerHeight;
      const course = document.documentElement.scrollHeight - h;
      if (barre) barre.style.transform = `scaleX(${course > 0 ? Math.min(1, window.scrollY / course) : 0})`;
      for (const photo of photos) {
        const r = (photo.parentElement ?? photo).getBoundingClientRect();
        if (r.bottom < -100 || r.top > h + 100) continue;
        // 0 quand le cadre entre par le bas, 1 quand il sort par le haut.
        const p = Math.max(0, Math.min(1, (h - r.top) / (h + r.height)));
        const zoom = 1.12 + 0.16 * (1 - Math.min(1, p * 1.8));
        photo.style.transform = `translateY(${((p - 0.5) * 10).toFixed(2)}%) scale(${zoom.toFixed(3)})`;
      }
    });
    return () => {
      arreter();
      observateur.disconnect();
      if (attente) cancelAnimationFrame(attente);
    };
  }, [pathname]);

  return <div className="chv-progression-page" aria-hidden="true" />;
}
