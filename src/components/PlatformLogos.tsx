import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import logoAirbnb from "@/assets/logo-airbnb.png";
import logoBooking from "@/assets/logo-booking.png";
import logoAbritel from "@/assets/logo-abritel.png";

/**
 * Glass-morphic monochrome platform strip — designed to live on top of
 * the cinematic dark backdrop. The logos are rendered as white silhouettes
 * (CSS filter) so they read elegantly against the video; on hover the
 * card gets a soft gold ring + glow. Airbnb / Booking / Abritel are
 * separated by hairline gold dividers like an editorial credit line.
 */

const platforms = [
  { src: logoAirbnb, alt: "Airbnb" },
  { src: logoBooking, alt: "Booking.com" },
  { src: logoAbritel, alt: "Abritel" },
];

const PlatformLogos = () => {
  return (
    <div className="py-12 md:py-16 px-4">
      <ScrollAnimate>
        <div className="flex flex-col items-center">
          {/* Editorial title with gold rules */}
          <div className="flex items-center gap-4 md:gap-5 mb-10 md:mb-12">
            <div className="w-10 md:w-16 h-px bg-gold/45" />
            <p className="font-sans text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-primary-foreground/55 whitespace-nowrap">
              Une présence sur les meilleures plateformes
            </p>
            <div className="w-10 md:w-16 h-px bg-gold/45" />
          </div>

          {/* Desktop : horizontal strip */}
          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12">
            {platforms.map((p, i) => (
              <div key={p.alt} className="flex items-center">
                {i > 0 && (
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/35 to-transparent mr-8 lg:mr-12" />
                )}
                <div className="group relative">
                  {/* Soft gold glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gold/30 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative px-9 lg:px-11 py-5 rounded-2xl border border-gold/20 bg-primary-foreground/[0.92] backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:border-gold/55 group-hover:bg-primary-foreground/95 group-hover:-translate-y-0.5">
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-9 lg:h-11 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile : stacked, identical glass cards */}
          <div className="flex md:hidden flex-col items-center gap-3 w-full max-w-[280px]">
            {platforms.map((p, i) => (
              <div key={p.alt} className="w-full flex flex-col items-center">
                {i > 0 && <div className="w-12 h-px bg-gold/30 mb-3" />}
                <div className="group relative w-full">
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gold/25 blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                  <div className="relative px-8 py-4 rounded-xl border border-gold/20 bg-primary-foreground/[0.92] backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] flex items-center justify-center">
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-7 w-auto object-contain"
                    />
                  </div>
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
