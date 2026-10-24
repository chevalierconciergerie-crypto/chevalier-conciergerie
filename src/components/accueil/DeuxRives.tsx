import { useEffect, useRef, type CSSProperties } from "react";
import { useT } from "@/i18n/langue";
import { abonner, mouvementReduit } from "./effets";

/*
  « Nos deux rives » : le Pont Saint-Bénézet dessiné au trait, de profil, qui se
  trace pendant qu'on descend et s'efface quand on remonte. À gauche Avignon
  (remparts, Palais des Papes, clocher des Doms et sa Vierge dorée), au milieu
  le pont, ses quatre arches et la chapelle Saint-Nicolas, à droite
  Villeneuve-lès-Avignon (tour Philippe le Bel, cyprès) : le pont reliait les
  deux rives où nous gérons des logements.

  Chaque trait a un début et une durée sur la progression 0 → 1 de la section
  (haute de deux écrans, le dessin reste collé au milieu). Sur téléphone, le
  dessin est plus large que l'écran et glisse d'Avignon vers Villeneuve.
  Tracé ici, à la main, sans reprendre d'illustration existante.
*/

/** `plein` : rempli de la couleur du fond, le bâtiment cache les traits qui passent derrière lui. */
type Trait = { d: string; debut: number; duree: number; accent?: boolean; plein?: boolean };

const EAU = 330;

/** Bord supérieur crénelé, de x0 à x1, à la hauteur y. */
function creneaux(x0: number, x1: number, y: number, merlon = 9, vide = 7, h = 8) {
  let s = "";
  let x = x0;
  while (x + merlon <= x1) {
    s += ` V${y - h} H${x + merlon} V${y}`;
    x += merlon;
    if (x + vide > x1) break;
    s += ` H${x + vide}`;
    x += vide;
  }
  return s + ` H${x1}`;
}

/** Une ligne d'eau ondulée de x0 à x1. */
function vague(x0: number, x1: number, y: number, pas = 22, creux = 3) {
  let s = `M${x0} ${y}`;
  for (let x = x0; x + pas <= x1; x += pas) s += ` q${pas / 2} ${-creux} ${pas} 0`;
  return s;
}

const PILES = [352, 492, 632, 772];
const ARCHES: [number, number][] = [
  [232, 338],
  [366, 478],
  [506, 618],
  [646, 758],
];

const TRAITS: Trait[] = [
  // Ordre de tracé : d'Avignon vers Villeneuve, pour suivre le glissement sur téléphone.

  // ---- Avignon : le clocher des Doms, le Palais des Papes, les remparts ----
  { d: `M0 ${EAU} H232`, debut: 0, duree: 0.12 },
  { d: "M8 212 V98 H30 V212 M12 98 V82 H26 V98", debut: 0.02, duree: 0.14, plein: true },
  { d: `M40 204 V130${creneaux(40, 176, 130)} V204`, debut: 0.04, duree: 0.18, plein: true },
  { d: `M176 204 V104${creneaux(176, 206, 104, 7, 5, 7)} V204`, debut: 0.08, duree: 0.14, plein: true },
  { d: "M100 130 V102 L105 86 L110 102 V130 M124 130 V102 L129 86 L134 102 V130", debut: 0.1, duree: 0.12 },
  {
    d: [52, 78, 140, 158].map((x) => `M${x} 204 V164 Q${x + 7} 150 ${x + 14} 164 V204`).join(" "),
    debut: 0.12,
    duree: 0.12,
  },
  { d: `M20 ${EAU} V212${creneaux(20, 196, 212)} V${EAU}`, debut: 0.06, duree: 0.18, plein: true },
  { d: `M60 212 V192${creneaux(60, 92, 192, 7, 5, 7)} V212`, debut: 0.1, duree: 0.1, plein: true },
  { d: `M196 ${EAU} V184${creneaux(196, 232, 184, 8, 6, 7)} V${EAU}`, debut: 0.12, duree: 0.12, plein: true },
  { d: "M212 200 v12 M212 254 v14 M76 226 v12", debut: 0.2, duree: 0.06 },
  // la Vierge dorée au sommet du clocher
  { d: "M15 82 L19 68 L23 82 Z M19 66 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0", debut: 0.2, duree: 0.08, accent: true },

  // ---- Le Rhône ----
  { d: vague(250, 520, 344), debut: 0.1, duree: 0.2 },
  { d: vague(300, 610, 358), debut: 0.14, duree: 0.2 },
  { d: vague(380, 560, 374, 20, 2.5), debut: 0.18, duree: 0.16 },
  { d: vague(470, 650, 390, 18, 2), debut: 0.26, duree: 0.14 },
  { d: vague(560, 900, 344), debut: 0.34, duree: 0.22 },
  { d: vague(620, 760, 374, 20, 2.5), debut: 0.38, duree: 0.16 },
  { d: vague(680, 880, 358), debut: 0.42, duree: 0.18 },

  // ---- Le pont : arches (avec leur bandeau), avant-becs, tablier ----
  ...ARCHES.flatMap(([a, b], i): Trait[] => {
    const rx = (b - a) / 2;
    const t0 = 0.14 + i * 0.1;
    return [
      { d: `M${a} ${EAU} V300 A${rx} 46 0 0 1 ${b} 300 V${EAU}`, debut: t0, duree: 0.16 },
      { d: `M${a - 6} 300 A${rx + 6} 52 0 0 1 ${b + 6} 300`, debut: t0 + 0.03, duree: 0.14 },
      // reflets sous l'arche
      { d: `M${a + rx - 26} 341 h52 M${a + rx - 16} 350 h32 M${a + rx - 8} 359 h16`, debut: t0 + 0.06, duree: 0.1 },
    ];
  }),
  ...PILES.map((x, i): Trait => ({ d: `M${x - 9} ${EAU} V292 L${x} 280 L${x + 9} 292 V${EAU}`, debut: 0.2 + i * 0.1, duree: 0.1 })),
  { d: "M232 226 H842", debut: 0.14, duree: 0.44 },
  { d: "M232 238 H842", debut: 0.16, duree: 0.44 },
  // l'arche brisée et la cassure du tablier, côté Villeneuve
  { d: `M786 ${EAU} V300 A56 46 0 0 1 853 256`, debut: 0.54, duree: 0.1 },
  { d: "M842 226 L848 233 L844 241 L851 249 L846 256 L853 262", debut: 0.6, duree: 0.06 },

  // ---- La chapelle Saint-Nicolas, sur la deuxième pile ----
  { d: "M466 238 V200 M520 200 V238", debut: 0.3, duree: 0.1 },
  { d: "M460 202 L493 182 L526 202", debut: 0.33, duree: 0.1 },
  { d: "M520 212 Q537 213 537 226 V238", debut: 0.36, duree: 0.08 },
  { d: "M470 193 V174 L477 165 L484 174 V188", debut: 0.38, duree: 0.08 },
  { d: "M474 186 V179 Q477 174 480 179 V186", debut: 0.42, duree: 0.06, accent: true },
  { d: "M486 238 V225 Q493 216 500 225 V238", debut: 0.4, duree: 0.06 },
  // quelques oiseaux au-dessus du fleuve
  { d: "M640 120 q7 -7 14 0 q7 -7 14 0 M690 96 q6 -6 12 0 q6 -6 12 0 M600 92 q5 -5 10 0 q5 -5 10 0", debut: 0.46, duree: 0.1 },

  // ---- Villeneuve-lès-Avignon : berge, colline, tour Philippe le Bel, cyprès ----
  { d: `M940 ${EAU} Q1000 322 1200 326`, debut: 0.6, duree: 0.14 },
  { d: "M930 304 Q990 262 1060 262 T1200 236", debut: 0.62, duree: 0.18 },
  { d: "M944 120 m-34 0 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0", debut: 0.64, duree: 0.16, accent: true },
  { d: `M1040 328 V152${creneaux(1040, 1080, 152, 8, 6, 7)} V328`, debut: 0.72, duree: 0.14, plein: true },
  { d: `M1080 152 V130${creneaux(1080, 1100, 130, 6, 4, 6)} V152 H1092 V328`, debut: 0.76, duree: 0.1, plein: true },
  { d: "M1060 190 v14 M1060 240 v14 M1070 290 v16 Q1062 296 1060 306", debut: 0.84, duree: 0.05 },
  ...[
    [985, 300, 244],
    [1004, 304, 256],
    [1122, 300, 238],
    [1140, 302, 252],
  ].map(([x, bas, haut], i): Trait => ({
    d: `M${x} ${bas} C${x - 7} ${bas - 18} ${x - 6} ${haut + 22} ${x} ${haut} C${x + 6} ${haut + 22} ${x + 7} ${bas - 18} ${x} ${bas}`,
    debut: 0.74 + i * 0.035,
    duree: 0.08,
    plein: true,
  })),
];

export default function DeuxRives() {
  const t = useT();
  const section = useRef<HTMLElement>(null);
  const dessin = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = section.current;
    const svg = dessin.current;
    if (!el || !svg) return;
    const traits = [...svg.querySelectorAll<SVGPathElement>("path[data-debut]")];
    const poser = (p: number) => {
      el.style.setProperty("--p", p.toFixed(4));
      for (const trait of traits) {
        const debut = Number(trait.dataset.debut);
        const duree = Number(trait.dataset.duree);
        const avance = Math.max(0, Math.min(1, (p - debut) / duree));
        trait.style.strokeDashoffset = (1 - avance).toFixed(4);
      }
    };
    if (mouvementReduit()) {
      poser(1);
      return;
    }
    return abonner(() => {
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      if (r.top > h * 1.2 || r.bottom < -h * 0.2) return;
      // Le dessin commence quand la section arrive aux deux tiers de l'écran
      // et se termine peu avant que son contenu collant ne reparte vers le haut.
      const depart = h * 0.65;
      const course = depart + (r.height - h) * 0.9;
      poser(Math.max(0, Math.min(1, (depart - r.top) / course)));
    });
  }, []);

  return (
    <section ref={section} className="chv-rives" aria-labelledby="chv-rives-titre">
      <div className="chv-rives__collant">
        <div className="chv-rives__texte">
          <p className="chv-etiquette">{t("Nos deux rives")}</p>
          <h2 id="chv-rives-titre" className="chv-rives__titre">
            {t("Avignon d'un côté du Rhône,")}
            <br />
            <em>{t("Villeneuve-lès-Avignon et Les Angles de l'autre.")}</em>
          </h2>
        </div>
        <div className="chv-rives__cadre">
          <svg
            ref={dessin}
            className="chv-rives__dessin"
            viewBox="0 0 1200 440"
            role="img"
            aria-label={t("Dessin du Pont d'Avignon entre Avignon et Villeneuve-lès-Avignon")}
          >
            {TRAITS.map((trait, i) => (
              <path
                key={i}
                d={trait.d}
                pathLength={1}
                data-debut={trait.debut}
                data-duree={trait.duree}
                className={[trait.accent && "est-accent", trait.plein && "est-plein"].filter(Boolean).join(" ") || undefined}
                style={{ "--remplir": trait.accent ? trait.debut + trait.duree : trait.debut } as CSSProperties}
              />
            ))}
            <g className="chv-rives__noms">
              <text x="118" y="414" style={{ "--apparition": 0.24 } as CSSProperties}>AVIGNON</text>
              <text x="590" y="414" className="chv-rives__fleuve" style={{ "--apparition": 0.48 } as CSSProperties}>{t("le Rhône")}</text>
              <text x="1046" y="406" style={{ "--apparition": 0.86 } as CSSProperties}>VILLENEUVE-LÈS-AVIGNON</text>
              <text x="1046" y="428" style={{ "--apparition": 0.89 } as CSSProperties}>LES ANGLES</text>
            </g>
          </svg>
        </div>
        <p className="chv-rives__legende">{t("Nous gérons des logements sur les deux rives.")}</p>
      </div>
    </section>
  );
}
