import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/* ------------------------------------------------------------------ *
 * VILLA SCROLL EXPERIENCE                                            *
 *                                                                    *
 * The Mediterranean interior video is rendered globally by           *
 * <FixedVillaBackdrop /> so it stays alive across many sections.     *
 * This component owns only the *hero* overlay layer: a sticky        *
 * 200 vh container with two text reveals (welcome + final CTA),      *
 * sitting on top of the backdrop.                                    *
 * ------------------------------------------------------------------ */

const Overlay = ({
  progress,
  range,
  children,
  align = "center",
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  children: ReactNode;
  align?: "center" | "bottom";
}) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [30, 0, 0, -30]);
  return (
    <motion.div
      className={
        "absolute inset-0 flex flex-col px-6 pointer-events-none " +
        (align === "bottom" ? "justify-end pb-24 md:pb-32" : "items-center justify-center text-center")
      }
      style={{ opacity, y }}
    >
      <div className={align === "bottom" ? "mx-auto max-w-3xl" : "max-w-3xl"}>{children}</div>
    </motion.div>
  );
};

export const VillaScrollExperience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }}
      aria-label="Visite immersive — Chevalier Conciergerie"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Welcome — fades in immediately, fades out as we descend */}
        <Overlay progress={scrollYProgress} range={[-1, 0, 0.35, 0.55]}>
          <div className="text-primary-foreground text-center">
            <div className="w-12 h-px bg-gold/70 mx-auto mb-6" />
            <p className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/85 mb-6">
              Chevalier Conciergerie
            </p>
            <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl font-light tracking-[0.04em] leading-[1.05] [text-wrap:balance]">
              Bienvenue dans
              <br />
              <em className="text-gold not-italic">l'art du sur-mesure</em>
            </h1>
            <p className="font-sans mt-8 text-[11px] md:text-xs tracking-[0.3em] uppercase text-primary-foreground/65">
              Faites défiler pour découvrir
            </p>
          </div>
        </Overlay>

        {/* Final CTA — appears as we approach the services section */}
        <Overlay progress={scrollYProgress} range={[0.6, 0.75, 0.95, 1]} align="bottom">
          <div className="text-primary-foreground text-center">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight [text-wrap:balance]">
              Vous percevez,
              <br />
              <em className="text-gold not-italic">nous orchestrons</em>
            </h2>
          </div>
        </Overlay>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <div className="w-[18px] h-7 border border-primary-foreground/35 rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-gold/70 rounded-full mt-1.5 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VillaScrollExperience;
