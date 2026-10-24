import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/langue";

export interface PhotoVisionneuse {
  src: string;
  legende: string;
}

/*
  Les photos en plein écran, sur fond noir : flèches du clavier, boutons ou
  glissement du doigt pour passer de l'une à l'autre, Échap ou la croix pour
  fermer. Les deux voisines sont chargées d'avance pour que le passage soit net.
*/
export default function Visionneuse({ photos, depart, fermer }: { photos: PhotoVisionneuse[]; depart: number; fermer: () => void }) {
  const t = useT();
  const [i, setI] = useState(depart);
  const croix = useRef<HTMLButtonElement>(null);
  const toucheX = useRef<number | null>(null);
  const n = photos.length;
  const precedente = useCallback(() => setI((x) => (x - 1 + n) % n), [n]);
  const suivante = useCallback(() => setI((x) => (x + 1) % n), [n]);

  useEffect(() => {
    const avant = document.activeElement as HTMLElement | null;
    croix.current?.focus();
    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      else if (e.key === "ArrowLeft") precedente();
      else if (e.key === "ArrowRight") suivante();
    };
    window.addEventListener("keydown", touche);
    return () => {
      window.removeEventListener("keydown", touche);
      document.body.style.overflow = defilement;
      avant?.focus();
    };
  }, [fermer, precedente, suivante]);

  useEffect(() => {
    for (const k of [i - 1, i + 1]) {
      const img = new Image();
      img.src = photos[(k + n) % n].src;
    }
  }, [i, n, photos]);

  const photo = photos[i];
  return (
    <div
      className="chv-visionneuse"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={t("Photos du logement")}
      onTouchStart={(e) => (toucheX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toucheX.current === null) return;
        const dx = e.changedTouches[0].clientX - toucheX.current;
        toucheX.current = null;
        if (dx > 50) precedente();
        else if (dx < -50) suivante();
      }}
    >
      <div className="chv-visionneuse__haut">
        <p>
          <span className="chv-visionneuse__compteur">
            {i + 1} / {n}
          </span>
          <span className="chv-visionneuse__legende">{photo.legende}</span>
        </p>
        <button ref={croix} type="button" className="chv-visionneuse__bouton" onClick={fermer} aria-label={t("Fermer les photos")}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <figure className="chv-visionneuse__cadre">
        <img key={photo.src} src={photo.src} alt={photo.legende} />
      </figure>
      <button type="button" className="chv-visionneuse__bouton chv-visionneuse__fleche chv-visionneuse__fleche--g" onClick={precedente} aria-label={t("Photo précédente")}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className="chv-visionneuse__bouton chv-visionneuse__fleche chv-visionneuse__fleche--d" onClick={suivante} aria-label={t("Photo suivante")}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
