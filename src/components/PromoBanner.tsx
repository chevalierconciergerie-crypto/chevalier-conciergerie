import { Sparkles } from "lucide-react";

const PromoBanner = () => {
  const promoText = (
    <span className="inline-flex items-center gap-6 px-8">
      <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
      <span className="font-serif text-base sm:text-lg text-primary-foreground whitespace-nowrap">
        <span className="text-gold font-semibold">Offre de lancement</span>
        <span className="mx-3 text-primary-foreground/40">—</span>
        <span className="text-primary-foreground/90">Commission à </span>
        <span className="text-gold font-bold">15%</span>
        <span className="text-primary-foreground/50 line-through mx-1 text-sm">25%</span>
        <span className="text-primary-foreground/90"> pendant 3 mois</span>
        <span className="mx-3 text-primary-foreground/40">•</span>
        <span className="text-primary-foreground/70">Places limitées à </span>
        <span className="text-gold font-bold">5 propriétaires</span>
      </span>
    </span>
  );

  return (
    <div className="bg-primary border-y border-gold/20 py-4 overflow-hidden">
      <div className="flex animate-marquee">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0">
            {promoText}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
