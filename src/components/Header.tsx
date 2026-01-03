import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
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
    setOpenSubmenu(null);
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

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-medium py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group">
          <span className="font-serif text-xl md:text-2xl font-semibold tracking-wide text-primary-foreground">
            CHEVALIER{" "}
            <span className="text-gold">CONCIERGERIE</span>
          </span>
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

      {/* Mobile Menu - Slide-in Panel */}
      <div
        className={`lg:hidden fixed inset-0 top-0 z-50 transition-all duration-500 ${
          isMobileMenuOpen ? "visible" : "invisible"
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
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-primary shadow-2xl transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
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
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-primary-foreground/10 last:border-0">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full flex items-center justify-between py-4 font-sans text-lg font-medium text-primary-foreground hover:text-gold transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openSubmenu === item.label ? "rotate-180" : ""
                        }`} 
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openSubmenu === item.label ? "max-h-40 pb-4" : "max-h-0"
                      }`}
                    >
                      <div className="pl-4 space-y-2">
                        <Link
                          to={item.href}
                          className="block py-2 font-sans text-base text-primary-foreground/70 hover:text-gold transition-colors"
                        >
                          Vue d'ensemble
                        </Link>
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="block py-2 font-sans text-base text-primary-foreground/70 hover:text-gold transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block py-4 font-sans text-lg font-medium text-primary-foreground hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
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
      </div>
    </header>
  );
};

export default Header;
