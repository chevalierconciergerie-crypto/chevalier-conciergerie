import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imgInterior from "@/assets/appart-coeur-avignon-2.jpg";
import imgFacade from "@/assets/detail-architectural.jpg";
import imgPalais from "@/assets/authentique-1.jpg";

/**
 * Scène 02 — Trio Provence.
 * Trois images d'ambiance qui racontent la promesse : intérieur de mas,
 * façade aux volets bleus, monument emblématique. Fond noir, parallaxes
 * légèrement différents. Aucun ornement.
 */
export const EditorialMosaic = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallaxes très subtiles, différenciées
  const yA = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const yC = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  // Headline
  const headlineOp = useTransform(scrollYProgress, [0.1, 0.28, 0.78, 0.92], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.1, 0.28], [40, 0]);

  // Cards révélation échelonnée
  const card1Op = useTransform(scrollYProgress, [0.22, 0.4, 0.78, 0.92], [0, 1, 1, 0]);
  const card2Op = useTransform(scrollYProgress, [0.28, 0.46, 0.78, 0.92], [0, 1, 1, 0]);
  const card3Op = useTransform(scrollYProgress, [0.34, 0.52, 0.78, 0.92], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ height: "240vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative w-full h-full flex flex-col">
          {/* Headline en haut, beaucoup d'air */}
          <motion.div
            className="pt-16 md:pt-20 px-6 text-center"
            style={{ opacity: headlineOp, y: headlineY }}
          >
            <div className="w-10 h-px bg-gold/60 mx-auto mb-6" />
            <h2
              className="font-serif font-light text-white tracking-[-0.01em] [text-wrap:balance] mx-auto max-w-4xl"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Chaque bien, traité comme <em className="not-italic text-gold">une maison.</em>
            </h2>
          </motion.div>

          {/* Trio de cards */}
          <div className="flex-1 flex items-center justify-center px-6 md:px-12 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-7xl">
              <Card
                src={imgInterior}
                op={card1Op}
                y={yA}
                label="Intérieurs sublimés"
                meta="Mise en scène"
              />
              <Card
                src={imgFacade}
                op={card2Op}
                y={yB}
                label="Cachet provençal"
                meta="Avignon · Intra-muros"
                tall
              />
              <Card
                src={imgPalais}
                op={card3Op}
                y={yC}
                label="Vue patrimoine"
                meta="Cœur historique"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({
  src,
  op,
  y,
  label,
  meta,
  tall = false,
}: {
  src: string;
  op: import("framer-motion").MotionValue<number>;
  y: import("framer-motion").MotionValue<string>;
  label: string;
  meta: string;
  tall?: boolean;
}) => (
  <motion.div className="relative" style={{ opacity: op }}>
    <motion.div
      className={`relative overflow-hidden ${tall ? "aspect-[3/4.4] md:-mt-8" : "aspect-[3/4]"}`}
      style={{ y }}
    >
      <img src={src} alt={label} className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
    <div className="mt-4 flex items-baseline justify-between">
      <h3 className="font-serif text-base md:text-lg text-white font-light tracking-wide">
        {label}
      </h3>
      <span className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/40">
        {meta}
      </span>
    </div>
  </motion.div>
);

export default EditorialMosaic;
