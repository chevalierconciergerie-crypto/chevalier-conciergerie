import { Check, TrendingUp, Shield, Clock, FileCheck, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sublocation = () => {
  const advantages = [
    {
      icon: Banknote,
      title: "Loyer Garanti",
      description: "Un revenu fixe chaque mois, versé dès le premier jour du contrat, quelle que soit l'occupation.",
    },
    {
      icon: Shield,
      title: "Zéro Risque",
      description: "Nous assumons tous les risques locatifs : impayés, vacances, dégradations.",
    },
    {
      icon: Clock,
      title: "Zéro Gestion",
      description: "Plus aucune contrainte : nous gérons tout de A à Z.",
    },
    {
      icon: TrendingUp,
      title: "Valorisation",
      description: "Votre bien est entretenu aux standards hôteliers, préservant sa valeur.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Estimation Gratuite",
      description: "Nous évaluons votre bien et vous proposons un loyer garanti mensuel.",
    },
    {
      number: "02",
      title: "Signature du Bail",
      description: "Contrat de sous-location professionnel sécurisé et conforme.",
    },
    {
      number: "03",
      title: "Mise en Location",
      description: "Nous préparons et photographions votre bien pour les plateformes.",
    },
    {
      number: "04",
      title: "Revenus Garantis",
      description: "Recevez votre loyer chaque mois, sans exception.",
    },
  ];

  return (
    <section id="sublocation" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Sous-Location Professionnelle</span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            La Sérénité d'un Revenu Garanti
          </h2>
          <p className="font-sans text-muted-foreground text-lg">
            Nous louons votre bien à notre nom et vous versons un loyer fixe chaque mois.
            Une solution idéale pour les propriétaires souhaitant sécuriser leurs revenus.
          </p>
        </div>

        {/* Advantages Grid */}
        <div id="advantages" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.title}
              className="group p-8 rounded-2xl bg-card shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <advantage.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {advantage.title}
              </h3>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="max-w-5xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground text-center mb-12">
            Comment ça fonctionne ?
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />
            
            <div className="space-y-8 lg:space-y-0">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                    <div className="p-6 rounded-2xl bg-card shadow-soft">
                      <h4 className="font-serif text-xl font-semibold text-foreground mb-2">
                        {step.title}
                      </h4>
                      <p className="font-sans text-muted-foreground text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Number Circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                    <span className="font-serif text-xl font-bold text-primary">{step.number}</span>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button variant="gold" size="xl">
              Obtenir mon estimation gratuite
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sublocation;
