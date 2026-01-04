import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LocalExpertise from "@/components/LocalExpertise";
import ComingSoon from "@/components/ComingSoon";
import PlatformLogos from "@/components/PlatformLogos";
import AvignonIllustration from "@/components/AvignonIllustration";
import { ArrowRight, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import rueTeinturiers from "@/assets/rue-teinturiers.jpg";
import detailArchitectural from "@/assets/detail-architectural.jpg";
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
            "email": "contact@chevalier-conciergerie.fr",
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
              { "@type": "City", "name": "Les Angles" }
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
          
          {/* Services Overview with Pont d'Avignon background */}
          <section id="formules" className="relative py-24 bg-background overflow-hidden">
            <AvignonIllustration variant="pont" />
            <div className="container mx-auto px-6 relative z-10">
              <ScrollAnimate>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Nos Solutions</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
                    Deux Formules, Un Objectif
                  </h2>
                  <p className="font-sans text-muted-foreground text-lg">
                    Que vous souhaitiez déléguer la gestion ou sécuriser vos revenus, nous avons la solution adaptée.
                  </p>
                </div>
              </ScrollAnimate>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Conciergerie Card */}
                <ScrollAnimate delay={100} animation="slide-right">
                  <div className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-500">
                    <div className="absolute inset-0">
                      <img 
                        src={detailArchitectural} 
                        alt="Service Conciergerie - Volets provençaux typiques d'Avignon"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
                    </div>
                    <div className="relative z-10 p-8 md:p-10 min-h-[400px] flex flex-col justify-end">
                      <div className="w-14 h-14 rounded-xl bg-gold/20 backdrop-blur-sm flex items-center justify-center mb-6">
                        <Sparkles className="w-7 h-7 text-gold" />
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground font-semibold mb-4">
                        Conciergerie
                      </h3>
                      <p className="font-sans text-primary-foreground/80 mb-6">
                        Service complet de gestion locative saisonnière. Accueil voyageurs, ménage, 
                        optimisation des revenus. Vous restez propriétaire et bénéficiez de notre expertise.
                      </p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-sm text-primary-foreground font-medium">
                          À partir de 20%
                        </span>
                        <span className="px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-sm text-primary-foreground font-medium">
                          Revenus optimisés
                        </span>
                      </div>
                      <Button variant="gold" className="w-fit group/btn" asChild>
                        <Link to="/conciergerie">
                          Découvrir
                          <ArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ScrollAnimate>

                {/* Sous-location Card */}
                <ScrollAnimate delay={200} animation="slide-left">
                  <div className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-500">
                    <div className="absolute inset-0">
                      <img 
                        src={rueTeinturiers} 
                        alt="Sous-location - Rue des Teinturiers à Avignon"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
                    </div>
                    <div className="relative z-10 p-8 md:p-10 min-h-[400px] flex flex-col justify-end">
                      <div className="w-14 h-14 rounded-xl bg-gold/20 backdrop-blur-sm flex items-center justify-center mb-6">
                        <Home className="w-7 h-7 text-gold" />
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground font-semibold mb-4">
                        Sous-Location
                      </h3>
                      <p className="font-sans text-primary-foreground/80 mb-6">
                        Loyer garanti chaque mois, zéro vacance locative. Nous louons votre bien 
                        et vous versons un revenu fixe. Aucune gestion, aucun risque.
                      </p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-sm text-primary-foreground font-medium">
                          Sérénité totale
                        </span>
                        <span className="px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-sm text-primary-foreground font-medium">
                          Revenus sécurisés
                        </span>
                      </div>
                      <Button variant="gold" className="w-fit group/btn" asChild>
                        <Link to="/sous-location">
                          Découvrir
                          <ArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ScrollAnimate>
              </div>
            </div>
          </section>

          {/* Platform Logos */}
          <section className="bg-white py-12">
            <div className="max-w-3xl mx-auto">
              <PlatformLogos />
            </div>
          </section>

          <LocalExpertise />
          <ComingSoon />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
