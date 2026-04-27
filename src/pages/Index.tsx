import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VillaScrollExperience from "@/components/VillaScrollExperience";
import PropertyListings from "@/components/PropertyListings";
import PlatformLogos from "@/components/PlatformLogos";
import FounderPresentation from "@/components/FounderPresentation";
import TiltCard from "@/components/TiltCard";
import BlueprintScene from "@/components/scenes/BlueprintScene";
import EditorialMosaic from "@/components/scenes/EditorialMosaic";
import ThermalScene from "@/components/scenes/ThermalScene";
import TypoScene from "@/components/scenes/TypoScene";
import { ArrowRight, Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
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
      
      <div className="min-h-screen bg-black relative">
        <Header />
        <main className="relative z-10">
          <VillaScrollExperience />

          {/* Social Proof Bar — colorful & compact (transparent over video) */}
          <section className="py-8 md:py-10 relative">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-center gap-5">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary-foreground/60">
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

          {/* Services — transparent over video, light text */}
          <section id="formules" className="relative pt-2 pb-12 md:pt-2 md:pb-20 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
              <ScrollAnimate>
                <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
                  <div className="w-10 h-px bg-gold/60 mx-auto mb-6" />
                  <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/85">
                    Deux chemins
                  </span>
                  <h2
                    className="font-serif font-light text-white mt-6 tracking-[-0.01em] [text-wrap:balance]"
                    style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                  >
                    Confier, ou <em className="not-italic text-gold">céder.</em>
                  </h2>
                  <p className="font-sans text-sm md:text-base text-white/55 tracking-wide leading-relaxed mt-6 max-w-md mx-auto">
                    Selon que vous voulez garder la main sur votre bien
                    ou en sécuriser le rendement à long terme.
                  </p>
                </div>
              </ScrollAnimate>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/8 max-w-5xl mx-auto">
                {/* Conciergerie — formule confiance */}
                <ScrollAnimate delay={100}>
                  <Link
                    to="/conciergerie"
                    className="group relative block bg-black p-10 md:p-14 h-full transition-colors duration-500 hover:bg-white/[0.02]"
                  >
                    <div className="flex items-baseline justify-between mb-10">
                      <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold/70">
                        Formule I
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
                        À partir de 20 %
                      </span>
                    </div>

                    <h3
                      className="font-serif font-light text-white tracking-[-0.01em] mb-6 leading-[1]"
                      style={{ fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)" }}
                    >
                      Conciergerie
                    </h3>

                    <p className="font-serif italic text-gold/85 text-base md:text-lg mb-8 leading-relaxed">
                      Vous restez propriétaire. On s'occupe de tout.
                    </p>

                    <p className="font-sans text-sm md:text-[15px] text-white/65 leading-relaxed max-w-md mb-12">
                      Photos, annonces, prix, accueil voyageur, ménage, draps,
                      linge, suivi des avis, réponses 7j/7. Vous touchez les
                      revenus, on tient la maison.
                    </p>

                    <div className="flex items-center gap-3 text-gold/80 group-hover:text-gold transition-colors">
                      <span className="font-sans text-[11px] md:text-xs tracking-[0.3em] uppercase">
                        En savoir plus
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Link>
                </ScrollAnimate>

                {/* Sous-location — formule sérénité totale */}
                <ScrollAnimate delay={200}>
                  <Link
                    to="/sous-location"
                    className="group relative block bg-black p-10 md:p-14 h-full transition-colors duration-500 hover:bg-white/[0.02]"
                  >
                    <div className="flex items-baseline justify-between mb-10">
                      <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold/70">
                        Formule II
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
                        Loyer garanti
                      </span>
                    </div>

                    <h3
                      className="font-serif font-light text-white tracking-[-0.01em] mb-6 leading-[1]"
                      style={{ fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)" }}
                    >
                      Sous-location
                    </h3>

                    <p className="font-serif italic text-gold/85 text-base md:text-lg mb-8 leading-relaxed">
                      On vous loue le bien. Le reste ne vous concerne plus.
                    </p>

                    <p className="font-sans text-sm md:text-[15px] text-white/65 leading-relaxed max-w-md mb-12">
                      Bail commercial, loyer fixe versé chaque mois, peu
                      importe la saison ou la météo. Aucune gestion, aucune
                      vacance, aucun message d'urgence à 23 h.
                    </p>

                    <div className="flex items-center gap-3 text-gold/80 group-hover:text-gold transition-colors">
                      <span className="font-sans text-[11px] md:text-xs tracking-[0.3em] uppercase">
                        En savoir plus
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Link>
                </ScrollAnimate>
              </div>
            </div>
          </section>

          {/* Platform Logos — transparent over video */}
          <section className="py-8 relative">
            <div className="max-w-4xl mx-auto">
              <PlatformLogos />
            </div>
          </section>

          {/* Scène 01 — Blueprint : "ce n'est pas qu'une simple location" */}
          <BlueprintScene />

          {/* Scène 02 — Mosaïque éditoriale magazine */}
          <EditorialMosaic />

          {/* Scène 03 — Thermique : optimisation des revenus */}
          <ThermalScene />

          {/* Présentation du fondateur */}
          <div id="founder-presentation" className="relative">
            <FounderPresentation />
          </div>

          {/* Scène 04 — Territoire : Avignon en typo géante */}
          <TypoScene />

          <div id="nos-proprietes" className="relative">
            <PropertyListings />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
