import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroImageCarousel from "@/components/HeroImageCarousel";
import { Check, X, Sparkles, Users, Clock, Camera, TrendingUp, Home, ArrowRight, Calendar, Wallet, Handshake, FileEdit, Package, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import villeneuveChartreuse from "@/assets/villeneuve-chartreuse.jpg";
import villeneuveFort from "@/assets/villeneuve-fort.jpg";
import palaisPapesPanorama from "@/assets/palais-papes-panorama.jpg";

const Conciergerie = () => {
  const services = [
    {
      icon: Handshake,
      title: "Rencontre & Visite du Bien",
      description: "Nous commençons par une rencontre personnalisée et une visite approfondie de votre propriété.",
    },
    {
      icon: FileEdit,
      title: "Création de l'Annonce",
      description: "Rédaction soignée et optimisée de votre annonce pour attirer les meilleurs voyageurs.",
    },
    {
      icon: Camera,
      title: "Photos Professionnelles",
      description: "Shooting HDR professionnel pour sublimer votre bien et maximiser les réservations.",
    },
    {
      icon: Palette,
      title: "Conseils Déco & Travaux",
      description: "Recommandations personnalisées pour optimiser l'attractivité et les revenus de votre bien.",
    },
    {
      icon: TrendingUp,
      title: "Optimisation Continue",
      description: "Tarification dynamique et ajustements réguliers pour maximiser votre taux d'occupation.",
    },
    {
      icon: Package,
      title: "Gestion des Consommables",
      description: "Approvisionnement en produits essentiels : café, thé, savons, papier toilette, etc.",
    },
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
      icon: Clock,
      title: "Disponibilité 24/7",
      description: "Support réactif pour vous et vos voyageurs à tout moment.",
    },
  ];

  // Features incluses dans l'offre unique
  const includedFeatures = [
    "Rencontre & visite du bien",
    "Création et gestion de l'annonce",
    "Optimisation annonce et prix",
    "Photos professionnelles",
    "Conseils déco & travaux",
    "Gestion des messages",
    "Gestion des réservations",
    "Rédaction du contrat de location",
    "Check-in / Check-out",
    "Automatisation boîte à clés",
    "Gestion des consommables",
    "Ménage professionnel",
  ];

  return (
    <>
      <Helmet>
        <title>Conciergerie Airbnb Avignon | Gestion Location Saisonnière | Chevalier</title>
        <meta 
          name="description" 
          content="Conciergerie Airbnb premium à Avignon et Villeneuve-lès-Avignon. Accueil voyageurs, ménage professionnel, gestion des annonces. À partir de 20%. Devis gratuit." 
        />
        <meta name="keywords" content="conciergerie Airbnb Avignon, gestion location saisonnière Avignon, accueil voyageurs Avignon, ménage Airbnb Avignon" />
        <meta property="og:title" content="Conciergerie Airbnb Avignon | Gestion Location Saisonnière" />
        <meta property="og:description" content="Service de conciergerie premium pour locations Airbnb à Avignon. Gestion complète de votre bien." />
        <link rel="canonical" href="https://chevalier-conciergerie.fr/conciergerie" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <HeroImageCarousel
                images={[
                  { src: palaisPapesPanorama, alt: "Palais des Papes - Avignon" },
                  { src: villeneuveFort, alt: "Fort Saint-André - Villeneuve-lès-Avignon" },
                  { src: villeneuveChartreuse, alt: "Chartreuse - Villeneuve-lès-Avignon" },
                ]}
                interval={6000}
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

          {/* Services Grid - Compact on mobile */}
          <section id="services" className="py-12 md:py-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Nos Services</span>
                <h2 className="font-serif text-2xl md:text-5xl font-semibold text-foreground mt-3 md:mt-4 mb-4 md:mb-6">
                  Une Gestion Complète
                </h2>
                <p className="font-sans text-muted-foreground text-base md:text-lg">
                  De l'accueil à l'entretien, nous prenons tout en charge.
                </p>
              </div>

              {/* Mobile: Compact horizontal scroll / Desktop: Grid */}
              <div className="flex md:hidden gap-3 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="flex-shrink-0 w-[200px] snap-start p-4 rounded-xl bg-card shadow-soft"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center mb-3">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-sm font-semibold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
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

          {/* Pricing Section - Single Offer */}
          <section id="tarifs" className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Notre Offre</span>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
                  Service Intégral
                </h2>
                <p className="font-sans text-muted-foreground text-lg">
                  Une formule tout-en-un pour une gestion sans stress.
                </p>
              </div>

              <div className="max-w-5xl mx-auto">
                <div className="bg-card rounded-3xl shadow-medium border border-gold/20 overflow-hidden">
                  {/* Header */}
                  <div className="bg-primary p-8 md:p-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span className="font-sans text-xs font-medium text-gold uppercase tracking-wider">Formule Complète</span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-primary-foreground mb-2">
                      Service Intégral
                    </h3>
                    <div className="flex items-baseline justify-center gap-1 mt-4">
                      <span className="font-serif text-6xl md:text-7xl font-bold text-gold">20</span>
                      <span className="font-serif text-2xl md:text-3xl font-bold text-gold">%</span>
                    </div>
                    <p className="font-sans text-sm text-primary-foreground/70 mt-2">
                      des revenus locatifs
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10">
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {includedFeatures.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <span className="font-sans text-sm text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Ménage info */}
                    <div className="bg-secondary rounded-xl p-4 mb-8 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-gold flex-shrink-0" />
                      <p className="font-sans text-sm text-muted-foreground">
                        <span className="text-gold font-medium">Ménage professionnel</span> — 40€ par séjour, payés par le voyageur
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="gold" size="xl" asChild>
                        <Link to="/contact" className="flex items-center justify-center gap-2">
                          Choisir cette formule
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="xl" asChild>
                        <a href="tel:+33783198341">Nous appeler</a>
                      </Button>
                    </div>
                  </div>
                </div>
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
                        <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">Service Intégral</span>
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
                              <p className="font-sans text-lg font-medium text-primary-foreground">40€ <span className="text-xs text-primary-foreground/50">payé par le voyageur</span></p>
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
