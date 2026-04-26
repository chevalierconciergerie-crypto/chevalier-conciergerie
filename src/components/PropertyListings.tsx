import { properties } from "@/data/properties";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";

const PropertyListings = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <ScrollAnimate>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="w-10 h-px bg-gold/50 mx-auto mb-5" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold">
              Nos Propriétés
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-primary-foreground mt-6 mb-6 tracking-wide">
              Nos Logements
            </h2>
            <p className="font-sans text-sm md:text-base text-primary-foreground/65 tracking-wide leading-relaxed">
              Découvrez notre sélection d'appartements<br className="hidden md:block" />
              au cœur d'Avignon.
            </p>
          </div>
        </ScrollAnimate>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {properties.map((property, index) => (
            <ScrollAnimate key={property.slug} delay={index * 100}>
              <div className="block group">
                <div className="relative overflow-hidden rounded-xl bg-primary-foreground/[0.05] border border-gold/15 backdrop-blur-md transition-all duration-500 hover:border-gold/40 hover:bg-primary-foreground/[0.08]">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-5 py-5 md:px-6 md:py-6">
                    <h3 className="font-serif text-base md:text-lg text-primary-foreground font-light tracking-wide text-center">
                      {property.name}
                    </h3>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
