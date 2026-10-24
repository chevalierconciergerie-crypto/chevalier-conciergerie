import { Fragment, useEffect, useRef } from "react";
import { useT } from "@/i18n/langue";
import { mouvementReduit } from "./effets";
import { ecouterVitesse } from "./vitesse";

/*
  Deux bandeaux de texte géant qui traversent l'écran en sens opposés. Ils
  avancent seuls, doucement, et le défilement les entraîne : plus on descend vite,
  plus ils filent et plus ils penchent, puis ils se redressent à l'arrêt.

  Une seule boucle d'animation, active seulement quand la section est à l'écran.
  Rien que des transform : la carte graphique déplace les deux lignes sans que le
  navigateur ait à redessiner le texte.
*/

const LIGNES = [
  { mots: ["Conciergerie Airbnb", "Sous-location", "Avignon", "Villeneuve-lès-Avignon", "Les Angles"], sens: -1, contour: false },
  { mots: ["Accueil des voyageurs", "Ménage et linge", "Loyer garanti", "Réservation directe"], sens: 1, contour: true },
] as const;

export default function BandeauGeant() {
  const t = useT();
  const section = useRef<HTMLElement>(null);
  const lignes = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = section.current;
    if (!el || mouvementReduit()) return;
    let visible = false;
    let image = 0;
    let vitesse = 0;
    let avance = 0;
    let avant = performance.now();
    const largeurs: number[] = [];
    const mesurer = () => {
      lignes.current.forEach((l, i) => {
        largeurs[i] = (l?.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
      });
    };
    mesurer();

    const boucle = (maintenant: number) => {
      const dt = Math.min(64, maintenant - avant);
      avant = maintenant;
      // Dérive lente (60 px/s), accélérée par la vitesse du défilement.
      avance += dt * (0.06 + Math.abs(vitesse) * 1.6);
      lignes.current.forEach((l, i) => {
        const largeur = largeurs[i];
        if (!l || !largeur) return;
        const sens = LIGNES[i].sens;
        const x = ((avance + window.scrollY * 0.35) % largeur) * sens - (sens > 0 ? largeur : 0);
        l.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) skewX(${(vitesse * -14 * sens).toFixed(2)}deg)`;
      });
      image = visible ? requestAnimationFrame(boucle) : 0;
    };

    const observateur = new IntersectionObserver(([entree]) => {
      visible = entree.isIntersecting;
      if (visible && !image) {
        avant = performance.now();
        image = requestAnimationFrame(boucle);
      }
    });
    observateur.observe(el);
    const arreter = ecouterVitesse((v) => {
      vitesse = v;
    });
    window.addEventListener("resize", mesurer);
    document.fonts?.ready.then(mesurer);

    return () => {
      observateur.disconnect();
      arreter();
      window.removeEventListener("resize", mesurer);
      if (image) cancelAnimationFrame(image);
    };
  }, []);

  return (
    <section id="bandeau" ref={section} className="chv-bandeau" aria-label={t("Nos services")}>
      {LIGNES.map((ligne, i) => (
        <div
          key={i}
          ref={(n) => (lignes.current[i] = n)}
          className={`chv-bandeau__ligne ${ligne.contour ? "chv-bandeau__ligne--contour" : ""}`}
          aria-hidden={i > 0 ? "true" : undefined}
        >
          {/* Deux copies identiques : quand la première est sortie, la seconde a pris sa place. */}
          {[0, 1].map((copie) => (
            <div key={copie} className="chv-bandeau__copie" aria-hidden={copie > 0 ? "true" : undefined}>
              {ligne.mots.map((mot) => (
                <Fragment key={mot}>
                  <span className="chv-bandeau__mot">{t(mot)}</span>
                  <span className="chv-bandeau__etoile" aria-hidden="true">✦</span>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
