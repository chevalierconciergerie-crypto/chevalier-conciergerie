import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scène 04 — Territoire.
 * "Avignon." en typo géante sur fond noir pur. Aucune photo, aucun ornement.
 * La force du nom du territoire suffit.
 */
export const TypoScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Apparition du mot
  const wordOpacity = useTransform(scrollYProgress, [0.15, 0.32, 0.78, 0.92], [0, 1, 1, 0]);
  const wordY = useTransform(scrollYProgress, [0.15, 0.32], [40, 0]);
  // Sous-texte
  const subOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.78, 0.92], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative bg-primary" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Halo or très discret */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43,67%,52%,0.05)_0%,transparent_60%)]" />

        {/* Le mot géant, centré, simple */}
        <motion.h2
          className="relative font-serif font-light text-white tracking-[-0.04em] leading-none text-center pointer-events-none"
          style={{
            opacity: wordOpacity,
            y: wordY,
            fontSize: "clamp(5rem, 22vw, 22rem)",
          }}
        >
          Avignon<span className="text-gold">.</span>
        </motion.h2>

        {/* Sous-texte ancré dans le territoire */}
        <motion.div
          className="relative mt-10 md:mt-14 px-6 text-center max-w-2xl"
          style={{ opacity: subOpacity }}
        >
          <div className="w-10 h-px bg-gold/50 mx-auto mb-6" />
          <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed tracking-wide">
            Né ici. Basé ici. On connaît la ruelle des Teinturiers à 6 h
            du matin, le pic de fréquentation du Festival, et le moment
            précis où il faut ouvrir les volets l'été.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 md:gap-5 font-mono text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-white/40">
            <span>Avignon</span>
            <span className="w-1 h-1 rounded-full bg-gold/60" />
            <span>Villeneuve-lès-Avignon</span>
            <span className="w-1 h-1 rounded-full bg-gold/60" />
            <span>Les Angles</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TypoScene;
