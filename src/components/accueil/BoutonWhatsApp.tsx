import { useLocation } from "react-router-dom";
import { useT } from "@/i18n/langue";
import { lienWhatsApp, MESSAGE_WHATSAPP } from "@/data/accueil";
import { logementParSlug } from "@/data/logementsVitrine";

/*
  Bouton WhatsApp fixe, au-dessus de la bulle de l'assistant : il ouvre la
  discussion avec Victor, message déjà écrit. Sur la fiche d'un logement, le
  message cite le logement.
*/
export default function BoutonWhatsApp() {
  const t = useT();
  const { pathname } = useLocation();
  const slug = pathname.match(/\/logements\/([^/]+)/)?.[1];
  const logement = slug ? logementParSlug(slug) : undefined;
  const texte = logement
    ? `Bonjour, je vous contacte depuis le site de Chevalier Conciergerie au sujet du logement « ${logement.nom} ».`
    : MESSAGE_WHATSAPP;
  return (
    <a className="chv-whatsapp" href={lienWhatsApp(texte)} target="_blank" rel="noopener" aria-label={t("Écrire sur WhatsApp")}>
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.02 3C8.84 3 3 8.83 3 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.96 12.96 0 0 0 16.02 29C23.2 29 29 23.17 29 16S23.2 3 16.02 3Zm0 23.8c-2.02 0-3.99-.54-5.71-1.57l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.73 10.73 0 0 1 5.2 16c0-5.96 4.85-10.8 10.82-10.8 5.96 0 10.8 4.84 10.8 10.8 0 5.96-4.84 10.8-10.8 10.8Zm5.93-8.09c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.17-.22.32-.84 1.05-1.03 1.27-.19.22-.38.24-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.93-1.81-2.25-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.32.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.3 3.5 5.56 4.91.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.62-.38Z"
        />
      </svg>
    </a>
  );
}
