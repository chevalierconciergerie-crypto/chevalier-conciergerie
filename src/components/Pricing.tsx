import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    {
      name: "Gestion Locative",
      description: "Pour les propriétaires souhaitant déléguer l'essentiel",
      price: "15%",
      priceNote: "des revenus locatifs",
      featured: false,
      features: [
        "Création et gestion des annonces",
        "Communication voyageurs",
        "Gestion des réservations",
        "Check-in / Check-out",
        "Remise des clés",
        "Support propriétaire dédié",
        "Reporting mensuel",
      ],
    },
    {
      name: "Conciergerie Premium",
      description: "L'expérience complète haut de gamme",
      price: "20%",
      priceNote: "des revenus locatifs",
      featured: true,
      features: [
        "Tout le pack Gestion Locative",
        "Ménage professionnel inclus",
        "Linge de maison hôtelier",
        "Produits d'accueil premium",
        "Maintenance préventive",
        "Photographie professionnelle",
        "Optimisation dynamique des prix",
        "Disponibilité 7j/7 - 24h/24",
      ],
    },
    {
      name: "Sous-Location",
      description: "Revenus garantis, zéro contrainte",
      price: "Fixe",
      priceNote: "loyer mensuel garanti",
      featured: false,
      features: [
        "Loyer fixe chaque mois",
        "Aucune vacance locative",
        "Gestion 100% déléguée",
        "Assurance tous risques",
        "Entretien régulier",
        "État des lieux inclus",
        "Contrat sécurisé",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Tarifs</span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            Des Formules Adaptées
          </h2>
          <p className="font-sans text-muted-foreground text-lg">
            Choisissez la solution qui correspond à vos objectifs et à votre mode de vie.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.featured
                  ? "bg-primary shadow-medium scale-105 lg:scale-110"
                  : "bg-card shadow-soft hover:shadow-medium hover:-translate-y-1"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-gold text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
                    Recommandé
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`font-serif text-2xl font-semibold mb-2 ${
                  plan.featured ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {plan.name}
                </h3>
                <p className={`font-sans text-sm ${
                  plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-8">
                <span className={`font-serif text-5xl font-bold ${
                  plan.featured ? "text-gold" : "text-foreground"
                }`}>
                  {plan.price}
                </span>
                <p className={`font-sans text-sm mt-2 ${
                  plan.featured ? "text-primary-foreground/60" : "text-muted-foreground"
                }`}>
                  {plan.priceNote}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.featured ? "bg-gold/20" : "bg-secondary"
                    }`}>
                      <Check className={`w-3 h-3 ${
                        plan.featured ? "text-gold" : "text-gold"
                      }`} />
                    </div>
                    <span className={`font-sans text-sm ${
                      plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.featured ? "gold" : "outline-gold"}
                className="w-full"
                size="lg"
              >
                Choisir cette formule
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center font-sans text-sm text-muted-foreground mt-12 max-w-2xl mx-auto">
          * Tous nos tarifs sont transparents et sans frais cachés. 
          Une estimation personnalisée vous sera proposée lors de notre premier échange.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
