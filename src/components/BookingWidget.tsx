import { ScrollAnimate } from "@/hooks/useScrollAnimation";

const BookingWidget = () => {
  return (
    <section id="reservation" className="relative py-16 md:py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimate>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <div className="w-10 h-px bg-gold/40 mx-auto mb-5" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold">
              Réservation
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-foreground mt-6 mb-6 tracking-wide">
              Réservez Votre Séjour
            </h2>
            <p className="font-sans text-sm md:text-base text-muted-foreground tracking-wide leading-relaxed">
              Sélectionnez vos dates et réservez directement en ligne,<br className="hidden md:block" />
              au meilleur tarif garanti.
            </p>
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={100}>
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg bg-card">
            <iframe
              src="https://chevalier-locabusiness.amenitiz.io/fr/booking/room#DatesGuests-BE"
              title="Moteur de réservation Chevalier Conciergerie"
              className="w-full border-0"
              style={{ height: "700px", minHeight: "500px" }}
              loading="lazy"
              allow="payment"
            />
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default BookingWidget;
