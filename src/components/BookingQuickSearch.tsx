import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Search } from "lucide-react";

/**
 * Encart de recherche rapide affiché sur l'accueil.
 * Redirige vers /reservation avec les dates/voyageurs en paramètres,
 * que la page de réservation transmet au moteur Beds24.
 */
const BookingQuickSearch = () => {
  const navigate = useNavigate();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState(2);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    params.set("numadult", String(adults));
    navigate(`/reservation?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-xs bg-primary/90 backdrop-blur-md border border-primary-foreground/15 rounded-2xl p-6 shadow-2xl">
      <div className="text-center mb-5">
        <h3 className="font-serif text-xl text-primary-foreground tracking-wide">
          Meilleur tarif garanti
        </h3>
        <p className="font-sans text-xs text-gold mt-1 uppercase tracking-[0.15em]">
          Uniquement sur notre site officiel
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <label className="block">
          <span className="block text-[10px] uppercase tracking-[0.15em] text-primary-foreground/60 mb-1">
            Arrivée
          </span>
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="w-full rounded-lg bg-background text-foreground text-sm px-3 py-2 border border-border focus:border-gold focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="block text-[10px] uppercase tracking-[0.15em] text-primary-foreground/60 mb-1">
            Départ
          </span>
          <input
            type="date"
            value={checkout}
            min={checkin || undefined}
            onChange={(e) => setCheckout(e.target.value)}
            className="w-full rounded-lg bg-background text-foreground text-sm px-3 py-2 border border-border focus:border-gold focus:outline-none"
          />
        </label>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-background border border-border px-3 py-2 mb-5">
        <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Adultes
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Retirer un adulte"
            onClick={() => setAdults((n) => Math.max(1, n - 1))}
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:border-gold transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-foreground font-medium w-4 text-center">{adults}</span>
          <button
            type="button"
            aria-label="Ajouter un adulte"
            onClick={() => setAdults((n) => Math.min(16, n + 1))}
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:border-gold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-gold py-3 text-primary font-semibold tracking-[0.15em] uppercase text-sm hover:bg-gold/90 transition-colors"
      >
        <Search className="w-4 h-4" />
        Rechercher
      </button>
    </div>
  );
};

export default BookingQuickSearch;
