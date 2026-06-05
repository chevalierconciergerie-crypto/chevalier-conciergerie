import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyListings from "@/components/PropertyListings";

const Logements = () => {
  return (
    <>
      <Helmet>
        <title>Nos logements à Avignon | Chevalier Conciergerie</title>
        <meta
          name="description"
          content="Découvrez notre collection de logements d'exception à Avignon et ses alentours : appartements de charme, intra-muros, rénovés et équipés. Réservation directe en ligne."
        />
        <link rel="canonical" href="https://chevalier-conciergerie.com/logements" />
      </Helmet>

      <Header />

      <main className="relative z-10 pt-24">
        <PropertyListings />

        {/* CTA réservation */}
        <section className="bg-background pb-24 text-center px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-4">
            Un coup de cœur ?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Vérifiez les disponibilités et réservez en direct, au meilleur tarif garanti.
          </p>
          <Link
            to="/reservation"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 text-primary font-semibold tracking-wide hover:bg-gold/90 transition-colors"
          >
            Réserver maintenant
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Logements;
