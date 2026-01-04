import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import logoAirbnb from "@/assets/logo-airbnb.png";
import logoBooking from "@/assets/logo-booking.png";
import logoAbritel from "@/assets/logo-abritel.png";

const PlatformLogos = () => {
  return (
    <div className="py-8 md:py-10">
      <ScrollAnimate>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-sans text-xs tracking-wide uppercase mb-6">
            Présent sur les meilleures plateformes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {/* Airbnb Logo */}
            <div className="transition-all duration-300 hover:scale-105">
              <img 
                src={logoAirbnb} 
                alt="Airbnb" 
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>

            {/* Booking.com Logo */}
            <div className="transition-all duration-300 hover:scale-105">
              <img 
                src={logoBooking} 
                alt="Booking.com" 
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>

            {/* Abritel Logo */}
            <div className="transition-all duration-300 hover:scale-105">
              <img 
                src={logoAbritel} 
                alt="Abritel" 
                className="h-14 md:h-20 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </ScrollAnimate>
    </div>
  );
};

export default PlatformLogos;
