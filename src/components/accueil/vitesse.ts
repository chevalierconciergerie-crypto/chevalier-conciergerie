import { useEffect, type RefObject } from "react";
import { mouvementReduit } from "./effets";

/*
  La vitesse du défilement, lissée, de -1 (on remonte vite) à 1 (on descend vite),
  0 à l'arrêt. Une seule boucle pour toute la page : elle se réveille au premier
  événement de défilement et s'endort dès que la vitesse est revenue à zéro, pour
  ne rien calculer quand la page est immobile. Les effets s'y abonnent.
*/

type Ecouteur = (v: number) => void;

const ecouteurs = new Set<Ecouteur>();
let v = 0;
let dernierY = 0;
let image = 0;

function boucle() {
  const y = window.scrollY;
  const brut = Math.max(-1, Math.min(1, (y - dernierY) / 45));
  dernierY = y;
  v += (brut - v) * 0.12;
  if (brut === 0 && Math.abs(v) < 0.001) v = 0;
  ecouteurs.forEach((f) => f(v));
  image = v !== 0 || brut !== 0 ? requestAnimationFrame(boucle) : 0;
}

function reveiller() {
  if (!image) image = requestAnimationFrame(boucle);
}

export function ecouterVitesse(f: Ecouteur) {
  if (mouvementReduit()) return () => {};
  if (ecouteurs.size === 0) {
    dernierY = window.scrollY;
    window.addEventListener("scroll", reveiller, { passive: true });
  }
  ecouteurs.add(f);
  return () => {
    ecouteurs.delete(f);
    if (ecouteurs.size === 0) {
      window.removeEventListener("scroll", reveiller);
      if (image) cancelAnimationFrame(image);
      image = 0;
      v = 0;
    }
  };
}

export const vitesseActuelle = () => v;

/**
  Les grands titres de la page penchent et s'étirent pendant un défilement rapide,
  puis se redressent à l'arrêt. Seuls les titres visibles reçoivent un transform.
*/
export function useInclinaisonTitres(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const racine = ref.current;
    if (!racine) return;
    const titres = [...racine.querySelectorAll<HTMLElement>(".chv-titre")];
    return ecouterVitesse((v) => {
      const h = window.innerHeight;
      for (const titre of titres) {
        const r = titre.getBoundingClientRect();
        if (r.bottom < 0 || r.top > h) continue;
        titre.style.transform = v === 0 ? "" : `skewY(${(-v * 5).toFixed(2)}deg) scaleY(${(1 + Math.abs(v) * 0.18).toFixed(3)})`;
      }
    });
  }, [ref]);
}
