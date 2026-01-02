import { Home, Sparkles, Wrench, Shield, Clock, Star } from "lucide-react";
import serviceConciergerie from "@/assets/service-concierge.jpg";
import serviceSublocation from "@/assets/service-sublocation.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";

const Services = () => {
  const mainServices = [
    {
      icon: Home,
      title: "Sous-location Professionnelle",
      description: "Loyer garanti chaque mois, zéro vacance locative. Nous prenons en charge votre bien et vous versons un revenu fixe.",
      image: serviceSublocation,
      features: ["Loyer garanti", "0% vacance", "Gestion complète"],
      size: "large",
    },
    {
      icon: Sparkles,
      title: "Conciergerie Complète",
      description: "Accueil voyageurs 5 étoiles, ménage professionnel et gestion des réservations.",
      image: serviceConciergerie,
      features: ["Accueil 24/7", "Ménage premium", "Communication voyageur"],
      size: "medium",
    },
    {
      icon: Wrench,
      title: "Maintenance & Entretien",
      description: "Préservation de votre patrimoine avec interventions rapides et suivi régulier.",
      image: serviceMaintenance,
      features: ["Interventions rapides", "Réseau artisans", "Suivi état du bien"],
      size: "medium",
    },
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Assurance Incluse",
      description: "Protection complète de votre bien et responsabilité civile.",
    },
    {
      icon: Clock,
      title: "Disponibilité 7j/7",
      description: "Support réactif pour vous et vos voyageurs à tout moment.",
    },
    {
      icon: Star,
      title: "Qualité Premium",
      description: "Standards hôteliers pour une expérience exceptionnelle.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Nos Services</span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            Une Gestion Sur-Mesure
          </h2>
          <p className="font-sans text-muted-foreground text-lg">
            Des solutions adaptées à vos besoins pour maximiser la valeur de votre patrimoine immobilier.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Card - Sous-location */}
          <div className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-500">
            <div className="absolute inset-0">
              <img 
                src={mainServices[0].image} 
                alt={mainServices[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
            </div>
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end min-h-[400px] lg:min-h-[500px]">
              {(() => {
                const IconComponent = mainServices[0].icon;
                return (
                  <div className="w-14 h-14 rounded-xl bg-gold/20 backdrop-blur-sm flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-gold" />
                  </div>
                );
              })()}
              <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground font-semibold mb-4">
                {mainServices[0].title}
              </h3>
              <p className="font-sans text-primary-foreground/80 mb-6 max-w-xl">
                {mainServices[0].description}
              </p>
              <div className="flex flex-wrap gap-3">
                {mainServices[0].features.map((feature) => (
                  <span key={feature} className="px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-sm text-primary-foreground font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Medium Cards */}
          {mainServices.slice(1).map((service) => (
            <div key={service.title} className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-500">
              <div className="absolute inset-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
              </div>
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end min-h-[300px]">
                <div className="w-12 h-12 rounded-xl bg-gold/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-primary-foreground font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="font-sans text-primary-foreground/80 text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span key={feature} className="px-3 py-1.5 bg-gold/20 backdrop-blur-sm rounded-full text-xs text-primary-foreground font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Small Feature Cards */}
          {additionalFeatures.map((feature) => (
            <div key={feature.title} className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <feature.icon className="w-6 h-6 text-gold" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h4>
              <p className="font-sans text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
