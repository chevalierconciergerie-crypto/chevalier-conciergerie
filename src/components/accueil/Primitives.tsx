import type { CSSProperties, ElementType, ReactNode } from "react";
import { useRevele } from "./effets";
import "./chevalier.css";

/** Apparition au défilement : l'élément monte, ou arrive incliné dans la profondeur. */
export function Revele({
  as: Balise = "div",
  effet = "monte",
  delai = 0,
  className = "",
  style,
  children,
}: {
  as?: ElementType;
  effet?: "monte" | "volume";
  delai?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [ref, visible] = useRevele<HTMLElement>(effet === "volume" ? 0.12 : 0.15);
  return (
    <Balise
      ref={ref}
      className={`chv-${effet} ${visible ? "est-visible" : ""} ${className}`}
      style={{ ...style, "--delai": `${delai}ms` } as CSSProperties}
    >
      {children}
    </Balise>
  );
}

/**
  Le grand titre d'une section : chaque ligne monte derrière un masque à
  l'entrée dans l'écran, avec un léger décalage de l'une à l'autre.
*/
export function TitreAnime({ lignes, className = "", as: Balise = "h2" }: { lignes: string[]; className?: string; as?: ElementType }) {
  const [ref, visible] = useRevele<HTMLHeadingElement>(0.25);
  return (
    <Balise ref={ref} className={`chv-titre ${visible ? "est-visible" : ""} ${className}`}>
      {lignes.map((ligne, i) => (
        <span key={ligne} className="chv-masque">
          <span className="chv-ligne" style={{ "--i": i } as CSSProperties}>
            {ligne}
          </span>
        </span>
      ))}
    </Balise>
  );
}

export function Etiquette({ children }: { children: ReactNode }) {
  return <p className="chv-etiquette">{children}</p>;
}

export function IconeCoche() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" fill="none" stroke="var(--chv-cuivre-fonce)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chevron({ couleur = "currentColor", taille = 18 }: { couleur?: string; taille?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={taille} height={taille} aria-hidden="true">
      <path d="M5 9l7 7 7-7" fill="none" stroke={couleur} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/*
  Motif Art déco dessiné pour Chevalier : un éventail de courbes fines qui
  s'ouvrent depuis un point bas, comme les ferronneries des façades
  avignonnaises de l'entre-deux-guerres. Tracé ici, pas repris d'ailleurs.
*/
export function MotifEventail({ className = "", couleur = "rgba(192,120,99,0.32)" }: { className?: string; couleur?: string }) {
  const cx = 600;
  const cy = 760;
  const branches = [-5, -3.4, -2, -1, 0, 1, 2, 3.4, 5];
  return (
    <svg className={className} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g fill="none" stroke={couleur} strokeWidth="1">
        {branches.map((b) => {
          const xHaut = cx + b * 118;
          const xCtrl = cx + b * 34;
          return <path key={b} d={`M ${cx} ${cy} Q ${xCtrl} ${cy - 360} ${xHaut} 40`} />;
        })}
        <path d={`M ${cx - 420} ${cy} A 420 420 0 0 1 ${cx + 420} ${cy}`} />
        <path d={`M ${cx - 250} ${cy} A 250 250 0 0 1 ${cx + 250} ${cy}`} />
      </g>
    </svg>
  );
}
