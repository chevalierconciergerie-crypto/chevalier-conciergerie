import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import partenaireEraBanner from "@/assets/partenaire-era-banner.png";
import partenaireEraRachel from "@/assets/partenaire-era-rachel.jpg";
import partenaireLaCave from "@/assets/partenaire-lacave-realpanier.png";
import heroPartenaires from "@/assets/hero-partenaires.jpg";

interface Partner {
  front: string;
  back: string;
  name: string;
}

const partners: Partner[] = [
  {
    name: "ERA Immobilier — Rachel Lindo",
    front: partenaireEraRachel,
    back: partenaireEraBanner,
  },
  {
    name: "La Cave Réalpanier",
    front: partenaireLaCave,
    back: "",
  },
];

const FlipCard = ({ partner }: { partner: Partner }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full aspect-[16/9] cursor-pointer group"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden shadow-[var(--shadow-medium)] group-hover:shadow-[var(--shadow-gold)] transition-shadow duration-500 bg-white"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={partner.front}
            alt={`${partner.name} — recto`}
            className={partner.back ? "w-full h-full object-cover object-top" : "w-full h-full object-contain p-6"}
          />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden shadow-[var(--shadow-medium)] group-hover:shadow-[var(--shadow-gold)] transition-shadow duration-500 bg-white"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {partner.back ? (
            <img
              src={partner.back}
              alt={`${partner.name} — verso`}
              className="w-full h-full object-cover object-right"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-lg text-muted-foreground tracking-wide">{partner.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Partenaires = () => {
  return (
    <>
      <Helmet>
        <title>Nos Partenaires | Chevalier Conciergerie Avignon</title>
        <meta
          name="description"
          content="Découvrez nos partenaires de confiance à Avignon. Un réseau soigneusement sélectionné pour une expérience d'exception."
        />
        <link rel="canonical" href="https://chevalier-conciergerie.fr/partenaires" />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <Header />
        <main className="relative z-10">
          {/* Hero */}
          <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
            {/* Hero background image */}
            <img
              src={heroPartenaires}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/50" />

            <div className="container mx-auto px-6 relative z-10">
              <ScrollAnimate>
                <div className="text-center max-w-3xl mx-auto">
                  <div className="w-10 h-px bg-gold/40 mx-auto mb-6" />
                  <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold">
                    Notre Réseau
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground mt-6 mb-6 tracking-wide">
                    Nos Partenaires
                  </h1>
                  <p className="font-sans text-sm md:text-base text-primary-foreground/60 tracking-wide leading-relaxed max-w-xl mx-auto">
                    Cliquez sur une carte pour la retourner.
                  </p>
                  <div className="w-10 h-px bg-gold/40 mx-auto mt-8" />
                </div>
              </ScrollAnimate>
            </div>
          </section>

          {/* Cards grid */}
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {partners.map((partner, idx) => (
                  <ScrollAnimate key={idx} delay={idx * 80}>
                    <FlipCard partner={partner} />
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Partenaires;
