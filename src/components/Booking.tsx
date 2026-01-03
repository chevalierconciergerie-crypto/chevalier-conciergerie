import { Calendar, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Booking = () => {
  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Contact</span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
              Consultation Gratuite
            </h2>
            <p className="font-sans text-muted-foreground text-lg max-w-2xl mx-auto">
              Discutons de votre projet immobilier. Réservez un créneau pour un appel découverte 
              sans engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendly Embed Placeholder */}
            <div className="bg-card rounded-2xl shadow-soft p-8 min-h-[400px] flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6">
                <Calendar className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 text-center">
                Réservez votre créneau
              </h3>
              <p className="font-sans text-muted-foreground text-center mb-8">
                Sélectionnez un créneau qui vous convient pour un appel de 30 minutes.
              </p>
              
              {/* Placeholder for Calendly Widget */}
              <div className="w-full h-64 border-2 border-dashed border-border rounded-xl flex items-center justify-center bg-secondary/50">
                <div className="text-center">
                  <p className="font-sans text-muted-foreground text-sm mb-2">
                    Widget Calendly
                  </p>
                  <p className="font-sans text-xs text-muted-foreground/60">
                    L'intégration sera configurée prochainement
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Options */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl shadow-soft p-6 hover:shadow-medium transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-foreground mb-1">
                      Appelez-nous
                    </h4>
                    <p className="font-sans text-muted-foreground text-sm mb-2">
                      Du lundi au samedi, 9h - 19h
                    </p>
                    <a href="tel:+33783198341" className="font-sans text-gold font-medium hover:underline">
                      +33 7 83 19 83 41
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-soft p-6 hover:shadow-medium transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-foreground mb-1">
                      Écrivez-nous
                    </h4>
                    <p className="font-sans text-muted-foreground text-sm mb-2">
                      Réponse sous 24h garantie
                    </p>
                    <a href="mailto:contact@chevalier-conciergerie.fr" className="font-sans text-gold font-medium hover:underline">
                      contact@chevalier-conciergerie.fr
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-soft p-6 hover:shadow-medium transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <MessageCircle className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-foreground mb-1">
                      WhatsApp
                    </h4>
                    <p className="font-sans text-muted-foreground text-sm mb-2">
                      Pour une réponse rapide
                    </p>
                    <Button variant="outline-gold" size="sm" asChild>
                      <a href="https://wa.me/33783198341" target="_blank" rel="noopener noreferrer">
                        Démarrer une conversation
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
