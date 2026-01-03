import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, X, Sparkles, Users, Clock, Camera, TrendingUp, Home, Euro, ArrowRight, Calculator } from "lucide-react";
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
  ];

  // Features ordonnées logiquement : Avant location → Pendant → Après → Extras Premium
  const gestionFeatures = [
    // Avant la location
    { name: "Rencontre & visite du bien", included: true },
    { name: "Création et gestion de l'annonce", included: true },
    { name: "Optimisation annonce et prix", included: true },
    { name: "Photos professionnelles", included: false },
    // Gestion des réservations
    { name: "Gestion des messages", included: true },
    { name: "Gestion des réservations", included: true },
    { name: "Rédaction du contrat de location", included: true },
    // Pendant le séjour
    { name: "Check-in / Check-out", included: true },
    { name: "Automatisation boîte à clés", included: true },
    { name: "Gestion des consommables", included: true },
    { name: "Pack de bienvenue voyageurs", included: false },
    { name: "Infos touristiques personnalisées", included: false },
    // Après le séjour
    { name: "Ménage professionnel", included: true },
    // Protection
    { name: "Assurance dommages voyageurs", included: false },
  ];

  const premiumFeatures = [
    // Avant la location
    { name: "Rencontre & visite du bien", included: true },
    { name: "Création et gestion de l'annonce", included: true },
    { name: "Optimisation annonce et prix", included: true },
    { name: "Photos professionnelles", included: true },
    // Gestion des réservations
    { name: "Gestion des messages", included: true },
    { name: "Gestion des réservations", included: true },
    { name: "Rédaction du contrat de location", included: true },
    // Pendant le séjour
    { name: "Check-in / Check-out", included: true },
    { name: "Automatisation boîte à clés", included: true },
    { name: "Gestion des consommables", included: true },
    { name: "Pack de bienvenue voyageurs", included: true },
    { name: "Infos touristiques personnalisées", included: true },
    // Après le séjour
    { name: "Ménage professionnel", included: true },
    // Protection
    { name: "Assurance dommages voyageurs", included: true },
  ];

  const pricingPlans = [
    {
      name: "Essentiel",
      description: "Pour les propriétaires souhaitant déléguer l'essentiel",
      price: "20%",
      priceNote: "des revenus locatifs",
      featured: false,
      features: gestionFeatures,
    },
    {
      name: "Premium",
      description: "L'expérience complète haut de gamme",
      price: "25%",
      priceNote: "des revenus locatifs",
      featured: true,
      features: premiumFeatures,
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
                    <Link to="/contact">Prendre rendez-vous</Link>
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
                          Premium
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

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-start gap-3">
                          {feature.included ? (
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              plan.featured ? "bg-gold/20" : "bg-secondary"
                            }`}>
                              <Check className="w-3 h-3 text-gold" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-muted/50">
                              <X className="w-3 h-3 text-muted-foreground/50" />
                            </div>
                          )}
                          <span className={`font-sans text-sm ${
                            feature.included
                              ? plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"
                              : "text-muted-foreground/50 line-through"
                          }`}>
                            {feature.name}
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

          {/* Simulation Section - Exemple concret */}
          <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Simulation</span>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
                  Combien Allez-Vous Gagner ?
                </h2>
                <p className="font-sans text-muted-foreground text-lg">
                  Découvrez un exemple concret de revenus avec notre formule Essentiel.
                </p>
              </div>

              <div className="max-w-5xl mx-auto">
                {/* Contexte du propriétaire */}
                <div className="relative mb-12">
                  <div className="bg-gradient-to-br from-primary/5 to-gold/5 rounded-3xl p-8 md:p-10 border border-gold/10">
                    <div className="flex items-start gap-6">
                      <div className="hidden md:flex w-16 h-16 rounded-2xl bg-gradient-gold items-center justify-center flex-shrink-0">
                        <Home className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                          Le cas de Marie
                        </h3>
                        <p className="font-sans text-muted-foreground leading-relaxed">
                          Marie possède un <span className="text-foreground font-medium">appartement de 55m² en centre-ville d'Avignon</span>. 
                          Elle part en vacances pendant <span className="text-foreground font-medium">10 jours</span> et souhaite rentabiliser 
                          son logement pendant son absence, sans aucun stress.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline de calcul */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {/* Étape 1 - Revenus bruts */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-gold/0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-card rounded-2xl p-6 shadow-soft h-full border border-border/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                          <Calculator className="w-5 h-5 text-gold" />
                        </div>
                        <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">Étape 1</span>
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-foreground mb-4">Revenus Locatifs</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm text-muted-foreground">Prix par nuit</span>
                          <span className="font-sans text-sm font-medium text-foreground">85 €</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm text-muted-foreground">Nombre de nuits</span>
                          <span className="font-sans text-sm font-medium text-foreground">9 nuitées</span>
                        </div>
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm font-medium text-foreground">Total brut</span>
                          <span className="font-serif text-xl font-bold text-gold">765 €</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Étape 2 - Commission */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-gold/0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-card rounded-2xl p-6 shadow-soft h-full border border-border/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                          <Euro className="w-5 h-5 text-gold" />
                        </div>
                        <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">Étape 2</span>
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-foreground mb-4">Notre Commission</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm text-muted-foreground">Commission (20%)</span>
                          <span className="font-sans text-sm font-medium text-foreground">153 € HT</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm text-muted-foreground">TVA (20%)</span>
                          <span className="font-sans text-sm font-medium text-foreground">30,60 €</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm text-muted-foreground">Ménage*</span>
                          <span className="font-sans text-sm font-medium text-foreground">45 €</span>
                        </div>
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm font-medium text-foreground">Total services</span>
                          <span className="font-serif text-xl font-bold text-primary">228,60 €</span>
                        </div>
                      </div>
                      <p className="font-sans text-xs text-muted-foreground mt-4">*Payé par le voyageur</p>
                    </div>
                  </div>

                  {/* Étape 3 - Résultat */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold/40 to-gold/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-primary rounded-2xl p-6 shadow-medium h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-gold" />
                        </div>
                        <span className="font-sans text-xs tracking-widest uppercase text-primary-foreground/60">Résultat</span>
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-primary-foreground mb-4">Gain Net de Marie</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm text-primary-foreground/70">Revenus bruts</span>
                          <span className="font-sans text-sm font-medium text-primary-foreground">765 €</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm text-primary-foreground/70">Commission TTC</span>
                          <span className="font-sans text-sm font-medium text-primary-foreground">-183,60 €</span>
                        </div>
                        <div className="h-px bg-primary-foreground/20 my-2" />
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm font-medium text-primary-foreground">Revenu net</span>
                          <span className="font-serif text-3xl font-bold text-gold">581,40 €</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="bg-gradient-to-r from-gold/10 via-gold/5 to-transparent rounded-3xl p-8 md:p-10 border border-gold/20">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                      <p className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-2">
                        Marie gagne <span className="text-gold">581,40 €</span> en 10 jours
                      </p>
                      <p className="font-sans text-muted-foreground">
                        Sans lever le petit doigt. Elle retrouve son appartement impeccable à son retour.
                      </p>
                    </div>
                    <Button variant="gold" size="xl" asChild className="flex-shrink-0">
                      <Link to="/contact" className="flex items-center gap-2">
                        Estimer mes revenus
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-secondary">
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
