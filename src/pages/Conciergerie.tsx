import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Sparkles, Users, Clock, Star, Camera, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import serviceConciergerie from "@/assets/service-concierge.jpg";

const Conciergerie = () => {
  const services = [
    {
      icon: Users,
      title: "Accueil Voyageurs 5 Étoiles",
      description: "Check-in personnalisé, remise des clés et présentation du logement pour une arrivée parfaite.",
    },
    {
      icon: Sparkles,
      title: "Ménage Professionnel",
      description: "Nettoyage hôtelier entre chaque séjour avec linge de maison premium fourni.",
    },
    {
      icon: Camera,
      title: "Photographie Professionnelle",
      description: "Mise en valeur de votre bien avec des photos HDR pour maximiser les réservations.",
    },
    {
      icon: TrendingUp,
      title: "Optimisation des Prix",
      description: "Tarification dynamique basée sur la demande pour maximiser vos revenus.",
    },
    {
      icon: Clock,
      title: "Disponibilité 24/7",
      description: "Support réactif pour vous et vos voyageurs à tout moment.",
    },
    {
      icon: Shield,
      title: "Gestion des Litiges",
      description: "Prise en charge complète des réclamations et de la relation client.",
    },
  ];

  const pricingPlans = [
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
  ];

  return (
    <>
      <Helmet>
        <title>Conciergerie Haut de Gamme à Avignon | Chevalier Conciergerie</title>
        <meta 
          name="description" 
          content="Service de conciergerie premium pour locations saisonnières à Avignon. Accueil voyageurs, ménage professionnel, gestion complète." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                src={serviceConciergerie} 
                alt="Service conciergerie"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 container mx-auto px-6">
              <div className="max-w-3xl">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Conciergerie</span>
                <h1 className="font-serif text-4xl md:text-6xl font-semibold text-primary-foreground mt-4 mb-6">
                  Un Service<br />
                  <span className="text-gold">5 Étoiles</span>
                </h1>
                <p className="font-sans text-xl text-primary-foreground/80 mb-8 max-w-2xl">
                  Déléguez la gestion de votre location saisonnière à des experts. 
                  Nous offrons une expérience premium à vos voyageurs tout en maximisant vos revenus.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="gold" size="xl" asChild>
                    <Link to="/contact">Demander un devis</Link>
                  </Button>
                  <Button variant="outline-light" size="xl" asChild>
                    <a href="#tarifs">Voir les tarifs</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section id="services" className="py-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Nos Services</span>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
                  Une Gestion Complète
                </h2>
                <p className="font-sans text-muted-foreground text-lg">
                  De l'accueil de vos voyageurs à l'entretien de votre bien, nous prenons tout en charge.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="group p-8 rounded-2xl bg-card shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="tarifs" className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Tarifs</span>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
                  Nos Formules Conciergerie
                </h2>
                <p className="font-sans text-muted-foreground text-lg">
                  Des tarifs transparents basés sur vos revenus locatifs.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl p-8 transition-all duration-300 ${
                      plan.featured
                        ? "bg-primary shadow-medium scale-105"
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
                            <Check className={`w-3 h-3 text-gold`} />
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
                      asChild
                    >
                      <Link to="/contact">Choisir cette formule</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Prêt à déléguer votre gestion ?
              </h2>
              <p className="font-sans text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Contactez-nous pour une estimation gratuite de vos revenus potentiels.
              </p>
              <Button variant="gold" size="xl" asChild>
                <Link to="/contact">Prendre rendez-vous</Link>
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Conciergerie;
