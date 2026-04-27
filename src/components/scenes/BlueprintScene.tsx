import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scène 01 — La voix du fondateur.
 * Une citation de Victor en serif italique, sur fond noir pur. Aucune photo,
 * aucun ornement. C'est lui qui parle directement, pas le branding.
 *
 * (Texte modifiable : adapter à votre voix réelle quand vous voulez.)
 */
export const BlueprintScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const quoteOpacity = useTransform(scrollYProgress, [0.15, 0.32, 0.78, 0.92], [0, 1, 1, 0]);
  const quoteY = useTransform(scrollYProgress, [0.15, 0.32], [40, 0]);
  const signOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.78, 0.92], [0, 1, 1, 0]);
  const signY = useTransform(scrollYProgress, [0.45, 0.6], [20, 0]);

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ height: "180vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43,67%,52%,0.04)_0%,transparent_55%)]" />

        <div className="relative w-full max-w-5xl mx-auto px-6 text-center">
          <motion.blockquote
            className="font-serif font-light text-white tracking-[-0.005em] [text-wrap:balance]"
            style={{
              opacity: quoteOpacity,
              y: quoteY,
              fontSize: "clamp(1.6rem, 4vw, 3.4rem)",
              lineHeight: 1.25,
            }}
          >
            <span className="text-gold/70 mr-2 align-top">«</span>
            Je m'occupe de chaque appartement comme s'il devait accueillir
            mes proches —{" "}
            <em className="not-italic text-gold">on n'apprend pas ça dans une formation</em>,
            on l'apprend en y vivant.
            <span className="text-gold/70 ml-2 align-top">»</span>
          </motion.blockquote>

          <motion.div
            className="mt-12 md:mt-16 flex flex-col items-center"
            style={{ opacity: signOpacity, y: signY }}
          >
            <div className="w-10 h-px bg-gold/50 mb-5" />
            <p className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/55">
              Victor Chevalier
            </p>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/30 mt-2">
              Fondateur · Avignon
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlueprintScene;
