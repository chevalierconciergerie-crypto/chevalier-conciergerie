import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/* ------------------------------------------------------------------ *
 * VILLA SCROLL EXPERIENCE                                            *
 *                                                                    *
 * The Mediterranean interior video is rendered globally by           *
 * <FixedVillaBackdrop /> so it stays alive across many sections.     *
 * This component owns the *hero* overlay layer:                      *
 *   • the original "VOTRE CONCIERGERIE" headline with rotating       *
 *     cities (Avignon · Villeneuve-lès-Avignon · Aix-en-Provence ·   *
 *     Montpellier), and the two main CTA buttons baked in.           *
 *   • a subtle radial darkening behind the text for legibility       *
 *     without dimming the rest of the (sun-drenched) video.          *
 * ------------------------------------------------------------------ */

const cities = [
  "Avignon",
  "Villeneuve-lès-Avignon",
  "Aix-en-Provence",
  "Montpellier",
];

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
        (align === "bottom"
          ? "justify-end pb-24 md:pb-32"
          : "items-center justify-center text-center")
      }
      style={{ opacity, y }}
    >
      <div className={align === "bottom" ? "mx-auto max-w-3xl" : "max-w-5xl"}>
        {children}
      </div>
    </motion.div>
  );
};

export const VillaScrollExperience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Cycling cities for the gold italic line
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCityIndex((prev) => (prev + 1) % cities.length);
        setIsAnimating(false);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-driven 3D transforms on the hero headline:
  // tilts back & lifts upward as we descend, like a cinematic title card receding into the scene
  const titleRotateX = useTransform(scrollYProgress, [0, 0.6], [0, -22]);
  const titleY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const titleScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.5, 0.7], ["0px", "0px", "8px"]);
  // Metallic gold shimmer that drifts as you scroll — pure CSS, GPU-cheap
  const shimmerPos = useTransform(scrollYProgress, [0, 1], ["0%", "180%"]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }}
      aria-label="Visite immersive — Chevalier Conciergerie"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Soft radial darkening behind the hero text — keeps legibility
            without dimming the bright Provençal video for later sections. */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(8,12,24,0.55)_0%,rgba(8,12,24,0.35)_45%,transparent_75%)]"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0]),
          }}
        />

        {/* Original VOTRE CONCIERGERIE hero with rotating city + CTAs */}
        <Overlay progress={scrollYProgress} range={[-1, 0, 0.55, 0.85]}>
          <motion.div
            className="text-center w-full"
            style={{
              y: titleY,
              scale: titleScale,
              rotateX: titleRotateX,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
              filter: useTransform(titleBlur, (b) => `blur(${b})`),
            }}
          >
            <motion.div
              className="w-10 h-px bg-gold/60 mx-auto mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.p
              className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-primary-foreground/55 mb-6 md:mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Chevalier Conciergerie
            </motion.p>

            <motion.h1
              className="relative font-serif text-[2.2rem] leading-tight sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.06em] mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: "transparent",
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "linear-gradient(110deg, #f5e9c8 0%, #ffffff 28%, #d4af37 50%, #ffffff 72%, #f5e9c8 100%)",
                backgroundSize: "220% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textShadow:
                  "0 1px 0 hsl(0,0%,100%,0.06), 0 2px 8px hsl(43,67%,52%,0.18), 0 0 28px hsl(43,67%,52%,0.18)",
                backgroundPositionX: shimmerPos as unknown as string,
              }}
            >
              VOTRE CONCIERGERIE
            </motion.h1>

            <motion.div
              className="relative h-10 sm:h-14 md:h-20 overflow-hidden mb-8 md:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <span
                className={`font-serif text-2xl sm:text-4xl md:text-6xl text-gold italic absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out [text-shadow:0_0_30px_hsl(var(--gold)/0.5)] ${
                  isAnimating
                    ? "opacity-0 translate-y-6"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {cities[currentCityIndex]}
              </span>
            </motion.div>

            <motion.p
              className="font-sans text-[11px] md:text-sm text-primary-foreground/65 max-w-md mx-auto mb-8 md:mb-10 leading-relaxed tracking-[0.15em] uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
            >
              Conciergerie haut de gamme &<br />
              sous-location professionnelle
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-3 md:gap-5 pointer-events-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
            >
              <a
                href="/conciergerie"
                className="group relative flex items-center gap-2 md:gap-3 border border-primary-foreground/30 px-5 md:px-8 py-3 md:py-4 text-primary-foreground text-[10px] md:text-xs tracking-[0.25em] uppercase backdrop-blur-sm bg-primary/10 hover:bg-primary-foreground/10 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Conciergerie</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 relative z-10" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-foreground/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a
                href="/sous-location"
                className="group relative flex items-center gap-2 md:gap-3 border border-gold/50 px-5 md:px-8 py-3 md:py-4 text-gold text-[10px] md:text-xs tracking-[0.25em] uppercase backdrop-blur-sm bg-gold/5 hover:bg-gold/15 hover:shadow-gold transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Sous-location</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 relative z-10" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </motion.div>
          </motion.div>
        </Overlay>

        {/* Scroll hint */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
          }}
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
