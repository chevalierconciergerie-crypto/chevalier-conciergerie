import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logoCc from "@/assets/logo-cc-transparent.png";
import heroVideo from "@/assets/hero-video-luxury.mp4";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "Conciergerie", href: "/conciergerie" },
    { label: "Sous-location", href: "/sous-location" },
    { label: "Contact", href: "/contact" },
  ];

  const mobileNavItems = [
    { label: "Accueil", href: "/", number: "01" },
    { label: "Conciergerie", href: "/conciergerie", number: "02" },
    { label: "Sous-location", href: "/sous-location", number: "03" },
    { label: "Contact", href: "/contact", number: "04" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-primary/95 backdrop-blur-md shadow-medium py-1 border-b border-gold/20"
            : "bg-transparent py-4"
        }`}
      >
        <div className="w-full px-2 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center -ml-4">
            <img 
              src={logoCc} 
              alt="Chevalier Conciergerie" 
              className={`w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-500 ${
                isScrolled ? "h-12 sm:h-14 md:h-16" : "h-28 sm:h-32 md:h-36"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="font-sans text-sm font-medium tracking-wide transition-colors duration-300 hover:text-gold text-primary-foreground/80"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="gold" size="sm" asChild>
              <Link to="/contact">Prendre Rendez-vous</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button — Custom animated burger */}
          <button
            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-[6px] relative z-[10000]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className={`block w-7 h-[1.5px] bg-primary-foreground transition-all duration-500 ease-out origin-center ${
              isMobileMenuOpen ? "rotate-45 translate-y-[7.5px]" : ""
            }`} />
            <span className={`block w-5 h-[1.5px] bg-gold transition-all duration-300 ease-out ${
              isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
            }`} />
            <span className={`block w-7 h-[1.5px] bg-primary-foreground transition-all duration-500 ease-out origin-center ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
            }`} />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu — Immersive with video background */}
      {createPortal(
        <div
          className={`lg:hidden fixed inset-0 z-[9999] transition-all duration-700 ${
            isMobileMenuOpen ? "visible" : "invisible pointer-events-none"
          }`}
        >
          {/* Video background */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                isMobileMenuOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
            {/* Dark overlay */}
            <div className={`absolute inset-0 bg-primary/85 backdrop-blur-sm transition-opacity duration-700 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`} />
          </div>

          {/* Close button — top right */}
          <button
            className={`absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/60 hover:text-gold hover:border-gold/40 transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? '100ms' : '0ms' }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className={`absolute inset-0 flex flex-col justify-between transition-all duration-700 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}>
            
            {/* Top — Logo centered */}
            <div className={`flex items-center justify-center pt-20 transition-all duration-600 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`} style={{ transitionDelay: isMobileMenuOpen ? '150ms' : '0ms' }}>
              <img 
                src={logoCc} 
                alt="Chevalier Conciergerie" 
                className="h-52 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Center — Nav links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
              {mobileNavItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`group flex items-center gap-4 py-4 w-full max-w-xs transition-all duration-500 ${
                    isMobileMenuOpen 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${250 + index * 100}ms` : '0ms' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {/* Number */}
                  <span className="font-sans text-[10px] tracking-[0.3em] text-gold/40 w-8">
                    {item.number}
                  </span>
                  {/* Thin line */}
                  <span className="w-6 h-px bg-gold/20 group-hover:w-10 group-hover:bg-gold/60 transition-all duration-500" />
                  {/* Label */}
                  <span className="font-serif text-2xl text-primary-foreground/90 group-hover:text-gold transition-colors duration-300 tracking-wide">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Bottom — CTA + Phone */}
            <div className={`px-8 pb-10 flex flex-col items-center gap-5 transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`} style={{ transitionDelay: isMobileMenuOpen ? '650ms' : '0ms' }}>
              
              {/* Thin separator */}
              <div className="w-16 h-px bg-gold/30 mb-2" />
              
              <Button variant="gold" className="w-full max-w-xs" size="lg" asChild>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Prendre Rendez-vous
                </Link>
              </Button>
              
              <a 
                href="tel:+33783198341" 
                className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] text-primary-foreground/40 hover:text-gold transition-colors uppercase"
              >
                <Phone size={14} />
                +33 7 83 19 83 41
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;
