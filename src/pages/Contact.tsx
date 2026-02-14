import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Booking from "@/components/Booking";
import ContactForm from "@/components/ContactForm";
import heroContact from "@/assets/hero-contact.jpg";

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
          <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src={heroContact} 
                alt="Intérieur provençal élégant" 
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            <div className="relative z-10 container mx-auto px-6 text-center">
              <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Contact</span>
              <h1 className="font-serif text-4xl md:text-6xl font-semibold text-primary-foreground mt-4 mb-6">
                Parlons de Votre Projet
              </h1>
              <p className="font-sans text-xl text-primary-foreground/80 max-w-2xl mx-auto">
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
