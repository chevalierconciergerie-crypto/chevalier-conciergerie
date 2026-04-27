import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scène 02 — Trois piliers.
 * Trois mots-clés en serif géant, chacun avec une phrase de précision.
 * Pure typographie, pure noir, pas une photo. C'est l'approche Aman.
 */
export const EditorialMosaic = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineOp = useTransform(scrollYProgress, [0.08, 0.22, 0.78, 0.92], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.08, 0.22], [30, 0]);

  const p1Op = useTransform(scrollYProgress, [0.22, 0.36, 0.78, 0.92], [0, 1, 1, 0]);
  const p2Op = useTransform(scrollYProgress, [0.32, 0.46, 0.78, 0.92], [0, 1, 1, 0]);
  const p3Op = useTransform(scrollYProgress, [0.42, 0.56, 0.78, 0.92], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ height: "240vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16 md:mb-24"
            style={{ opacity: headlineOp, y: headlineY }}
          >
            <div className="w-10 h-px bg-gold/60 mx-auto mb-6" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/85">
              Notre métier
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <Pillar
              op={p1Op}
              word="Choisir."
              body="Pas tous les biens. Ceux dont on tomberait amoureux à la place du voyageur, ceux où on aimerait passer un week-end."
            />
            <Pillar
              op={p2Op}
              word="Accueillir."
              body="Comme on reçoit un ami : remise des clés en personne quand c'est possible, draps frais, une bouteille au frigo, des conseils sur la rue d'à côté."
            />
            <Pillar
              op={p3Op}
              word="Tenir."
              body="Le vrai travail commence après le check-in. Photos qu'on retravaille, prix qu'on ajuste, ménage qu'on contrôle, message à 22h auquel on répond."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Pillar = ({
  op,
  word,
  body,
}: {
  op: import("framer-motion").MotionValue<number>;
  word: string;
  body: string;
}) => (
  <motion.div style={{ opacity: op }} className="text-center md:text-left">
    <h3
      className="font-serif font-light text-white tracking-[-0.02em] mb-5"
      style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)" }}
    >
      {word.replace(".", "")}
      <span className="text-gold">.</span>
    </h3>
    <p className="font-sans text-sm md:text-base text-white/60 leading-relaxed max-w-xs md:max-w-none mx-auto md:mx-0">
      {body}
    </p>
  </motion.div>
);

export default EditorialMosaic;
