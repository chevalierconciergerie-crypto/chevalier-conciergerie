import { properties } from "@/data/properties";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";

const PropertyListings = () => {
  return (
    <section className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <ScrollAnimate>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <div className="w-10 h-px bg-gold/60 mx-auto mb-6" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/85">
              La Sélection
            </span>
            <h2
              className="font-serif font-light text-white tracking-wide mt-6 [text-wrap:balance]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Nos biens, <em className="not-italic text-gold">en gestion.</em>
            </h2>
          </div>
        </ScrollAnimate>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-10 md:gap-y-20 max-w-7xl mx-auto">
          {properties.map((property, index) => (
            <ScrollAnimate key={property.slug} delay={index * 80}>
              <article className="group">
                <div className="relative overflow-hidden aspect-[3/4] bg-white/5">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
                </div>
                <div className="mt-5">
                  <h3 className="font-serif text-lg md:text-xl text-white font-light tracking-wide leading-snug">
                    {property.name}
                  </h3>
                  <div className="mt-2 flex items-baseline justify-between text-white/45">
                    <span className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase">
                      {property.location}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-gold/75">
                      {property.bedrooms} · {property.guests} pers.
                    </span>
                  </div>
                </div>
              </article>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
