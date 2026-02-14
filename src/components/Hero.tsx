import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/hero-video-luxury.mp4";

const cities = ["Avignon", "Villeneuve-lès-Avignon", "Les Angles"];

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
          preload="metadata"
          onCanPlay={handleVideoLoaded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Brand label */}
        <p className="font-sans text-xs md:text-sm tracking-[0.5em] uppercase text-primary-foreground/50 mb-8 opacity-0 animate-fade-up">
          Chevalier Conciergerie
        </p>

        {/* Main title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-primary-foreground tracking-wide leading-none mb-4 opacity-0 animate-fade-up animation-delay-100">
          VOTRE CONCIERGERIE
        </h1>

        {/* Animated city in gold */}
        <div className="relative h-14 md:h-20 overflow-hidden mb-10 opacity-0 animate-fade-up animation-delay-150">
          <span
            className={`font-serif text-4xl md:text-6xl lg:text-7xl text-gold italic absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
              isAnimating
                ? "opacity-0 translate-y-6"
                : "opacity-100 translate-y-0"
            }`}
          >
            {cities[currentCityIndex]}
          </span>
        </div>

        {/* Description */}
        <p className="font-sans text-sm md:text-base text-primary-foreground/60 max-w-xl mx-auto mb-12 leading-relaxed tracking-wide uppercase opacity-0 animate-fade-up animation-delay-200">
          Une référence en conciergerie haut de gamme.<br className="hidden md:block" />
          Rentabilité, confort et excellence pour vos biens.
        </p>

        {/* Two CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animation-delay-300">
          <a
            href="/conciergerie"
            className="group flex items-center gap-3 border border-primary-foreground/30 px-8 py-4 text-primary-foreground text-xs tracking-[0.3em] uppercase hover:bg-primary-foreground/10 transition-all duration-300"
          >
            Conciergerie
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/contact"
            className="group flex items-center gap-3 border border-gold/60 bg-gold/10 px-8 py-4 text-gold text-xs tracking-[0.3em] uppercase hover:bg-gold/20 transition-all duration-300"
          >
            Rendez-vous
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up animation-delay-500">
        <div className="w-5 h-8 border border-primary-foreground/20 rounded-full flex justify-center">
          <div className="w-1 h-2.5 bg-gold/60 rounded-full mt-1.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
