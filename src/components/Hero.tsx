import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        {/* Placeholder gradient while video loads */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-midnight-light transition-opacity duration-1000 ${
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
          onLoadedData={handleVideoLoaded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative Line with Animated City */}
          {/* Animated City Name */}
          <div className="mb-8 opacity-0 animate-fade-up">
            <div className="relative h-10 md:h-12 overflow-hidden">
              <span 
                className={`text-gold font-serif text-2xl md:text-3xl lg:text-4xl font-semibold absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                  isAnimating 
                    ? "opacity-0 -translate-y-6" 
                    : "opacity-100 translate-y-0"
                }`}
              >
                {cities[currentCityIndex]}
              </span>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="h-px w-16 bg-gold/60" />
              <div className="w-2 h-2 bg-gold rotate-45" />
              <div className="h-px w-16 bg-gold/60" />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-6 opacity-0 animate-fade-up animation-delay-100">
            L'Excellence de la<br />
            <span className="text-gold">Gestion Locative</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up animation-delay-200">
            Optimisez vos revenus et offrez à votre bien le prestige qu'il mérite.
            Conciergerie haut de gamme et sous-location professionnelle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animation-delay-300">
            <Button variant="hero" size="xl" className="group">
              Prendre Rendez-vous
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline-light" size="xl" asChild>
              <a href="#formules">Découvrir nos services</a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-0 animate-fade-up animation-delay-400">
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl text-gold font-semibold">2</p>
              <p className="font-sans text-sm text-primary-foreground/60 mt-1">Formules sur mesure</p>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20 hidden md:block" />
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl text-gold font-semibold">5★</p>
              <p className="font-sans text-sm text-primary-foreground/60 mt-1">Expérience voyageur</p>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20 hidden md:block" />
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl text-gold font-semibold">Local</p>
              <p className="font-sans text-sm text-primary-foreground/60 mt-1">Expertise régionale</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up animation-delay-500">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-gold rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
