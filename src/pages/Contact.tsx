import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Booking from "@/components/Booking";
import ContactMap from "@/components/ContactMap";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Chevalier Conciergerie Avignon</title>
        <meta 
          name="description" 
          content="Contactez Chevalier Conciergerie pour une consultation gratuite. Gestion locative et sous-location professionnelle à Avignon." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-12 bg-primary">
            <div className="container mx-auto px-6 text-center">
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

          {/* Map Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Localisation</span>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-4">
                  Notre Zone d'Intervention
                </h2>
                <p className="font-sans text-muted-foreground mt-4 max-w-xl mx-auto">
                  Nous intervenons à Avignon et dans les communes environnantes.
                </p>
              </div>
              <div className="max-w-5xl mx-auto h-[500px]">
                <ContactMap />
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;
