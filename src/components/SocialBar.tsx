import { Instagram, Linkedin, Facebook } from "lucide-react";

const SocialBar = () => {
  const socialLinks = [
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/chevalier_conciergerie/", 
      label: "Instagram",
      bgColor: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
      hoverColor: "hover:from-purple-700 hover:via-pink-600 hover:to-orange-500"
    },
    { 
      icon: Facebook, 
      href: "https://www.facebook.com/share/1GCBBTtP2R/", 
      label: "Facebook",
      bgColor: "bg-[#1877F2]",
      hoverColor: "hover:bg-[#166FE5]"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/chevalier-conciergerie-7559b03a4/", 
      label: "LinkedIn",
      bgColor: "bg-[#0A66C2]",
      hoverColor: "hover:bg-[#004182]"
    },
  ];

  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          <p className="font-sans text-muted-foreground text-sm tracking-wide">
            Suivez-nous sur les réseaux
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full ${social.bgColor} ${social.hoverColor} flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110`}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialBar;
