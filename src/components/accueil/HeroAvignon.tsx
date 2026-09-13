import { useProgression, allerA } from "./effets";
import { Chevron, MotifEventail } from "./Primitives";

/**
  La couverture : « Conciergerie à Avignon » en très grand, et la vue au
  drone du Pont d'Avignon qui s'agrandit jusqu'à couvrir l'écran pendant
  qu'on descend. Tout est piloté par une seule variable CSS, --p (0 → 1),
  écrite par useProgression sur une course de 70 % de hauteur d'écran.
*/
const HeroAvignon = () => {
  const ref = useProgression<HTMLElement>();

  return (
    <section id="accueil" ref={ref} className="chv-hero" aria-labelledby="chv-hero-titre">
      <div className="chv-hero__collant">
        <MotifEventail className="chv-hero__motif" />
        <h1 id="chv-hero-titre" className="chv-hero__titre">
          <span>Conciergerie</span>
          <span className="chv-hero__ligne2">
            <span>à</span>
            <span className="chv-hero__avignon">Avignon</span>
          </span>
        </h1>
        <figure className="chv-hero__photo">
          <img
            src="/accueil/hero-pont-avignon.webp"
            alt="Vue au drone du Pont d'Avignon et du Palais des Papes"
            width={1920}
            height={960}
            // React 18 ne connaît pas encore fetchPriority : l'attribut HTML passe tel quel.
            {...{ fetchpriority: "high" }}
          />
        </figure>
        <button
          type="button"
          className="chv-pastille chv-pastille--rond chv-hero__suite"
          onClick={() => allerA("qui-sommes-nous")}
          aria-label="Descendre vers la présentation"
        >
          <Chevron taille={16} />
        </button>
      </div>
    </section>
  );
};

export default HeroAvignon;
