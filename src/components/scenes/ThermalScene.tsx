import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scène 03 — Témoignage voyageur.
 * Une seule citation en gros serif italique. Pure noir, pure typo.
 *
 * (Texte modifiable : remplacer par un vrai extrait d'avis Airbnb
 * quand vous en avez un qui vous parle particulièrement.)
 */
export const ThermalScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const quoteOpacity = useTransform(scrollYProgress, [0.15, 0.32, 0.78, 0.92], [0, 1, 1, 0]);
  const quoteY = useTransform(scrollYProgress, [0.15, 0.32], [30, 0]);
  const signOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.78, 0.92], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ height: "180vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43,67%,52%,0.04)_0%,transparent_55%)]" />

        <div className="relative w-full max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="w-12 h-px bg-gold/50 mx-auto mb-8"
            style={{ opacity: quoteOpacity }}
          />

          <motion.blockquote
            className="font-serif font-light italic text-white/90 tracking-[-0.005em] [text-wrap:balance]"
            style={{
              opacity: quoteOpacity,
              y: quoteY,
              fontSize: "clamp(1.5rem, 3.6vw, 3rem)",
              lineHeight: 1.3,
            }}
          >
            On est arrivés à Avignon pour le festival, on est repartis avec
            le numéro de Victor dans nos contacts. Tout était pensé —
            jusqu'à la liste des bonnes adresses qu'il nous a laissée
            sur la table.
          </motion.blockquote>

          <motion.div
            className="mt-12 md:mt-16 flex flex-col items-center"
            style={{ opacity: signOpacity }}
          >
            <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50">
              Voyageurs · Été 2025
            </p>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold/70 mt-3">
              ★★★★★ — Avis vérifié Airbnb
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ThermalScene;
