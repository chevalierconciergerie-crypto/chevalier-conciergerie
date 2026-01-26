import { useState } from "react";
import { Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  city: string;
  rating: number;
  text: string;
  platform: "google" | "trustpilot";
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie L.",
    city: "Avignon",
    rating: 5,
    text: "Service impeccable ! Mon appartement n'a jamais été aussi bien géré. Les revenus ont augmenté de 40% depuis que je travaille avec Chevalier.",
    platform: "google",
  },
  {
    id: 2,
    name: "Jean-Pierre D.",
    city: "Villeneuve-lès-Avignon",
    rating: 5,
    text: "Enfin une conciergerie qui comprend le marché local. Communication fluide et professionnalisme exemplaire.",
    platform: "trustpilot",
  },
  {
    id: 3,
    name: "Sophie M.",
    city: "Les Angles",
    rating: 5,
    text: "Je recommande vivement ! Équipe réactive, logement toujours impeccable. Mes voyageurs sont ravis.",
    platform: "google",
  },
  {
    id: 4,
    name: "Laurent B.",
    city: "Avignon",
    rating: 5,
    text: "La sous-location avec loyer garanti m'a changé la vie. Plus de stress, revenus réguliers chaque mois.",
    platform: "trustpilot",
  },
  {
    id: 5,
    name: "Claire V.",
    city: "Villeneuve-lès-Avignon",
    rating: 5,
    text: "Accueil chaleureux et appartement parfaitement préparé. Un séjour mémorable pendant le Festival !",
    platform: "google",
  },
  {
    id: 6,
    name: "Thomas R.",
    city: "Avignon",
    rating: 5,
    text: "Gestion irréprochable de mon studio. L'équipe est disponible 24/7 et vraiment à l'écoute.",
    platform: "trustpilot",
  },
];

// Platform logo components
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-label="Google">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const TrustpilotLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-label="Trustpilot">
    <path fill="#00B67A" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

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
              {/* Header with platform logo and stars */}
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full",
                  testimonial.platform === "google" 
                    ? "bg-blue-50" 
                    : "bg-emerald-50"
                )}>
                  {testimonial.platform === "google" ? <GoogleLogo /> : <TrustpilotLogo />}
                  <span className={cn(
                    "font-sans text-xs font-medium",
                    testimonial.platform === "google" 
                      ? "text-blue-700" 
                      : "text-emerald-700"
                  )}>
                    {testimonial.platform === "google" ? "Google" : "Trustpilot"}
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4 fill-current",
                        testimonial.platform === "google" 
                          ? "text-amber-400" 
                          : "text-emerald-500"
                      )}
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
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="font-sans text-xs text-muted-foreground">
                      {testimonial.city}
                    </span>
                  </div>
                </div>
                <div className={cn(
                  "px-2.5 py-1 rounded text-[10px] font-medium uppercase tracking-wider",
                  testimonial.platform === "google" 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-emerald-100 text-emerald-700"
                )}>
                  Avis vérifié
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default TestimonialsCarousel;
