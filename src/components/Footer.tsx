import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoCc from "@/assets/logo-cc-transparent.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "Conciergerie", href: "/conciergerie" },
      { label: "Sous-location", href: "/sous-location" },
      { label: "Estimation gratuite", href: "/contact" },
    ],
    company: [
      { label: "Accueil", href: "/" },
      { label: "Contact", href: "/contact" },
      { label: "Conciergerie", href: "/conciergerie" },
      { label: "Sous-location", href: "/sous-location" },
      { label: "Nos partenaires", href: "/partenaires" },
    ],
    legal: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/politique-confidentialite" },
      { label: "Gestion des cookies", href: "/politique-confidentialite" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/chevalier_conciergerie/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/share/1GCBBTtP2R/", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/chevalier-conciergerie-7559b03a4/", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-background border-t border-border pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={logoCc} alt="Chevalier Conciergerie" className="h-24 w-auto [filter:brightness(0)]" />
            </Link>
            <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              L'excellence de la gestion locative à Avignon.
              Conciergerie haut de gamme et sous-location professionnelle
              pour des propriétaires exigeants.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="font-sans text-sm text-muted-foreground">
                  Avignon, 84000 France
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+33783198341" className="font-sans text-sm text-muted-foreground hover:text-gold transition-colors">
                  +33 7 83 19 83 41
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <a href="mailto:chevalierconciergerie@gmail.com" className="font-sans text-sm text-muted-foreground hover:text-gold transition-colors">
                  chevalierconciergerie@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-6">
              Légal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-muted-foreground/70">
            © {currentYear} Chevalier Conciergerie. Tous droits réservés.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-gold/20 transition-colors group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
