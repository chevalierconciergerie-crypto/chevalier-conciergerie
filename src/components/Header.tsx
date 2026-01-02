import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { 
      label: "Conciergerie", 
      href: "#services",
      subItems: [
        { label: "Tarifs", href: "#pricing" },
        { label: "Services", href: "#services" },
      ]
    },
    { 
      label: "Sous-location", 
      href: "#sublocation",
      subItems: [
        { label: "Avantages", href: "#advantages" },
        { label: "Fonctionnement", href: "#how-it-works" },
      ]
    },
    { label: "À propos", href: "#about" },
    { label: "Contact", href: "#contact" },
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
        <a href="#" className="group">
          <span className={`font-serif text-xl md:text-2xl font-semibold tracking-wide transition-colors duration-300 ${
            isScrolled ? "text-primary-foreground" : "text-primary-foreground"
          }`}>
            CHEVALIER{" "}
            <span className="text-gold">CONCIERGERIE</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <a
                href={item.href}
                className={`font-sans text-sm font-medium tracking-wide transition-colors duration-300 hover:text-gold ${
                  isScrolled ? "text-primary-foreground/80" : "text-primary-foreground/80"
                }`}
              >
                {item.label}
              </a>
              {item.subItems && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-card rounded-lg shadow-medium py-2 min-w-[160px]">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-gold transition-colors"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button variant="gold" size="sm">
            Prendre Rendez-vous
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
              <a
                href={item.href}
                className="font-sans text-lg font-medium text-primary-foreground/90 hover:text-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
              {item.subItems && (
                <div className="mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.label}
                      href={subItem.href}
                      className="block text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button variant="gold" className="mt-4">
            Prendre Rendez-vous
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
