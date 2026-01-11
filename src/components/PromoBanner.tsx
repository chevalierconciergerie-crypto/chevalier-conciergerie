import { useState } from "react";
import { X, Sparkles, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary via-midnight-light to-primary border-b border-gold/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Content */}
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
            {/* Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-serif text-xs sm:text-sm text-gold font-semibold tracking-wide">
                OFFRE DE LANCEMENT
              </span>
            </div>

            {/* Main Message */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="font-sans text-primary-foreground text-sm sm:text-base">
                <span className="font-semibold text-gold">15%</span>
                <span className="text-primary-foreground/60 line-through mx-2">25%</span>
                <span className="text-primary-foreground/90">pendant 3 mois</span>
              </p>
              
              {/* Limit indicator */}
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Users className="w-4 h-4 text-gold" />
                <span className="font-sans text-xs sm:text-sm">
                  Limité à <span className="text-gold font-semibold">5 propriétaires</span>
                </span>
              </div>
            </div>

            {/* CTA */}
            <Button 
              variant="gold" 
              size="sm" 
              className="hidden sm:inline-flex"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              J'en profite
            </Button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full hover:bg-primary-foreground/10 transition-colors"
            aria-label="Fermer la bannière"
          >
            <X className="w-5 h-5 text-primary-foreground/60 hover:text-primary-foreground" />
          </button>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-2 flex justify-center">
          <Button 
            variant="gold" 
            size="sm"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Clock className="w-4 h-4 mr-2" />
            J'en profite maintenant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
