import { ScrollAnimate } from "@/hooks/useScrollAnimation";

/**
 * Bandeau plateformes en texte pur. Les PNG fournis par les plateformes
 * ont des fonds blancs (pas d'alpha), ce qui rend l'affichage en image
 * incohérent sur fond noir. On rend simplement les noms en typographie
 * discrète, comme un crédit éditorial.
 */

const platforms = ["Airbnb", "Booking.com", "Abritel"];

const PlatformLogos = () => {
  return (
    <div className="py-16 md:py-20 px-6">
      <ScrollAnimate>
        <div className="flex flex-col items-center text-center">
          <p className="font-sans text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-white/35 mb-6">
            Listés sur
          </p>

          <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap">
            {platforms.map((name, i) => (
              <span key={name} className="flex items-center">
                {i > 0 && (
                  <span className="w-1 h-1 rounded-full bg-gold/50 mr-3 md:mr-5" />
                )}
                <span className="font-serif text-base md:text-xl text-white/75 font-light tracking-wide">
                  {name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </ScrollAnimate>
    </div>
  );
};

export default PlatformLogos;
