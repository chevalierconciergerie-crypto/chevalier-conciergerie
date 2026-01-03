import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import logoAirbnb from "@/assets/logo-airbnb.png";
import logoBooking from "@/assets/logo-booking.png";
import logoAbritel from "@/assets/logo-abritel.png";

const PlatformLogos = () => {
  return (
    <section className="py-12 bg-secondary/50 border-y border-border/30">
      <div className="container mx-auto px-6">
        <ScrollAnimate>
          <div className="flex flex-col items-center">
            <p className="text-muted-foreground font-sans text-sm tracking-wide uppercase mb-8">
              Présent sur les meilleures plateformes
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {/* Airbnb Logo */}
              <div className="group opacity-70 hover:opacity-100 transition-all duration-300">
                <img 
                  src={logoAirbnb} 
                  alt="Airbnb" 
                  className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Booking.com Logo */}
              <div className="group opacity-70 hover:opacity-100 transition-all duration-300">
                <img 
                  src={logoBooking} 
                  alt="Booking.com" 
                  className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Abritel Logo */}
              <div className="group opacity-70 hover:opacity-100 transition-all duration-300">
                <img 
                  src={logoAbritel} 
                  alt="Abritel" 
                  className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default PlatformLogos;
