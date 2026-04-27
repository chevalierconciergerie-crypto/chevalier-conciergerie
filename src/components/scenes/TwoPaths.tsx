import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Deux chemins — chapitres scroll-pinnés en miroir.
 *
 * Chaque chapitre prend 240vh de scroll. À l'intérieur, l'écran est
 * "pinned" pendant ~1.4 viewports. Le numéro romain est monumental,
 * rivé en place. Le contenu se révèle dessus en stagger pendant que
 * le numéro respire (scale + rotation infimes).
 *
 * I — palette noir + or (univers riche, on s'engage).
 * II — palette crème + noir (univers papier, on s'efface).
 */

const Path = ({
  numeral,
  variant,
  kicker,
  title,
  epigraph,
  inclusions,
  price,
  cta,
  href,
}: {
  numeral: string;
  variant: "dark" | "light";
  kicker: string;
  title: string;
  epigraph: string;
  inclusions: string[];
  price: string;
  cta: string;
  href: string;
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Numéro romain : entre, respire, sort
  const numScale = useTransform(scrollYProgress, [0.05, 0.35, 0.7, 1], [0.6, 1, 1.05, 1.15]);
  const numOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.35, 0.7, 0.95, 1],
    [0, 0.04, 0.09, 0.09, 0.04, 0]
  );
  const numRotate = useTransform(scrollYProgress, [0, 1], ["-2deg", "2deg"]);
  const numX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  // Reveal progressif du contenu
  const kickerOp = useTransform(scrollYProgress, [0.18, 0.32, 0.78, 0.92], [0, 1, 1, 0]);
  const kickerY = useTransform(scrollYProgress, [0.18, 0.32], [30, 0]);

  const titleOp = useTransform(scrollYProgress, [0.25, 0.4, 0.78, 0.92], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.25, 0.4], [50, 0]);

  const epiOp = useTransform(scrollYProgress, [0.35, 0.5, 0.78, 0.92], [0, 1, 1, 0]);
  const epiY = useTransform(scrollYProgress, [0.35, 0.5], [30, 0]);

  const listOp = useTransform(scrollYProgress, [0.45, 0.6, 0.78, 0.92], [0, 1, 1, 0]);
  const ctaOp = useTransform(scrollYProgress, [0.55, 0.7, 0.78, 0.92], [0, 1, 1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.55, 0.7], [20, 0]);

  const dark = variant === "dark";
  const bg = dark ? "bg-black" : "bg-[hsl(36,28%,90%)]";
  const text = dark ? "text-white" : "text-[hsl(222,40%,8%)]";
  const muted = dark ? "text-white/60" : "text-[hsl(222,40%,8%)]/65";
  const subtle = dark ? "text-white/30" : "text-[hsl(222,40%,8%)]/40";
  const rule = dark ? "border-white/10" : "border-[hsl(222,40%,8%)]/12";
  const goldText = dark ? "text-gold" : "text-[hsl(35,75%,38%)]";
  const goldMuted = dark ? "text-gold/85" : "text-[hsl(35,75%,38%)]/90";
  const numColor = dark ? "text-white" : "text-[hsl(222,40%,8%)]";

  return (
    <section
      ref={sectionRef}
      className={`relative ${bg} ${text}`}
      style={{ height: "240vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Numéro romain monumental, fond, en sticky */}
        <motion.div
          className={`absolute inset-0 pointer-events-none flex items-center justify-center font-serif font-light leading-none select-none ${numColor}`}
          style={{
            scale: numScale,
            opacity: numOpacity,
            rotate: numRotate,
            x: numX,
            fontSize: "clamp(28rem, 75vw, 80rem)",
            letterSpacing: "-0.06em",
          }}
          aria-hidden="true"
        >
          {numeral}
        </motion.div>

        {/* Contenu en sticky par-dessus */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-12 gap-y-8 md:gap-x-12 items-start">
            {/* Colonne gauche — kicker + prix */}
            <motion.div
              className="col-span-12 md:col-span-3"
              style={{ opacity: kickerOp, y: kickerY }}
            >
              <div className={`w-10 h-px mb-5 ${dark ? "bg-gold/60" : "bg-[hsl(35,75%,38%)]/70"}`} />
              <p className={`font-mono text-[10px] md:text-xs tracking-[0.45em] uppercase ${goldMuted}`}>
                {kicker}
              </p>
              <p className={`font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mt-3 ${subtle}`}>
                ↳ {price}
              </p>
            </motion.div>

            {/* Colonne droite — corps */}
            <div className="col-span-12 md:col-span-9">
              <motion.h3
                className="font-serif font-light tracking-[-0.02em] leading-[0.92]"
                style={{
                  opacity: titleOp,
                  y: titleY,
                  fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)",
                }}
              >
                {title}
              </motion.h3>

              <motion.p
                className={`font-serif italic mt-7 md:mt-10 tracking-[-0.005em] [text-wrap:balance] ${goldText}`}
                style={{
                  opacity: epiOp,
                  y: epiY,
                  fontSize: "clamp(1.2rem, 2.4vw, 2rem)",
                  lineHeight: 1.35,
                }}
              >
                {epigraph}
              </motion.p>

              <motion.div
                className={`mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 max-w-2xl border-t ${rule} pt-8`}
                style={{ opacity: listOp }}
              >
                {inclusions.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className={`w-1 h-1 rounded-full ${dark ? "bg-gold/60" : "bg-[hsl(35,75%,38%)]/70"}`} />
                    <span className={`font-sans text-sm ${muted}`}>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div style={{ opacity: ctaOp, y: ctaY }} className="mt-10 md:mt-14">
                <Link
                  to={href}
                  className={`group inline-flex items-center gap-3 font-sans text-[11px] md:text-xs tracking-[0.35em] uppercase border-b transition-colors duration-500 pb-2 ${dark ? "text-white border-white/30 hover:text-gold hover:border-gold" : "text-[hsl(222,40%,8%)] border-[hsl(222,40%,8%)]/30 hover:text-[hsl(35,75%,38%)] hover:border-[hsl(35,75%,38%)]"}`}
                >
                  {cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TwoPaths = () => {
  return (
    <>
      {/* Header — accroche commune avant les deux chapitres */}
      <section className="relative bg-black py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-10 h-px bg-gold/60 mx-auto mb-6" />
          <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/85">
            Deux chemins
          </span>
          <h2
            className="font-serif font-light text-white mt-6 tracking-[-0.015em] [text-wrap:balance]"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          >
            Confier, ou <em className="not-italic text-gold">céder.</em>
          </h2>
          <p className="font-sans text-sm md:text-base text-white/55 leading-relaxed mt-8 max-w-md mx-auto">
            Selon que vous voulez garder la main sur votre bien ou en
            sécuriser le rendement à long terme.
          </p>
        </div>
      </section>

      {/* Chapitre I — Conciergerie : palette sombre, riche */}
      <Path
        numeral="I"
        variant="dark"
        kicker="Formule I — Conciergerie"
        title="Vous restez. On s'active."
        epigraph="« Vous gardez la propriété, le bien, les revenus.
        On absorbe absolument tout le reste. »"
        inclusions={[
          "Shooting photo professionnel",
          "Annonces sur Airbnb · Booking · Abritel",
          "Tarification dynamique 365 j",
          "Accueil voyageurs en personne",
          "Ménage hôtelier & linge fourni",
          "Astreinte 7 j / 7 jusqu'à 23 h",
          "Suivi des avis et optimisation",
          "Maintenance courante incluse",
        ]}
        price="À partir de 20 % du loyer"
        cta="Découvrir la conciergerie"
        href="/conciergerie"
      />

      {/* Chapitre II — Sous-location : palette crème, papier */}
      <Path
        numeral="II"
        variant="light"
        kicker="Formule II — Sous-location"
        title="Vous lâchez. On reprend."
        epigraph="« On vous loue le bien en bail commercial.
        Vous ne lisez plus jamais une notification Airbnb. »"
        inclusions={[
          "Bail commercial sécurisé",
          "Loyer fixe versé tous les mois",
          "Aucune vacance, peu importe la saison",
          "Zéro charge de gestion locative",
          "Zéro message voyageur à 23 h",
          "Sortie possible avec préavis court",
          "Travaux d'entretien à notre charge",
          "Visibilité long terme sur 3 à 9 ans",
        ]}
        price="Loyer garanti versé mensuellement"
        cta="Découvrir la sous-location"
        href="/sous-location"
      />
    </>
  );
};

export default TwoPaths;
