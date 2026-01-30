import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import logoAirbnb from "@/assets/logo-airbnb.png";
import logoBooking from "@/assets/logo-booking.png";
import logoAbritel from "@/assets/logo-abritel.png";

const PlatformLogos = () => {
  return (
    <div className="py-8 md:py-10">
      <ScrollAnimate>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-sans text-sm tracking-wide uppercase mb-10">
            Présent sur les meilleures plateformes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
            {/* Airbnb Logo */}
            <div className="transition-all duration-300 hover:scale-110">
              <img 
                src={logoAirbnb} 
                alt="Airbnb" 
                className="h-20 md:h-28 w-auto object-contain"
              />
            </div>

            {/* Booking.com Logo */}
            <div className="transition-all duration-300 hover:scale-110">
              <img 
                src={logoBooking} 
                alt="Booking.com" 
                className="h-20 md:h-28 w-auto object-contain"
              />
            </div>

            {/* Abritel Logo */}
            <div className="transition-all duration-300 hover:scale-110">
              <img 
                src={logoAbritel} 
                alt="Abritel" 
                className="h-24 md:h-36 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </ScrollAnimate>
    </div>
  );
};

export default PlatformLogos;
