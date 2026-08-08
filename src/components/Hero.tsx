import { useState, useEffect, useRef } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video-luxury.mp4";
import heroPoster from "@/assets/hero-video-poster.jpg";

// Avignon est sorti de la liste : il est désormais fixe dans le <h1>, et le voir
// défiler juste en dessous faisait doublon. Les Angles complète la zone couverte
// par les trois pages locales du site.
const cities = ["Villeneuve-lès-Avignon", "Les Angles", "Aix-en-Provence", "Montpellier"];

const Hero = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // La vidéo du hero pèse 1,85 Mo et se chargeait sur mobile comme sur ordinateur.
  // Google indexe en mobile-first : c'était le premier facteur de dégradation du LCP.
  // L'état part à `false` pour qu'un téléphone ne déclenche jamais le téléchargement,
  // même le temps d'un rendu ; le poster (127 Ko) couvre l'affichage dans tous les cas.
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const sync = () => setPlayVideo(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

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

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video — poster instantané, vidéo seulement sur grand écran */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={heroPoster}
          src={playVideo ? heroVideo : undefined}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">

        <p className="font-sans text-xs md:text-xs tracking-[0.5em] uppercase text-primary-foreground/40 mb-6 md:mb-8 opacity-0 animate-fade-up">
          Chevalier Conciergerie
        </p>
        {/*
          Le <h1> disait « VOTRE CONCIERGERIE » : ni service précis, ni ville. C'est le
          signal le plus lisible de la page et il ne ciblait rien. La ville y est
          désormais fixe — le nom qui défile en dessous ne peut pas jouer ce rôle,
          un robot n'en capte qu'une valeur au hasard.
        */}
        <h1 className="font-serif text-[2rem] leading-tight sm:text-5xl md:text-6xl lg:text-7xl font-light text-primary-foreground tracking-[0.06em] mb-3 md:mb-4 opacity-0 animate-fade-up animation-delay-100">
          VOTRE CONCIERGERIE À AVIGNON
        </h1>
        <div className="relative h-10 sm:h-14 md:h-18 overflow-hidden mb-8 md:mb-10 opacity-0 animate-fade-up animation-delay-150">
          <span
            className={`font-serif text-2xl sm:text-4xl md:text-6xl text-foreground italic absolute inset-0 flex items-center justify-center [text-shadow:0_2px_12px_rgba(255,255,255,0.4)] transition-all duration-700 ease-out ${
              isAnimating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"
            }`}
          >
            {cities[currentCityIndex]}
          </span>
        </div>
        <p className="font-sans text-[11px] md:text-sm text-primary-foreground/50 max-w-md mx-auto mb-6 leading-relaxed tracking-[0.15em] uppercase opacity-0 animate-fade-up animation-delay-200">
          Gestion locative saisonnière &<br />
          revenus garantis, sans contrainte
        </p>

        {/* Trust bar — note Google réelle */}
        <a
          href="https://www.google.com/maps/place/CHEVALIER+CONCIERGERIE/@43.8680214,4.8327906,17z"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-8 md:mb-10 opacity-0 animate-fade-up animation-delay-200 hover:opacity-80 transition-opacity"
        >
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
            ))}
          </span>
          <span className="font-sans text-xs md:text-xs tracking-[0.15em] uppercase text-primary-foreground/60">
            5,0 · 12 avis Google
          </span>
        </a>

        <div className="flex flex-col items-center gap-4 opacity-0 animate-fade-up animation-delay-300">
          <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-3 md:gap-5">
            <Button asChild variant="hero" size="lg" className="group">
              <Link to="/contact">
                Consultation Gratuite
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="group">
              <a href="#formules">
                Nos Solutions
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
          <p className="font-sans text-xs md:text-xs text-primary-foreground/40 tracking-[0.15em] uppercase">
            Réponse sous 24h · Sans engagement
          </p>
        </div>
      </div>

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
