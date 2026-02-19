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
                <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />

                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-gold text-primary font-sans text-xs font-semibold px-3 py-1.5 tracking-wide">
                    à partir de {property.priceFrom}€/nuit
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-gold/70" />
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold/70">
                        {property.location}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-primary-foreground font-light tracking-wide mb-2">
                      {property.name}
                    </h3>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-primary-foreground/50" />
                        <span className="font-sans text-xs text-primary-foreground/50">
                          {property.guests} voyageurs
                        </span>
                      </div>
                      <span className="text-primary-foreground/20">·</span>
                      <span className="font-sans text-xs text-primary-foreground/50">
                        {property.bedrooms}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gold group-hover:gap-3 transition-all duration-300">
                      <span className="font-sans text-[11px] tracking-[0.2em] uppercase">
                        Découvrir
                      </span>
                      <ArrowRight className="w-4 h-4" />
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
