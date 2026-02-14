import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section className="relative h-screen flex items-end overflow-hidden">
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
        {/* Subtle bottom gradient only */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
      </div>

      {/* Content — centered */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animated City */}
            <div className="mb-6 opacity-0 animate-fade-up">
              <div className="relative h-8 overflow-hidden">
                <span 
                  className={`text-gold/80 font-sans text-xs tracking-[0.4em] uppercase absolute inset-0 flex items-center transition-all duration-700 ease-out ${
                    isAnimating 
                      ? "opacity-0 -translate-y-4" 
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  {cities[currentCityIndex]}
                </span>
              </div>
            </div>

            {/* Title — clean, editorial */}
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground leading-[1.05] mb-6 opacity-0 animate-fade-up animation-delay-100">
              Votre Conciergerie
            </h1>

            {/* Thin separator */}
            <div className="w-16 h-px bg-gold/60 mb-6 mx-auto opacity-0 animate-fade-up animation-delay-150" />

            {/* Subtitle — short */}
            <p className="font-sans text-base md:text-lg text-primary-foreground/70 max-w-lg mb-10 opacity-0 animate-fade-up animation-delay-200">
              Conciergerie haut de gamme & sous-location professionnelle.
            </p>

            {/* CTA — single, clean */}
            <div className="flex items-center justify-center gap-6 opacity-0 animate-fade-up animation-delay-300">
              <Button variant="hero" size="xl" className="group">
                Prendre Rendez-vous
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <a 
                href="#formules" 
                className="font-sans text-sm text-primary-foreground/60 hover:text-gold transition-colors tracking-wide uppercase hidden sm:block"
              >
                Nos services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator — minimal */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up animation-delay-500">
        <div className="w-5 h-8 border border-primary-foreground/20 rounded-full flex justify-center">
          <div className="w-1 h-2.5 bg-gold/60 rounded-full mt-1.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
