import { Sparkles, Clock } from "lucide-react";

const PromoBanner = () => {
  const promoContent = (
    <div className="flex items-center gap-8 px-4">
      <div className="flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-gold" />
        <span className="font-serif text-sm sm:text-base font-semibold tracking-wide text-primary-foreground uppercase">
          Offre de Lancement
        </span>
      </div>
      <div className="w-1.5 h-1.5 bg-gold rotate-45" />
      <span className="font-sans text-sm sm:text-base text-primary-foreground">
        <span className="font-bold text-gold">15%</span>
        <span className="text-primary-foreground/50 line-through mx-2">25%</span>
        <span className="text-primary-foreground/90">pendant 3 mois</span>
      </span>
      <div className="w-1.5 h-1.5 bg-gold rotate-45" />
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gold" />
        <span className="font-sans text-sm sm:text-base text-primary-foreground">
          Limité à <span className="text-gold font-bold">5 propriétaires</span>
        </span>
      </div>
      <div className="w-1.5 h-1.5 bg-gold rotate-45" />
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-primary via-midnight-light to-primary border-y border-gold/30 py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Duplicate content multiple times for seamless loop */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {promoContent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
