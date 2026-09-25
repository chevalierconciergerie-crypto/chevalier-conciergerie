import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useRevele } from "./effets";

/*
  Les démonstrations animées des blocs de l'offre conciergerie.

  Même principe que la messagerie voyageurs, que Victor a validée : une petite
  carte vivante à la place d'une capture d'écran écrasée. Chacune raconte
  exactement ce que disent les puces posées à côté d'elle — sinon l'animation
  n'est qu'une décoration.

  Règles communes : rien ne démarre avant que la carte soit à l'écran, tout est
  posé d'emblée sous prefers-reduced-motion, et les hauteurs sont réservées
  pour que la page ne saute pas pendant que l'animation se déroule.
*/

/** Avance d'un cran à chaque intervalle, une fois la carte visible, puis boucle. */
function useSequence(nombre: number, intervalle = 1100, pauseFin = 2600) {
  const [ref, visible] = useRevele<HTMLDivElement>(0.3);
  const [cran, setCran] = useState(0);
  const sobre = useRef(false);

  useEffect(() => {
    sobre.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sobre.current) setCran(nombre);
  }, [nombre]);

  useEffect(() => {
    if (!visible || sobre.current) return;
    const suivant = cran >= nombre ? 0 : cran + 1;
    const delai = cran >= nombre ? pauseFin : intervalle;
    const t = window.setTimeout(() => setCran(suivant), delai);
    return () => window.clearTimeout(t);
  }, [visible, cran, nombre, intervalle, pauseFin]);

  return [ref, cran] as const;
}

/** Compte de 0 jusqu'à la valeur, une fois visible. */
function useCompteur(valeur: number, actif: boolean, duree = 900) {
  const [affiche, setAffiche] = useState(0);
  useEffect(() => {
    if (!actif) {
      setAffiche(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAffiche(valeur);
      return;
    }
    const depart = performance.now();
    let frame = requestAnimationFrame(function pas(t) {
      const p = Math.min(1, (t - depart) / duree);
      setAffiche(Math.round(valeur * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(pas);
    });
    return () => cancelAnimationFrame(frame);
  }, [valeur, actif, duree]);
  return affiche;
}

const euros = (n: number) => n.toLocaleString("fr-FR") + " €";

/* ------------------------------------------------------------------ *
   1. Le calendrier multicanal
   Les puces promettent trois canaux synchronisés en temps réel et des
   doubles réservations impossibles : les réservations tombent donc une à
   une, de trois origines différentes, sans jamais se chevaucher.
 * ------------------------------------------------------------------ */
const SEJOURS = [
  { canal: "Airbnb", debut: 2, duree: 4, teinte: "airbnb" },
  { canal: "Booking", debut: 8, duree: 3, teinte: "booking" },
  { canal: "Direct", debut: 12, duree: 5, teinte: "direct" },
  { canal: "Airbnb", debut: 18, duree: 2, teinte: "airbnb" },
];

export function DemoCalendrier() {
  const [ref, cran] = useSequence(SEJOURS.length, 900, 2800);
  const poses = SEJOURS.slice(0, cran);
  const nuits = poses.reduce((n, s) => n + s.duree, 0);
  const compte = useCompteur(nuits, cran > 0, 500);

  return (
    <div className="chv-demo" ref={ref}>
      <div className="chv-demo__barre">
        <span className="chv-demo__titre">Septembre</span>
        <span className="chv-demo__note">
          <b>{compte}</b> nuits réservées
        </span>
      </div>

      <div className="chv-cal">
        {Array.from({ length: 21 }, (_, i) => {
          const sejour = poses.find((s) => i >= s.debut && i < s.debut + s.duree);
          const premier = poses.find((s) => s.debut === i);
          return (
            <div
              key={i}
              className={`chv-cal__jour ${sejour ? `est-prise chv-cal__jour--${sejour.teinte}` : ""}`}
            >
              <span className="chv-cal__chiffre">{i + 1}</span>
              {premier && <span className="chv-cal__canal">{premier.canal}</span>}
            </div>
          );
        })}
      </div>

      <p className={`chv-demo__preuve ${cran >= SEJOURS.length ? "est-posee" : ""}`}>
        <Coche />
        Trois canaux, un seul calendrier — aucune double réservation possible.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
   2. La réservation directe
   La puce dit « aucune commission prélevée » : on montre le même séjour
   passé par la plateforme puis en direct, et ce que le propriétaire garde.
 * ------------------------------------------------------------------ */
export function DemoDirect() {
  const [ref, cran] = useSequence(3, 1300, 3000);
  const plateforme = useCompteur(527, cran >= 1, 700);
  const direct = useCompteur(620, cran >= 2, 900);

  return (
    <div className="chv-demo" ref={ref}>
      <div className="chv-demo__barre">
        <span className="chv-demo__titre">Le Central · 4 nuits</span>
        <span className="chv-demo__etiquette">Exemple</span>
      </div>

      <div className={`chv-compare ${cran >= 1 ? "est-posee" : ""}`}>
        <p className="chv-compare__canal">Via la plateforme</p>
        <p className="chv-compare__detail">620 € encaissés — 93 € de commission</p>
        <p className="chv-compare__montant">{euros(plateforme)}</p>
      </div>

      <div className={`chv-compare chv-compare--direct ${cran >= 2 ? "est-posee" : ""}`}>
        <p className="chv-compare__canal">En direct, sur votre site</p>
        <p className="chv-compare__detail">620 € encaissés — aucune commission</p>
        <p className="chv-compare__montant">{euros(direct)}</p>
      </div>

      <p className={`chv-demo__preuve ${cran >= 3 ? "est-posee" : ""}`}>
        <Coche />
        93 € de plus sur ce seul séjour, paiement et caution sécurisés.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
   3. La tarification
   La puce insiste : révision hebdomadaire par une équipe humaine, pas un
   algorithme. L'animation montre donc un événement repéré, puis la semaine
   réévaluée d'un coup — pas des centimes qui glissent tout seuls.
 * ------------------------------------------------------------------ */
const SEMAINE = [
  { jour: "L", avant: 92, apres: 118 },
  { jour: "M", avant: 92, apres: 118 },
  { jour: "M", avant: 96, apres: 134 },
  { jour: "J", avant: 96, apres: 152 },
  { jour: "V", avant: 118, apres: 186 },
  { jour: "S", avant: 124, apres: 198 },
  { jour: "D", avant: 104, apres: 156 },
];

export function DemoTarification() {
  const [ref, cran] = useSequence(3, 1400, 3000);
  const haut = Math.max(...SEMAINE.map((j) => j.apres));

  return (
    <div className="chv-demo" ref={ref}>
      <div className="chv-demo__barre">
        <span className="chv-demo__titre">Semaine du 6 juillet</span>
        <span className={`chv-demo__alerte ${cran >= 1 ? "est-posee" : ""}`}>Festival d'Avignon</span>
      </div>

      <div className="chv-prix">
        {SEMAINE.map((j, i) => {
          const montant = cran >= 2 ? j.apres : j.avant;
          return (
            <div className="chv-prix__col" key={i}>
              <span className="chv-prix__montant">{montant} €</span>
              <span className="chv-prix__piste">
                <span
                  className="chv-prix__barre"
                  style={{ "--h": `${Math.round((montant / haut) * 100)}%` } as CSSProperties}
                />
              </span>
              <span className="chv-prix__jour">{j.jour}</span>
            </div>
          );
        })}
      </div>

      <p className={`chv-demo__preuve ${cran >= 3 ? "est-posee" : ""}`}>
        <Coche />
        Révisé chaque semaine par une équipe, durée minimale portée à 3 nuits.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
   4. Le ménage
   Les puces annoncent une chaîne : ménage, linge et consommables déclenchés
   par la réservation, l'équipe prévenue sur WhatsApp, une vidéo à chaque
   passage. On la déroule dans l'ordre.
 * ------------------------------------------------------------------ */
const MISSIONS = [
  "Départ à 11 h 00 — ménage programmé à 11 h 30",
  "Kit linge et consommables prévus au réassort",
  "Fabienne prévenue sur WhatsApp",
  "Vidéo du passage déposée — logement conforme",
];

export function DemoMenage() {
  const [ref, cran] = useSequence(MISSIONS.length, 950, 2800);

  return (
    <div className="chv-demo" ref={ref}>
      <div className="chv-demo__barre">
        <span className="chv-demo__titre">L'Intramuros · jeudi</span>
        <span className="chv-demo__note">Réservation suivante 16 h 00</span>
      </div>

      <ul className="chv-mission">
        {MISSIONS.map((m, i) => (
          <li key={m} className={`chv-mission__pas ${i < cran ? "est-posee" : ""}`}>
            <span className="chv-mission__case">
              <Coche />
            </span>
            <span>{m}</span>
          </li>
        ))}
      </ul>

      <p className={`chv-demo__preuve ${cran >= MISSIONS.length ? "est-posee" : ""}`}>
        <Coche />
        Déclenché par la réservation, sans que vous ayez à y penser.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
   5. Le tableau de bord
   Les puces promettent canaux, occupation et chiffre d'affaires au même
   endroit : les trois apparaissent, chiffrés.
 * ------------------------------------------------------------------ */
const CANAUX = [
  { nom: "Airbnb", part: 52, teinte: "airbnb" },
  { nom: "Booking", part: 31, teinte: "booking" },
  { nom: "Direct", part: 17, teinte: "direct" },
];

export function DemoTableau() {
  const [ref, cran] = useSequence(3, 1200, 3000);
  const ca = useCompteur(4380, cran >= 1, 1000);
  const occ = useCompteur(87, cran >= 1, 1000);

  return (
    <div className="chv-demo" ref={ref}>
      <div className="chv-demo__barre">
        <span className="chv-demo__titre">Rapport d'août</span>
        <span className="chv-demo__note">Le Central</span>
      </div>

      <div className="chv-bilan">
        <div>
          <p className="chv-bilan__valeur">{euros(ca)}</p>
          <p className="chv-bilan__legende">Chiffre d'affaires</p>
        </div>
        <div>
          <p className="chv-bilan__valeur">{occ} %</p>
          <p className="chv-bilan__legende">Taux d'occupation</p>
        </div>
      </div>

      <div className={`chv-canaux ${cran >= 2 ? "est-posee" : ""}`}>
        <div className="chv-canaux__barre">
          {CANAUX.map((c) => (
            <span
              key={c.nom}
              className={`chv-canaux__part chv-canaux__part--${c.teinte}`}
              style={{ "--part": `${c.part}%` } as CSSProperties}
            />
          ))}
        </div>
        <ul className="chv-canaux__legende">
          {CANAUX.map((c) => (
            <li key={c.nom}>
              <span className={`chv-canaux__puce chv-canaux__puce--${c.teinte}`} />
              {c.nom} <b>{c.part} %</b>
            </li>
          ))}
        </ul>
      </div>

      <p className={`chv-demo__preuve ${cran >= 3 ? "est-posee" : ""}`}>
        <Coche />
        Envoyé chaque mois, et consultable à tout moment dans Chevalier PMS.
      </p>
    </div>
  );
}

function Coche() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m4 12.5 5 5L20 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
