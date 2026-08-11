import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoCc from "@/assets/logo-cc-transparent.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    // « Réserver en direct » (/reservation) et « Nos logements » (/logements) retirés :
    // ces routes n'existent plus depuis le retrait de la réservation en direct. Le pied
    // de page étant sur toutes les pages, elles envoyaient Google sur un 404 servi en
    // HTTP 200 depuis chaque URL du site. À rétablir avec les routes, le cas échéant.
    services: [
      { label: "Conciergerie", href: "/conciergerie" },
      { label: "Sous-location", href: "/sous-location" },
      { label: "Tarifs", href: "/tarifs" },
      { label: "Estimation gratuite", href: "/estimation-sous-location" },
      { label: "Journal", href: "/journal" },
    ],
    company: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "/a-propos" },
      { label: "Nos partenaires", href: "/partenaires" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "CGV", href: "/cgv" },
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
              <img loading="lazy" decoding="async" src={logoCc} alt="Chevalier Conciergerie" className="h-24 w-auto [filter:brightness(0)]" />
            </Link>
            <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Conciergerie et sous-location à Avignon, Villeneuve-lès-Avignon
              et Les Angles. Gestion complète de votre location saisonnière,
              ou loyer garanti chaque mois.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {/*
                Cette ligne affichait « Avignon, 84000 France », alors que les mentions
                légales et les données structurées déclarent 5 Lotissement Les Cades,
                30400 Villeneuve-lès-Avignon. Google recoupe le trio nom / adresse /
                téléphone entre le site, la fiche d'établissement et les annuaires : une
                adresse qui se contredit sur le site lui-même affaiblit le référencement
                local. Elle doit rester identique partout, au caractère près.
              */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 w-4 h-4 shrink-0 text-gold" />
                <span className="font-sans text-sm text-muted-foreground">
                  5 Lotissement Les Cades
                  <br />
                  30400 Villeneuve-lès-Avignon
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
                <a href="mailto:contact@chevalier-conciergerie.com" className="font-sans text-sm text-muted-foreground hover:text-gold transition-colors">
                  contact@chevalier-conciergerie.com
                </a>
              </div>
            </div>
          </div>

          {/*
            Les titres de colonnes sont des <h2>, pas des <h4>.

            Le pied de page apparaît sur toutes les pages, après le dernier titre du
            contenu. Un <h4> qui suit un <h2> saute le niveau 3 : PageSpeed le signalait
            en « Heading elements are not in a sequentially-descending order », et un
            lecteur d'écran y perd le fil. On peut remonter de plusieurs niveaux d'un
            coup, jamais en descendre plus d'un — un <h2> est donc valide quel que soit
            le dernier titre de la page. L'apparence, elle, ne dépend que des classes.
          */}
          {/* Services Links */}
          <div>
            <h2 className="font-serif text-lg font-semibold text-foreground mb-6">
              Services
            </h2>
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
            <h2 className="font-serif text-lg font-semibold text-foreground mb-6">
              Navigation
            </h2>
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
            <h2 className="font-serif text-lg font-semibold text-foreground mb-6">
              Légal
            </h2>
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
