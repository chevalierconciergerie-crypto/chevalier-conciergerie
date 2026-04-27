import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import appartCoeur from "@/assets/appart-coeur-avignon.png";
import appartCoeur3 from "@/assets/appart-coeur-avignon-3.png";
import appartIntramuros from "@/assets/appart-renove-intramuros.jpg";
import appartProvencal2 from "@/assets/appart-provencal-2.jpg";
import detailArchitectural from "@/assets/detail-architectural.jpg";

/**
 * Scène mosaïque éditoriale — clin d'œil à la séquence "wearable"
 * d'Oryzo : un grand visuel central traité comme une couverture de
 * magazine, entouré de polaroïds et d'une fausse couverture éditoriale.
 * Vos plus belles annonces sont présentées comme des œuvres curatées.
 */
export const EditorialMosaic = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallaxes différenciés pour chaque tuile
  const heroY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const tile1Y = useTransform(scrollYProgress, [0, 1], ["18%", "-8%"]);
  const tile2Y = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);
  const tile3Y = useTransform(scrollYProgress, [0, 1], ["22%", "-4%"]);
  const magY = useTransform(scrollYProgress, [0, 1], ["6%", "-22%"]);

  // Apparitions échelonnées
  const headlineOp = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const subOp = useTransform(scrollYProgress, [0.18, 0.38, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#1a0d0a]"
      style={{ height: "260vh" }}
      aria-label="Sublimée — vos biens devenus œuvres"
    >
      {/* Backdrop chaud rouge profond style éditorial mode */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#3d1410_0%,#1a0d0a_55%,#0a0504_100%)] pointer-events-none" />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Bandeau d'en-tête style magazine */}
        <div className="absolute top-0 inset-x-0 z-30 px-6 md:px-10 py-6 flex items-center justify-between text-primary-foreground/60">
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase">
            02 — Présentation
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase hidden md:block">
            Vol. I · Édition Provence
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-gold/70">
            Chevalier · MMXXV
          </span>
        </div>

        <div className="relative w-full h-full grid grid-cols-12 gap-2 md:gap-4 px-3 md:px-8 py-20 md:py-24">
          {/* Colonne gauche — petites tuiles type polaroïd */}
          <div className="hidden md:flex col-span-3 flex-col gap-3 justify-center">
            <motion.div
              className="aspect-[4/5] overflow-hidden bg-cream/5 p-2 shadow-2xl will-change-transform"
              style={{ y: tile1Y, rotate: -3 }}
            >
              <img src={appartCoeur} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div
              className="aspect-square overflow-hidden bg-cream/5 p-2 shadow-2xl will-change-transform ml-6"
              style={{ y: tile2Y, rotate: 4 }}
            >
              <img src={detailArchitectural} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div
              className="aspect-[4/5] overflow-hidden bg-cream/5 p-2 shadow-2xl will-change-transform"
              style={{ y: tile3Y, rotate: -2 }}
            >
              <img src={appartIntramuros} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </div>

          {/* Colonne centrale — gros visuel hero éditorial */}
          <div className="col-span-12 md:col-span-6 flex items-center justify-center relative">
            {/* Headline qui chevauche le visuel */}
            <motion.div
              className="absolute -top-2 md:-top-6 left-0 right-0 z-20 pointer-events-none text-left"
              style={{ opacity: headlineOp }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold">
                  Sublimée
                </span>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary-foreground/30">
                  · 100 % bookable
                </span>
              </div>
            </motion.div>

            <motion.div
              className="relative w-full max-w-[440px] aspect-[3/4] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] will-change-transform"
              style={{ y: heroY }}
            >
              <img
                src={appartProvencal2}
                alt="Bien sublimé"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay film grain léger */}
              <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-gradient-to-br from-orange-500/10 via-transparent to-rose-900/30" />
              {/* Repère de cadrage en pointillé */}
              <div className="absolute inset-3 border border-dashed border-primary-foreground/20 pointer-events-none" />
              {/* Légende tag */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary-foreground/80 bg-black/40 backdrop-blur-sm px-2 py-1">
                  Éd. limitée
                </span>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold/90 bg-black/40 backdrop-blur-sm px-2 py-1">
                  N° 002 / 008
                </span>
              </div>
            </motion.div>

            {/* Sous-titre dramatique */}
            <motion.div
              className="absolute -bottom-2 md:-bottom-8 left-0 right-0 z-20 pointer-events-none"
              style={{ opacity: subOp }}
            >
              <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-light text-primary-foreground tracking-tight leading-none [text-wrap:balance]">
                votre bien,<br />
                <em className="text-gold not-italic">version</em>
                <span className="italic font-extralight"> magazine.</span>
              </h2>
            </motion.div>
          </div>

          {/* Colonne droite — fausse couverture de magazine */}
          <div className="hidden md:flex col-span-3 items-center justify-center">
            <motion.div
              className="relative w-full max-w-[220px] aspect-[3/4] bg-[hsl(35,55%,90%)] shadow-2xl will-change-transform overflow-hidden"
              style={{ y: magY, rotate: 3 }}
            >
              <img
                src={appartCoeur3}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(35,55%,90%)]/90 via-transparent to-[hsl(35,55%,90%)]/30" />

              {/* Masthead du magazine */}
              <div className="absolute top-3 left-3 right-3 flex items-baseline justify-between">
                <span className="font-serif text-2xl font-light text-[hsl(222,40%,12%)] tracking-tight">
                  RISE.
                </span>
                <span className="font-mono text-[7px] tracking-[0.2em] uppercase text-[hsl(222,40%,12%)]/60">
                  Issue 02
                </span>
              </div>

              {/* Numéro */}
              <div className="absolute bottom-4 left-3 right-3">
                <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-[hsl(222,40%,12%)]/70 mb-1">
                  Cover Story
                </p>
                <p className="font-serif text-base text-[hsl(222,40%,12%)] leading-tight">
                  Comment Avignon<br />
                  est devenue<br />
                  <em className="text-[hsl(35,75%,35%)]">la nouvelle Riviera.</em>
                </p>
              </div>

              {/* Codes-barres factice */}
              <div className="absolute top-3 right-3 mt-12 flex flex-col items-end gap-1">
                <div className="flex gap-px">
                  {[3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1].map((w, i) => (
                    <span
                      key={i}
                      className="bg-[hsl(222,40%,12%)]/80"
                      style={{ width: `${w}px`, height: 16 }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[6px] tracking-widest text-[hsl(222,40%,12%)]/60">
                  CCM 04 25
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialMosaic;
