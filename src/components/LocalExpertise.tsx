import avignonImage from "@/assets/avignon-palais.jpg";

const LocalExpertise = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${avignonImage})` }}
      >
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative Elements */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gold" />
            <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Notre Ancrage</span>
            <div className="h-px w-16 bg-gold" />
          </div>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-tight mb-8">
            L'Expertise<br />
            <span className="text-gold">Avignonnaise</span>
          </h2>

          <p className="font-sans text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-3xl mx-auto">
            Née au cœur de la Cité des Papes, notre conciergerie bénéficie d'une connaissance intime 
            du marché immobilier avignonnais. Du centre historique aux quartiers résidentiels, 
            nous maîtrisons chaque nuance de cette ville d'exception.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <p className="font-serif text-4xl md:text-5xl text-gold font-semibold mb-2">5+</p>
              <p className="font-sans text-primary-foreground/70">Années d'expérience locale</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl md:text-5xl text-gold font-semibold mb-2">50+</p>
              <p className="font-sans text-primary-foreground/70">Biens gérés à Avignon</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl md:text-5xl text-gold font-semibold mb-2">98%</p>
              <p className="font-sans text-primary-foreground/70">Propriétaires satisfaits</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalExpertise;
