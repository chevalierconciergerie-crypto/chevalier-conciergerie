import { useEffect, useRef, useState, type RefObject } from "react";

/*
  Les effets de l'accueil, sans bibliothèque : un IntersectionObserver pour
  les apparitions, une boucle de défilement partagée pour tout ce qui bouge
  en continu avec la page. Une seule écoute « scroll » pour tous les éléments,
  recalculée une fois par image — pas un écouteur par carte.
*/

export const mouvementReduit = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Vrai dès que l'élément est entré dans l'écran (une seule fois). */
export function useRevele<T extends Element>(seuil = 0.15): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (mouvementReduit() || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observateur = new IntersectionObserver(
      (entrees) => {
        if (entrees.some((e) => e.isIntersecting)) {
          setVisible(true);
          observateur.disconnect();
        }
      },
      { threshold: seuil },
    );
    observateur.observe(el);
    return () => observateur.disconnect();
  }, [seuil]);

  return [ref, visible];
}

/* ---- Boucle de défilement partagée ---- */
type Abonne = () => void;
const abonnes = new Set<Abonne>();
let planifie = false;

function tourner() {
  planifie = false;
  abonnes.forEach((f) => f());
}
function planifier() {
  if (planifie) return;
  planifie = true;
  requestAnimationFrame(tourner);
}

function abonner(f: Abonne) {
  if (abonnes.size === 0) {
    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier);
  }
  abonnes.add(f);
  f();
  return () => {
    abonnes.delete(f);
    if (abonnes.size === 0) {
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
    }
  };
}

/**
  Rotation continue pilotée par le défilement : tant que l'élément traverse
  l'écran, son angle change. -1 quand il arrive par le bas, +1 quand il sort
  par le haut. `sens` choisit de quel côté il penche.
*/
export function usePivot<T extends HTMLElement>(sens: 1 | -1, amplitude = 1): RefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || mouvementReduit()) return;
    return abonner(() => {
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      if (r.bottom < -200 || r.top > h + 200) return;
      const milieu = h / 2;
      const avance = Math.max(-1, Math.min(1, (milieu - (r.top + r.height / 2)) / milieu));
      el.style.transform =
        `perspective(1500px) rotateX(${(avance * -7 * amplitude).toFixed(2)}deg) ` +
        `rotateY(${(sens * (9 - Math.abs(avance) * 5) * amplitude).toFixed(2)}deg) ` +
        `translateY(${(avance * -14).toFixed(1)}px)`;
    });
  }, [sens, amplitude]);
  return ref;
}

/**
  Progression de 0 à 1 d'une section haute à contenu collant : 0 quand son
  haut touche le haut de l'écran, 1 quand sa fin arrive en bas. Écrite dans
  la variable CSS --p de l'élément, adoucie (ease-in-out).
*/
export function useProgression<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (mouvementReduit()) {
      el.style.setProperty("--p", "0");
      return;
    }
    return abonner(() => {
      const r = el.getBoundingClientRect();
      const course = r.height - window.innerHeight;
      const p = course > 0 ? Math.min(1, Math.max(0, -r.top / course)) : 0;
      const adouci = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      el.style.setProperty("--p", adouci.toFixed(4));
    });
  }, []);
  return ref;
}

/** Défilement jusqu'à une ancre de l'accueil, sous la barre fixe. */
export function allerA(ancre: string) {
  if (ancre === "accueil") {
    window.scrollTo({ top: 0, behavior: mouvementReduit() ? "auto" : "smooth" });
    return;
  }
  const el = document.getElementById(ancre);
  if (!el) return;
  const haut = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: haut, behavior: mouvementReduit() ? "auto" : "smooth" });
}
