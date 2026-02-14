import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import logoAirbnb from "@/assets/logo-airbnb.png";
import logoBooking from "@/assets/logo-booking.png";
import logoAbritel from "@/assets/logo-abritel.png";

const PlatformLogos = () => {
  return (
    <div className="py-10 md:py-14">
      <ScrollAnimate>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold/30" />
            <p className="text-primary-foreground/50 font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase">
              Présent sur les meilleures plateformes
            </p>
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {[
              { src: logoAirbnb, alt: "Airbnb" },
              { src: logoBooking, alt: "Booking.com" },
              { src: logoAbritel, alt: "Abritel" },
            ].map((platform) => (
              <div
                key={platform.alt}
                className="group px-5 py-4 md:px-8 md:py-5 rounded-xl bg-white/95 hover:bg-white transition-all duration-300 hover:-translate-y-1 shadow-soft"
              >
                <img
                  src={platform.src}
                  alt={platform.alt}
                  className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimate>
    </div>
  );
};

export default PlatformLogos;
