import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
          className="lg:hidden text-primary-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-primary/98 backdrop-blur-md transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center justify-center gap-6 pt-12">
          {navItems.map((item) => (
            <div key={item.label} className="text-center">
              <Link
                to={item.href}
                className="font-sans text-lg font-medium text-primary-foreground/90 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
              {item.subItems && (
                <div className="mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      to={subItem.href}
                      className="block text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button variant="gold" className="mt-4" asChild>
            <Link to="/contact">Prendre Rendez-vous</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
