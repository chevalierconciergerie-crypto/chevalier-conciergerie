import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import propertyHero from "@/assets/authentique-1.jpg";

/**
 * Scène 01 — Apple iPhone Pro style.
 * Photo plein cadre, ken-burns au scroll, une seule phrase bold qui se révèle.
 * Aucun label décoratif, aucune mire. Juste l'image, une phrase, du noir.
 */
export const BlueprintScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Ken-Burns continu sur toute la traversée
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.02]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  // Vignette / dim qui s'intensifie en bas pour faire ressortir le texte
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.2, 0.55, 0.75]);

  // Apparition retardée du titre, persistance longue, sortie élégante
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.42, 0.78, 0.95], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.2, 0.42], [60, 0]);

  const lineOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.78, 0.95], [0, 1, 1, 0]);
  const lineY = useTransform(scrollYProgress, [0.45, 0.55], [20, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Image plein cadre */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: imageScale, y: imageY }}
        >
          <img
            src={propertyHero}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Vignettage cinématique */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Titre — une seule phrase, deux lignes */}
        <motion.div
          className="absolute inset-x-0 bottom-[18%] md:bottom-[20%] flex flex-col items-center text-center px-6 pointer-events-none"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <h2
            className="font-serif font-light text-white tracking-[-0.02em] leading-[0.95] [text-wrap:balance]"
            style={{ fontSize: "clamp(2.6rem, 7vw, 6.5rem)" }}
          >
            Plus qu'un logement.<br />
            <em className="not-italic text-gold">Une expérience.</em>
          </h2>

          <motion.p
            className="font-sans text-sm md:text-base text-white/65 mt-8 max-w-md tracking-wide leading-relaxed"
            style={{ opacity: lineOpacity, y: lineY }}
          >
            Chaque bien est curé, sublimé, et géré avec la précision
            d'une maison hôtelière.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BlueprintScene;
