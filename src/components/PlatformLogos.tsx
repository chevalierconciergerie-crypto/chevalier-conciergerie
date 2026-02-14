import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import logoAirbnb from "@/assets/logo-airbnb.png";
import logoBooking from "@/assets/logo-booking.png";
import logoAbritel from "@/assets/logo-abritel.png";

const PlatformLogos = () => {
  return (
    <div className="py-6 md:py-8 px-4">
      <ScrollAnimate>
        <div className="flex flex-col items-center">
          {/* Title with gold lines */}
          <div className="flex items-center gap-3 md:gap-4 mb-8">
            <div className="w-8 md:w-12 h-px bg-gold shrink-0" />
            <p className="text-muted-foreground font-sans text-[9px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase text-center whitespace-nowrap">
              Présent sur les meilleures plateformes
            </p>
            <div className="w-8 md:w-12 h-px bg-gold shrink-0" />
          </div>

          {/* Logo cards — vertical on mobile, horizontal on desktop */}
          <div className="hidden md:flex items-center justify-center gap-0">
            {[
              { src: logoAirbnb, alt: "Airbnb" },
              { src: logoBooking, alt: "Booking.com" },
              { src: logoAbritel, alt: "Abritel" },
            ].map((platform, index) => (
              <div key={platform.alt} className="flex items-center">
                {index > 0 && (
                  <div className="w-px h-16 bg-gold/40 mx-6" />
                )}
                <div className="group px-10 py-6 rounded-xl bg-white shadow-medium hover:-translate-y-1 transition-all duration-300">
                  <img
                    src={platform.src}
                    alt={platform.alt}
                    className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: stacked centered cards */}
          <div className="flex md:hidden flex-col items-center gap-4 w-full max-w-[280px]">
            {[
              { src: logoAirbnb, alt: "Airbnb" },
              { src: logoBooking, alt: "Booking.com" },
              { src: logoAbritel, alt: "Abritel" },
            ].map((platform, index) => (
              <div key={platform.alt} className="flex flex-col items-center w-full">
                {index > 0 && (
                  <div className="w-16 h-px bg-gold/40 mb-4" />
                )}
                <div className="group px-8 py-4 rounded-xl bg-white shadow-medium w-full flex items-center justify-center">
                  <img
                    src={platform.src}
                    alt={platform.alt}
                    className="h-12 w-auto object-contain"
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
