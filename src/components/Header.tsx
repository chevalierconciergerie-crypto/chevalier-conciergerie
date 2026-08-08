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

  // Sur l'accueil le header est transparent au-dessus du hero sombre.
  // Sur les autres pages (fond clair), on force le header "plein" pour que le menu reste lisible.
  const isHome = location.pathname === "/";
  const solid = isScrolled || !isHome;

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
    { label: "Accueil", href: "/" },
    { label: "Conciergerie", href: "/conciergerie" },
    { label: "Sous-location", href: "/sous-location" },
    { label: "Journal", href: "/journal" },
    { label: "Partenaires", href: "/partenaires" },
    { label: "Contact", href: "/contact" },
  ];

  const mobileNavItems = [
    { label: "Accueil", href: "/", number: "01" },
    { label: "Conciergerie", href: "/conciergerie", number: "02" },
    { label: "Sous-location", href: "/sous-location", number: "03" },
    { label: "Journal", href: "/journal", number: "04" },
    { label: "Partenaires", href: "/partenaires", number: "05" },
    { label: "Contact", href: "/contact", number: "06" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-background/95 backdrop-blur-md shadow-soft py-1 border-b border-border"
            : "bg-transparent py-4"
        }`}
      >
        <div className="w-full px-2 flex items-center justify-between relative">
          {/* Logo */}
          <Link to="/" className="group flex items-center -ml-4">
            <img
              src={logoCc}
              alt="Chevalier Conciergerie"
              className={`w-auto object-contain [filter:brightness(0)] transition-all duration-500 ${
                solid
                  ? "h-12 sm:h-14 md:h-16"
                  : "h-28 sm:h-32 md:h-36 drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
              }`}
            />
          </Link>

          {/* Desktop Navigation — centrée */}
          {/*
            whitespace-nowrap : « Sous-location » se cassait en deux lignes et déformait
            toute la barre. Graisse ramenée de semibold à normal et taille de text-base
            à text-xs : en capitales espacées, le gras fait lourd et bon marché. Le
            survol passe au noir plutôt qu'à l'or — la barre reste en noir et blanc,
            l'or est gardé pour le seul bouton Réserver.
          */}
          <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`whitespace-nowrap font-sans text-xs font-normal uppercase tracking-[0.18em] transition-colors duration-300 ${
                  solid
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/*
            Le bouton Réserver pointait vers /reservation. Le moteur de réservation est
            retiré en attendant que le site de réservation soit opérationnel : l'appel
            à l'action renvoie donc vers le contact, qui est la vraie conversion tant
            que la réservation en direct n'existe pas.
          */}
          <div className="hidden lg:block">
            <Button variant="gold" size="lg" className="px-7 text-sm font-medium shadow-md" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>

          {/* Mobile Menu Button — Custom animated burger */}
          <button
            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-[6px] relative z-[10000]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className={`block w-7 h-[1.5px] transition-all duration-500 ease-out origin-center ${
              solid && !isMobileMenuOpen ? "bg-foreground" : "bg-primary-foreground"
            } ${
              isMobileMenuOpen ? "rotate-45 translate-y-[7.5px]" : ""
            }`} />
            <span className={`block w-5 h-[1.5px] bg-gold transition-all duration-300 ease-out ${
              isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
            }`} />
            <span className={`block w-7 h-[1.5px] transition-all duration-500 ease-out origin-center ${
              solid && !isMobileMenuOpen ? "bg-foreground" : "bg-primary-foreground"
            } ${
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
            {/*
              Montée seulement quand le menu est ouvert. Auparavant la balise restait
              dans le DOM en permanence : le navigateur téléchargeait et décodait 1,8 Mo
              de vidéo en continu, pour un rendu invisible sous le voile à 85 % ci-dessous.
            */}
            {isMobileMenuOpen && (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-700"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            )}
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
                  <span className="font-sans text-xs tracking-[0.3em] text-gold/40 w-8">
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

              
              <Button variant="gold" className="w-full max-w-xs" size="lg" asChild>
                <Link to="/estimation-sous-location" onClick={() => setIsMobileMenuOpen(false)}>
                  Estimation gratuite
                </Link>
              </Button>
              <Button variant="outline-light" className="w-full max-w-xs" size="lg" asChild>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
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
