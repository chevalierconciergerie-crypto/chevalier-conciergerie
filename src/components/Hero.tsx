import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/hero-video-luxury.mp4";
import heroPoster from "@/assets/hero-video-poster.jpg";

const cities = ["Avignon", "Villeneuve-lès-Avignon", "Aix-en-Provence", "Montpellier"];

const Hero = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video — poster instantané, vidéo prend le relais dès qu'elle peut */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">
        <div className="w-10 h-px bg-gold/50 mx-auto mb-6 opacity-0 animate-fade-up" />
        <p className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-primary-foreground/40 mb-6 md:mb-8 opacity-0 animate-fade-up">
          Chevalier Conciergerie
        </p>
        <h1 className="font-serif text-[2.2rem] leading-tight sm:text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground tracking-[0.06em] mb-3 md:mb-4 opacity-0 animate-fade-up animation-delay-100">
          VOTRE CONCIERGERIE
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
        <p className="font-sans text-[11px] md:text-sm text-primary-foreground/50 max-w-md mx-auto mb-8 md:mb-10 leading-relaxed tracking-[0.15em] uppercase opacity-0 animate-fade-up animation-delay-200">
          Conciergerie haut de gamme &<br />
          sous-location professionnelle
        </p>
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
