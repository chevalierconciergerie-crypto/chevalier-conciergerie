import { Sparkles, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AvignonIllustration from "@/components/AvignonIllustration";

const ComingSoon = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <AvignonIllustration variant="remparts" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-gold mb-8">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          {/* Content */}
          <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Bientôt Disponible</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
            Réservez Directement nos Propriétés
          </h2>
          <p className="font-sans text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Nous travaillons sur une plateforme de réservation directe pour vous offrir 
            les meilleures expériences de séjour à Avignon.
          </p>

          {/* Newsletter Signup */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre email"
              className="h-12 bg-card border-border focus:border-gold"
            />
            <Button variant="gold" size="lg" className="w-full sm:w-auto whitespace-nowrap">
              <Bell className="w-4 h-4 mr-2" />
              Me prévenir
            </Button>
          </div>

          <p className="font-sans text-xs text-muted-foreground mt-4">
            Soyez les premiers informés du lancement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
