import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import appartProvencal from "@/assets/appart-provencal-1.png";

/**
 * Scène façon "blueprint" — la propriété est traitée comme une pièce
 * d'orfèvrerie : centrée dans un viewfinder, entourée de mires et de
 * légendes techniques. Inspirée de la scène "ISN'T JUST A COASTER"
 * d'Oryzo, adaptée à la gestion locative haut de gamme.
 */
export const BlueprintScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Le visuel entre par le bas pendant la première moitié, ressort par le haut sur la seconde
  const imageY = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], ["6%", "0%", "0%", "-6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04]);

  // Les libellés gauches/droits arrivent décalés
  const leftOpacity = useTransform(scrollYProgress, [0.15, 0.32, 0.7, 0.88], [0, 1, 1, 0]);
  const leftX = useTransform(scrollYProgress, [0.15, 0.32], [-30, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0.22, 0.4, 0.7, 0.88], [0, 1, 1, 0]);
  const rightX = useTransform(scrollYProgress, [0.22, 0.4], [30, 0]);

  // Les mires apparaissent les premières
  const cropOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.78, 0.92], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[hsl(222,35%,7%)]"
      style={{ height: "220vh" }}
      aria-label="Une location pas comme les autres"
    >
      {/* Backdrop dégradé chaud */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,hsl(35,75%,18%)_0%,hsl(222,35%,8%)_60%,hsl(222,40%,4%)_100%)] pointer-events-none" />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Mention discrète tout en haut */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70">
            01 — La Prestation
          </span>
        </div>

        {/* Coordonnées en haut à droite */}
        <motion.div
          className="absolute top-8 right-6 md:right-12 z-20 text-right"
          style={{ opacity: cropOpacity }}
        >
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary-foreground/40">
            43.9493°N · 4.8055°E
          </div>
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary-foreground/30 mt-1">
            Avignon · Provence
          </div>
        </motion.div>

        {/* Container central */}
        <div className="relative w-full max-w-7xl mx-auto px-6 grid grid-cols-12 items-center gap-4 md:gap-8">
          {/* Colonne gauche — titre */}
          <motion.div
            className="col-span-12 md:col-span-4 order-2 md:order-1"
            style={{ opacity: leftOpacity, x: leftX }}
          >
            <div className="w-10 h-px bg-gold/50 mb-5" />
            <h2 className="font-serif text-[2.4rem] md:text-5xl lg:text-6xl font-light text-primary-foreground leading-[0.95] tracking-[-0.01em]">
              CE N'EST PAS<br />
              <em className="text-gold not-italic font-light">qu'une simple</em><br />
              LOCATION.
            </h2>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary-foreground/40 mt-6">
              ↳ Réf. CC-PRSTGE-001
            </p>
          </motion.div>

          {/* Colonne centrale — l'image dans son viewfinder */}
          <div className="col-span-12 md:col-span-4 order-1 md:order-2 relative aspect-[3/4] mx-auto w-full max-w-[340px]">
            {/* Mires de cadrage */}
            <motion.div
              className="absolute -inset-3 md:-inset-5 pointer-events-none"
              style={{ opacity: cropOpacity }}
            >
              {/* Coins crochets */}
              <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-gold/60" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-gold/60" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-gold/60" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-gold/60" />

              {/* Croix centrale */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-px bg-gold/30" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-gold/30" />

              {/* Tirets sur les bords */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-gold/40" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-gold/40" />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-px bg-gold/40" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-px bg-gold/40" />
            </motion.div>

            {/* Image elle-même */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{ y: imageY, scale: imageScale }}
            >
              <img
                src={appartProvencal}
                alt="Bien d'exception géré par Chevalier Conciergerie"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>

            {/* Légende sous l'image */}
            <motion.div
              className="absolute -bottom-12 md:-bottom-14 left-0 right-0 text-center pointer-events-none"
              style={{ opacity: cropOpacity }}
            >
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold/70">
                ◇ Scroll pour découvrir
              </span>
            </motion.div>
          </div>

          {/* Colonne droite — paragraphe descriptif */}
          <motion.div
            className="col-span-12 md:col-span-4 order-3 text-right"
            style={{ opacity: rightOpacity, x: rightX }}
          >
            <p className="font-sans text-sm md:text-base text-primary-foreground/70 leading-relaxed max-w-xs ml-auto">
              C'est une expérience curatée, façonnée par une décennie de
              standards hôteliers et un œil méticuleux pour les détails
              qui transforment un séjour en souvenir.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary-foreground/40">
                Note Hôte
              </span>
              <span className="font-mono text-xs tracking-[0.15em] text-gold">
                4.97 / 5.00
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlueprintScene;
