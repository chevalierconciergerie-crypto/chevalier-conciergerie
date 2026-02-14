import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Booking from "@/components/Booking";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Conciergerie Avignon | Consultation Gratuite | Chevalier</title>
        <meta 
          name="description" 
          content="Contactez Chevalier Conciergerie à Avignon. Consultation gratuite pour votre projet de gestion locative ou sous-location. Réponse sous 24h." 
        />
        <meta name="keywords" content="contact conciergerie Avignon, devis gestion locative Avignon, rendez-vous conciergerie" />
        <link rel="canonical" href="https://chevalier-conciergerie.fr/contact" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-12 bg-background">
            <div className="container mx-auto px-6 text-center">
              <div className="w-10 h-px bg-gold mx-auto mb-6" />
              <span className="text-gold font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase">Contact</span>
              <h1 className="font-serif text-4xl md:text-6xl font-light text-foreground mt-6 mb-6 tracking-wide">
                Parlons de Votre Projet
              </h1>
              <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                Prenez rendez-vous pour une consultation gratuite et personnalisée.
              </p>
            </div>
          </section>

          <Booking />

          <ContactForm />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;
