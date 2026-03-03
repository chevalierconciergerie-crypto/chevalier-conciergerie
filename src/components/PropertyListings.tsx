import { ArrowRight, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";

const PropertyListings = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <ScrollAnimate>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="w-10 h-px bg-gold/40 mx-auto mb-5" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold">
              Nos Propriétés
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-foreground mt-6 mb-6 tracking-wide">
              Réservez Directement
            </h2>
            <p className="font-sans text-sm md:text-base text-muted-foreground tracking-wide leading-relaxed">
              Profitez du meilleur tarif garanti en réservant<br className="hidden md:block" />
              directement sur notre site.
            </p>
          </div>
        </ScrollAnimate>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {properties.map((property, index) => (
            <ScrollAnimate key={property.slug} delay={index * 150}>
              <Link to={`/proprietes/${property.slug}`} className="group block">
                <div className="relative">
                  {/* Image container */}
                  <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    {/* Subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                    
                    {/* Discover CTA — bottom of image */}
                    <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <span className="font-sans text-[11px] tracking-[0.2em] uppercase">
                          Découvrir
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      
                      {/* Price */}
                      <span className="font-sans text-[11px] tracking-wide text-primary-foreground/70">
                        dès {property.priceFrom}€<span className="text-primary-foreground/40">/nuit</span>
                      </span>
                    </div>
                  </div>

                  {/* Text content — below the image */}
                  <div className="pt-5 px-1">
                    <div className="flex items-center gap-2 mb-2.5">
                      <MapPin className="w-3 h-3 text-gold/60" />
                      <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                        {property.location}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg md:text-xl text-foreground font-light tracking-wide mb-2 group-hover:text-gold transition-colors duration-300">
                      {property.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-muted-foreground/50" />
                      <span className="font-sans text-xs text-muted-foreground/70">
                        {property.guests} voyageurs · {property.bedrooms}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
