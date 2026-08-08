import { Helmet } from "@/lib/seo";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, CalendarCheck, CreditCard } from "lucide-react";

/**
 * URL du moteur de réservation Beds24.
 * À renseigner avec l'URL générée dans Beds24 :
 *   Settings → Booking Engine → Booking Widgets → iFrame Generator → Get Code
 * Coller ici l'URL contenue dans le src="..." du code iframe fourni par Beds24.
 * Tant que cette valeur est vide, la page affiche un message d'attente.
 */
const BEDS24_BOOKING_URL = "https://beds24.com/booking2.php?ownerid=158258&hidefooter=yes&referer=iframe";

const Reservation = () => {
  const [searchParams] = useSearchParams();

  // Pré-remplissage depuis l'encart de l'accueil (?checkin=...&checkout=...&numadult=...)
  const buildBookingUrl = () => {
    if (!BEDS24_BOOKING_URL) return BEDS24_BOOKING_URL;
    const allowed = ["checkin", "checkout", "numadult", "numchild", "propid", "roomid"];
    const extra = allowed
      .filter((k) => searchParams.get(k))
      .map((k) => `${k}=${encodeURIComponent(searchParams.get(k) as string)}`)
      .join("&");
    return extra ? `${BEDS24_BOOKING_URL}&${extra}` : BEDS24_BOOKING_URL;
  };
  const bookingUrl = buildBookingUrl();

  const reassurance = [
    { icon: CalendarCheck, title: "Disponibilités en temps réel", text: "Le calendrier est synchronisé avec Airbnb et Booking : aucune surréservation possible." },
    { icon: CreditCard, title: "Paiement sécurisé", text: "Paiement en ligne par carte bancaire via Stripe, dans un environnement chiffré." },
    { icon: ShieldCheck, title: "Réservation en direct", text: "Vous réservez directement auprès de nous, sans intermédiaire ni commission de plateforme." },
  ];

  return (
    <>
      <Helmet>
        <title>Réserver en direct | Chevalier Conciergerie — Avignon</title>
        <meta
          name="description"
          content="Réservez directement votre séjour à Avignon auprès de Chevalier Conciergerie. Disponibilités en temps réel et paiement sécurisé en ligne."
        />
        <link rel="canonical" href="https://chevalier-conciergerie.com/reservation" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-gold mb-4">Réservation directe</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Réservez votre séjour <span className="text-gradient-gold">en direct</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choisissez vos dates, vérifiez les disponibilités en temps réel et réglez
              votre séjour en ligne en toute sécurité.
            </p>
          </div>

          {/* Reassurance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {reassurance.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-base font-semibold text-foreground">{item.title}</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Caution */}
          <div className="max-w-5xl mx-auto mb-12 -mt-4">
            <div className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/5 px-5 py-4">
              <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Caution de 200 €.</span> Pour chaque séjour,
                votre carte bancaire est enregistrée de façon sécurisée (via Stripe).
                <span className="text-foreground"> Aucun montant n'est prélevé</span> : la caution n'est débitée
                qu'en cas de dégât constaté, dans la limite de 200 €.
              </p>
            </div>
          </div>

          {/* Booking engine */}
          <div className="max-w-5xl mx-auto">
            {BEDS24_BOOKING_URL ? (
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
                <iframe
                  title="Moteur de réservation Chevalier Conciergerie"
                  src={bookingUrl}
                  className="w-full"
                  style={{ height: "1900px", maxWidth: "100%", border: "0", overflow: "auto" }}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-10 text-center shadow-soft">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  Réservation en ligne bientôt disponible
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                  Notre système de réservation directe est en cours de finalisation.
                  En attendant, contactez-nous pour réserver votre séjour — réponse rapide garantie.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  Nous contacter
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Reservation;
