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

        <div className="flex flex-col gap-5 max-w-5xl mx-auto">
          {properties.map((property, index) => (
            <ScrollAnimate key={property.slug} delay={index * 120}>
              <Link to={`/proprietes/${property.slug}`} className="group block">
                <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-card rounded-xl overflow-hidden border border-border hover:shadow-[var(--shadow-medium)] transition-all duration-500 hover:-translate-y-0.5">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[16/10] md:aspect-[16/9] md:max-h-[260px]">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-3 h-3 text-gold/60" />
                      <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                        {property.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg md:text-xl text-foreground font-light tracking-wide mb-3 group-hover:text-gold transition-colors duration-300">
                      {property.name}
                    </h3>

                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-muted-foreground/50" />
                        <span className="font-sans text-xs text-muted-foreground/70">
                          {property.guests} voyageurs
                        </span>
                      </div>
                      <span className="text-muted-foreground/30">·</span>
                      <span className="font-sans text-xs text-muted-foreground/70">
                        {property.bedrooms}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-sans text-sm text-foreground">
                        dès <span className="font-serif text-lg text-gold">{property.priceFrom}€</span><span className="text-muted-foreground text-xs">/nuit</span>
                      </span>

                      <div className="flex items-center gap-2 text-gold group-hover:gap-3 transition-all duration-300">
                        <span className="font-sans text-[11px] tracking-[0.15em] uppercase">
                          Voir
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
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
