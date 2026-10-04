import { Link } from "react-router-dom";
import { useLangue, useT } from "@/i18n/langue";
import { useProgression, allerA } from "./effets";
import { Chevron, MotifEventail } from "./Primitives";

/* La flèche des deux boutons : elle glisse vers la droite au survol (voir .chv-hero__actions). */
const Fleche = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
  La couverture : « Conciergerie à Avignon » en très grand, et la vue au
  drone du Pont d'Avignon qui s'agrandit jusqu'à couvrir l'écran pendant
  qu'on descend. Tout est piloté par une seule variable CSS, --p (0 → 1),
  écrite par useProgression sur une course de 70 % de hauteur d'écran.
*/
const HeroAvignon = () => {
  const t = useT();
  const { lien } = useLangue();
  const ref = useProgression<HTMLElement>();

  return (
    <section id="accueil" ref={ref} className="chv-hero" aria-labelledby="chv-hero-titre">
      <div className="chv-hero__collant">
        <MotifEventail className="chv-hero__motif" />
        <h1 id="chv-hero-titre" className="chv-hero__titre">
          <span>{t("Conciergerie")}</span>
          <span className="chv-hero__ligne2">
            <span>{t("à")}</span>
            <span className="chv-hero__avignon">Avignon</span>
          </span>
        </h1>
        <figure className="chv-hero__photo">
          <img
            src="/accueil/hero-pont-avignon.webp"
            alt={t("Vue au drone du Pont d'Avignon et du Palais des Papes")}
            width={1920}
            height={960}
            // React 18 ne connaît pas encore fetchPriority : l'attribut HTML passe tel quel.
            {...{ fetchpriority: "high" }}
          />
        </figure>
        {/* Les deux offres, directement sur la photo : chacune ouvre sa page. */}
        <div className="chv-hero__actions">
          <Link to={lien("/conciergerie")} className="chv-pastille chv-pastille--grand">
            {t("Conciergerie")}
            <Fleche />
          </Link>
          <Link to={lien("/sous-location")} className="chv-pastille chv-pastille--grand">
            {t("Sous-location")}
            <Fleche />
          </Link>
        </div>
        <button
          type="button"
          className="chv-pastille chv-pastille--rond chv-hero__suite"
          onClick={() => allerA("qui-sommes-nous")}
          aria-label={t("Descendre vers la présentation")}
        >
          <Chevron taille={16} />
        </button>
      </div>
    </section>
  );
};

export default HeroAvignon;
