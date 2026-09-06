import { useEffect, useState } from "react";
import { ArrowRight, Menu, Phone, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import villeImage from "@/assets/hero-avignon-terrasse.webp";
import villeImageMobile from "@/assets/hero-avignon-terrasse-mobile.webp";

/*
  Clone d'era.estate demandé par le client (option B, choisie après mise
  en garde sur le droit d'auteur du design) : mêmes couleurs, même
  composition, mêmes interactions, transposées à Chevalier.

  Relevé fait sur era.estate en 1345×914 :
  - fond bleu nuit rgb(5,25,54), texte crème rgb(248,240,232),
    accent cuivre rgb(207,143,125) ;
  - barre haute en pastilles : MENU (crème), deux pastilles contour,
    logo centré, « Request a call » (crème) à droite ;
  - typo géante 171 px ≈ 12,7 vw, interlettrage −3 %, marge 5 vw,
    premier mot y=157 (17 %), accroche en colonne aérée à droite ;
  - dernier mot en cuivre, aligné à droite ;
  - photo centrale ~62 vw à partir de ~52 % de la hauteur ;
  - écran d'intro : chevrons lumineux qui se dessinent sur le bleu nuit.

  Ce qui n'est PAS copié, parce que ça leur appartient ou que ça serait
  faux ici : leurs images, leurs textes, leur police « Decart » (on sert
  Libre Baskerville, déjà chargée), leurs récompenses Awwwards/FWA, et
  leurs entrées de menu sans équivalent (Select apartment → Nos
  logements, Virtual tour → Journal, Request a call → Être rappelé).
*/

const BLEU_NUIT = "#051936";
const CREME = "#F8F0E8";
const CUIVRE = "#CF8F7D";

/* Le motif de l'intro : chevrons symétriques dessinés depuis la colonne
   centrale, du bas vers le haut, comme sur era.estate. */
const COURBES: string[] = (() => {
  const chemins: string[] = [];
  for (let k = 0; k < 5; k++) {
    const y0 = 800 - k * 155;
    const y1 = y0 - 150;
    const y2 = y0 - 210;
    chemins.push(`M600 ${y0} C 600 ${y1}, 500 ${y2 + 30}, 255 ${y2}`);
    chemins.push(`M600 ${y0} C 600 ${y1}, 700 ${y2 + 30}, 945 ${y2}`);
  }
  return chemins;
})();

const LIENS_MENU = [
  { libelle: "Accueil", vers: "/" },
  { libelle: "Conciergerie", vers: "/conciergerie" },
  { libelle: "Sous-location", vers: "/sous-location" },
  { libelle: "Nos logements", vers: "/logements" },
  { libelle: "Tarifs", vers: "/tarifs" },
  { libelle: "Journal", vers: "/journal" },
  { libelle: "Partenaires", vers: "/partenaires" },
  { libelle: "Contact", vers: "/contact" },
];

const CinematicIntro = () => {
  const animationsReduites = useReducedMotion();
  const [splashVisible, setSplashVisible] = useState(true);
  const [menuOuvert, setMenuOuvert] = useState(false);

  /* L'intro se joue puis enchaîne toute seule sur le hero, comme chez ERA. */
  useEffect(() => {
    if (animationsReduites) {
      setSplashVisible(false);
      return;
    }
    const minuteur = setTimeout(() => setSplashVisible(false), 5600);
    return () => clearTimeout(minuteur);
  }, [animationsReduites]);

  /* Un geste de défilement vaut un « Passer ». */
  useEffect(() => {
    if (!splashVisible) return;
    const surDefilement = () => {
      if (window.scrollY > 30) setSplashVisible(false);
    };
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, [splashVisible]);

  /* Le menu plein écran fige la page derrière lui. */
  useEffect(() => {
    document.body.style.overflow = menuOuvert ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOuvert]);

  const heroActif = !splashVisible;
  const duree = animationsReduites ? 0 : 1.1;
  const apparition = (retard: number) => ({
    initial: { opacity: 0, y: animationsReduites ? 0 : 26 },
    animate: heroActif ? { opacity: 1, y: 0 } : {},
    transition: { duration: duree, delay: animationsReduites ? 0 : retard, ease: "easeOut" as const },
  });

  const pastille =
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[12px] font-medium uppercase tracking-[0.05em] transition-colors";

  return (
    <section
      id="intro-cinematique"
      className="relative h-[100svh] overflow-hidden"
      style={{ backgroundColor: BLEU_NUIT }}
    >
      {/* ---- La barre haute en pastilles, à la ERA : MENU et pastilles
           contour à gauche, marque centrée, action à droite. ---- */}
      <motion.div
        className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 md:px-8 py-5"
        {...apparition(0.3)}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setMenuOuvert(true)}
            className={`${pastille}`}
            style={{ backgroundColor: CREME, color: BLEU_NUIT }}
          >
            <Menu className="w-3.5 h-3.5" />
            Menu
          </button>
          <Link
            to="/logements"
            className={`${pastille} hidden md:inline-flex border`}
            style={{ borderColor: `${CREME}40`, color: CREME }}
          >
            Nos logements
          </Link>
          <Link
            to="/journal"
            className={`${pastille} hidden lg:inline-flex border`}
            style={{ borderColor: `${CREME}40`, color: CREME }}
          >
            Journal
          </Link>
        </div>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-xl tracking-[0.28em] [padding-left:0.28em]"
          style={{ color: CREME }}
        >
          CHEVALIER
        </Link>

        <Link
          to="/contact"
          className={`${pastille}`}
          style={{ backgroundColor: CREME, color: BLEU_NUIT }}
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Être rappelé</span>
        </Link>
      </motion.div>

      {/* ---- La photo centrale qui émerge derrière les lettres,
           aux cotes d'ERA : 62 vw, à partir de 52 % de la hauteur. ---- */}
      <motion.div
        /* Pas de translate-x Tailwind ici : framer-motion pose son propre
           transform et l'écraserait. Le centrage passe par left calculé. */
        className="absolute left-[4vw] md:left-[19vw] bottom-0 top-[48%] md:top-[52%] w-[92vw] md:w-[62vw] overflow-hidden"
        initial={{ opacity: 0, y: animationsReduites ? 0 : 60 }}
        animate={heroActif ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: animationsReduites ? 0 : 1.6, delay: animationsReduites ? 0 : 0.15, ease: "easeOut" }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={villeImageMobile} />
          <img
            src={villeImage}
            alt="Terrasse en pierre dominant les toits d'Avignon et le Palais des Papes au coucher du soleil"
            fetchpriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[50%_38%]"
          />
        </picture>
        {/* Voile bleu nuit léger pour asseoir la photo dans la palette ERA. */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${BLEU_NUIT}99 0%, transparent 30%, transparent 68%, ${BLEU_NUIT}B3 100%)`,
          }}
        />
      </motion.div>

      {/* ---- L'accroche en colonne aérée, dans l'espace libre à droite
           du premier mot géant — le rôle de « The place / where life /
           becomes art ». C'est le h1 de la page. ---- */}
      <motion.div
        className="absolute inset-x-0 top-[12%] text-center px-6 md:inset-x-auto md:left-[62vw] md:right-[5vw] md:top-[15%] md:px-0 md:text-left"
        {...apparition(0.5)}
      >
        <h1
          className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] leading-relaxed md:text-[1.3vw] md:tracking-[0.03em] md:leading-[2.2]"
          style={{ color: CREME }}
        >
          <span className="md:block">Votre conciergerie</span>{" "}
          <span className="md:block">à Avignon,</span>{" "}
          <span className="md:block">Villeneuve &amp; Les Angles</span>
        </h1>
      </motion.div>

      {/* ---- La typographie géante : premier mot en haut à gauche,
           deuxième ligne en drapeau inversé, dernier mot en cuivre
           comme « ART ». Marge 5 vw, interligne 0,94. ---- */}
      <div className="absolute inset-x-0 top-[26%] md:top-[17%] px-[5vw] pointer-events-none select-none">
        <motion.p
          className="font-serif text-[16vw] md:text-[10.5vw] leading-[0.94] tracking-[-0.03em] text-left"
          style={{ color: CREME }}
          {...apparition(0.65)}
        >
          MAISONS
        </motion.p>
        <motion.p
          className="font-serif text-[16vw] md:text-[10.5vw] leading-[0.94] tracking-[-0.03em] flex items-baseline justify-between"
          {...apparition(0.85)}
        >
          <span style={{ color: CREME }}>DE</span>
          <span style={{ color: CUIVRE }}>CARACTÈRE</span>
        </motion.p>
      </div>

      {/* ---- Preuve et action, posées sur le bas de la photo ---- */}
      <motion.div
        className="absolute inset-x-0 bottom-[4%] flex flex-col items-center gap-4 px-6"
        {...apparition(1.25)}
      >
        <a
          href="https://www.google.com/maps/place/CHEVALIER+CONCIERGERIE/@43.8680214,4.8327906,17z"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
            ))}
          </span>
          <span
            className="font-sans text-[11px] tracking-[0.15em] uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]"
            style={{ color: CREME }}
          >
            5,0 · 12 avis Google
          </span>
        </a>
        <Link
          to="/estimation-sous-location"
          className="btn-ressort group relative isolate inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-8 py-3.5 font-sans text-[14px] font-semibold tracking-wide shadow-[0_14px_44px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_22px_60px_-14px_rgba(0,0,0,0.7)] md:text-[15px]"
          style={{ backgroundColor: CREME, color: BLEU_NUIT }}
        >
          <span aria-hidden className="btn-brille" />
          Estimer les revenus de mon logement
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* ---- Le menu plein écran, bleu nuit, grandes entrées serif ---- */}
      <AnimatePresence>
        {menuOuvert && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ backgroundColor: BLEU_NUIT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between px-4 md:px-8 py-5">
              <span
                className="font-serif text-lg tracking-[0.28em] [padding-left:0.28em]"
                style={{ color: CREME }}
              >
                CHEVALIER
              </span>
              <button
                onClick={() => setMenuOuvert(false)}
                className={pastille}
                style={{ backgroundColor: CREME, color: BLEU_NUIT }}
              >
                <X className="w-3.5 h-3.5" />
                Fermer
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-1 md:gap-2">
              {LIENS_MENU.map((lien, i) => (
                <motion.div
                  key={lien.vers}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6 }}
                >
                  <Link
                    to={lien.vers}
                    onClick={() => setMenuOuvert(false)}
                    className="font-serif text-3xl md:text-5xl transition-colors"
                    style={{ color: CREME }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = CUIVRE)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = CREME)}
                  >
                    {lien.libelle}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p
              className="text-center pb-8 font-sans text-[11px] tracking-[0.2em] uppercase"
              style={{ color: `${CREME}66` }}
            >
              Avignon · Villeneuve-lès-Avignon · Les Angles
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- L'écran d'introduction : chevrons qui se dessinent, puis le nom ---- */}
      <AnimatePresence>
        {splashVisible && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center"
            style={{ backgroundColor: BLEU_NUIT }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          >
            <svg
              viewBox="0 0 1200 800"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="lueur-intro" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor={CUIVRE} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={CREME} stopOpacity="0.75" />
                </linearGradient>
              </defs>
              <motion.path
                d="M600 830 L600 -30"
                stroke="url(#lueur-intro)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
              />
              {COURBES.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="url(#lueur-intro)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    delay: 0.5 + Math.floor(i / 2) * 0.28,
                    duration: 1.7,
                    ease: "easeOut",
                  }}
                />
              ))}
            </svg>

            <div className="relative text-center px-6">
              <p
                className="font-serif text-[2rem] sm:text-5xl md:text-6xl font-light tracking-[0.24em] [padding-left:0.24em]"
                style={{ color: CREME }}
              >
                {"CHEVALIER".split("").map((lettre, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.8 }}
                    className="inline-block"
                  >
                    {lettre}
                  </motion.span>
                ))}
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 1 }}
                className="font-serif italic text-sm md:text-base mt-5"
                style={{ color: `${CREME}8C` }}
              >
                Maisons de caractère en Provence
              </motion.p>
            </div>

            <button
              onClick={() => setSplashVisible(false)}
              className="absolute bottom-6 right-6 font-sans text-[11px] tracking-[0.15em] uppercase rounded-full px-4 py-2 border transition-colors"
              style={{ color: `${CREME}8C`, borderColor: `${CREME}40` }}
            >
              Passer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CinematicIntro;
