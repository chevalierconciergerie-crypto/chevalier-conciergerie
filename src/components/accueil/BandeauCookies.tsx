import { useT } from "@/i18n/langue";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./chevalier.css";

const CLE = "chv-cookies";
export const EVENEMENT_COOKIES = "chv-cookies-ouvrir";

/*
  Bandeau de consentement, discret, en bas de l'écran. Refuser est aussi
  simple qu'accepter (exigence de la CNIL). Le choix est gardé dans le
  navigateur ; le lien « Gestion des cookies » du pied de page rouvre le
  bandeau. La mesure d'audience Vercel ne dépose aucun cookie : ce bandeau
  informe et recueille le choix, il ne bloque rien.
*/
const BandeauCookies = () => {
  const t = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CLE)) setVisible(true);
    } catch {
      setVisible(true);
    }
    const ouvrir = () => setVisible(true);
    window.addEventListener(EVENEMENT_COOKIES, ouvrir);
    return () => window.removeEventListener(EVENEMENT_COOKIES, ouvrir);
  }, []);

  const choisir = (choix: "acceptes" | "refuses") => {
    try {
      localStorage.setItem(CLE, JSON.stringify({ choix, date: new Date().toISOString() }));
    } catch {
      /* navigation privée : le bandeau reviendra à la prochaine visite */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="chv-cookies" role="region" aria-label={t("Cookies")}>
      <p>
        {t("Ce site utilise des")} <Link to="/politique-confidentialite">{t("cookies")}</Link>
      </p>
      <div className="chv-cookies__boutons">
        <button type="button" className="chv-cookies__refuser" onClick={() => choisir("refuses")}>
          {t("Refuser")}
        </button>
        <button type="button" className="chv-cookies__accepter" onClick={() => choisir("acceptes")}>
          {t("Accepter")}
        </button>
      </div>
      {/*
        Bouton × discret : la CNIL demande depuis 2022 que fermer le bandeau vaille
        refus, et qu'un choix négatif soit aussi facile qu'un choix positif. Sur mobile
        c'est aussi ce qui libère la page pour les visiteurs qui veulent d'abord lire.
      */}
      <button
        type="button"
        className="chv-cookies__fermer"
        onClick={() => choisir("refuses")}
        aria-label={t("Fermer") || "Fermer"}
      >
        <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default BandeauCookies;
