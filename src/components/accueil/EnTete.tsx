import { Drapeaux, useLangue, useT } from "@/i18n/langue";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { COURRIEL, RESEAUX, RUBRIQUES, TELEPHONE } from "@/data/accueil";
import { allerA } from "./effets";
import "./chevalier.css";

const LOGO = "/accueil/logo-chevalier-blanc.png";
const ESTIMATION = "/estimation-sous-location";

/* Les trois réseaux, en icônes cliquables. */
function Reseaux({ tabIndex }: { tabIndex?: number }) {
  return (
    <div className="chv-reseaux">
      {RESEAUX.map((r) => (
        <a key={r.nom} href={r.lien} target="_blank" rel="noopener noreferrer" title={r.nom} tabIndex={tabIndex}>
          <img src={r.logo} alt={r.nom} width={26} height={26} />
        </a>
      ))}
    </div>
  );
}
const PHOTO_TAMBOUR = "/accueil/hero-pont-avignon.webp";

/*
  Géométrie du tambour : 18 facettes. Leur largeur suit celle de l'écran
  (96 px sur un portable, jusqu'à 150 px sur un grand écran) pour que le
  tambour garde la même présence partout. Monté à l'ouverture du menu, il
  prend la mesure de l'écran à ce moment-là.
*/
const FACETTES = 18;

function Tambour() {
  const LARGEUR_FACETTE = Math.round(Math.min(150, Math.max(96, window.innerWidth * 0.075)));
  const HAUTEUR_TAMBOUR = Math.round(LARGEUR_FACETTE * 3.55);
  const RAYON = LARGEUR_FACETTE / (2 * Math.tan(Math.PI / FACETTES));
  return (
    <div className="chv-tambour" aria-hidden="true">
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
    </div>
  );
}

/**
  La barre du haut, commune à toutes les pages : pastille MENU, mot-symbole
  CHEVALIER au centre, réseaux et « Estimation gratuite » à droite. Le menu s'ouvre en plein
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

  const t = useT();
  const { lien } = useLangue();

  const aller = useCallback(
    (ancre: string, page?: string) => {
      fermer();
      // Une rubrique qui porte une page n'est pas une ancre : on y navigue.
      if (page) {
        naviguer(page);
        return;
      }
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
        {/*
          Sur grand écran les rubriques sont posées dans la barre : cacher la
          navigation derrière un bouton coûte un clic et une intention à chaque
          visiteur. En dessous de 1100 px elles ne tiennent plus, et le tambour
          plein écran reprend la main.
        */}
        {!dansMenu && (
          <nav className="chv-entete__nav" aria-label={t("Rubriques")}>
            {RUBRIQUES.filter((r) => r.ancre !== "accueil").map((r) => (
              <a
                key={r.ancre}
                href={"page" in r && r.page ? r.page : `/#${r.ancre}`}
                onClick={(e) => { e.preventDefault(); aller(r.ancre, "page" in r ? r.page : undefined); }}
              >
                {t(r.libelle)}
              </a>
            ))}
          </nav>
        )}
        {dansMenu ? (
          <button type="button" className="chv-pastille chv-pastille--rond" onClick={fermer} aria-label={t("Fermer le menu")}>
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
            aria-label={t("Ouvrir le menu")}
          >
            <span className="chv-burger" aria-hidden="true"><span /><span /></span>
            <span className="chv-pastille__texte">{t("Menu")}</span>
          </button>
        )}
      </div>
      <Link to={lien("/")} className="chv-logo" onClick={(e) => { if (pathname === "/") { e.preventDefault(); aller("accueil"); } }} aria-label={t("Chevalier Conciergerie, accueil")}>
        <img src={LOGO} alt="CHEVALIER" width={996} height={129} />
      </Link>
      <div className="chv-entete__droite">
        <Drapeaux />
        <Reseaux tabIndex={dansMenu && !ouvert ? -1 : undefined} />
        <Link to={lien(ESTIMATION)} className="chv-pastille" tabIndex={dansMenu && !ouvert ? -1 : undefined}>
          <span className="chv-entete__appel-long">{t("Estimation gratuite")}</span>
          <span className="chv-entete__appel-court">{t("Estimation")}</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <header>{barre(false)}</header>

      <div id="chv-menu" className={`chv-menu ${ouvert ? "est-ouvert" : ""}`} aria-hidden={!ouvert} role="dialog" aria-label="Menu">
        {barre(true)}
        <div className="chv-menu__corps">
          <nav aria-label={t("Rubriques")}>
            <ul className="chv-menu__liens">
              {RUBRIQUES.map((r, i) => (
                <li key={r.ancre}>
                  <a
                    href={"page" in r && r.page ? r.page : r.ancre === "accueil" ? "/" : `/#${r.ancre}`}
                    style={{ "--i": i } as CSSProperties}
                    tabIndex={ouvert ? 0 : -1}
                    onClick={(e) => { e.preventDefault(); aller(r.ancre, "page" in r ? r.page : undefined); }}
                  >
                    {t(r.libelle)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {ouvert && <Tambour />}
        </div>
        <div className="chv-menu__pied">
          <a href={TELEPHONE.lien} tabIndex={ouvert ? 0 : -1}>{TELEPHONE.affiche}</a>
          <a href={COURRIEL.lien} tabIndex={ouvert ? 0 : -1}>{COURRIEL.affiche}</a>
          <Reseaux tabIndex={ouvert ? 0 : -1} />
        </div>
      </div>
    </>
  );
};

export default EnTete;
