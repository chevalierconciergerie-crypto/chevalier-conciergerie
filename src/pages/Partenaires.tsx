import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import { MapPin, Wrench, ExternalLink } from "lucide-react";

interface Partner {
  name: string;
  description: string;
  category: string;
  website?: string;
}

const localPartners: Partner[] = [
  {
    name: "À définir",
    description: "Restaurant gastronomique au cœur d'Avignon",
    category: "Restaurant",
  },
  {
    name: "À définir",
    description: "Activités touristiques et visites guidées",
    category: "Tourisme",
  },
  {
    name: "À définir",
    description: "Commerces de proximité et artisanat local",
    category: "Commerce",
  },
];

const proPartners: Partner[] = [
  {
    name: "À définir",
    description: "Service de ménage professionnel haut de gamme",
    category: "Ménage",
  },
  {
    name: "À définir",
    description: "Maintenance et réparations d'urgence",
    category: "Maintenance",
  },
  {
    name: "À définir",
    description: "Photographie immobilière professionnelle",
    category: "Photographie",
  },
];

const PartnerCard = ({ partner }: { partner: Partner }) => (
  <div className="group relative bg-card rounded-lg border border-border p-8 hover:shadow-[var(--shadow-medium)] transition-all duration-500 hover:-translate-y-1">
    {/* Category badge */}
    <span className="inline-block font-sans text-[10px] tracking-[0.3em] uppercase text-gold bg-gold/10 px-3 py-1 rounded-full mb-5">
      {partner.category}
    </span>
    
    <h3 className="font-serif text-xl text-foreground mb-3 tracking-wide">
      {partner.name}
    </h3>
    <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
      {partner.description}
    </p>
    
    {partner.website && (
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-sans text-sm transition-colors"
      >
        Visiter le site
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    )}
    
    {/* Decorative corner */}
    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-lg">
      <div className="absolute top-0 right-0 w-px h-8 bg-gold/20 group-hover:bg-gold/50 transition-colors duration-500" />
      <div className="absolute top-0 right-0 h-px w-8 bg-gold/20 group-hover:bg-gold/50 transition-colors duration-500" />
    </div>
  </div>
);

const PartnerSection = ({
  icon: Icon,
  number,
  title,
  subtitle,
  partners,
  delay = 0,
}: {
  icon: React.ElementType;
  number: string;
  title: string;
  subtitle: string;
  partners: Partner[];
  delay?: number;
}) => (
  <ScrollAnimate delay={delay}>
    <div className="mb-16 md:mb-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
          <Icon className="w-5 h-5 text-gold" />
        </div>
        <div>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/60 block">
            {number}
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-foreground font-light tracking-wide">
            {title}
          </h2>
        </div>
      </div>
      <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        {subtitle}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, idx) => (
          <PartnerCard key={idx} partner={partner} />
        ))}
      </div>
    </div>
  </ScrollAnimate>
);

const Partenaires = () => {
  return (
    <>
      <Helmet>
        <title>Nos Partenaires | Chevalier Conciergerie Avignon</title>
        <meta
          name="description"
          content="Découvrez nos partenaires locaux et professionnels à Avignon. Un réseau de confiance pour une expérience locative d'exception."
        />
        <link rel="canonical" href="https://chevalier-conciergerie.fr/partenaires" />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <Header />
        <main className="relative z-10">
          {/* Hero */}
          <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary relative overflow-hidden">
            {/* Subtle texture */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--gold)) 0.5px, transparent 0)",
                backgroundSize: "32px 32px",
              }} />
            </div>
            
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
                    Un réseau soigneusement sélectionné de professionnels et d'acteurs locaux
                    pour offrir à vos voyageurs une expérience inoubliable.
                  </p>
                  <div className="w-10 h-px bg-gold/40 mx-auto mt-8" />
                </div>
              </ScrollAnimate>
            </div>
          </section>

          {/* Partners content */}
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-6 max-w-6xl">
              <PartnerSection
                icon={MapPin}
                number="01 — Local"
                title="Partenaires Locaux"
                subtitle="Restaurants, activités et commerces d'exception autour d'Avignon que nous recommandons à nos voyageurs pour une immersion authentique."
                partners={localPartners}
              />

              <PartnerSection
                icon={Wrench}
                number="02 — Professionnel"
                title="Partenaires Professionnels"
                subtitle="Des prestataires de confiance qui garantissent un niveau de qualité irréprochable pour la gestion de vos biens."
                partners={proPartners}
                delay={100}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Partenaires;
