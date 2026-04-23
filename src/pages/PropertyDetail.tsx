import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Users, MapPin, Bath, Bed, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { properties } from "@/data/properties";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    return <Navigate to="/" replace />;
  }

  const hasAirbnb = property.airbnbUrl && property.airbnbUrl !== "#";

  return (
    <>
      <Helmet>
        <title>{property.name} | Chevalier Conciergerie — Location Avignon</title>
        <meta name="description" content={property.shortDescription} />
        <link rel="canonical" href={`https://chevalier-conciergerie.fr/proprietes/${property.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="relative z-10">
          {/* Back link */}
          <div className="container mx-auto px-6 pt-28 pb-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors font-sans text-sm tracking-wide cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux propriétés
            </button>
          </div>

          {/* Gallery */}
          <section className="container mx-auto px-6 pb-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                {/* Images */}
                <div>
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-3">
                    <img
                      src={property.images[selectedImage]}
                      alt={`${property.name} — photo ${selectedImage + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {property.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {property.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`relative overflow-hidden rounded aspect-square cursor-pointer border-2 transition-all ${
                            selectedImage === i
                              ? "border-gold"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info card */}
                <div className="lg:sticky lg:top-28 self-start">
                  <div className="border border-border rounded-lg p-6 md:p-8 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gold" />
                      <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
                        {property.location}
                      </span>
                    </div>
                    <h1 className="font-serif text-2xl md:text-3xl font-light text-foreground tracking-wide mb-4">
                      {property.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{property.guests} voyageurs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{property.beds} lit</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{property.bathrooms} sdb</span>
                      </div>
                    </div>

                    {hasAirbnb ? (
                      <Button
                        variant="gold"
                        size="xl"
                        className="w-full"
                        asChild
                      >
                        <a
                          href={property.airbnbUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Réserver sur Airbnb
                        </a>
                      </Button>
                    ) : (
                      <div className="text-center py-3 px-4 border border-gold/30 rounded text-sm text-muted-foreground">
                        Bientôt disponible à la réservation
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Description & amenities */}
          <section className="container mx-auto px-6 pb-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
              <div>
                <ScrollAnimate>
                  <div className="mb-12">
                    <h2 className="font-serif text-2xl font-light text-foreground mb-4">
                      À propos
                    </h2>
                    <p className="font-sans text-muted-foreground leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                </ScrollAnimate>

                <ScrollAnimate delay={100}>
                  <div className="mb-12">
                    <h2 className="font-serif text-2xl font-light text-foreground mb-6">
                      Points forts
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {property.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-4 py-2 border border-gold/20 text-sm text-gold tracking-wide"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollAnimate>

                <ScrollAnimate delay={200}>
                  <div>
                    <h2 className="font-serif text-2xl font-light text-foreground mb-6">
                      Équipements
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {property.amenities.map((a) => (
                        <div key={a} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-gold" />
                          <span className="text-sm text-muted-foreground">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimate>
              </div>
              <div /> {/* spacer for grid alignment */}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PropertyDetail;
