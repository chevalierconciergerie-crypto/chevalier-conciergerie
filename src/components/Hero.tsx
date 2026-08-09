import { useRef } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import heroAvignon from "@/assets/hero-avignon-terrasse.webp";
import heroAvignonMobile from "@/assets/hero-avignon-terrasse-mobile.webp";

// Avignon est sorti de la liste : il est désormais fixe dans le <h1>, et le voir
// défiler juste en dessous faisait doublon. Les Angles complète la zone couverte
// par les trois pages locales du site.
// Uniquement la zone réellement couverte. Annoncer Aix ou Montpellier
// diluait le signal local : Google comprenait une entreprise régionale
// vague au lieu d'un acteur d'Avignon, là où se joue la bataille.
const cities = ["Villeneuve-lès-Avignon", "Les Angles"];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const animationsReduites = useReducedMotion();

  /**
   * Profondeur au défilement : trois plans avancent à des vitesses
   * différentes, comme un décor de théâtre. C'est ce qui crée le relief.
   *
   * Fait en transformations CSS pilotées par le scroll plutôt qu'en WebGL :
   * le décor reste une vidéo et du texte — indexables, légers, nets sur
   * mobile — là où une scène 3D aurait remplacé tout ça par un canvas
   * illisible pour Google et lourd à charger.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Le fond recule et s'agrandit, le contenu part plus vite vers le haut :
  // l'écart entre les deux est exactement ce que l'œil lit comme du volume.
  const fondY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const fondEchelle = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const contenuY = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const contenuOpacite = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // Le contenu s'éloigne aussi en profondeur, pas seulement vers le haut.
  const contenuEchelle = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  // Un voile sombre se ferme sur l'image : c'est le contraste qui fait le
  // luxe, pas l'ajout de couleur. Le fond est déjà très doré et saturé —
  // une lumière ocre par-dessus s'y noyait sans rien apporter.
  const voileOpacite = useTransform(scrollYProgress, [0, 0.7], [0.35, 0.9]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden [perspective:1200px]"
    >
      {/* Plan 1 — Avignon. Une terrasse en pierre, les toits de la vieille
          ville et le Palais des Papes au couchant : la ville et le standing
          se lisent en une seconde, sans avoir à lire une ligne.
          L'image remplace une vidéo de 1,85 Mo qui ne montrait qu'une texture
          dorée abstraite — six fois plus lourde pour ne rien raconter. */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={animationsReduites ? undefined : { y: fondY, scale: fondEchelle }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={heroAvignonMobile} />
          <img
            src={heroAvignon}
            alt="Terrasse en pierre dominant les toits d'Avignon au coucher du soleil"
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        {/*
          Deux voiles plutôt qu'un seul uniforme. Le premier désature un peu
          la pierre — sinon l'ocre de la photo rend la page jaune, l'inverse
          d'un noir et blanc. Le second est un dégradé vertical : sombre en
          haut pour détacher le logo et le menu, sombre en bas derrière les
          boutons, et transparent au centre pour qu'on voie la ville.
          Un aplat uniforme obligeait à choisir entre texte lisible et photo
          visible ; le dégradé donne les deux.
        */}
        <div className="absolute inset-0 bg-[hsl(0_0%_8%)]/28 [backdrop-filter:saturate(0.72)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(0_0%_5%/0.72)_0%,hsl(0_0%_5%/0.22)_38%,hsl(0_0%_5%/0.30)_62%,hsl(0_0%_5%/0.80)_100%)]" />
      </motion.div>

      {/* Plan 2 — le voile. Il se referme au défilement et détache le texte
          de la pierre dorée, qui sinon absorbe tout. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(130% 90% at 50% 45%, transparent 0%, hsl(24 30% 8% / 0.55) 55%, hsl(24 30% 6% / 0.92) 100%)",
          ...(animationsReduites ? {} : { opacity: voileOpacite }),
        }}
      />

      {/* Plan 3 — le contenu, qui s'éloigne en profondeur. */}
      <motion.div
        className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto will-change-transform"
        style={
          animationsReduites
            ? undefined
            : { y: contenuY, opacity: contenuOpacite, scale: contenuEchelle }
        }
      >

        {/*
          Le nom « Chevalier Conciergerie » en surtitre a été retiré : il est
          déjà écrit en grand dans le logo, juste au-dessus. Le hero ne garde
          que quatre choses — le titre, la zone couverte, la note Google et
          l'action. Tout le reste repoussait le bouton hors de l'écran.
        */}
        {/*
          Le <h1> disait « VOTRE CONCIERGERIE » : ni service précis, ni ville. C'est le
          signal le plus lisible de la page et il ne ciblait rien. La ville y est
          désormais fixe — le nom qui défile en dessous ne peut pas jouer ce rôle,
          un robot n'en capte qu'une valeur au hasard.
        */}
        <h1 className="font-serif text-[1.6rem] leading-[1.25] sm:text-4xl md:text-5xl font-light text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.55)] tracking-[0.01em] mb-3 md:mb-4 max-w-3xl mx-auto opacity-0 animate-fade-up animation-delay-100">
          VOTRE CONCIERGERIE À AVIGNON
        </h1>
        {/*
          Le grand nom de ville qui défilait sous « … À AVIGNON » est retiré :
          lire Avignon puis, juste en dessous, une autre commune en très gros,
          brouillait le message au lieu de l'élargir. La zone couverte est
          maintenant une simple ligne, au même rang que les autres mentions.
        */}
        <p className="font-sans text-[11px] md:text-xs tracking-[0.28em] uppercase text-white/70 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] mb-8 md:mb-10 opacity-0 animate-fade-up animation-delay-150">
          {cities.join(" · ")}
        </p>
        {/*
          « Gestion locative saisonnière & revenus garantis, sans contrainte »
          retiré : trois lignes de promesse au-dessus du bouton, quand les deux
          cartes juste en dessous expliquent déjà les deux formules en détail.
        */}

        {/* Trust bar — note Google réelle */}
        <a
          href="https://www.google.com/maps/place/CHEVALIER+CONCIERGERIE/@43.8680214,4.8327906,17z"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-8 md:mb-10 opacity-0 animate-fade-up animation-delay-200 hover:opacity-80 transition-opacity"
        >
          {/*
            Les étoiles utilisaient le jeton --gold, passé au blanc avec la
            palette noir et blanc : elles se fondaient dans le texte et ne se
            lisaient plus comme une note. Le doré est ici la couleur exacte
            des étoiles Google (#FBBC04) et il est mis en dur, volontairement
            hors palette : c'est un logo, pas une décoration — le reconnaître
            au premier coup d'œil est tout l'intérêt de l'afficher.
          */}
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
            ))}
          </span>
          <span className="font-sans text-xs md:text-xs tracking-[0.15em] uppercase text-white/75 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            5,0 · 12 avis Google
          </span>
        </a>

        <div className="flex flex-col items-center gap-4 opacity-0 animate-fade-up animation-delay-300">
          {/*
            Action principale : le questionnaire logement. Il existait déjà
            sur /estimation-sous-location mais n'était atteignable que par le
            menu — personne ne le trouvait. C'est pourtant le seul endroit où
            un propriétaire laisse assez d'informations pour qu'un devis soit
            possible ; il mérite d'être le plus gros élément cliquable du site.
          */}
          <Link
            to="/estimation-sous-location"
            className="btn-ressort group relative isolate inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-9 py-4 font-sans text-[15px] font-semibold tracking-wide text-[hsl(0_0%_8%)] shadow-[0_14px_44px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_22px_60px_-14px_rgba(0,0,0,0.7)] md:text-base"
          >
            <span aria-hidden className="btn-brille" />
            Estimer les revenus de mon logement
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          {/*
            Les deux boutons « Nous contacter » et « Nos formules » sont
            retirés. Trois boutons côte à côte, c'est zéro décision prise :
            l'œil hésite au lieu de cliquer. Les formules sont juste en
            dessous, atteignables en défilant, et le contact reste dans le
            menu et le pied de page. Un seul bouton, une seule action.

            La mention « Réponse sous 24h · Sans engagement » qui suivait
            répétait mot pour mot la ligne ci-dessous.
          */}
          <p className="font-sans text-[11px] md:text-xs text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] tracking-[0.12em] uppercase">
            2 minutes · réponse sous 24 h · sans engagement
          </p>
        </div>
      </motion.div>

      {/*
        Encart de réservation directe retiré : il redirigeait vers /reservation, route
        supprimée avec le moteur Beds24. À rétablir en même temps que la route.
      */}

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up animation-delay-500">
        <div className="w-[18px] h-7 border border-primary-foreground/15 rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-gold/40 rounded-full mt-1.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
