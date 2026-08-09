import { useEffect, useRef, type ReactNode } from "react";
import VanillaTilt from "vanilla-tilt";

/**
 * Donne de la profondeur à un bloc : il s'incline légèrement vers la souris,
 * avec un reflet qui suit le mouvement.
 *
 * Pourquoi cette technique plutôt qu'une scène WebGL : l'effet s'applique
 * PAR-DESSUS le contenu existant, qui reste du HTML normal. Le texte demeure
 * lisible par Google et par les robots des IA, et le poids ajouté est de
 * 8,9 Ko — une scène Three.js aurait coûté plusieurs centaines de kilo-octets
 * et remplacé du contenu indexable par un canvas illisible.
 *
 * L'effet est ignoré au doigt (il n'y a pas de survol sur mobile) et pour qui
 * a demandé à réduire les animations.
 */

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Amplitude de l'inclinaison, en degrés. */
  max?: number;
  /** Reflet qui balaie la surface — à réserver aux blocs sombres. */
  glare?: boolean;
}

const Tilt = ({ children, className = "", max = 12, glare = true }: TiltProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const finPointeur = window.matchMedia("(hover: hover) and (pointer: fine)");
    const animationsReduites = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finPointeur.matches || animationsReduites.matches) return;

    VanillaTilt.init(node, {
      max,
      speed: 500,
      scale: 1.04,
      glare,
      "max-glare": 0.35,
      gyroscope: false,
      // Perspective courte = fuyantes prononcées : c'est ce qui fait lire
      // le relief. À 1400 l'effet existait mais restait invisible à l'œil.
      perspective: 800,
    });

    return () => {
      // La bibliothèque accroche son instance sur le nœud lui-même.
      (node as HTMLDivElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt?.destroy();
    };
  }, [max, glare]);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
};

export default Tilt;
