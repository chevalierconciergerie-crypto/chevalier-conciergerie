import { useState, useEffect, useRef } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import heroVideo from "@/assets/hero-video-luxury.mp4";

const cities = ["Avignon", "Villeneuve-lès-Avignon", "Aix-en-Provence", "Montpellier"];

const Hero = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-primary transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleVideoLoaded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">
        {/* Thin line */}
        <div className="w-10 h-px bg-gold/50 mx-auto mb-6 opacity-0 animate-fade-up" />

        {/* Brand label */}
        <p className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-primary-foreground/40 mb-6 md:mb-8 opacity-0 animate-fade-up">
          Chevalier Conciergerie
        </p>

        {/* Main title - responsive sizing */}
        <h1 className="font-serif text-[2.2rem] leading-tight sm:text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground tracking-[0.06em] mb-3 md:mb-4 opacity-0 animate-fade-up animation-delay-100">
          VOTRE CONCIERGERIE
        </h1>

        {/* Animated city in gold */}
        <div className="relative h-10 sm:h-14 md:h-18 overflow-hidden mb-8 md:mb-10 opacity-0 animate-fade-up animation-delay-150">
          <span
            className={`font-serif text-2xl sm:text-4xl md:text-6xl text-gold italic absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
              isAnimating
                ? "opacity-0 translate-y-6"
                : "opacity-100 translate-y-0"
            }`}
          >
            {cities[currentCityIndex]}
          </span>
        </div>

        {/* Description */}
        <p className="font-sans text-[11px] md:text-sm text-primary-foreground/50 max-w-md mx-auto mb-10 md:mb-12 leading-relaxed tracking-[0.15em] uppercase opacity-0 animate-fade-up animation-delay-200">
          Conciergerie haut de gamme &<br />
          sous-location professionnelle
        </p>

        {/* Two CTAs - inline on all sizes */}
        <div className="flex items-center justify-center gap-3 md:gap-5 opacity-0 animate-fade-up animation-delay-300">
          <a
            href="/conciergerie"
            className="group flex items-center gap-2 md:gap-3 border border-primary-foreground/25 px-5 md:px-8 py-3 md:py-4 text-primary-foreground text-[10px] md:text-xs tracking-[0.25em] uppercase hover:bg-primary-foreground/10 transition-all duration-300"
          >
            Conciergerie
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/sous-location"
            className="group flex items-center gap-2 md:gap-3 border border-gold/40 px-5 md:px-8 py-3 md:py-4 text-gold text-[10px] md:text-xs tracking-[0.25em] uppercase hover:bg-gold/10 transition-all duration-300"
          >
            Sous-location
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Booking Widget — bottom right */}
      <a
        href="https://chevalier-locabusiness.amenitiz.io/fr/booking/room#DatesGuests-BE"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-8 right-6 md:bottom-12 md:right-10 z-20 group opacity-0 animate-fade-up animation-delay-500"
      >
        <div className="bg-primary/80 backdrop-blur-md border border-gold/30 rounded-lg px-5 py-4 md:px-6 md:py-5 text-center hover:border-gold/60 hover:bg-primary/90 transition-all duration-300 shadow-lg">
          <CalendarDays className="w-5 h-5 text-gold mx-auto mb-2" />
          <p className="font-serif text-sm md:text-base text-gold font-medium tracking-wide mb-1">
            Meilleur Tarif
          </p>
          <p className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-primary-foreground/50 mb-3">
            Garanti sur notre site
          </p>
          <span className="inline-block bg-gold text-primary font-sans text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase px-4 py-1.5 group-hover:bg-gold-light transition-colors duration-300">
            Réserver
          </span>
        </div>
      </a>

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
