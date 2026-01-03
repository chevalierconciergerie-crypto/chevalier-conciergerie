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
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {/* Airbnb Logo */}
              <div className="group flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <svg 
                  viewBox="0 0 448 512" 
                  className="w-8 h-8 text-[#FF5A5F] transition-transform group-hover:scale-110"
                  fill="currentColor"
                >
                  <path d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm-71.91-55.12C103.49 235.35 76.27 181.18 76.27 138.63c0-63.94 51.73-109.63 147.73-109.63 96.41 0 147.73 45.69 147.73 109.63 0 42.55-27.22 96.72-75.82 179.37-23.05 39.49-62.37 100.08-109.1 144.93-46.71-44.85-86.03-105.44-109.1-144.93L152.09 318c35.57-45.71 57.27-78.82 61.92-97.07 4.36-17.11 3.28-33.49-3.16-48.71-6.45-15.23-19.09-27.12-37.71-35.3-14.92-6.55-30.09-9.82-45.47-9.82-40.56 0-70.13 25.36-70.13 66.86 0 27.82 17.36 67.09 52.06 117.99l48.52-73.77c7.08-10.79 4.03-25.29-6.82-32.36-10.85-7.07-25.35-4.03-32.43 6.82l-68.02 103.52c-42.39-62.74-63.59-111.45-63.59-146.24 0-87.43 68.53-138.63 147.73-138.63 79.2 0 147.73 51.2 147.73 138.63 0 34.79-21.2 83.5-63.59 146.24l-68.02-103.52c-7.08-10.85-21.58-13.89-32.43-6.82-10.85 7.07-13.9 21.57-6.82 32.36l48.52 73.77c34.7-50.9 52.06-90.17 52.06-117.99 0-41.5-29.57-66.86-70.13-66.86-15.38 0-30.55 3.27-45.47 9.82-18.62 8.18-31.26 20.07-37.71 35.3-6.44 15.22-7.52 31.6-3.16 48.71 4.65 18.25 26.35 51.36 61.92 97.07z"/>
                </svg>
                <span className="font-sans font-semibold text-foreground text-lg">Airbnb</span>
              </div>

              {/* Booking.com Logo */}
              <div className="group flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8 text-[#003580] transition-transform group-hover:scale-110"
                  fill="currentColor"
                >
                  <path d="M2.273 0v24h6.819c5.88 0 9.09-3.163 9.09-7.073 0-2.636-1.404-4.66-3.727-5.483v-.064c1.713-.842 2.768-2.444 2.768-4.534 0-3.535-2.755-5.846-7.637-5.846H2.273zm3.808 3.385h2.58c2.16 0 3.326.89 3.326 2.62 0 1.796-1.263 2.75-3.407 2.75h-2.5V3.385zm0 8.617h2.869c2.611 0 3.889.955 3.889 2.88 0 1.925-1.294 2.934-4.05 2.934H6.08v-5.814z"/>
                </svg>
                <span className="font-sans font-semibold text-foreground text-lg">Booking.com</span>
              </div>

              {/* Abritel Logo */}
              <div className="group flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8 text-[#0052A5] transition-transform group-hover:scale-110"
                  fill="currentColor"
                >
                  <path d="M12 2L2 8.5v11A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-11L12 2zm0 2.5l7.5 5v10h-15v-10l7.5-5zM9 13v5h6v-5H9z"/>
                </svg>
                <span className="font-sans font-semibold text-foreground text-lg">Abritel</span>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default PlatformLogos;
