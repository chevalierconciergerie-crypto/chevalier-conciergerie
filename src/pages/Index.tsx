import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LocalExpertise from "@/components/LocalExpertise";
import PropertyListings from "@/components/PropertyListings";
import PlatformLogos from "@/components/PlatformLogos";
import FounderPresentation from "@/components/FounderPresentation";
import { ArrowRight, Home, Sparkles, Instagram, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import serviceConciergerie from "@/assets/service-conciergerie-luxury.jpg";
import serviceSousLocation from "@/assets/service-souslocation-luxury.jpg";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";


const Index = () => {
  return (
    <>
      <Helmet>
        <title>Conciergerie Avignon | Gestion Locative & Sous-location | Chevalier Conciergerie</title>
        <meta 
          name="description" 
          content="Conciergerie Airbnb à Avignon, Villeneuve-lès-Avignon et Les Angles. Gestion locative saisonnière haut de gamme et sous-location professionnelle avec loyer garanti. Devis gratuit." 
        />
        <meta name="keywords" content="conciergerie Avignon, gestion locative Avignon, Airbnb Avignon, location saisonnière Avignon, sous-location Avignon, conciergerie Villeneuve-lès-Avignon, gestion Airbnb" />
        <meta property="og:title" content="Conciergerie Avignon | Gestion Locative Saisonnière | Chevalier Conciergerie" />
        <meta property="og:description" content="Conciergerie Airbnb haut de gamme à Avignon. Gestion locative saisonnière et sous-location avec loyer garanti. Consultation gratuite." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="geo.region" content="FR-84" />
        <meta name="geo.placename" content="Avignon" />
        <link rel="canonical" href="https://chevalier-conciergerie.fr" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://chevalier-conciergerie.fr",
            "name": "Chevalier Conciergerie",
            "description": "Conciergerie Airbnb et gestion locative saisonnière haut de gamme à Avignon. Sous-location professionnelle avec loyer garanti.",
            "url": "https://chevalier-conciergerie.fr",
            "telephone": "+33783198341",
            "email": "chevalierconciergerie@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "5 Lotissement Les Cades",
              "addressLocality": "Villeneuve-lès-Avignon",
              "postalCode": "30400",
              "addressCountry": "FR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 43.9657,
              "longitude": 4.7956
            },
            "areaServed": [
              { "@type": "City", "name": "Avignon" },
              { "@type": "City", "name": "Villeneuve-lès-Avignon" },
              { "@type": "City", "name": "Aix-en-Provence" },
              { "@type": "City", "name": "Montpellier" }
            ],
            "serviceType": ["Conciergerie Airbnb", "Gestion locative saisonnière", "Sous-location professionnelle"],
            "priceRange": "€€",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            },
            "sameAs": []
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <Header />
        <main className="relative z-10">
          <Hero />

          {/* Social Proof Bar — colorful & compact */}
          <section className="bg-background py-8 md:py-10">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-center gap-5">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/40">
                  Suivez-nous
                </span>
                <div className="w-6 h-px bg-gold/30" />
                <div className="flex items-center gap-3">
                  <a href="https://www.instagram.com/chevalier_conciergerie/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] hover:scale-110 transition-transform duration-300" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://www.facebook.com/share/1GCBBTtP2R/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-[#1877F2] hover:scale-110 transition-transform duration-300" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://www.linkedin.com/in/victor-chevalier-bba282356/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-[#0A66C2] hover:scale-110 transition-transform duration-300" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Services — cream background, tight spacing */}
          <section id="formules" className="relative pt-2 pb-12 md:pt-2 md:pb-20 bg-background overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
              <ScrollAnimate>
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
                  <div className="w-10 h-px bg-gold/40 mx-auto mb-5" />
                  <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold">
                    Nos Solutions
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-foreground mt-6 mb-6 tracking-wide">
                    Deux Formules
                  </h2>
                  <p className="font-sans text-sm md:text-base text-muted-foreground tracking-wide leading-relaxed">
                    Que vous souhaitiez déléguer la gestion ou sécuriser vos revenus,<br className="hidden md:block" />
                    nous avons la solution adaptée.
                  </p>
                </div>
              </ScrollAnimate>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {/* Conciergerie Card */}
                <ScrollAnimate delay={100} animation="slide-right">
                  <Link to="/conciergerie" className="group block">
                    <div className="relative overflow-hidden aspect-[4/5] md:aspect-[3/4] rounded-lg">
                      <img 
                        src={serviceConciergerie} 
                        alt="Service Conciergerie"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                      
                      {/* Content overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                        <div className="mb-4">
                          <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center mb-6">
                            <Sparkles className="w-5 h-5 text-gold" />
                          </div>
                          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-3 block">
                            01 — Service
                          </span>
                          <h3 className="font-serif text-3xl md:text-4xl text-primary-foreground font-light tracking-wide mb-4">
                            Conciergerie
                          </h3>
                          <p className="font-sans text-sm text-primary-foreground/60 leading-relaxed mb-6 max-w-sm">
                            Service complet de gestion locative. Accueil voyageurs, ménage professionnel, optimisation des revenus.
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className="px-4 py-1.5 border border-gold/20 text-[10px] tracking-[0.2em] text-gold/70 uppercase">
                            À partir de 20%
                          </span>
                        </div>
                        
                        <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center group-hover:border-gold/60 group-hover:bg-gold/10 transition-all duration-500">
                          <ArrowRight className="w-5 h-5 text-primary-foreground/40 group-hover:text-gold transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimate>

                {/* Sous-location Card */}
                <ScrollAnimate delay={200} animation="slide-left">
                  <Link to="/sous-location" className="group block">
                    <div className="relative overflow-hidden aspect-[4/5] md:aspect-[3/4] rounded-lg">
                      <img 
                        src={serviceSousLocation} 
                        alt="Sous-location professionnelle"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                      
                      {/* Content overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                        <div className="mb-4">
                          <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center mb-6">
                            <Home className="w-5 h-5 text-gold" />
                          </div>
                          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-3 block">
                            02 — Solution
                          </span>
                          <h3 className="font-serif text-3xl md:text-4xl text-primary-foreground font-light tracking-wide mb-4">
                            Sous-Location
                          </h3>
                          <p className="font-sans text-sm text-primary-foreground/60 leading-relaxed mb-6 max-w-sm">
                            Loyer garanti chaque mois, zéro vacance locative. Aucune gestion, aucun risque.
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className="px-4 py-1.5 border border-gold/20 text-[10px] tracking-[0.2em] text-gold/70 uppercase">
                            Revenus sécurisés
                          </span>
                        </div>
                        
                        <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center group-hover:border-gold/60 group-hover:bg-gold/10 transition-all duration-500">
                          <ArrowRight className="w-5 h-5 text-primary-foreground/40 group-hover:text-gold transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimate>
              </div>
            </div>
          </section>

          {/* Platform Logos */}
          <section className="bg-background py-8">
            <div className="max-w-4xl mx-auto">
              <PlatformLogos />
            </div>
          </section>

          {/* Présentation du fondateur */}
          <FounderPresentation />

          
          
          <div id="nos-proprietes">
            <PropertyListings />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
