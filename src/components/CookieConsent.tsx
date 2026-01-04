import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Petit délai pour une apparition plus fluide
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                Nous utilisons des cookies
              </h3>
              <p className="text-sm text-muted-foreground">
                Ce site utilise des cookies pour améliorer votre expérience et analyser le trafic. 
                En continuant, vous acceptez notre{" "}
                <Link 
                  to="/politique-confidentialite" 
                  className="text-primary hover:underline"
                >
                  politique de confidentialité
                </Link>.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={acceptEssential}
                className="text-sm"
              >
                Cookies essentiels
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
                className="text-sm"
              >
                Tout accepter
              </Button>
            </div>
            
            <button
              onClick={acceptEssential}
              className="absolute top-3 right-3 md:relative md:top-0 md:right-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
