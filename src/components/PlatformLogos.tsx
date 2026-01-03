import { ScrollAnimate } from "@/hooks/useScrollAnimation";

const PlatformLogos = () => {
  return (
    <section className="py-12 bg-secondary/50 border-y border-border/30">
      <div className="container mx-auto px-6">
        <ScrollAnimate>
          <div className="flex flex-col items-center">
            <p className="text-muted-foreground font-sans text-sm tracking-wide uppercase mb-8">
              Présent sur les meilleures plateformes
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              {/* Airbnb Logo */}
              <div className="group opacity-80 hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FF5A5F] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-11 md:h-11 text-white" fill="currentColor">
                    <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm5.696 14.943c-.234.573-.54 1.072-.91 1.502-.374.432-.79.795-1.245 1.084-.457.29-.932.51-1.423.659-.49.148-.975.223-1.453.223-.332 0-.647-.034-.946-.1-.3-.068-.586-.17-.858-.304-.273-.135-.532-.3-.778-.495-.247-.196-.48-.42-.7-.67-.22.25-.453.474-.7.67-.246.195-.505.36-.778.495-.272.134-.558.236-.858.304-.299.066-.614.1-.946.1-.478 0-.963-.075-1.453-.223-.491-.149-.966-.369-1.423-.659-.455-.289-.871-.652-1.245-1.084-.37-.43-.676-.929-.91-1.502-.234-.573-.351-1.201-.351-1.888 0-.776.175-1.545.526-2.307.35-.762.833-1.502 1.447-2.218.614-.717 1.335-1.39 2.16-2.02.826-.63 1.71-1.197 2.65-1.7.123-.066.251-.125.384-.176.133-.052.27-.078.41-.078.14 0 .277.026.41.078.133.051.261.11.384.176.94.503 1.824 1.07 2.65 1.7.825.63 1.546 1.303 2.16 2.02.614.716 1.097 1.456 1.447 2.218.351.762.526 1.531.526 2.307 0 .687-.117 1.315-.351 1.888z"/>
                  </svg>
                </div>
              </div>

              {/* Booking.com Logo */}
              <div className="group opacity-80 hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#003580] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl md:text-3xl">B</span>
                </div>
              </div>

              {/* Abritel / VRBO Logo */}
              <div className="group opacity-80 hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#3B5998] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-11 md:h-11 text-white" fill="currentColor">
                    <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7zm-9 .7c0-1.1.9-2 2-2s2 .9 2 2h-4z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default PlatformLogos;
