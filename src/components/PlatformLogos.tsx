import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import logoAirbnb from "@/assets/logo-airbnb.png";
import logoBooking from "@/assets/logo-booking.png";
import logoAbritel from "@/assets/logo-abritel.png";

const PlatformLogos = () => {
  return (
    <div className="py-6 md:py-8">
      <ScrollAnimate>
        <div className="flex flex-col items-center">
          {/* Title with gold lines */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold" />
            <p className="text-muted-foreground font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase">
              Présent sur les meilleures plateformes
            </p>
            <div className="w-12 h-px bg-gold" />
          </div>

          {/* Logo cards with shadows, separated by gold lines */}
          <div className="flex items-center justify-center gap-0">
            {[
              { src: logoAirbnb, alt: "Airbnb" },
              { src: logoBooking, alt: "Booking.com" },
              { src: logoAbritel, alt: "Abritel" },
            ].map((platform, index) => (
              <div key={platform.alt} className="flex items-center">
                {index > 0 && (
                  <div className="w-px h-16 bg-gold/40 mx-4 md:mx-6" />
                )}
                <div className="group px-6 py-5 md:px-10 md:py-6 rounded-xl bg-white shadow-medium hover:-translate-y-1 transition-all duration-300">
                  <img
                    src={platform.src}
                    alt={platform.alt}
                    className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimate>
    </div>
  );
};

export default PlatformLogos;
