import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, X, Sparkles, Users, Clock, Camera, TrendingUp, Home, Euro, ArrowRight, Calendar, Wallet } from "lucide-react";
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

          {/* Simulation Section - Storytelling immersif */}
          <section className="py-24 bg-background overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="container mx-auto px-6 relative">
              <div className="max-w-6xl mx-auto">
                
                {/* Header avec approche narrative */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
                  <div className="lg:max-w-xl">
                    <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">En pratique</span>
                    <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4">
                      Votre Bien Travaille<br />
                      <span className="text-gold">Pendant Vos Vacances</span>
                    </h2>
                  </div>
                  <p className="font-sans text-muted-foreground text-lg lg:max-w-md lg:text-right">
                    Un exemple concret pour comprendre comment votre investissement se transforme en revenus.
                  </p>
                </div>

                {/* Story Layout - Asymétrique et moderne */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  
                  {/* Colonne gauche - Le contexte */}
                  <div className="lg:col-span-5 space-y-8">
                    {/* La propriété */}
                    <div className="relative">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-gold/50 to-transparent rounded-full" />
                      <div className="pl-8">
                        <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-1.5 mb-4">
                          <Home className="w-4 h-4 text-gold" />
                          <span className="font-sans text-xs font-medium text-gold uppercase tracking-wider">Le bien</span>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                          Studio · Centre Avignon
                        </h3>
                        <p className="font-sans text-muted-foreground leading-relaxed">
                          30m² idéalement situé à 5 minutes du Palais des Papes.
                        </p>
                      </div>
                    </div>

                    {/* La situation */}
                    <div className="relative">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gold/50 via-gold/30 to-transparent rounded-full" />
                      <div className="pl-8">
                        <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-sans text-xs font-medium text-primary uppercase tracking-wider">La période</span>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                          10 jours en juillet
                        </h3>
                        <p className="font-sans text-muted-foreground leading-relaxed">
                          Période du Festival d'Avignon. Forte demande touristique, tarifs optimisés.
                        </p>
                      </div>
                    </div>

                    {/* L'équation visuelle */}
                    <div className="bg-card rounded-3xl p-6 shadow-soft border border-border/50 mt-8">
                      <div className="text-center mb-6">
                        <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">Formule Essentiel</span>
                      </div>
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-center">
                          <p className="font-serif text-3xl font-bold text-foreground">110€</p>
                          <p className="font-sans text-xs text-muted-foreground mt-1">/nuit</p>
                        </div>
                        <X className="w-5 h-5 text-muted-foreground/30" />
                        <div className="text-center">
                          <p className="font-serif text-3xl font-bold text-foreground">9</p>
                          <p className="font-sans text-xs text-muted-foreground mt-1">nuits</p>
                        </div>
                        <span className="font-serif text-2xl text-muted-foreground/50">=</span>
                        <div className="text-center">
                          <p className="font-serif text-3xl font-bold text-gold">990€</p>
                          <p className="font-sans text-xs text-muted-foreground mt-1">brut</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Colonne droite - Le résultat spectaculaire */}
                  <div className="lg:col-span-7">
                    <div className="relative h-full">
                      {/* Glow effect */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 via-primary/10 to-transparent rounded-[2.5rem] blur-2xl" />
                      
                      {/* Main card */}
                      <div className="relative bg-primary rounded-3xl p-8 md:p-10 h-full overflow-hidden">
                        {/* Pattern décoratif */}
                        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
                            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
                            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
                          </svg>
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center">
                              <Wallet className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                              <p className="font-sans text-xs tracking-widest uppercase text-primary-foreground/60">Votre gain net</p>
                              <p className="font-sans text-sm text-primary-foreground/80">Après commission de 20%</p>
                            </div>
                          </div>

                          {/* Le montant principal - Impact visuel fort */}
                          <div className="mb-10">
                            <div className="flex items-baseline gap-2">
                              <span className="font-serif text-7xl md:text-8xl font-bold text-gold tracking-tight">792</span>
                              <div className="flex flex-col">
                                <span className="font-serif text-3xl md:text-4xl font-bold text-gold">€</span>
                                <span className="font-sans text-sm text-primary-foreground/50">net</span>
                              </div>
                            </div>
                            <p className="font-sans text-primary-foreground/70 mt-4">
                              Pour <span className="text-primary-foreground font-medium">10 jours d'absence</span>, sans aucun effort de votre part.
                            </p>
                          </div>

                          {/* Détail transparent */}
                          <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-primary-foreground/5 rounded-xl p-4">
                              <p className="font-sans text-xs text-primary-foreground/50 mb-1">Commission</p>
                              <p className="font-sans text-lg font-medium text-primary-foreground">198€ <span className="text-xs text-primary-foreground/50">HT</span></p>
                            </div>
                            <div className="bg-primary-foreground/5 rounded-xl p-4">
                              <p className="font-sans text-xs text-primary-foreground/50 mb-1">Ménage</p>
                              <p className="font-sans text-lg font-medium text-primary-foreground">34€ <span className="text-xs text-primary-foreground/50">payé par voyageur</span></p>
                            </div>
                          </div>

                          {/* CTA intégré */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild className="flex-1">
                              <Link to="/contact" className="flex items-center justify-center gap-2">
                                Estimer mon bien
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button variant="outline-light" size="lg" asChild>
                              <a href="#tarifs">Voir les formules</a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bénéfices en bas - Style éditorial */}
                <div className="mt-16 pt-16 border-t border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-4">
                        <Clock className="w-5 h-5 text-gold" />
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-foreground mb-2">Zéro contrainte</h4>
                      <p className="font-sans text-sm text-muted-foreground">Nous gérons tout de A à Z pendant votre absence.</p>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-4">
                        <Sparkles className="w-5 h-5 text-gold" />
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-foreground mb-2">Bien impeccable</h4>
                      <p className="font-sans text-sm text-muted-foreground">Retrouvez votre logement parfaitement nettoyé.</p>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-4">
                        <TrendingUp className="w-5 h-5 text-gold" />
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-foreground mb-2">Revenus optimisés</h4>
                      <p className="font-sans text-sm text-muted-foreground">Tarification dynamique selon la demande.</p>
                    </div>
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
