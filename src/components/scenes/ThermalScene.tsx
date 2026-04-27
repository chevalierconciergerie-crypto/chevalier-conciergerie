import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import appartCosy from "@/assets/appart-cosy-lumineux-2.png";

/**
 * Scène thermique — vue en imagerie magenta/cyan d'une propriété, avec
 * stats de performance et "équation" de yield. Le clin d'œil à Oryzo
 * "thermodynamic stability" devient ici la promesse de revenus
 * optimisés algorithmiquement.
 */
export const ThermalScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 0.95]);
  const labelsOp = useTransform(scrollYProgress, [0.18, 0.35, 0.7, 0.88], [0, 1, 1, 0]);
  const headlineOp = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);

  // Stats animées
  const yield1 = useTransform(scrollYProgress, [0.2, 0.45], [0, 87]);
  const yield2 = useTransform(scrollYProgress, [0.25, 0.5], [0, 142]);
  const yield3 = useTransform(scrollYProgress, [0.3, 0.55], [0, 4.97]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "240vh" }}
      aria-label="Optimisation algorithmique des revenus"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Backdrop magenta/violet thermique */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,#5e1a8a_0%,#2a0445_45%,#0a0014_85%,#000_100%)]" />

        {/* L'image en treatment thermique */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center will-change-transform"
          style={{ scale: imageScale }}
        >
          <div className="relative w-[88vw] md:w-[78vw] max-w-5xl aspect-[16/9] overflow-hidden">
            <img
              src={appartCosy}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              style={{
                filter: "saturate(1.6) hue-rotate(265deg) brightness(0.85) contrast(1.4)",
              }}
            />
            {/* Calque thermique magenta vers cyan */}
            <div
              className="absolute inset-0 mix-blend-screen opacity-70"
              style={{
                background:
                  "linear-gradient(120deg, #ff2bd6 0%, #c426ff 40%, #2c4dff 75%, #00e5ff 100%)",
              }}
            />
            {/* Grille pixelisée subtile */}
            <div
              className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0, transparent 6px, rgba(255,255,255,0.06) 7px), repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(255,255,255,0.06) 7px)",
              }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0a0014_100%)]" />
          </div>
        </motion.div>

        {/* En-tête de section */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-[#ff7be0]">
            03 — Optimisation
          </span>
        </div>

        {/* Coordonnées thermiques */}
        <motion.div
          className="absolute top-8 right-6 md:right-12 z-20 text-right"
          style={{ opacity: labelsOp }}
        >
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#a8c5ff]/70">
            ↗ Yield Map · Live
          </div>
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#a8c5ff]/40 mt-1">
            T+90j · Avignon
          </div>
        </motion.div>

        {/* Stats overlays — coin gauche bas */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 left-6 md:left-12 z-20 space-y-3"
          style={{ opacity: labelsOp }}
        >
          <Stat label="Taux d'occupation" value={yield1} suffix=" %" tint="#ff5fd1" />
          <Stat label="Revenu vs marché" value={yield2} suffix=" %" tint="#ffb44a" />
          <Stat label="Note moyenne" value={yield3} suffix=" / 5" tint="#5fffd1" decimals={2} />
        </motion.div>

        {/* Équation factice en bas droite */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 right-6 md:right-12 z-20 text-right pointer-events-none"
          style={{ opacity: labelsOp }}
        >
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#a8c5ff]/60 mb-2">
            Modèle de tarification dynamique
          </div>
          <div className="font-mono text-[10px] md:text-xs text-primary-foreground/80 bg-black/40 backdrop-blur-sm border border-[#a8c5ff]/20 px-3 py-1.5 inline-block">
            P(t) = D(t) · S<sub>local</sub> · θ<sub>saison</sub>
          </div>
        </motion.div>

        {/* Titre central */}
        <motion.div
          className="absolute inset-0 flex items-end justify-center pb-32 md:pb-40 pointer-events-none z-10"
          style={{ opacity: headlineOp, y: headlineY }}
        >
          <div className="text-center px-6">
            <div className="w-12 h-px bg-[#ff5fd1]/60 mx-auto mb-5" />
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-primary-foreground tracking-wide leading-tight [text-wrap:balance]">
              Vos revenus,<br />
              <em className="not-italic bg-gradient-to-r from-[#ff5fd1] via-[#ffb44a] to-[#5fffd1] bg-clip-text text-transparent">
                pilotés au degré près.
              </em>
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stat = ({
  label,
  value,
  suffix,
  tint,
  decimals = 0,
}: {
  label: string;
  value: import("framer-motion").MotionValue<number>;
  suffix: string;
  tint: string;
  decimals?: number;
}) => {
  const display = useTransform(value, (v) => v.toFixed(decimals) + suffix);
  return (
    <div>
      <div
        className="font-mono text-[9px] tracking-[0.25em] uppercase mb-1"
        style={{ color: `${tint}aa` }}
      >
        {label}
      </div>
      <motion.div
        className="font-serif text-2xl md:text-4xl font-light tabular-nums"
        style={{ color: tint }}
      >
        {display}
      </motion.div>
    </div>
  );
};

export default ThermalScene;
