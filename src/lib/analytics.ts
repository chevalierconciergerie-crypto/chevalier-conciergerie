/**
 * Google Analytics 4, chargé uniquement après consentement.
 *
 * Rien n'est téléchargé ni déposé tant que le visiteur n'a pas cliqué sur « Accepter »
 * dans le bandeau (src/components/accueil/BandeauCookies.tsx). Refuser, ou fermer le
 * bandeau, laisse le script absent : c'est ce que la CNIL demande pour un outil de mesure
 * qui dépose des cookies.
 *
 * Le site est une application monopage : le navigateur ne recharge pas la page quand on
 * change de route, donc GA4 ne verrait que la première page. `envoyerPage` est appelée
 * à chaque changement d'adresse par <SuiviPages /> (src/components/SuiviPages.tsx).
 */

/** Identifiant de mesure public de la propriété GA4 « chevalier-conciergerie.com ». */
export const GA_ID = "G-Y4EXXVHG8W";

const CLE_CHOIX = "chv-cookies";

type FenetreGA = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [cle: string]: unknown;
};

let actif = false;

/** Le visiteur a-t-il accepté les cookies de mesure d'audience ? */
export function consentementAccepte(): boolean {
  try {
    const brut = localStorage.getItem(CLE_CHOIX);
    return !!brut && JSON.parse(brut).choix === "acceptes";
  } catch {
    return false;
  }
}

export const analyticsActif = () => actif;

/** Charge gtag.js et envoie la page en cours. Sans effet si déjà chargé. */
export function activerAnalytics(): void {
  if (actif || typeof window === "undefined") return;
  const w = window as unknown as FenetreGA;

  w[`ga-disable-${GA_ID}`] = false;
  actif = true;

  w.dataLayer = w.dataLayer || [];
  // gtag exige l'objet `arguments`, pas un tableau : un tableau est ignoré par gtag.js.
  w.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  // send_page_view désactivé : on l'envoie nous-mêmes, à chaque route.
  w.gtag("config", GA_ID, { send_page_view: false, anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  envoyerPage();
}

/** Coupe la mesure (refus après un accord). Le script déjà chargé cesse d'envoyer. */
export function desactiverAnalytics(): void {
  if (typeof window === "undefined") return;
  (window as unknown as FenetreGA)[`ga-disable-${GA_ID}`] = true;
  actif = false;
}

/** Envoie une vue de page pour l'adresse affichée. */
export function envoyerPage(): void {
  if (!actif || typeof window === "undefined") return;
  const w = window as unknown as FenetreGA;
  w.gtag?.("event", "page_view", {
    page_path: window.location.pathname + window.location.search,
    page_location: window.location.href,
    page_title: document.title,
  });
}
