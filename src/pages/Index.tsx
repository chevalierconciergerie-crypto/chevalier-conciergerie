import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Sublocation from "@/components/Sublocation";
import LocalExpertise from "@/components/LocalExpertise";
import Pricing from "@/components/Pricing";
import Booking from "@/components/Booking";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Chevalier Conciergerie | Gestion Locative de Luxe à Avignon</title>
        <meta 
          name="description" 
          content="Conciergerie haut de gamme et sous-location professionnelle à Avignon. Optimisez vos revenus locatifs avec un loyer garanti et une gestion 5 étoiles." 
        />
        <meta name="keywords" content="conciergerie Avignon, gestion locative, sous-location professionnelle, Airbnb Avignon, location saisonnière" />
        <meta property="og:title" content="Chevalier Conciergerie | Gestion Locative de Luxe à Avignon" />
        <meta property="og:description" content="Conciergerie haut de gamme et sous-location professionnelle à Avignon." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://chevalier-conciergerie.fr" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <Sublocation />
          <LocalExpertise />
          <Pricing />
          <Booking />
          <ComingSoon />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
