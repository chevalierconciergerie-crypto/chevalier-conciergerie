import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
}

// Avis réels récupérés depuis la fiche Google "CHEVALIER CONCIERGERIE" (5,0/5 · 12 avis) le 2026-07-29.
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Clément Pailler",
    rating: 5,
    text: "J'ai fait appel à Chevalier Conciergerie pour mon appartement et je suis absolument ravi de la manière dont j'ai été accompagné par Victor. Je recommande à 100 % !",
  },
  {
    id: 2,
    name: "Baptiste Mailharrancin",
    rating: 5,
    text: "Je confie mon appartement en centre-ville d'Avignon à CHEVALIER Conciergerie depuis plusieurs mois et je ne regrette pas. Communication fluide, réactivité au top et mes voyageurs sont toujours très bien accueillis. Je ne m'occupe plus de rien et mes revenus locatifs ont augmenté.",
  },
  {
    id: 3,
    name: "Sandrine David",
    rating: 5,
    text: "Très satisfait de Chevalier Conciergerie ! Équipe professionnelle, réactive et à l'écoute. Service de qualité et communication au top. Je recommande sans hésiter.",
  },
  {
    id: 4,
    name: "felicien arnoux",
    rating: 5,
    text: "Excellente conciergerie, très professionnelle et à l'écoute des clients. Je recommande vivement pour tout projet de location courte durée sur le secteur Gard et Vaucluse.",
  },
  {
    id: 5,
    name: "Solitchi",
    rating: 5,
    text: "Très satisfait de mon expérience avec Victor sur Avignon. Professionnalisme, réactivité et conseils au top du début à la fin.",
  },
  {
    id: 6,
    name: "Pierrick",
    rating: 5,
    text: "Excellente conciergerie sur Avignon, je recommande CHEVALIER Conciergerie.",
  },
];

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/CHEVALIER+CONCIERGERIE/@43.8680214,4.8327906,17z";

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-label="Google">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
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
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Témoignages
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            Ils Nous Font Confiance
          </h2>
          <p className="font-sans text-muted-foreground text-lg mb-4">
            Propriétaires et voyageurs partagent leur expérience avec Chevalier Conciergerie.
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="font-sans text-sm font-medium text-foreground">
              5,0 sur 5 · 12 avis Google
            </span>
          </a>
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
              {/* Header with Google logo and stars */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50">
                  <GoogleLogo />
                  <span className="font-sans text-xs font-medium text-blue-700">
                    Google
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Testimonial text */}
              <p className="font-sans text-foreground/80 text-sm leading-relaxed mb-6 min-h-[80px]">
                "{testimonial.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <p className="font-serif font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <div className="px-2.5 py-1 rounded text-xs font-medium uppercase tracking-wider bg-blue-100 text-blue-700">
                  Avis Google public
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
