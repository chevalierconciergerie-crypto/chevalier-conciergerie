import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VillaScrollExperience from "@/components/VillaScrollExperience";
import PlatformLogos from "@/components/PlatformLogos";
import FounderPresentation from "@/components/FounderPresentation";
import BlueprintScene from "@/components/scenes/BlueprintScene";
import EditorialMosaic from "@/components/scenes/EditorialMosaic";
import ThermalScene from "@/components/scenes/ThermalScene";
import TypoScene from "@/components/scenes/TypoScene";
import TwoPaths from "@/components/scenes/TwoPaths";
import { Instagram, Facebook, Linkedin } from "lucide-react";
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
      
      <div className="min-h-screen bg-primary relative">
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

          {/* Deux chemins — chapitres pleine largeur palette inversée */}
          <div id="formules">
            <TwoPaths />
          </div>

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
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
