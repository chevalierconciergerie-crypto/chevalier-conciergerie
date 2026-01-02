import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-interior.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8 opacity-0 animate-fade-up">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Avignon</span>
            <div className="h-px w-12 bg-gold" />
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-6 opacity-0 animate-fade-up animation-delay-100">
            L'Excellence de la<br />
            <span className="text-gold">Gestion Locative</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up animation-delay-200">
            Optimisez vos revenus et offrez à votre bien le prestige qu'il mérite.
            Conciergerie haut de gamme et sous-location professionnelle à Avignon.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animation-delay-300">
            <Button variant="hero" size="xl" className="group">
              Prendre Rendez-vous
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline-light" size="xl">
              Découvrir nos services
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-0 animate-fade-up animation-delay-400">
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl text-gold font-semibold">0%</p>
              <p className="font-sans text-sm text-primary-foreground/60 mt-1">Vacance locative</p>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20 hidden md:block" />
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl text-gold font-semibold">5★</p>
              <p className="font-sans text-sm text-primary-foreground/60 mt-1">Expérience voyageur</p>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20 hidden md:block" />
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl text-gold font-semibold">100%</p>
              <p className="font-sans text-sm text-primary-foreground/60 mt-1">Loyer garanti</p>
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
