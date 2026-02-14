import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight, MapPin, TrendingUp, Users, Home, Star, Calendar } from "lucide-react";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";

interface LocalSeoPageProps {
  city: string;
  slug: string;
  heroImage: string;
  heroAlt: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  intro: {
    headline: string;
    subheadline: string;
    paragraphs: string[];
  };
  stats: {
    avgNightPrice: string;
    occupancyRate: string;
    avgMonthlyRevenue: string;
    managedProperties: string;
  };
  attractions: string[];
  neighborhoods: string[];
  whyUs: string[];
}

const LocalSeoPage = ({
  city,
  slug,
  heroImage,
  heroAlt,
  metaTitle,
  metaDescription,
  metaKeywords,
  intro,
  stats,
  attractions,
  neighborhoods,
  whyUs,
}: LocalSeoPageProps) => {
  const services = [
    "Création et optimisation d'annonce",
    "Photos professionnelles HDR",
    "Accueil voyageurs personnalisé",
    "Ménage professionnel hôtelier",
    "Tarification dynamique",
    "Gestion des réservations 24/7",
    "Maintenance et entretien",
    "Gestion des consommables",
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Chevalier Conciergerie - ${city}`,
    "description": metaDescription,
    "url": `https://chevalier-conciergerie.fr/${slug}`,
    "telephone": "+33783198341",
    "email": "chevalierconciergerie@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": "Provence-Alpes-Côte d'Azur",
      "addressCountry": "FR",
    },
    "areaServed": city,
    "priceRange": "€€",
    "image": heroImage,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
    },
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <link rel="canonical" href={`https://chevalier-conciergerie.fr/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
            <div className="absolute inset-0">
              <img src={heroImage} alt={heroAlt} className="w-full h-full object-cover opacity-40" loading="eager" fetchPriority="high" />
            </div>
            <div className="relative z-10 container mx-auto px-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">{city}</span>
                </div>
                <h1 className="font-serif text-4xl md:text-6xl font-semibold text-primary-foreground mb-6">
                  {intro.headline}
                </h1>
                <p className="font-sans text-xl text-primary-foreground/80 mb-8 max-w-2xl">
                  {intro.subheadline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="gold" size="xl" asChild>
                    <Link to="/contact">Estimation gratuite</Link>
                  </Button>
                  <Button variant="outline-light" size="xl" asChild>
                    <a href="tel:+33783198341">Nous appeler</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 bg-background border-b border-border/50">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl font-bold text-gold">{stats.avgNightPrice}</p>
                  <p className="font-sans text-xs text-muted-foreground mt-1 tracking-wide uppercase">Prix moyen/nuit</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl font-bold text-gold">{stats.occupancyRate}</p>
                  <p className="font-sans text-xs text-muted-foreground mt-1 tracking-wide uppercase">Taux d'occupation</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl font-bold text-gold">{stats.avgMonthlyRevenue}</p>
                  <p className="font-sans text-xs text-muted-foreground mt-1 tracking-wide uppercase">Revenu moyen/mois</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl font-bold text-gold">{stats.managedProperties}</p>
                  <p className="font-sans text-xs text-muted-foreground mt-1 tracking-wide uppercase">Biens gérés</p>
                </div>
              </div>
            </div>
          </section>

          {/* Intro locale */}
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <ScrollAnimate>
                  <div className="text-center mb-12">
                    <div className="w-10 h-px bg-gold mx-auto mb-6" />
                    <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold">
                      Conciergerie à {city}
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-6 tracking-wide">
                      Pourquoi {city} ?
                    </h2>
                  </div>
                </ScrollAnimate>

                <div className="space-y-6 mb-12">
                  {intro.paragraphs.map((p, i) => (
                    <p key={i} className="font-sans text-muted-foreground leading-relaxed text-base md:text-lg">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Attractions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <Star className="w-5 h-5 text-gold" />
                      <h3 className="font-serif text-lg font-medium text-foreground">Attractions principales</h3>
                    </div>
                    <ul className="space-y-2">
                      {attractions.map((a) => (
                        <li key={a} className="flex items-center gap-2 font-sans text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card rounded-2xl p-6 border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <Home className="w-5 h-5 text-gold" />
                      <h3 className="font-serif text-lg font-medium text-foreground">Quartiers prisés</h3>
                    </div>
                    <ul className="space-y-2">
                      {neighborhoods.map((n) => (
                        <li key={n} className="flex items-center gap-2 font-sans text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto">
                <ScrollAnimate>
                  <div className="text-center mb-12">
                    <div className="w-10 h-px bg-gold mx-auto mb-6" />
                    <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold">Services</span>
                    <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-6 tracking-wide">
                      Ce que nous proposons à {city}
                    </h2>
                  </div>
                </ScrollAnimate>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {services.map((service) => (
                    <div key={service} className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border/50">
                      <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-gold" />
                      </div>
                      <span className="font-sans text-sm text-foreground">{service}</span>
                    </div>
                  ))}
                </div>

                {/* Why us */}
                <div className="mt-16 max-w-3xl mx-auto">
                  <h3 className="font-serif text-2xl font-light text-foreground text-center mb-8">
                    Pourquoi choisir Chevalier Conciergerie ?
                  </h3>
                  <div className="space-y-4">
                    {whyUs.map((reason, i) => (
                      <div key={i} className="flex items-start gap-4 p-4">
                        <span className="font-sans text-xs text-gold/50 tracking-widest mt-1 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="font-sans text-muted-foreground leading-relaxed">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Vous avez un bien à {city} ?
              </h2>
              <p className="font-sans text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Obtenez une estimation gratuite de vos revenus locatifs en moins de 24h.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gold" size="xl" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    Estimer mon bien
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LocalSeoPage;
