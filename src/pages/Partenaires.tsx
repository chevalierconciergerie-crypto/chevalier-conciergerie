import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import { MapPin, Wrench, ExternalLink, Phone, Mail } from "lucide-react";
import partenaireEraRachel from "@/assets/partenaire-era-rachel.jpg";

interface Partner {
  name: string;
  role?: string;
  description: string;
  category: string;
  website?: string;
  phone?: string;
  email?: string;
  image?: string;
}

const localPartners: Partner[] = [
  {
    name: "Rachel Lindo",
    role: "Directrice — ERA Immobilier",
    description: "Agence immobilière de confiance pour l'estimation et la vente de vos biens. Estimation offerte sous 24h grâce à la Multi-Expertise ERA.",
    category: "Immobilier",
    phone: "07 70 26 16 94",
    email: "lindoconceptimmobilier@erafrance.com",
    website: "https://www.erafrance.com",
    image: partenaireEraRachel,
  },
];

const proPartners: Partner[] = [
  {
    name: "À venir",
    description: "De nouveaux partenaires professionnels seront bientôt annoncés.",
    category: "Ménage",
  },
  {
    name: "À venir",
    description: "De nouveaux partenaires professionnels seront bientôt annoncés.",
    category: "Maintenance",
  },
];

const FeaturedPartnerCard = ({ partner }: { partner: Partner }) => (
  <div className="group relative bg-card rounded-lg border border-border overflow-hidden hover:shadow-[var(--shadow-medium)] transition-all duration-500">
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
      {/* Image */}
      {partner.image && (
        <div className="relative aspect-square md:aspect-auto overflow-hidden bg-muted">
          <img
            src={partner.image}
            alt={partner.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <span className="inline-block self-start font-sans text-[10px] tracking-[0.3em] uppercase text-gold bg-gold/10 px-3 py-1 rounded-full mb-5">
          {partner.category}
        </span>
        
        <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-1 tracking-wide">
          {partner.name}
        </h3>
        {partner.role && (
          <p className="font-sans text-sm text-gold mb-4">{partner.role}</p>
        )}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
          {partner.description}
        </p>
        
        {/* Contact info */}
        <div className="space-y-2 mb-6">
          {partner.phone && (
            <a href={`tel:${partner.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-foreground hover:text-gold transition-colors">
              <Phone className="w-4 h-4 text-gold/60" />
              {partner.phone}
            </a>
          )}
          {partner.email && (
            <a href={`mailto:${partner.email}`} className="flex items-center gap-3 text-sm text-foreground hover:text-gold transition-colors">
              <Mail className="w-4 h-4 text-gold/60" />
              {partner.email}
            </a>
          )}
        </div>
        
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
      </div>
    </div>
  </div>
);

const PartnerCard = ({ partner }: { partner: Partner }) => (
  <div className="group relative bg-card rounded-lg border border-border p-8 hover:shadow-[var(--shadow-medium)] transition-all duration-500 hover:-translate-y-1">
    <span className="inline-block font-sans text-[10px] tracking-[0.3em] uppercase text-gold bg-gold/10 px-3 py-1 rounded-full mb-5">
      {partner.category}
    </span>
    <h3 className="font-serif text-xl text-foreground mb-3 tracking-wide">
      {partner.name}
    </h3>
    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
      {partner.description}
    </p>
    
    {/* Decorative corner */}
    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-lg">
      <div className="absolute top-0 right-0 w-px h-8 bg-gold/20 group-hover:bg-gold/50 transition-colors duration-500" />
      <div className="absolute top-0 right-0 h-px w-8 bg-gold/20 group-hover:bg-gold/50 transition-colors duration-500" />
    </div>
  </div>
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
                    pour vous accompagner dans tous vos projets immobiliers.
                  </p>
                  <div className="w-10 h-px bg-gold/40 mx-auto mt-8" />
                </div>
              </ScrollAnimate>
            </div>
          </section>

          {/* Local Partners */}
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-6 max-w-6xl">
              <ScrollAnimate>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/60 block">
                      01 — Local
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground font-light tracking-wide">
                      Partenaires Locaux
                    </h2>
                  </div>
                </div>
                <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-12 max-w-2xl">
                  Des professionnels de confiance à Avignon et ses environs pour vous accompagner dans vos projets.
                </p>
              </ScrollAnimate>

              <ScrollAnimate delay={100}>
                <div className="space-y-8">
                  {localPartners.map((partner, idx) => (
                    <FeaturedPartnerCard key={idx} partner={partner} />
                  ))}
                </div>
              </ScrollAnimate>
            </div>
          </section>

          {/* Professional Partners */}
          <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-6 max-w-6xl">
              <ScrollAnimate>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/60 block">
                      02 — Professionnel
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground font-light tracking-wide">
                      Partenaires Professionnels
                    </h2>
                  </div>
                </div>
                <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-12 max-w-2xl">
                  Des prestataires qui garantissent un niveau de qualité irréprochable pour la gestion de vos biens.
                </p>
              </ScrollAnimate>

              <ScrollAnimate delay={100}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {proPartners.map((partner, idx) => (
                    <PartnerCard key={idx} partner={partner} />
                  ))}
                </div>
              </ScrollAnimate>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Partenaires;
