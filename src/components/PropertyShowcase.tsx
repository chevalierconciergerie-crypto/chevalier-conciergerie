import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, BedDouble, MapPin } from "lucide-react";
import { properties } from "@/data/properties";

/**
 * Vitrine des logements — liste numérotée qui pilote un visuel en vedette.
 *
 * L'idée vient d'un composant « quiet luxury » repéré sur 21st.dev, mais réécrite
 * entièrement : l'original chargeait Three.js et GSAP depuis un CDN et animait ses
 * transitions en shader WebGL, pour un site dont on venait de diviser le poids par
 * trois. Ici, tout tient en état React et en transitions CSS.
 *
 * Sur mobile la liste passe sous le visuel : une colonne de dix noms au-dessus d'une
 * grande image ne tient pas sur 375px.
 */
const PropertyShowcase = () => {
  const [active, setActive] = useState(0);
  const property = properties[active];

  if (!property) return null;

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <div className="mx-auto mb-6 h-px w-10 bg-gold-ink/40" />
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-muted-foreground">
            La collection
          </p>
          <h2 className="mt-5 font-serif text-3xl font-light tracking-[0.02em] text-foreground md:text-5xl">
            Nos logements
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Des adresses choisies à Avignon et alentours, gérées et entretenues par nos soins.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* Liste — second sur mobile pour que le visuel accroche en premier */}
          <ol className="order-2 lg:order-1">
            {properties.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={on ? "true" : undefined}
                    className={`group flex w-full min-h-11 items-baseline gap-5 border-b border-border py-4 text-left transition-colors ${
                      on ? "border-gold-ink/40" : "hover:border-foreground/30"
                    }`}
                  >
                    <span
                      className={`font-sans text-xs tabular-nums tracking-[0.2em] transition-colors ${
                        on ? "text-gold-ink" : "text-muted-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-lg font-light leading-snug transition-colors md:text-xl ${
                        on ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {p.name}
                    </span>
                    {/* priceFrom vaut 0 sur plusieurs logements : « dès 0 € » ferait bug. */}
                    {p.priceFrom > 0 && (
                      <span className="ml-auto shrink-0 font-sans text-xs tracking-wide text-muted-foreground">
                        dès {p.priceFrom} €
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Visuel en vedette */}
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-sm bg-secondary">
              {/*
                Toutes les images sont montées et empilées : basculer l'opacité évite le
                flash blanc d'un <img> dont on change le src, et le navigateur ne
                retélécharge rien au second survol.
              */}
              <div className="relative aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-[4/5]">
                {properties.map((p, i) => (
                  <img
                    key={p.slug}
                    src={p.images[0]}
                    alt={p.name}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs uppercase tracking-[0.15em] text-primary-foreground/80">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {property.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" aria-hidden="true" />
                      {property.guests} voyageurs
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
                      {property.bedrooms}
                    </span>
                  </p>

                  <h3 className="mt-3 font-serif text-2xl font-light text-primary-foreground md:text-3xl">
                    {property.name}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-primary-foreground/80">
                    {property.shortDescription}
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to={`/proprietes/${property.slug}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 py-2.5 font-sans text-sm font-medium tracking-wide text-primary transition-colors hover:bg-primary-foreground/90"
                    >
                      Voir le logement
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      to="/reservation"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary-foreground/40 px-6 py-2.5 font-sans text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                    >
                      Vérifier les dates
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;
