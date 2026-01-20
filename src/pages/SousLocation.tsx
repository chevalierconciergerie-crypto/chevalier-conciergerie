import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroImageCarousel from "@/components/HeroImageCarousel";
import { Check, Banknote, Shield, Clock, TrendingUp, FileCheck, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import villeneuveChartreuse from "@/assets/villeneuve-chartreuse.jpg";
import villeneuveFort from "@/assets/villeneuve-fort.jpg";
import villeneuveJardin from "@/assets/villeneuve-jardin.jpg";
import palaisPapesPanorama from "@/assets/palais-papes-panorama.jpg";
const SousLocation = () => {
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
      description: "Nous évaluons votre bien et vous proposons un loyer garanti mensuel basé sur le potentiel locatif.",
    },
    {
      number: "02",
      title: "Signature du Bail",
      description: "Contrat de sous-location professionnel sécurisé et conforme à la législation française.",
    },
    {
      number: "03",
      title: "Mise en Location",
      description: "Nous préparons et photographions votre bien, créons les annonces sur toutes les plateformes.",
    },
    {
      number: "04",
      title: "Revenus Garantis",
      description: "Recevez votre loyer chaque mois par virement, sans exception ni retard.",
    },
  ];

  const included = [
    "Loyer fixe versé chaque mois",
    "Aucune vacance locative",
    "Gestion 100% déléguée",
    "Entretien régulier du bien",
    "État des lieux d'entrée et sortie",
    "Contrat juridiquement sécurisé",
    "Ménage professionnel",
    "Accueil des voyageurs",
    "Maintenance et petites réparations",
  ];

  const faqItems = [
    {
      question: "Quel est le concept ?",
      answer: "Nous devenons votre locataire principal. On loue votre bien à l'année pour y accueillir des voyageurs de passage. Vous touchez vos revenus, on gère l'exploitation.",
    },
    {
      question: "Est-ce autorisé ?",
      answer: "Oui. La pratique est totalement légale. Elle est encadrée par un contrat spécifique qui nous autorise à sous-louer votre logement en toute transparence.",
    },
    {
      question: "Qui assure la gestion ?",
      answer: "Nous gérons tout de A à Z. Ménage professionnel, maintenance et accueil des occupants. Vous n'avez plus aucune contrainte opérationnelle, on est votre unique interlocuteur.",
    },
    {
      question: "Le logement doit-il être meublé ?",
      answer: "Pas forcément. On peut récupérer votre bien vide et l'équiper de A à Z. Le but est d'offrir un logement clé en main et haut de gamme à nos clients.",
    },
  ];
  return (
    <>
      <Helmet>
        <title>Sous-location Avignon | Loyer Garanti & Zéro Vacance | Chevalier</title>
        <meta 
          name="description" 
          content="Sous-location professionnelle à Avignon avec loyer garanti chaque mois. Zéro vacance locative, zéro gestion. Estimation gratuite de votre bien." 
        />
        <meta name="keywords" content="sous-location Avignon, loyer garanti Avignon, gestion locative Avignon, location meublée Avignon" />
        <meta property="og:title" content="Sous-location Avignon | Loyer Garanti Chaque Mois" />
        <meta property="og:description" content="Sous-location professionnelle à Avignon. Loyer garanti, zéro vacance, zéro risque." />
        <link rel="canonical" href="https://chevalier-conciergerie.fr/sous-location" />
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
                  { src: villeneuveJardin, alt: "Jardins - Villeneuve-lès-Avignon" },
                ]}
                interval={6000}
              />
            </div>
            <div className="relative z-10 container mx-auto px-6">
              <div className="max-w-3xl">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Sous-Location Professionnelle</span>
                <h1 className="font-serif text-4xl md:text-6xl font-semibold text-primary-foreground mt-4 mb-6">
                  Un Loyer<br />
                  <span className="text-gold">Garanti</span>
                </h1>
                <p className="font-sans text-xl text-primary-foreground/80 mb-8 max-w-2xl">
                  Nous louons votre bien à notre nom et vous versons un loyer fixe chaque mois. 
                  Zéro risque, zéro vacance, zéro gestion.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="gold" size="xl" asChild>
                    <Link to="/estimation-sous-location">Obtenir mon estimation</Link>
                  </Button>
                  <Button variant="outline-light" size="xl" asChild>
                    <a href="#fonctionnement">Comment ça marche</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Advantages Section - Compact on mobile */}
          <section id="avantages" className="py-12 md:py-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Avantages</span>
                <h2 className="font-serif text-2xl md:text-5xl font-semibold text-foreground mt-3 md:mt-4 mb-4 md:mb-6">
                  Pourquoi la Sous-Location ?
                </h2>
                <p className="font-sans text-muted-foreground text-base md:text-lg">
                  Sécurisez vos revenus sans contrainte.
                </p>
              </div>

              {/* Mobile: Horizontal scroll / Desktop: Grid */}
              <div className="flex md:hidden gap-3 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide mb-8">
                {advantages.map((advantage) => (
                  <div
                    key={advantage.title}
                    className="flex-shrink-0 w-[200px] snap-start p-4 rounded-xl bg-card shadow-soft"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center mb-3">
                      <advantage.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-sm font-semibold text-foreground">
                      {advantage.title}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {advantages.map((advantage) => (
                  <div
                    key={advantage.title}
                    className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <advantage.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {advantage.title}
                    </h3>
                    <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* What's Included */}
              <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-soft p-8 md:p-12">
                <h3 className="font-serif text-2xl font-semibold text-foreground text-center mb-8">
                  Tout est inclus
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {included.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-gold" />
                      </div>
                      <span className="font-sans text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="fonctionnement" className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Fonctionnement</span>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
                  Comment ça Marche ?
                </h2>
                <p className="font-sans text-muted-foreground text-lg">
                  Un processus simple en 4 étapes pour commencer à percevoir vos revenus garantis.
                </p>
              </div>

              <div className="max-w-5xl mx-auto">
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
              </div>
            </div>
          </section>

          {/* Comparison Section */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Comparaison</span>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
                  Sous-Location vs Location Classique
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Traditional Rental */}
                <div className="p-8 rounded-2xl bg-card shadow-soft">
                  <div className="flex items-center gap-3 mb-6">
                    <Home className="w-8 h-8 text-muted-foreground" />
                    <h3 className="font-serif text-xl font-semibold text-foreground">Location Classique</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Recherche de locataires",
                      "Risque d'impayés",
                      "Vacance locative possible",
                      "Gestion des litiges",
                      "Entretien à votre charge",
                      "Revenus variables",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Our Service */}
                <div className="p-8 rounded-2xl bg-primary shadow-medium">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-8 h-8 text-gold" />
                    <h3 className="font-serif text-xl font-semibold text-primary-foreground">Sous-Location Pro</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Locataire unique : nous",
                      "Loyer 100% garanti",
                      "0% de vacance",
                      "Zéro litige pour vous",
                      "Entretien inclus",
                      "Revenus fixes et prévisibles",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-primary-foreground">
                        <Check className="w-5 h-5 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Questions Fréquentes</span>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
                  FAQ
                </h2>
                <p className="font-sans text-muted-foreground text-lg">
                  Tout ce que vous devez savoir sur notre service de sous-location.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                      <AccordionTrigger className="font-serif text-lg text-foreground hover:text-gold hover:no-underline py-6">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="font-sans text-muted-foreground text-base leading-relaxed pb-6">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-secondary">
            <div className="container mx-auto px-6 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Obtenez votre estimation gratuite
              </h2>
              <p className="font-sans text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Découvrez combien vous pourriez percevoir chaque mois avec notre service de sous-location.
              </p>
              <Button variant="gold" size="xl" asChild>
                <Link to="/estimation-sous-location">Estimer mon loyer garanti</Link>
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SousLocation;
