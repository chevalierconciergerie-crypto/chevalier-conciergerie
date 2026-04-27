import { useState } from "react";
import { properties, type Property } from "@/data/properties";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import { ArrowUpRight } from "lucide-react";

/**
 * La Collection — manifeste éditorial.
 * Chaque bien est une ligne typographique : numéro / nom / lieu /
 * capacité / prix. La photo n'apparaît qu'en fantôme au survol,
 * flottante à droite. La typographie domine, l'image accompagne.
 *
 * Référence : carte des suites d'un palace, manifesto Aman, listing
 * éditorial Loro Piana. Le luxe ne crie pas son inventaire.
 */

const PropertyListings = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-36 bg-black overflow-hidden">
      {/* Vignette photo flottante en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[5%]">
        {properties.map((p, i) => (
          <img
            key={p.slug}
            src={p.images[0]}
            alt=""
            aria-hidden="true"
            className={`absolute right-[6%] top-1/2 -translate-y-1/2 w-[42%] max-w-[520px] aspect-[3/4] object-cover transition-all duration-[1.4s] ease-out ${
              hoveredIndex === i
                ? "opacity-30 scale-100"
                : "opacity-0 scale-105"
            }`}
            loading="lazy"
            decoding="async"
          />
        ))}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-gradient-to-l from-transparent via-black/40 to-black pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimate>
          <header className="max-w-3xl mb-20 md:mb-28">
            <div className="w-10 h-px bg-gold/60 mb-6" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/85">
              La Collection
            </span>
            <h2
              className="font-serif font-light text-white mt-6 tracking-[-0.015em] leading-[1] [text-wrap:balance]"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
            >
              Huit clés. <em className="not-italic text-gold">Huit histoires.</em>
            </h2>
            <p className="font-sans text-sm md:text-base text-white/55 leading-relaxed mt-8 max-w-md">
              Chaque bien remis en personne, chaque voyageur reçu comme
              un ami. La photo n'a pas d'importance — la qualité du
              passage si.
            </p>
          </header>
        </ScrollAnimate>

        <div className="max-w-5xl">
          {properties.map((p, i) => (
            <PropertyRow
              key={p.slug}
              property={p}
              index={i}
              isHovered={hoveredIndex === i}
              onHover={(h) => setHoveredIndex(h ? i : null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PropertyRow = ({
  property,
  index,
  isHovered,
  onHover,
}: {
  property: Property;
  index: number;
  isHovered: boolean;
  onHover: (h: boolean) => void;
}) => (
  <a
    href={property.airbnbUrl}
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
    className="group block border-t border-white/10 transition-colors duration-500 hover:border-gold/50"
  >
    <div className="grid grid-cols-12 items-baseline gap-x-3 md:gap-x-6 py-7 md:py-9">
      {/* Numéro */}
      <div className="col-span-2 md:col-span-1">
        <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/35 group-hover:text-gold/80 transition-colors duration-500">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Nom + sous-titre */}
      <div className="col-span-10 md:col-span-5">
        <h3
          className="font-serif font-light text-white tracking-[-0.005em] leading-[1.05] group-hover:translate-x-1 transition-transform duration-500"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}
        >
          {property.name.split("–")[0].trim()}
          <span className="font-serif italic text-gold/85 ml-2 text-[0.6em] align-baseline">
            {property.name.split("–").slice(1).join("–").trim()}
          </span>
        </h3>
      </div>

      {/* Lieu + capacité */}
      <div className="col-span-7 md:col-span-3 mt-3 md:mt-0">
        <div className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-white/45 leading-relaxed">
          {property.location}
        </div>
        <div className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-white/30 mt-1">
          {property.bedrooms} · {property.guests} voyageurs
        </div>
      </div>

      {/* Prix + flèche */}
      <div className="col-span-5 md:col-span-3 flex items-center justify-end gap-3 md:gap-5 mt-3 md:mt-0">
        <div className="text-right">
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/35">
            À partir de
          </div>
          <div className="font-serif text-lg md:text-2xl text-gold font-light tabular-nums leading-none mt-1">
            {property.priceFrom}<span className="text-base">€</span>
          </div>
        </div>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/15 flex items-center justify-center transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:rotate-45 text-white/55 group-hover:text-black">
          <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-500 group-hover:-rotate-45" />
        </div>
      </div>
    </div>

    {/* Indicator hover */}
    <div
      className={`h-px bg-gold transition-all duration-500 ease-out ${
        isHovered ? "w-full" : "w-0"
      }`}
    />
  </a>
);

export default PropertyListings;
