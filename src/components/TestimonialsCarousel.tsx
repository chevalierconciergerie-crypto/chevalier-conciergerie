import { useEffect, useState } from "react";
import { Star, MapPin, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  city: string;
  rating: number;
  text: string;
  type: "propriétaire" | "voyageur";
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie L.",
    city: "Avignon",
    rating: 5,
    text: "Service impeccable ! Mon appartement n'a jamais été aussi bien géré. Les revenus ont augmenté de 40% depuis que je travaille avec Chevalier.",
    type: "propriétaire",
  },
  {
    id: 2,
    name: "Jean-Pierre D.",
    city: "Villeneuve-lès-Avignon",
    rating: 5,
    text: "Enfin une conciergerie qui comprend le marché local. Communication fluide et professionnalisme exemplaire.",
    type: "propriétaire",
  },
  {
    id: 3,
    name: "Sophie M.",
    city: "Les Angles",
    rating: 5,
    text: "Je recommande vivement ! Équipe réactive, logement toujours impeccable. Mes voyageurs sont ravis.",
    type: "propriétaire",
  },
  {
    id: 4,
    name: "Laurent B.",
    city: "Avignon",
    rating: 5,
    text: "La sous-location avec loyer garanti m'a changé la vie. Plus de stress, revenus réguliers chaque mois.",
    type: "propriétaire",
  },
  {
    id: 5,
    name: "Claire V.",
    city: "Villeneuve-lès-Avignon",
    rating: 5,
    text: "Accueil chaleureux et appartement parfaitement préparé. Un séjour mémorable pendant le Festival !",
    type: "voyageur",
  },
  {
    id: 6,
    name: "Thomas R.",
    city: "Avignon",
    rating: 5,
    text: "Gestion irréprochable de mon studio. L'équipe est disponible 24/7 et vraiment à l'écoute.",
    type: "propriétaire",
  },
];

const TestimonialsCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">
            Témoignages
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            Ils Nous Font Confiance
          </h2>
          <p className="font-sans text-muted-foreground text-lg">
            Propriétaires et voyageurs partagent leur expérience avec Chevalier Conciergerie.
          </p>
        </div>
      </div>

      {/* Marquee container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling track */}
        <div 
          className={cn(
            "flex gap-6 animate-marquee",
            isPaused && "pause-animation"
          )}
          style={{
            width: "max-content",
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="w-[380px] flex-shrink-0 bg-card rounded-2xl p-6 shadow-soft border border-border/30 hover:shadow-medium transition-shadow duration-300"
            >
              {/* Header with quote icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-gold" />
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial text */}
              <p className="font-sans text-foreground/80 text-sm leading-relaxed mb-6 min-h-[80px]">
                "{testimonial.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <p className="font-serif font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span className="font-sans text-xs text-muted-foreground">
                      {testimonial.city}
                    </span>
                  </div>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  testimonial.type === "propriétaire" 
                    ? "bg-gold/10 text-gold" 
                    : "bg-primary/10 text-primary"
                )}>
                  {testimonial.type === "propriétaire" ? "Propriétaire" : "Voyageur"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust indicators */}
      <div className="container mx-auto px-6 mt-12">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl font-bold text-gold">98%</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">Clients satisfaits</p>
          </div>
          <div className="w-px h-12 bg-border/50 hidden md:block" />
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl font-bold text-gold">5.0</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">Note moyenne</p>
          </div>
          <div className="w-px h-12 bg-border/50 hidden md:block" />
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl font-bold text-gold">50+</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">Biens gérés</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
