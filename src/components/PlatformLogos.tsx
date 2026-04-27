import { ScrollAnimate } from "@/hooks/useScrollAnimation";

/**
 * Bandeau credentials — remplace l'affichage des logos plateformes par
 * une ligne éditoriale de chiffres réels. Le luxe ne met pas ses badges
 * de confiance en avant ; il assume sa réputation par les chiffres.
 *
 * Les valeurs sont à ajuster avec vos vrais chiffres quand vous voulez.
 */

const credentials = [
  { value: "2024", label: "Année zéro" },
  { value: "8", label: "Biens en gestion" },
  { value: "4.97★", label: "Note moyenne" },
  { value: "312", label: "Voyageurs reçus" },
];

const PlatformLogos = () => {
  return (
    <section className="py-20 md:py-28 px-6 border-y border-white/[0.06]">
      <ScrollAnimate>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 md:divide-x md:divide-white/[0.08]">
            {credentials.map((c, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center px-2 md:px-6"
              >
                <div
                  className="font-serif font-light text-white tabular-nums tracking-[-0.01em] leading-none"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}
                >
                  {c.value}
                </div>
                <div className="mt-4 font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/45">
                  {c.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/35">
              Disponibles sur Airbnb · Booking · Abritel
            </p>
          </div>
        </div>
      </ScrollAnimate>
    </section>
  );
};

export default PlatformLogos;
