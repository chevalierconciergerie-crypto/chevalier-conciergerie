import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Banknote, Shield, Clock, TrendingUp, FileCheck, Home, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroSouslocation from "@/assets/hero-souslocation-realistic.jpg";
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
      answer: "Pas forcément. On peut récupérer votre bien vide et l'équiper de A à Z. Le but est d'offrir un logement clé en main, équipé et entretenu aux standards hôteliers.",
    },
    {
      question: "Qui s'occupe des démarches obligatoires à Avignon ?",
      answer: "Nous. Depuis le 1er janvier 2026, tout meublé de tourisme à Avignon doit être déclaré et enregistré, et une autorisation temporaire de changement d'usage s'ajoute pour tout logement qui n'est pas une résidence principale — le régime vise explicitement les personnes morales, donc nous. C'est la différence concrète avec la conciergerie : en sous-location, ces démarches ne reposent plus sur vous.",
    },
    {
      question: "Le plafond de 90 jours par an s'applique-t-il à mon bien ?",
      answer: "Non. Ce plafond, abaissé de 120 à 90 jours par Avignon en février 2025, ne concerne que la résidence principale de celui qui loue. Un bien confié en sous-location n'est pas votre résidence principale : il n'a pas de limite de nuitées, mais il entre dans le champ de l'autorisation de changement d'usage.",
    },
    {
      question: "Puis-je confier un bien dont je suis moi-même locataire ?",
      answer: "Uniquement avec l'accord écrit de votre propriétaire. Sous-louer sans cet accord expose à la résiliation de votre bail. Si vous êtes dans ce cas, dites-le-nous d'emblée : nous vérifions ce que votre contrat autorise avant d'aller plus loin.",
    },
    {
      question: "Conciergerie ou sous-location : laquelle choisir ?",
      answer: "La conciergerie vous laisse propriétaire exploitant : vos revenus varient avec l'occupation et vous nous versez une commission. La sous-location vous verse un loyer fixe quelle que soit l'occupation, et nous portons le risque. La première rapporte davantage sur une bonne saison, la seconde ne dépend pas de la saison. Nous détaillons la comparaison chiffrée dans notre article sur le choix entre les deux formules.",
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
        <link rel="canonical" href="https://chevalier-conciergerie.com/sous-location" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src={heroSouslocation} 
                alt="Maison provençale authentique avec volets bleus" 
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            <div className="relative z-10 container mx-auto px-6">
              <div className="max-w-3xl">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">Sous-Location Professionnelle</span>
                {/* « à Avignon » ajouté : le <h1> ne portait aucun ancrage local. */}
                <h1 className="font-serif text-4xl md:text-6xl font-semibold text-primary-foreground mt-4 mb-6">
                  Un Loyer <span className="text-gold">Garanti</span><br />
                  à Avignon
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
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">Avantages</span>
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
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">Fonctionnement</span>
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
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">Comparaison</span>
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

          {/*
            Tarifs. La page décrivait la formule sans jamais dire ce qu'elle
            coûte, alors que la réponse est justement l'argument : rien. Le
            propriétaire qui compare les deux formules a besoin de voir le
            20 % de la conciergerie face au 0 % d'ici pour comprendre l'échange
            — il renonce au potentiel des hautes saisons contre la certitude
            d'un montant tous les mois.
          */}
          <section id="tarifs" className="py-16 md:py-24 bg-primary">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-primary-foreground/50">
                  Tarifs
                </span>
                <p className="font-serif text-6xl md:text-8xl font-light text-primary-foreground leading-none mt-6">
                  0 %
                </p>
                <p className="font-sans text-sm md:text-base text-primary-foreground/60 mt-4">
                  aucune commission, aucun frais de gestion
                </p>

                <p className="font-sans text-sm md:text-base text-primary-foreground/75 leading-relaxed mt-10 max-w-xl mx-auto">
                  Vous ne nous payez rien. Nous louons votre bien à notre nom et vous
                  versons le même loyer chaque mois — saison creuse comprise. Nos revenus
                  viennent de l'exploitation, pas de votre poche.
                </p>

                <p className="font-sans text-sm text-primary-foreground/55 leading-relaxed mt-6 max-w-xl mx-auto">
                  Le montant dépend du logement, du quartier et de la durée du bail.
                  Il est fixé avant signature et ne bouge plus.
                </p>

                <div className="mt-12">
                  <Link
                    to="/estimation-sous-location"
                    className="btn-ressort group relative isolate inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-9 py-4 font-sans text-[15px] font-semibold tracking-wide text-[hsl(0_0%_8%)] md:text-base"
                  >
                    <span aria-hidden className="btn-brille" />
                    Connaître mon loyer garanti
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">Questions Fréquentes</span>
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
