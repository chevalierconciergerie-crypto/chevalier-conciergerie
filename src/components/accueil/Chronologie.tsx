import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { CHRONOLOGIE } from "@/data/franchise";

/*
  La chronologie du parcours franchisé : un rail vertical qui se remplit au
  défilement, une pastille par étape qui s'allume quand on l'atteint.

  Le remplissage est calculé à partir de la position du bloc dans l'écran
  plutôt qu'étape par étape : le trait suit le geste de lecture au lieu de
  sauter d'un cran à l'autre. Sous prefers-reduced-motion, tout est posé et
  le rail est plein d'emblée.
*/
export default function Chronologie() {
  const ref = useRef<HTMLOListElement>(null);
  const [progression, setProgression] = useState(0);
  const [atteintes, setAtteintes] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgression(1);
      setAtteintes(CHRONOLOGIE.length);
      return;
    }

    let frame = 0;
    const mesurer = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      /* Le rail se remplit entre le moment où le bloc entre aux deux tiers
         de l'écran et celui où son bas atteint le tiers supérieur. */
      const debut = window.innerHeight * 0.75;
      const fin = window.innerHeight * 0.3;
      const course = debut - fin + r.height;
      const parcouru = (debut - r.top) / Math.max(1, course);
      const p = Math.min(1, Math.max(0, parcouru));
      setProgression(p);
      setAtteintes(Math.max(1, Math.ceil(p * CHRONOLOGIE.length)));
    };

    const surDefilement = () => {
      if (!frame) frame = window.requestAnimationFrame(mesurer);
    };

    mesurer();
    window.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", surDefilement);
    return () => {
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", surDefilement);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol className="chv-chrono" ref={ref} style={{ "--avancee": progression } as CSSProperties}>
      <div className="chv-chrono__rail" aria-hidden="true">
        <span className="chv-chrono__rail-plein" />
      </div>

      {CHRONOLOGIE.map((etape, i) => (
        <li key={etape.numero} className={`chv-chrono__etape ${i < atteintes ? "est-atteinte" : ""}`}>
          <span className="chv-chrono__point" aria-hidden="true" />
          <div className="chv-chrono__corps">
            <p className="chv-chrono__haut">
              <span className="chv-chrono__numero">{etape.numero}</span>
              <span className="chv-chrono__duree">{etape.duree}</span>
            </p>
            <h3>{etape.nom}</h3>
            <p className="chv-chrono__texte">{etape.texte}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
