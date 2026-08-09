import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LocalExpertise from "@/components/LocalExpertise";
import PlatformLogos from "@/components/PlatformLogos";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FounderPresentation from "@/components/FounderPresentation";
import { ArrowRight, Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
/*
  Photos réelles de deux logements gérés, prises au téléphone lors des mises en
  location. Elles remplacent deux images générées : une image de synthèse se
  repère immédiatement — lumière trop propre, meubles sans usure, aucun câble,
  aucun reflet — et elle donne exactement le contraire du signal recherché,
  celui d'un professionnel qui gère de vrais appartements à Avignon.

  Aucun monument non plus. Le Palais des Papes est la carte postale que tous
  les concurrents utilisent : il ne dit rien du service et ne distingue de
  personne. Ce que le propriétaire veut voir, c'est son bien.
*/
import serviceConciergerie from "@/assets/le-vernet.jpg";
import serviceSousLocation from "@/assets/authentique-1.jpg";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import Tilt from "@/components/Tilt";


const Index = () => {
  return (
    <>
      <Helmet>
        <title>Conciergerie Avignon | Gestion Locative & Sous-location | Chevalier Conciergerie</title>
        <meta 
          name="description" 
          content="Conciergerie Airbnb à Avignon, Villeneuve-lès-Avignon et Les Angles. Gestion locative saisonnière complète, ou sous-location avec loyer garanti chaque mois. Estimation gratuite sous 24 h." 
        />
        <meta name="keywords" content="conciergerie Avignon, gestion locative Avignon, Airbnb Avignon, location saisonnière Avignon, sous-location Avignon, conciergerie Villeneuve-lès-Avignon, gestion Airbnb" />
        <meta property="og:title" content="Conciergerie Avignon | Gestion Locative Saisonnière | Chevalier Conciergerie" />
        <meta property="og:description" content="Conciergerie Airbnb à Avignon. Gestion locative saisonnière complète, ou loyer garanti chaque mois. Estimation gratuite." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="geo.region" content="FR-84" />
        <meta name="geo.placename" content="Avignon" />
        <link rel="canonical" href="https://chevalier-conciergerie.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://chevalier-conciergerie.com",
            "name": "Chevalier Conciergerie",
            "description": "Conciergerie Airbnb et gestion locative saisonnière à Avignon. Sous-location professionnelle avec loyer garanti chaque mois.",
            "url": "https://chevalier-conciergerie.com",
            "telephone": "+33783198341",
            "email": "contact@chevalier-conciergerie.com",
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
            /*
              La note manquait alors qu'elle existe et qu'elle est excellente.
              C'est le signal le plus lourd quand un moteur de réponse doit
              répondre à « meilleure conciergerie à Avignon » : sans note
              déclarée, l'entreprise n'a rien à opposer à un concurrent qui
              en publie une. Les valeurs correspondent exactement à la fiche
              Google affichée sur la page — un chiffre inventé ici ferait
              retirer l'ensemble du balisage.
            */
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": 12,
              "bestRating": "5",
              "worstRating": "1"
            },
            /*
              Les avis eux-mêmes, et pas seulement la moyenne. Un moteur de
              réponse qui doit justifier « c'est une bonne conciergerie » a
              besoin d'une phrase à citer, pas d'un chiffre : ce sont ces
              extraits qu'il reprend. Ils sont recopiés mot pour mot depuis la
              fiche Google et affichés tels quels sur la page — le balisage doit
              correspondre à ce que le visiteur voit, sans quoi Google retire
              l'ensemble des résultats enrichis du site.
            */
            "review": [
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Baptiste Mailharrancin" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Je confie mon appartement en centre-ville d'Avignon à CHEVALIER Conciergerie depuis plusieurs mois et je ne regrette pas. Communication fluide, réactivité au top et mes voyageurs sont toujours très bien accueillis. Je ne m'occupe plus de rien et mes revenus locatifs ont augmenté."
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Clément Pailler" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "J'ai fait appel à Chevalier Conciergerie pour mon appartement et je suis absolument ravi de la manière dont j'ai été accompagné par Victor. Je recommande à 100 % !"
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "felicien arnoux" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Excellente conciergerie, très professionnelle et à l'écoute des clients. Je recommande vivement pour tout projet de location courte durée sur le secteur Gard et Vaucluse."
              }
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            },
            /*
              sameAs était un tableau vide. C'est lui qui dit à un moteur que
              la fiche Google, la page Instagram et l'entreprise décrite ici
              sont une seule et même entité. Sans ces liens, chaque profil
              existe séparément et aucun ne renforce les autres — c'est une des
              raisons pour lesquelles une recherche « conciergerie
              Villeneuve-lès-Avignon » peut ignorer un site pourtant en ligne.
            */
            "sameAs": [
              "https://www.google.com/maps/place/CHEVALIER+CONCIERGERIE/@43.8680214,4.8327906,17z",
              "https://www.instagram.com/chevalier_conciergerie/",
              "https://www.facebook.com/share/1GCBBTtP2R/",
              "https://www.linkedin.com/in/victor-chevalier-bba282356/"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <Header />
        <main className="relative z-10">
          <Hero />

          {/*
            Encart de réservation directe retiré (version mobile) : il redirigeait vers
            /reservation, route supprimée avec le moteur Beds24.
          */}

          {/* Social Proof Bar — colorful & compact */}
          <section className="bg-background py-8 md:py-10">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-center gap-5">
                <span className="font-sans text-xs tracking-[0.3em] uppercase text-foreground/40">
                  Suivez-nous
                </span>

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

                  <span className="font-sans text-xs md:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    Nos formules
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-foreground mt-6 mb-6 tracking-wide">
                    Deux façons de<br />confier votre bien
                  </h2>
                  <p className="font-sans text-sm md:text-base text-muted-foreground tracking-wide leading-relaxed">
                    Vous gardez la main sur votre logement et déléguez tout le reste,<br className="hidden md:block" />
                    ou vous touchez un loyer fixe sans jamais vous en occuper.
                  </p>
                </div>
              </ScrollAnimate>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {/* Conciergerie Card */}
                <ScrollAnimate delay={100} animation="slide-right">
                  <Link to="/conciergerie" className="group block">
                    {/*
                      La carte tourne en permanence dans l'espace, sans qu'on
                      ait rien à faire : l'inclinaison va et vient sur une
                      dizaine de secondes et la carte monte et redescend en
                      même temps. Un relief qui n'apparaît qu'au survol est
                      invisible — on regarde une page avant de la toucher, et
                      sur mobile on ne la survole jamais.

                      L'animation est portée par ce conteneur extérieur, pas
                      par <Tilt> : la bibliothèque écrit sa propre transformation
                      au survol, et les deux se seraient écrasées l'une l'autre.
                      Ici elles se composent — le balancement de fond continue
                      pendant que la souris pilote l'inclinaison fine.
                    */}
                    <div className="[transform-style:preserve-3d] animate-flotte-3d">
                    <Tilt className="relative overflow-hidden aspect-[4/5] md:aspect-[3/4] rounded-lg shadow-[0_40px_80px_-30px_rgba(24,18,12,0.65)]">
                      <img
                        src={serviceConciergerie}
                        alt="Séjour d'un appartement géré à Avignon : cheminée en marbre, moulures, tomettes et table dressée face aux fenêtres ouvertes sur les toits"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                      />
                      {/* Reflet qui traverse la carte toutes les huit secondes.
                          C'est ce qui donne l'impression d'une surface vitrée
                          inclinée dans la lumière plutôt que d'une image plate. */}
                      <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-reflet" />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(0_0%_4%/0.92)_0%,hsl(0_0%_4%/0.60)_26%,hsl(0_0%_4%/0.14)_52%,transparent_72%)]" />
                      
                      {/* Content overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                        <div className="mb-4">
                          <h3 className="font-serif text-3xl md:text-4xl text-primary-foreground font-light tracking-wide mb-4">
                            Conciergerie
                          </h3>
                          <p className="font-sans text-sm text-primary-foreground/60 leading-relaxed mb-6 max-w-sm">
                            Nous accueillons vos voyageurs, faisons le ménage entre chaque séjour et ajustons vos prix au fil de la saison. Vous encaissez, sans y penser.
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {/* Le taux était annoncé « sur mesure » : sur une page
                              de vente, une commission qu'on ne donne pas est lue
                              comme une commission qu'on cache. */}
                          <span className="font-sans text-[13px] text-white/70">
                            20 % HT des revenus, tout compris
                          </span>
                        </div>
                        
                        <span className="absolute bottom-8 right-8 inline-flex items-center gap-2 font-sans text-[13px] text-white/85">En savoir plus<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                      </div>
                    </Tilt>
                    </div>
                  </Link>
                </ScrollAnimate>

                {/* Sous-location Card */}
                <ScrollAnimate delay={200} animation="slide-left">
                  <Link to="/sous-location" className="group block">
                    {/* Balancement inversé : les deux cartes penchent en sens
                        opposé et se croisent, au lieu de bouger à l'unisson. */}
                    <div className="[transform-style:preserve-3d] animate-flotte-3d-inverse">
                    <Tilt className="relative overflow-hidden aspect-[4/5] md:aspect-[3/4] rounded-lg shadow-[0_40px_80px_-30px_rgba(24,18,12,0.65)]">
                      <img
                        src={serviceSousLocation}
                        alt="Appartement d'un hôtel particulier d'Avignon loué à l'année : hautes fenêtres à balcons en fer forgé donnant sur les façades en pierre de la vieille ville"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                      />
                      <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-reflet [animation-delay:4s]" />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(0_0%_4%/0.92)_0%,hsl(0_0%_4%/0.60)_26%,hsl(0_0%_4%/0.14)_52%,transparent_72%)]" />

                      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                        <div className="mb-4">
                          <h3 className="font-serif text-3xl md:text-4xl text-primary-foreground font-light tracking-wide mb-4">
                            Sous-Location
                          </h3>
                          <p className="font-sans text-sm text-primary-foreground/60 leading-relaxed mb-6 max-w-sm">
                            Nous louons votre bien à l'année et vous versons le même montant chaque mois. Séjours vides ou complets, cela ne vous regarde plus.
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-sans text-[13px] text-white/70">
                            Loyer fixe, aucune commission
                          </span>
                        </div>

                        <span className="absolute bottom-8 right-8 inline-flex items-center gap-2 font-sans text-[13px] text-white/85">En savoir plus<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                      </div>
                    </Tilt>
                    </div>
                  </Link>
                </ScrollAnimate>
              </div>
            </div>
          </section>

          {/* Témoignages — avis Google réels */}
          <TestimonialsCarousel />

          {/* Platform Logos */}
          <section className="bg-background py-8">
            <div className="max-w-4xl mx-auto">
              <PlatformLogos />
            </div>
          </section>

          {/* Présentation du fondateur */}
          <FounderPresentation />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
