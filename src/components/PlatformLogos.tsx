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
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
              {/* Airbnb Logo */}
              <div className="group transition-all duration-300 hover:scale-110">
                <img 
                  src={logoAirbnb} 
                  alt="Airbnb" 
                  className="h-16 md:h-24 w-auto object-contain drop-shadow-sm"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>

              {/* Booking.com Logo */}
              <div className="group transition-all duration-300 hover:scale-110">
                <img 
                  src={logoBooking} 
                  alt="Booking.com" 
                  className="h-16 md:h-24 w-auto object-contain drop-shadow-sm"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>

              {/* Abritel Logo */}
              <div className="group transition-all duration-300 hover:scale-110">
                <img 
                  src={logoAbritel} 
                  alt="Abritel" 
                  className="h-16 md:h-24 w-auto object-contain drop-shadow-sm"
                  style={{ mixBlendMode: 'multiply' }}
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
