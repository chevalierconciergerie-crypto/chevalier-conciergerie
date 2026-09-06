import { useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Hero from "@/components/Hero";
import villeImage from "@/assets/hero-avignon-terrasse.webp";
import villeImageMobile from "@/assets/hero-avignon-terrasse-mobile.webp";
import ruelleImage from "@/assets/rue-teinturiers.jpg";
import interieurImage from "@/assets/authentique-1.jpg";

/*
  Séquence d'ouverture pilotée par le défilement, sur le modèle des sites
  immobiliers immersifs (era.estate) : écran noir → le nom → la ville →
  une ruelle → on passe une porte → un appartement réel → l'action.

  Choix technique : pas de WebGL. Une scène 3D remplacerait tout le hero par
  un canvas illisible pour Google, lourd à charger, et exigerait des modèles
  3D d'Avignon qui n'existent pas. Le même langage — caméra qui avance,
  profondeur à la souris, fondus au noir entre les lieux — s'obtient avec
  des photos réelles et des transformations CSS pilotées par le scroll,
  pour quelques kilo-octets.

  La traversée de la porte est un fondu par le noir : la ruelle accélère
  vers l'avant pendant qu'un vignettage se referme, puis l'intérieur
  s'ouvre de l'autre côté. C'est le raccord de montage que le cinéma
  utilise pour franchir un seuil — bien plus sobre qu'un masque en forme
  de porte, qui ferait gadget.

  Le texte (h1, note Google, bouton d'estimation) reste strictement celui
  de l'ancien hero : la séquence change la mise en scène, pas le message.
*/

/* Les lettres du nom apparaissent une à une, au chargement — c'est le seul
   moment animé par le temps ; tout le reste est piloté par le scroll. */
const NOM = "CHEVALIER";

const SequenceCinematique = () => {
  const cadreRef = useRef<HTMLElement>(null);
  const [introPassee, setIntroPassee] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cadreRef,
    offset: ["start start", "end end"],
  });

  /*
    Profondeur à la souris. La position est normalisée (-1 … 1) puis lissée
    par un ressort : l'image suit avec un temps de retard, comme une caméra
    portée, au lieu de coller au curseur. Chaque scène a son amplitude —
    la ville bouge peu (elle est loin), la ruelle davantage (on y est).
  */
  const sourisBruteX = useMotionValue(0);
  const sourisBruteY = useMotionValue(0);
  const sourisX = useSpring(sourisBruteX, { stiffness: 38, damping: 16 });
  const sourisY = useSpring(sourisBruteY, { stiffness: 38, damping: 16 });

  const surMouvementSouris = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    sourisBruteX.set((e.clientX / innerWidth) * 2 - 1);
    sourisBruteY.set((e.clientY / innerHeight) * 2 - 1);
  };

  const villeSourisX = useTransform(sourisX, (v) => v * -16);
  const villeSourisY = useTransform(sourisY, (v) => v * -10);
  const ruelleSourisX = useTransform(sourisX, (v) => v * -26);
  const ruelleSourisY = useTransform(sourisY, (v) => v * -14);
  const interieurSourisX = useTransform(sourisX, (v) => v * -10);
  const interieurSourisY = useTransform(sourisY, (v) => v * -6);

  /* ---- Scène 1 : écran noir, le nom ---- */
  const titreOpacite = useTransform(scrollYProgress, [0, 0.09, 0.15], [1, 1, 0]);
  const titreEchelle = useTransform(scrollYProgress, [0, 0.15], [1, 1.08]);

  /* ---- Scène 2 : la ville. La caméra avance sans jamais s'arrêter :
     l'échelle ne fait que croître pendant toute la présence de l'image. ---- */
  const villeOpacite = useTransform(
    scrollYProgress,
    [0.11, 0.17, 0.32, 0.38],
    [0, 1, 1, 0],
  );
  const villeEchelle = useTransform(scrollYProgress, [0.11, 0.38], [1.08, 1.34]);
  const legendeVilleOpacite = useTransform(
    scrollYProgress,
    [0.17, 0.21, 0.29, 0.33],
    [0, 1, 1, 0],
  );

  /* ---- Scène 3 : la ruelle. Même mouvement, plus rapide sur la fin —
     c'est l'accélération qui annonce qu'on va franchir la porte. ---- */
  const ruelleOpacite = useTransform(
    scrollYProgress,
    [0.35, 0.41, 0.55, 0.61],
    [0, 1, 1, 0],
  );
  const ruelleEchelle = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.61],
    [1.06, 1.22, 1.62],
  );
  const legendeRuelleOpacite = useTransform(
    scrollYProgress,
    [0.41, 0.45, 0.51, 0.55],
    [0, 1, 1, 0],
  );
  /* Le vignettage qui se referme : l'embrasure de la porte. */
  const porteOpacite = useTransform(scrollYProgress, [0.47, 0.6], [0, 1]);

  /* ---- Scène 4 : l'intérieur. L'image arrive légèrement grossie et se
     pose — on vient d'entrer, la caméra s'immobilise. Elle ne repart
     pas : c'est sur elle que la page continue. ---- */
  const interieurOpacite = useTransform(scrollYProgress, [0.6, 0.68], [0, 1]);
  const interieurEchelle = useTransform(scrollYProgress, [0.6, 0.86], [1.18, 1.02]);

  /* ---- Scène 5 : le message, inchangé par rapport à l'ancien hero. ---- */
  const contenuOpacite = useTransform(scrollYProgress, [0.72, 0.8], [0, 1]);
  const contenuY = useTransform(scrollYProgress, [0.72, 0.82], [36, 0]);
  const voileOpacite = useTransform(scrollYProgress, [0.68, 0.8], [0, 1]);

  /* Le bouton « Passer » disparaît quand la séquence touche à sa fin. */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIntroPassee(v > 0.7);
  });

  const passerIntro = () => {
    const cadre = cadreRef.current;
    if (!cadre) return;
    window.scrollTo({
      top: cadre.offsetTop + cadre.offsetHeight - window.innerHeight + 1,
      behavior: "auto",
    });
  };

  return (
    /*
      Le conteneur fait plusieurs écrans de haut ; la vue reste épinglée
      pendant qu'on le traverse. C'est la longueur de ce conteneur qui
      donne son rythme à la séquence — 550vh ≈ cinq gestes de défilement.
    */
    <section
      ref={cadreRef}
      id="intro-cinematique"
      className="relative h-[420vh] md:h-[550vh] bg-[hsl(0_0%_4%)]"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        onMouseMove={surMouvementSouris}
      >
        {/* Le fond noir permanent : chaque scène s'ouvre et se referme dessus. */}
        <div className="absolute inset-0 bg-[hsl(0_0%_4%)]" />

        {/* ---- La ville ---- */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            opacity: villeOpacite,
            scale: villeEchelle,
            x: villeSourisX,
            y: villeSourisY,
          }}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={villeImageMobile} />
            <img
              src={villeImage}
              alt="Terrasse en pierre dominant les toits d'Avignon et le Palais des Papes au coucher du soleil"
              fetchpriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
          {/* Étalonnage sombre : la photo est dorée, la séquence est nocturne.
              Sans ce voile, le passage du noir à l'ocre saturé ferait publicité
              plutôt que cinéma. */}
          <div className="absolute inset-0 bg-[hsl(20_15%_5%)]/45 [backdrop-filter:saturate(0.7)]" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_35%,hsl(20_15%_4%/0.85)_100%)]" />
        </motion.div>

        {/* ---- La ruelle ---- */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            opacity: ruelleOpacite,
            scale: ruelleEchelle,
            x: ruelleSourisX,
            y: ruelleSourisY,
          }}
        >
          <img
            src={ruelleImage}
            alt="Rue des Teinturiers à Avignon, ses façades anciennes et sa roue à aubes le long du canal"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[hsl(20_15%_5%)]/55 [backdrop-filter:saturate(0.6)]" />
          <div className="absolute inset-0 bg-[radial-gradient(110%_85%_at_50%_45%,transparent_30%,hsl(20_15%_4%/0.9)_100%)]" />
        </motion.div>

        {/* ---- L'embrasure : le noir se referme pendant que la ruelle accélère ---- */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: porteOpacite,
            background:
              "radial-gradient(75% 60% at 50% 48%, transparent 0%, hsl(0 0% 3% / 0.75) 52%, hsl(0 0% 3%) 88%)",
          }}
        />

        {/* ---- L'intérieur ---- */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            opacity: interieurOpacite,
            scale: interieurEchelle,
            x: interieurSourisX,
            y: interieurSourisY,
          }}
        >
          <img
            src={interieurImage}
            alt="Appartement géré à Avignon : hautes portes-fenêtres ouvrant sur les façades en pierre de la vieille ville"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Même logique de dégradé que l'ancien hero : sombre en haut pour
              le menu, sombre en bas pour le bouton, transparent au centre. */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: voileOpacite,
              background:
                "linear-gradient(180deg, hsl(0 0% 5% / 0.72) 0%, hsl(0 0% 5% / 0.28) 38%, hsl(0 0% 5% / 0.34) 62%, hsl(0 0% 5% / 0.82) 100%)",
            }}
          />
        </motion.div>

        {/* ---- Scène 1 : le nom sur écran noir ---- */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{ opacity: titreOpacite, scale: titreEchelle }}
        >
          <p className="font-serif text-[2.1rem] leading-none sm:text-6xl md:text-7xl font-light text-[hsl(var(--calcaire))] tracking-[0.22em] md:tracking-[0.3em] text-center [padding-left:0.22em] md:[padding-left:0.3em]">
            {NOM.split("").map((lettre, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.11, duration: 0.9, ease: "easeOut" }}
                className="inline-block"
              >
                {lettre}
              </motion.span>
            ))}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 1.2 }}
            className="font-serif italic text-sm md:text-lg text-[hsl(var(--calcaire))]/60 mt-6 text-center"
          >
            Maisons de caractère en Provence
          </motion.p>

          {/* L'invitation à défiler : un trait qui s'étire, pas de texte
              clignotant. Elle n'apparaît qu'une fois le nom posé. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[hsl(var(--calcaire))]/40">
              Défiler
            </span>
            <div className="h-12 w-px overflow-hidden">
              <motion.div
                className="h-full w-full bg-[hsl(var(--calcaire))]/50"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ---- Légendes de scène : un lieu, un fait — jamais un slogan. ---- */}
        <motion.div
          className="absolute inset-0 flex items-end justify-start pointer-events-none pb-[16vh] pl-[8vw]"
          style={{ opacity: legendeVilleOpacite }}
        >
          <div>
            <p className="font-serif text-3xl md:text-5xl font-light text-[hsl(var(--calcaire))]">
              Avignon
            </p>
            <p className="font-sans text-xs md:text-sm text-[hsl(var(--calcaire))]/55 mt-2">
              Intra-muros, Villeneuve-lès-Avignon, Les Angles
            </p>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-end justify-end pointer-events-none pb-[16vh] pr-[8vw]"
          style={{ opacity: legendeRuelleOpacite }}
        >
          <div className="text-right">
            <p className="font-serif text-3xl md:text-5xl font-light text-[hsl(var(--calcaire))]">
              Neuf appartements
            </p>
            <p className="font-sans text-xs md:text-sm text-[hsl(var(--calcaire))]/55 mt-2">
              gérés en direct dans la vieille ville et autour
            </p>
          </div>
        </motion.div>

        {/* ---- Le message final — reprend mot pour mot l'ancien hero ---- */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: contenuOpacite, y: contenuY }}
        >
          <div className="text-center px-6 w-full max-w-5xl mx-auto">
            <h1 className="font-serif text-[1.6rem] leading-[1.25] sm:text-4xl md:text-5xl font-light text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.55)] tracking-[0.01em] mb-3 md:mb-4 max-w-3xl mx-auto">
              VOTRE CONCIERGERIE À AVIGNON
            </h1>
            <p className="font-sans text-[11px] md:text-xs tracking-[0.28em] uppercase text-white/70 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] mb-8 md:mb-10">
              Villeneuve-lès-Avignon · Les Angles
            </p>

            <a
              href="https://www.google.com/maps/place/CHEVALIER+CONCIERGERIE/@43.8680214,4.8327906,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-8 md:mb-10 hover:opacity-80 transition-opacity"
            >
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
                ))}
              </span>
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/75 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
                5,0 · 12 avis Google
              </span>
            </a>

            <div className="flex flex-col items-center gap-4">
              <Link
                to="/estimation-sous-location"
                className="btn-ressort group relative isolate inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-9 py-4 font-sans text-[15px] font-semibold tracking-wide text-[hsl(0_0%_8%)] shadow-[0_14px_44px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_22px_60px_-14px_rgba(0,0,0,0.7)] md:text-base"
              >
                <span aria-hidden className="btn-brille" />
                Estimer les revenus de mon logement
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <p className="font-sans text-[11px] md:text-xs text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] tracking-[0.12em] uppercase">
                2 minutes · réponse sous 24 h · sans engagement
              </p>
            </div>
          </div>
        </motion.div>

        {/* ---- Passer l'intro. Toujours accessible : la séquence est un
             choix de mise en scène, pas un péage. ---- */}
        {!introPassee && (
          <button
            onClick={passerIntro}
            className="absolute bottom-6 right-6 z-20 font-sans text-[11px] tracking-[0.15em] uppercase text-[hsl(var(--calcaire))]/55 border border-[hsl(var(--calcaire))]/25 rounded-full px-4 py-2 hover:text-[hsl(var(--calcaire))] hover:border-[hsl(var(--calcaire))]/60 transition-colors"
          >
            Passer
          </button>
        )}
      </div>
    </section>
  );
};

const CinematicIntro = () => {
  /*
    Qui a désactivé les animations retrouve l'ancien hero, complet et
    immobile — pas une version amputée de la séquence.
  */
  const animationsReduites = useReducedMotion();
  return animationsReduites ? <Hero /> : <SequenceCinematique />;
};

export default CinematicIntro;
