import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import heroConciergerie from "@/assets/hero-conciergerie.jpg";
import { Check, X, Sparkles, Users, Clock, Camera, TrendingUp, Home, ArrowRight, Calendar, Wallet, Handshake, FileEdit, Package, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqItems = [
  {
    q: "Quelle est votre commission ?",
    a: "Notre commission est personnalisée : elle dépend du logement, de son emplacement et des services choisis. Nous la définissons ensemble lors d'une estimation gratuite et sans engagement, et tout est précisé clairement dans le mandat avant de démarrer. Aucun frais caché.",
  },
  {
    q: "La taxe de séjour est-elle comprise dans vos honoraires ?",
    a: "Non. La taxe de séjour est collectée auprès des voyageurs pour le compte de la collectivité et reversée intégralement : elle n'est jamais comptée comme un revenu ni dans notre commission.",
  },
  {
    q: "Que comprend exactement la prestation de conciergerie ?",
    a: "Création et optimisation de vos annonces, gestion des réservations et des voyageurs, accueil, ménage professionnel, linge hôtelier, maintenance courante et suivi de vos revenus. Vous n'avez rien à gérer.",
  },
  {
    q: "Dans quelles zones intervenez-vous ?",
    a: "Principalement à Avignon, Villeneuve-lès-Avignon, Les Angles et leurs environs immédiats. Contactez-nous pour vérifier que votre bien est dans notre zone.",
  },
  {
    q: "Comment et quand suis-je payé ?",
    a: "Vous recevez vos revenus selon la périodicité convenue dans le mandat, accompagnés d'un reporting clair détaillant les réservations, les frais et le montant qui vous revient.",
  },
  {
    q: "Dois-je m'engager sur une longue durée ?",
    a: "Le mandat précise la durée et les conditions de résiliation, avec un préavis raisonnable. Les réservations déjà confirmées au moment d'un arrêt sont menées à leur terme.",
  },
  {
    q: "Faut-il une autorisation pour louer en courte durée à Avignon ?",
    a: "Depuis le 1er janvier 2026, tout meublé de tourisme à Avignon doit être déclaré et enregistré, sans exception. S'y ajoute une autorisation temporaire de changement d'usage pour tout logement qui n'est pas une résidence principale, sur l'ensemble du territoire communal et pour les particuliers comme pour les sociétés. Les deux démarches passent par la plateforme changementdusage.fr/avignon. Nous vous orientons et constituons le dossier.",
  },
  {
    q: "Combien de jours puis-je louer ma résidence principale à Avignon ?",
    a: "90 jours par année civile, et non 120. Avignon a abaissé le plafond national par délibération du 22 février 2025, une faculté que le Code du tourisme laisse aux communes. En contrepartie, une résidence principale n'est pas soumise à l'autorisation de changement d'usage. Les règles évoluant, vérifiez votre situation auprès de la mairie.",
  },
  {
    q: "Villeneuve-lès-Avignon et Les Angles suivent-elles les mêmes règles ?",
    a: "Non. Le régime d'enregistrement et de changement d'usage décrit ici est propre à la commune d'Avignon. Villeneuve-lès-Avignon et Les Angles, situées dans le Gard, relèvent de dispositifs distincts. Nous vérifions le cadre applicable à votre bien avant toute mise en ligne.",
  },
];

const Conciergerie = () => {
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
          content="Conciergerie Airbnb à Avignon et Villeneuve-lès-Avignon : accueil voyageurs, ménage, linge, annonces, tarification. Commission sur-mesure, sans engagement. Estimation gratuite sous 24 h."
        />
        <meta name="keywords" content="conciergerie Airbnb Avignon, gestion location saisonnière Avignon, accueil voyageurs Avignon, ménage Airbnb Avignon" />
        <meta property="og:title" content="Conciergerie Airbnb Avignon | Gestion Location Saisonnière" />
        <meta property="og:description" content="Conciergerie Airbnb à Avignon : gestion complète de votre location saisonnière, commission sur-mesure." />
        <link rel="canonical" href="https://chevalier-conciergerie.com/conciergerie" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src={heroConciergerie} 
                alt="Villa provençale en pierre de travertin" 
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            {/* Voile pour tenir le contraste quelle que soit la zone de la photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />

            <div className="relative z-10 container mx-auto px-6">
              {/*
                Composition asymétrique : un rail vertical à gauche, le texte décalé.
                L'ancienne version empilait sur-titre, titre et paragraphe centrés dans
                un bloc — la structure par défaut de n'importe quel template.
              */}
              {/*
                Ni sur-titre en capitales pointées, ni rail numéroté, ni filet doré :
                ce sont les tics qui font reconnaître une page générée. Le titre porte
                seul, et l'ancrage local passe par un fait vérifiable plutôt que par
                le mot « luxe ».
              */}
              <div className="max-w-4xl">
                {/*
                  « à Avignon » ajouté dans le <h1> : la phrase ne contenait aucun mot
                  que Google puisse rattacher à une recherche. La ville s'y glisse sans
                  rien coûter à la formule.
                */}
                <h1 className="font-serif text-5xl font-light leading-[0.92] tracking-[0.01em] text-primary-foreground md:text-7xl lg:text-[5.5rem]">
                  Nous tenons vos
                  <br />
                  appartements
                  <br />
                  à Avignon,
                  <br />
                  <span className="italic">intra-muros.</span>
                </h1>

                <p className="mt-10 max-w-lg font-sans text-lg font-light leading-relaxed text-primary-foreground/70">
                  Accueil des voyageurs, ménage, linge, annonces, tarification. Neuf
                  appartements à Avignon, Villeneuve-lès-Avignon et Les Angles. Vous n'y
                  touchez plus.
                </p>

                <div className="mt-12 flex flex-col gap-3 sm:flex-row">
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

          {/* Pricing Section - Modern Editorial */}
          <section id="tarifs" className="py-16 md:py-28 bg-background">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 md:mb-20">

                  <span className="font-sans text-xs md:text-xs tracking-[0.2em] uppercase text-muted-foreground">Notre Offre</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-6 tracking-wide">
                    Service Intégral
                  </h2>
                </div>

                {/* Main layout: price + features side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-medium border border-border/30">
                  
                  {/* Left: Price highlight */}
                  <div className="lg:col-span-2 bg-primary p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border border-gold/10" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border border-gold/10" />
                    
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 bg-gold/15 rounded-full px-4 py-1.5 mb-8">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span className="font-sans text-xs font-medium text-gold uppercase tracking-widest">Formule complète</span>
                      </div>

                      <div className="mb-6">
                        <span className="font-serif text-5xl md:text-6xl font-bold text-gold leading-none block">
                          Sur-mesure
                        </span>
                        <p className="font-sans text-sm text-primary-foreground/60 mt-3 tracking-wide">
                          Commission adaptée à chaque bien
                        </p>
                      </div>


                      <p className="font-sans text-primary-foreground/70 text-sm leading-relaxed mb-8">
                        Gestion complète de votre bien, de A à Z. Aucun frais caché, aucun engagement.
                      </p>

                      <div className="bg-primary-foreground/5 rounded-xl p-4 flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                        <p className="font-sans text-xs text-primary-foreground/70">
                          <span className="text-gold font-medium">Ménage professionnel</span> — payé par le voyageur
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 mt-8">
                      <Button variant="gold" size="lg" asChild className="w-full">
                        <Link to="/contact" className="flex items-center justify-center gap-2">
                          Choisir cette formule
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right: Features list */}
                  <div className="lg:col-span-3 bg-card p-8 md:p-12">
                    <p className="font-sans text-xs md:text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8">
                      Tout est inclus
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                      {includedFeatures.map((feature) => (
                        <div 
                          key={feature} 
                          className="flex items-center gap-3 py-3.5 border-b border-border/50 last:border-b-0"
                        >
                          <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-gold" />
                          </div>
                          <span className="font-sans text-sm text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Button variant="outline" size="lg" asChild>
                        <a href="tel:+33783198341" className="flex items-center gap-2">
                          Nous appeler
                        </a>
                      </Button>
                      <p className="font-sans text-xs text-muted-foreground">
                        Estimation gratuite sous 24h
                      </p>
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
                    <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">En pratique</span>
                    <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4">
                      Votre Bien Travaille<br />
                      <span className="text-gold">Pendant Vos Vacances</span>
                    </h2>
                  </div>
                  <p className="font-sans text-muted-foreground text-lg lg:max-w-md lg:text-right">
                    Un exemple concret pour comprendre comment votre investissement se transforme en revenus.
                  </p>
                </div>

                {/* Story Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  
                  {/* Colonne gauche - Le contexte */}
                  <div className="lg:col-span-5 space-y-8">
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

                  {/* Colonne droite - Le résultat */}
                  <div className="lg:col-span-7">
                    <div className="relative h-full">
                      <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 via-primary/10 to-transparent rounded-[2.5rem] blur-2xl" />
                      
                      <div className="relative bg-primary rounded-3xl p-8 md:p-10 h-full overflow-hidden">
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
                              <p className="font-sans text-sm text-primary-foreground/80">Après commission Airbnb et notre service</p>
                            </div>
                          </div>

                          <div className="mb-10">
                            <div className="flex items-baseline gap-2">
                              <span className="font-serif text-7xl md:text-8xl font-bold text-gold tracking-tight">673</span>
                              <div className="flex flex-col">
                                <span className="font-serif text-3xl md:text-4xl font-bold text-gold">€</span>
                                <span className="font-sans text-sm text-primary-foreground/50">net</span>
                              </div>
                            </div>
                            <p className="font-sans text-primary-foreground/70 mt-4">
                              Pour <span className="text-primary-foreground font-medium">10 jours d'absence</span>, sans aucun effort de votre part.
                            </p>
                          </div>

                          <div className="space-y-3 mb-8">
                            <div className="bg-primary-foreground/5 rounded-xl p-4 flex justify-between items-center">
                              <p className="font-sans text-sm text-primary-foreground/70">Revenus bruts</p>
                              <p className="font-sans text-lg font-medium text-primary-foreground">990€</p>
                            </div>
                            <div className="bg-primary-foreground/5 rounded-xl p-4 flex justify-between items-center">
                              <p className="font-sans text-sm text-primary-foreground/70">Commission Airbnb (15%)</p>
                              <p className="font-sans text-lg font-medium text-primary-foreground">-149€</p>
                            </div>
                            {/*
                              Le pourcentage était calculable mais jamais écrit. Un
                              propriétaire qui compare deux conciergeries cherche ce
                              chiffre : le lui faire déduire d'une soustraction le fait
                              partir chez celui qui l'affiche.
                            */}
                            <div className="bg-primary-foreground/5 rounded-xl p-4 flex justify-between items-center">
                              <p className="font-sans text-sm text-primary-foreground/70">
                                Notre commission (exemple)
                                <span className="block text-xs text-primary-foreground/50">soit environ 17 % du brut</span>
                              </p>
                              <p className="font-sans text-lg font-medium text-primary-foreground">-168€</p>
                            </div>
                            <div className="bg-gold/20 rounded-xl p-4 flex justify-between items-center">
                              <p className="font-sans text-sm font-medium text-gold">Vous recevez</p>
                              <p className="font-serif text-xl font-bold text-gold">673€</p>
                            </div>
                          </div>

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

                {/* Bénéfices en bas */}
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

          {/*
            Cadre réglementaire. Composition asymétrique, pas de sur-titre espacé ni de
            grille de cartes centrée : le contenu porte seul. Les chiffres proviennent de
            la délibération du conseil municipal d'Avignon du 22 février 2025 et des
            informations publiées par la ville — des faits vérifiables plutôt que des
            adjectifs, et un sujet qu'aucun concurrent local ne documente.
          */}
          <section className="py-20 bg-secondary">
            <div className="container mx-auto px-6">
              <div className="grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-foreground">
                    Ce qui a changé à Avignon
                    <br />
                    au 1<sup>er</sup> janvier 2026
                  </h2>
                  <p className="mt-6 font-sans text-muted-foreground leading-relaxed">
                    La ville a instauré un régime d'autorisation de changement d'usage et
                    rendu l'enregistrement obligatoire pour tout meublé de tourisme. Elle
                    motive la décision par ses propres chiffres : près de 4 300 logements
                    en location saisonnière en 2023, dont 2 400 en intra-muros, soit un
                    doublement en huit ans.
                  </p>
                  <p className="mt-4 font-sans text-muted-foreground leading-relaxed">
                    Nous vérifions ce qui s'applique à votre bien et constituons le
                    dossier avant toute mise en ligne.{" "}
                    <Link
                      to="/journal/declarer-location-saisonniere-avignon"
                      className="text-gold-ink underline underline-offset-4 hover:no-underline"
                    >
                      Le détail des trois démarches
                    </Link>
                    .
                  </p>
                </div>

                <dl className="space-y-8">
                  <div className="border-t border-border pt-5">
                    <dt className="font-serif text-xl text-foreground">Enregistrement</dt>
                    <dd className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                      Obligatoire pour tout meublé de tourisme, sans exception. Le numéro
                      doit figurer sur chaque annonce : les plateformes le contrôlent et
                      retirent celles qui n'en ont pas, y compris en pleine saison.
                    </dd>
                  </div>
                  <div className="border-t border-border pt-5">
                    <dt className="font-serif text-xl text-foreground">Changement d'usage</dt>
                    <dd className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                      Une autorisation temporaire est requise pour tout logement qui n'est
                      pas une résidence principale, sur l'ensemble du territoire communal.
                      Le régime vise les particuliers comme les sociétés.
                    </dd>
                  </div>
                  <div className="border-t border-border pt-5">
                    <dt className="font-serif text-xl text-foreground">90 jours</dt>
                    <dd className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                      Le plafond annuel de location d'une résidence principale, abaissé de
                      120 à 90 jours par la ville. Si vous raisonniez encore sur 120,
                      vous avez un mois de moins que prévu.
                    </dd>
                  </div>
                  <div className="border-t border-border pt-5">
                    <dt className="font-serif text-xl text-foreground">Taxe de séjour</dt>
                    <dd className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                      Collectée auprès du voyageur, reversée à la ville avant le 15 janvier
                      de l'année suivante. Ce n'est jamais un revenu : la compter comme tel
                      fausse votre rentabilité et votre déclaration.
                    </dd>
                  </div>
                </dl>
              </div>

              <p className="mt-12 max-w-3xl font-sans text-xs leading-relaxed text-muted-foreground/70">
                Ces règles varient d'une commune à l'autre et évoluent :{" "}
                <Link to="/conciergerie-villeneuve-les-avignon" className="underline underline-offset-2">
                  Villeneuve-lès-Avignon
                </Link>{" "}
                et{" "}
                <Link to="/conciergerie-les-angles" className="underline underline-offset-2">
                  Les Angles
                </Link>{" "}
                relèvent de dispositifs distincts. Pour une situation précise, rapprochez-vous
                de votre mairie.
              </p>
            </div>
          </section>

          {/* Avis clients — les mêmes que sur l'accueil, nommés et publics */}
          <TestimonialsCarousel />

          {/* FAQ */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="font-sans text-xs md:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Questions fréquentes
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-4">
                  Vos questions sur la conciergerie
                </h2>
              </div>

              <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border-border">
                    <AccordionTrigger className="text-left font-serif text-base md:text-lg text-foreground hover:text-gold hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
