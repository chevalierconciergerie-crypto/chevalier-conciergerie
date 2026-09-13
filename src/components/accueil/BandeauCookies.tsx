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
    <div className="chv-cookies" role="region" aria-label="Cookies">
      <p>
        Ce site utilise des <Link to="/politique-confidentialite">cookies</Link>
      </p>
      <div className="chv-cookies__boutons">
        <button type="button" className="chv-cookies__refuser" onClick={() => choisir("refuses")}>
          Refuser
        </button>
        <button type="button" className="chv-pastille" onClick={() => choisir("acceptes")}>
          Accepter
        </button>
      </div>
    </div>
  );
};

export default BandeauCookies;
