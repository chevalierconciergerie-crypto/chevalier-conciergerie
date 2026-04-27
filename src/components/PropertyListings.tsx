import { properties } from "@/data/properties";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import { ArrowUpRight } from "lucide-react";

const PropertyListings = () => {
  return (
    <section className="py-24 md:py-36 bg-black">
      <div className="container mx-auto px-6">
        <ScrollAnimate>
          <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
            <div className="w-10 h-px bg-gold/60 mx-auto mb-6" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/85">
              La sélection
            </span>
            <h2
              className="font-serif font-light text-white tracking-[-0.01em] mt-6 [text-wrap:balance]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Nos biens, <em className="not-italic text-gold">en gestion.</em>
            </h2>
            <p className="font-sans text-sm md:text-base text-white/55 leading-relaxed mt-6 max-w-md mx-auto">
              Studios et appartements intra-muros et autour des remparts.
              Chaque clé a été remise en personne au moins une fois.
            </p>
          </div>
        </ScrollAnimate>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 md:gap-y-28 gap-x-12 md:gap-x-16 max-w-6xl mx-auto">
          {properties.map((property, index) => (
            <ScrollAnimate key={property.slug} delay={(index % 2) * 100}>
              <a
                href={property.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-white/[0.03]">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                  <div className="absolute top-5 left-5 right-5 flex items-start justify-between text-white/85">
                    <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase bg-black/35 backdrop-blur-sm px-2.5 py-1">
                      {property.location}
                    </span>
                    <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-gold bg-black/35 backdrop-blur-sm px-2.5 py-1">
                      ★ Airbnb
                    </span>
                  </div>

                  <div className="absolute bottom-5 right-5 w-11 h-11 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/85 transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:text-black">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-xl md:text-2xl text-white font-light tracking-[-0.005em] leading-tight">
                    {property.name}
                  </h3>
                  <div className="text-right whitespace-nowrap">
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                      À partir de
                    </div>
                    <div className="font-serif text-lg md:text-xl text-gold font-light leading-none mt-1">
                      {property.priceFrom}€<span className="text-sm text-gold/60"> / nuit</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 font-sans text-sm text-white/55 leading-relaxed max-w-md">
                  {property.shortDescription}
                </p>

                <div className="mt-5 flex items-center gap-4 text-white/35">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
                    {property.bedrooms}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
                    {property.guests} voyageurs
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
                    {property.bathrooms} sdb
                  </span>
                </div>
              </a>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
