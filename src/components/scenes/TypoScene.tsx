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
    <section ref={sectionRef} className="relative bg-black" style={{ height: "200vh" }}>
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

        {/* Sous-texte simple, centré */}
        <motion.div
          className="relative mt-8 md:mt-12 px-6 text-center"
          style={{ opacity: subOpacity }}
        >
          <div className="w-10 h-px bg-gold/50 mx-auto mb-5" />
          <p className="font-sans text-sm md:text-base text-white/65 leading-relaxed max-w-md mx-auto tracking-wide">
            Une équipe née ici, basée ici.
            <br />
            Avignon, Villeneuve-lès-Avignon, Les Angles.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TypoScene;
