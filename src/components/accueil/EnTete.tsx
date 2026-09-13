import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import { COURRIEL, RESEAUX, RUBRIQUES, TELEPHONE } from "@/data/accueil";
import { allerA } from "./effets";
import "./chevalier.css";

const LOGO = "/accueil/logo-chevalier-blanc.png";
const PHOTO_TAMBOUR = "/accueil/hero-pont-avignon.webp";

/* Géométrie du tambour : 18 facettes de 78 px forment un cercle de rayon 221 px. */
const FACETTES = 18;
const LARGEUR_FACETTE = 78;
const HAUTEUR_TAMBOUR = 290;
const RAYON = LARGEUR_FACETTE / (2 * Math.tan(Math.PI / FACETTES));

function Tambour() {
  return (
    <div className="chv-tambour" aria-hidden="true">
      <div className="chv-anneau chv-anneau--arriere" />
      <div className="chv-tambour__scene">
        <div
          className="chv-tambour__rotor"
          style={{ "--face": `${LARGEUR_FACETTE}px`, "--haut": `${HAUTEUR_TAMBOUR}px` } as CSSProperties}
        >
          {Array.from({ length: FACETTES }, (_, i) => (
            <div
              key={i}
              className="chv-tambour__face"
              style={{
                backgroundImage: `url(${PHOTO_TAMBOUR})`,
                backgroundSize: `${FACETTES * LARGEUR_FACETTE}px ${(FACETTES * LARGEUR_FACETTE) / 2}px`,
                backgroundPosition: `${-i * LARGEUR_FACETTE}px center`,
                transform: `rotateY(${(i * 360) / FACETTES}deg) translateZ(${RAYON.toFixed(1)}px)`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="chv-anneau chv-anneau--avant" />
    </div>
  );
}

function RondEstimation({ onClick }: { onClick: () => void }) {
  return (
    <a href="/#contact" className="chv-rond" onClick={(e) => { e.preventDefault(); onClick(); }}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="chv-cercle" d="M 100,100 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0" />
        </defs>
        <text>
          <textPath href="#chv-cercle">CHEVALIER · CONCIERGERIE · AVIGNON · </textPath>
        </text>
      </svg>
      <span>Estimation<br />gratuite</span>
    </a>
  );
}

/**
  La barre du haut, commune à toutes les pages : pastille MENU, mot-symbole
  CHEVALIER au centre, « Être rappelé » à droite. Le menu s'ouvre en plein
  écran ; chaque rubrique est une ancre de l'accueil.
*/
const EnTete = () => {
  const [ouvert, setOuvert] = useState(false);
  const { pathname } = useLocation();
  const naviguer = useNavigate();

  const fermer = useCallback(() => {
    setOuvert(false);
    document.documentElement.style.overflow = "";
  }, []);

  const aller = useCallback(
    (ancre: string) => {
      fermer();
      if (pathname === "/") {
        // Le verrou de défilement vient d'être levé : on laisse le navigateur
        // en prendre acte avant de lancer le défilement.
        setTimeout(() => allerA(ancre), 40);
      } else {
        naviguer(ancre === "accueil" ? "/" : `/#${ancre}`);
      }
    },
    [fermer, naviguer, pathname],
  );

  useEffect(() => {
    document.documentElement.style.overflow = ouvert ? "hidden" : "";
    if (!ouvert) return;
    const clavier = (e: KeyboardEvent) => e.key === "Escape" && fermer();
    window.addEventListener("keydown", clavier);
    return () => window.removeEventListener("keydown", clavier);
  }, [ouvert, fermer]);

  useEffect(() => fermer, [pathname, fermer]);

  const barre = (dansMenu: boolean) => (
    <div className="chv-entete" role={dansMenu ? undefined : "banner"}>
      <div className="chv-entete__gauche">
        {dansMenu ? (
          <button type="button" className="chv-pastille chv-pastille--rond" onClick={fermer} aria-label="Fermer le menu">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className="chv-pastille chv-pastille--menu"
            onClick={() => setOuvert(true)}
            aria-expanded={ouvert}
            aria-controls="chv-menu"
            aria-label="Ouvrir le menu"
          >
            <span className="chv-burger" aria-hidden="true"><span /><span /></span>
            <span className="chv-pastille__texte">Menu</span>
          </button>
        )}
      </div>
      <Link to="/" className="chv-logo" onClick={(e) => { if (pathname === "/") { e.preventDefault(); aller("accueil"); } }} aria-label="Chevalier Conciergerie, accueil">
        <img src={LOGO} alt="CHEVALIER" width={996} height={129} />
      </Link>
      <div className="chv-entete__droite">
        <a
          href="/#contact"
          className="chv-pastille chv-entete__appel-long"
          onClick={(e) => { e.preventDefault(); aller("contact"); }}
        >
          Être rappelé
        </a>
        <a href={TELEPHONE.lien} className="chv-pastille chv-pastille--rond chv-entete__appel-court" aria-label={`Appeler le ${TELEPHONE.affiche}`}>
          <Phone size={15} strokeWidth={1.8} />
        </a>
      </div>
    </div>
  );

  return (
    <>
      <header>{barre(false)}</header>

      <div id="chv-menu" className={`chv-menu ${ouvert ? "est-ouvert" : ""}`} aria-hidden={!ouvert} role="dialog" aria-label="Menu">
        {barre(true)}
        <div className="chv-menu__corps">
          <nav aria-label="Rubriques">
            <ul className="chv-menu__liens">
              {RUBRIQUES.map((r, i) => (
                <li key={r.ancre}>
                  <a
                    href={r.ancre === "accueil" ? "/" : `/#${r.ancre}`}
                    style={{ "--i": i } as CSSProperties}
                    tabIndex={ouvert ? 0 : -1}
                    onClick={(e) => { e.preventDefault(); aller(r.ancre); }}
                  >
                    {r.libelle}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {ouvert && <Tambour />}
          <RondEstimation onClick={() => aller("contact")} />
        </div>
        <div className="chv-menu__pied">
          <a href={TELEPHONE.lien} tabIndex={ouvert ? 0 : -1}>{TELEPHONE.affiche}</a>
          <a href={COURRIEL.lien} tabIndex={ouvert ? 0 : -1}>{COURRIEL.affiche}</a>
          {RESEAUX.map((r) => (
            <a key={r.nom} href={r.lien} target="_blank" rel="noopener noreferrer" tabIndex={ouvert ? 0 : -1}>{r.nom}</a>
          ))}
        </div>
      </div>
    </>
  );
};

export default EnTete;
