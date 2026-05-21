import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { properties, type Property } from "@/data/properties";

// Ordre d'affichage des logements (du plus prestigieux au plus standard)
const DISPLAY_ORDER = [
  "le-vernet-hypercentre",
  "authentique-palais-des-papes",
  "hypercentre-local-velo",
  "appartement-provencal-charme",     // La Loge
  "appartement-coeur-avignon",        // La Scène
  "appartement-renove-intramuros",    // L'Intramuros
  "le-central-navette-parking",
  "la-coulisse",
  "appartement-cosy-lumineux",        // L'Atelier
  "epi",
];

const sortedProperties = [...properties].sort((a, b) => {
  const ai = DISPLAY_ORDER.indexOf(a.slug);
  const bi = DISPLAY_ORDER.indexOf(b.slug);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
});

const PropertyListings = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header avec parallaxe */}
        <motion.div
          style={{ y: titleY }}
          className="flex items-end justify-between flex-wrap gap-6 max-w-7xl mx-auto mb-16 md:mb-20"
        >
          <div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-px bg-foreground/30 mb-4"
            />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-foreground/60 inline-block"
            >
              La Collection
            </motion.span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight leading-[0.95] mt-4">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-block"
              >
                Nos adresses,
              </motion.span>
              <br />
              <motion.em
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-foreground/40 not-italic font-extralight inline-block"
              >
                d'exception.
              </motion.em>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-sans text-sm text-muted-foreground max-w-xs tracking-wide leading-relaxed"
          >
            Une sélection confidentielle au cœur d'Avignon et de ses alentours.
          </motion.p>
        </motion.div>

        {/* Grille uniforme — toutes les cartes même taille, format portrait */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto">
          {sortedProperties.map((property, index) => (
            <PropertyCard key={property.slug} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────
// Carte simple — reveal au scroll uniquement, pas d'effet hover
// ─────────────────────────────────────────────────────────
function PropertyCard({ property, index }: { property: Property; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const [mainName, ...rest] = property.name.split("–");
  const subtitle = rest.join("–").trim();

  return (
    <motion.article
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Image format portrait uniforme */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Numéro discret en haut à droite */}
        <span className="absolute top-5 right-5 font-serif italic font-light text-primary-foreground/90 text-xl tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          {number}
        </span>
      </div>

      {/* Bloc texte sous l'image */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-serif italic font-extralight text-foreground/30 text-xl">
            {number}
          </span>
          <div className="h-px w-8 bg-foreground/20" />
          {property.location && (
            <p className="font-sans text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-muted-foreground">
              {property.location}
            </p>
          )}
        </div>
        <h3 className="font-serif text-xl md:text-2xl font-light text-foreground tracking-tight leading-tight">
          {mainName.trim()}
        </h3>
        {subtitle && (
          <p className="font-serif italic font-extralight text-foreground/50 text-sm md:text-base tracking-wide">
            {subtitle}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default PropertyListings;
