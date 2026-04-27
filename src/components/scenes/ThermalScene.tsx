import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scène 03 — Performance.
 * Trois chiffres or sur fond noir pur. Aucune photo, aucun multicolore.
 * Juste les chiffres, le titre, et l'air autour.
 */
export const ThermalScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Apparitions échelonnées de chaque chiffre
  const headlineOp = useTransform(scrollYProgress, [0.15, 0.32, 0.78, 0.92], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.15, 0.32], [40, 0]);

  const stat1Op = useTransform(scrollYProgress, [0.32, 0.45, 0.78, 0.92], [0, 1, 1, 0]);
  const stat1Y = useTransform(scrollYProgress, [0.32, 0.45], [30, 0]);
  const value1 = useTransform(scrollYProgress, [0.32, 0.5], [0, 87]);

  const stat2Op = useTransform(scrollYProgress, [0.4, 0.53, 0.78, 0.92], [0, 1, 1, 0]);
  const stat2Y = useTransform(scrollYProgress, [0.4, 0.53], [30, 0]);
  const value2 = useTransform(scrollYProgress, [0.4, 0.58], [0, 4.97]);

  const stat3Op = useTransform(scrollYProgress, [0.48, 0.61, 0.78, 0.92], [0, 1, 1, 0]);
  const stat3Y = useTransform(scrollYProgress, [0.48, 0.61], [30, 0]);
  const value3 = useTransform(scrollYProgress, [0.48, 0.66], [0, 142]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Halo radial très subtil pour donner de la profondeur */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43,67%,52%,0.04)_0%,transparent_55%)]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          {/* Titre restrained */}
          <motion.div style={{ opacity: headlineOp, y: headlineY }} className="mb-16 md:mb-24">
            <div className="w-10 h-px bg-gold/60 mx-auto mb-6" />
            <h2
              className="font-serif font-light text-white tracking-wide [text-wrap:balance]"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)" }}
            >
              Une gestion <em className="not-italic text-gold">au cordeau.</em>
            </h2>
          </motion.div>

          {/* Trois chiffres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
            <motion.div style={{ opacity: stat1Op, y: stat1Y }}>
              <CountUp value={value1} suffix="%" decimals={0} />
              <div className="mt-3 font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/45">
                Taux d'occupation
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: stat2Op, y: stat2Y }}
              className="md:border-l md:border-r md:border-white/8 md:px-6"
            >
              <CountUp value={value2} suffix="/5" decimals={2} />
              <div className="mt-3 font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/45">
                Note voyageurs
              </div>
            </motion.div>

            <motion.div style={{ opacity: stat3Op, y: stat3Y }}>
              <CountUp value={value3} prefix="+" suffix="%" decimals={0} />
              <div className="mt-3 font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/45">
                Revenu vs marché
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CountUp = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: import("framer-motion").MotionValue<number>;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const display = useTransform(value, (v) => prefix + v.toFixed(decimals) + suffix);
  return (
    <motion.div
      className="font-serif font-light text-gold tabular-nums tracking-tight leading-none"
      style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
    >
      {display}
    </motion.div>
  );
};

export default ThermalScene;
