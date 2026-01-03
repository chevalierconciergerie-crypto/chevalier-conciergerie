import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
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
    { 
      label: "Conciergerie", 
      href: "/conciergerie",
      subItems: [
        { label: "Services", href: "/conciergerie#services" },
        { label: "Tarifs", href: "/conciergerie#tarifs" },
      ]
    },
    { 
      label: "Sous-location", 
      href: "/sous-location",
      subItems: [
        { label: "Avantages", href: "/sous-location#avantages" },
        { label: "Fonctionnement", href: "/sous-location#fonctionnement" },
      ]
    },
    { label: "Contact", href: "/contact" },
  ];

  const mobileNavItems = [
    { label: "Accueil", href: "/" },
    { label: "Conciergerie", href: "/conciergerie" },
    { label: "Sous-location", href: "/sous-location" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-primary/95 backdrop-blur-md shadow-medium py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            {/* Decorative line left */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold/60" />
              <div className="w-1.5 h-1.5 rotate-45 border border-gold/60" />
            </div>
            
            {/* Text */}
            <div className="flex flex-col items-center leading-none">
              <span className="font-serif text-xs sm:text-sm tracking-[0.4em] text-primary-foreground/70 uppercase">
                Chevalier
              </span>
              <span className="font-serif text-lg sm:text-xl md:text-2xl font-semibold tracking-[0.15em] text-gold uppercase">
                Conciergerie
              </span>
            </div>
            
            {/* Decorative line right */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1.5 h-1.5 rotate-45 border border-gold/60" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-gold/60" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className="font-sans text-sm font-medium tracking-wide transition-colors duration-300 hover:text-gold text-primary-foreground/80"
                >
                  {item.label}
                </Link>
                {item.subItems && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-card rounded-lg shadow-medium py-2 min-w-[160px]">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-gold transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Button variant="gold" size="sm" asChild>
              <Link to="/contact">Prendre Rendez-vous</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu - Portal to body for proper z-index stacking */}
      {createPortal(
        <div
          className={`lg:hidden fixed inset-0 z-[9999] transition-all duration-500 ${
            isMobileMenuOpen ? "visible" : "invisible pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div
            className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-primary shadow-2xl transition-transform duration-500 ease-out overflow-hidden ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Avignon Skyline SVG Background */}
            <div className="absolute bottom-24 left-0 right-0 opacity-[0.08] pointer-events-none">
              <svg viewBox="0 0 400 200" className="w-full" preserveAspectRatio="xMidYMax meet">
                <g stroke="currentColor" strokeWidth="0.8" fill="none" className="text-gold">
                  <path d="M80 180 L80 100 L100 80 L100 180" />
                  <path d="M100 180 L100 90 L130 90 L130 180" />
                  <path d="M130 180 L130 70 L145 50 L160 70 L160 180" />
                  <path d="M160 180 L160 85 L190 85 L190 180" />
                  <path d="M190 180 L190 95 L210 75 L210 180" />
                  <rect x="85" y="110" width="8" height="12" />
                  <rect x="85" y="140" width="8" height="12" />
                  <rect x="108" y="100" width="8" height="10" />
                  <rect x="108" y="120" width="8" height="10" />
                  <rect x="108" y="145" width="8" height="10" />
                  <rect x="138" y="80" width="6" height="8" />
                  <rect x="152" y="80" width="6" height="8" />
                  <rect x="138" y="100" width="6" height="10" />
                  <rect x="152" y="100" width="6" height="10" />
                  <rect x="138" y="130" width="6" height="10" />
                  <rect x="152" y="130" width="6" height="10" />
                  <rect x="168" y="100" width="8" height="10" />
                  <rect x="168" y="130" width="8" height="10" />
                  <path d="M80 100 L80 95 L84 95 L84 100 M88 100 L88 95 L92 95 L92 100 M96 100 L96 95 L100 95 L100 100" />
                  <path d="M130 70 L130 65 L134 65 L134 70 M138 70 M138 65 L142 65 L142 70" />
                  <path d="M152 70 L152 65 L156 65 L156 70 M156 70 L156 65 L160 65 L160 70" />
                  <path d="M230 180 Q240 160 260 160 Q280 160 290 180" />
                  <path d="M260 160 L260 180" />
                  <path d="M290 180 Q300 165 315 165 Q330 165 340 180" />
                  <path d="M315 165 L315 180" />
                  <path d="M255 160 L255 145 L265 135 L275 145 L275 160" />
                  <rect x="260" y="148" width="5" height="8" />
                  <path d="M20 180 L20 130 L30 120 L40 130 L40 180" />
                  <path d="M30 120 L30 105" />
                  <path d="M28 105 L30 100 L32 105" />
                  <path d="M50 180 L50 140 L60 140 L60 180" />
                  <rect x="53" y="150" width="4" height="6" />
                  <rect x="53" y="165" width="4" height="6" />
                  <ellipse cx="350" cy="165" rx="15" ry="12" />
                  <path d="M350 177 L350 180" />
                  <ellipse cx="370" cy="168" rx="12" ry="10" />
                  <path d="M370 178 L370 180" />
                  <path d="M0 180 L400 180" strokeWidth="0.5" />
                  <path d="M220 185 Q230 183 240 185 Q250 187 260 185 Q270 183 280 185 Q290 187 300 185 Q310 183 320 185 Q330 187 340 185" strokeWidth="0.4" />
                  <path d="M225 190 Q235 188 245 190 Q255 192 265 190 Q275 188 285 190 Q295 192 305 190 Q315 188 325 190 Q335 192 345 190" strokeWidth="0.3" />
                </g>
              </svg>
            </div>

            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary-foreground/10">
              <span className="font-serif text-lg font-semibold text-primary-foreground">
                Menu
              </span>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Content */}
            <nav className="p-6 space-y-2">
              {mobileNavItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block py-4 font-sans text-lg font-medium text-primary-foreground hover:text-gold transition-colors border-b border-primary-foreground/10 last:border-0"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-primary-foreground/10 bg-primary">
              <Button variant="gold" className="w-full mb-4" size="lg" asChild>
                <Link to="/contact">Prendre Rendez-vous</Link>
              </Button>
              <a 
                href="tel:+33783198341" 
                className="flex items-center justify-center gap-2 py-3 font-sans text-sm text-primary-foreground/70 hover:text-gold transition-colors"
              >
                <Phone size={16} />
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