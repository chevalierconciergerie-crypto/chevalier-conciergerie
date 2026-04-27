import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scène typographique géante — "AVIGNON" remplit l'écran. Inspiré du
 * "sustainability" d'Oryzo : aucune image, juste la puissance d'un mot.
 * Un fond cream/or, des ombres feuillagées suggérées au CSS, et le
 * mot qui scrolle au passage façon parallaxe horizontal subtil.
 */
export const TypoScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Translation horizontale très lente pour donner du relief
  const wordX = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const wordScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 0.96]);

  // Ombres feuillagées qui dérivent
  const leafX1 = useTransform(scrollYProgress, [0, 1], ["-2%", "5%"]);
  const leafX2 = useTransform(scrollYProgress, [0, 1], ["3%", "-4%"]);

  // Apparitions des labels
  const topOp = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
  const bottomOp = useTransform(scrollYProgress, [0.25, 0.45, 0.75, 0.9], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[hsl(36,40%,93%)]"
      style={{ height: "220vh" }}
      aria-label="Avignon — territoire local"
    >
      {/* Texture papier */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #000 0.5px, transparent 0.5px), radial-gradient(circle at 70% 60%, #000 0.5px, transparent 0.5px)",
          backgroundSize: "8px 8px, 12px 12px",
        }}
      />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Ombres feuillagées (cyprès stylisés au CSS) */}
        <motion.div
          className="absolute top-0 right-0 w-[55%] h-full pointer-events-none opacity-25 mix-blend-multiply"
          style={{ x: leafX1 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 8% 30% at 80% 20%, #2d3a1a 0%, transparent 60%), radial-gradient(ellipse 6% 40% at 90% 50%, #1f2912 0%, transparent 65%), radial-gradient(ellipse 10% 25% at 70% 80%, #2a3517 0%, transparent 60%)",
            }}
          />
        </motion.div>
        <motion.div
          className="absolute top-0 left-0 w-[40%] h-full pointer-events-none opacity-15 mix-blend-multiply"
          style={{ x: leafX2 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 12% 40% at 15% 30%, #2d3a1a 0%, transparent 55%), radial-gradient(ellipse 8% 20% at 25% 70%, #1f2912 0%, transparent 60%)",
            }}
          />
        </motion.div>

        {/* Bandeau d'en-tête */}
        <motion.div
          className="relative z-10 px-6 md:px-12 pt-10 flex items-center justify-between text-[hsl(222,40%,12%)]/60"
          style={{ opacity: topOp }}
        >
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase">
            05 — Territoire
          </span>
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase hidden md:block text-[hsl(35,75%,32%)]">
            ◇ 100 % local
          </span>
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase">
            FR · 84 · Provence
          </span>
        </motion.div>

        {/* Le mot géant */}
        <motion.div
          className="flex-1 flex items-center justify-center relative z-0"
          style={{ x: wordX, scale: wordScale }}
        >
          <h2
            className="font-serif font-light text-[hsl(222,40%,12%)] tracking-[-0.04em] leading-none select-none whitespace-nowrap text-center"
            style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}
          >
            <span className="italic font-extralight">a</span>vignon<span className="text-[hsl(35,75%,42%)]">.</span>
          </h2>
        </motion.div>

        {/* Bas — sous-titre + label */}
        <motion.div
          className="relative z-10 px-6 md:px-12 pb-16 md:pb-20 grid grid-cols-12 items-end gap-6"
          style={{ opacity: bottomOp }}
        >
          <div className="col-span-12 md:col-span-4">
            <div className="w-10 h-px bg-[hsl(35,75%,42%)]/60 mb-4" />
            <p className="font-sans text-sm md:text-base text-[hsl(222,40%,12%)]/80 leading-relaxed max-w-xs">
              Une équipe née ici, basée ici, qui connaît chaque ruelle des
              intramuros, chaque lavoir de Villeneuve et chaque vigneron des Angles.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 text-center md:text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[hsl(222,40%,12%)]/50">
              ↓ Découvrir nos biens
            </span>
          </div>

          <div className="col-span-12 md:col-span-4 md:text-right">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[hsl(222,40%,12%)]/50 mb-1">
              Zone d'intervention
            </div>
            <div className="font-serif text-base text-[hsl(222,40%,12%)]">
              Avignon · Villeneuve-lès-Avignon<br />
              Les Angles · Aix · Montpellier
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TypoScene;
