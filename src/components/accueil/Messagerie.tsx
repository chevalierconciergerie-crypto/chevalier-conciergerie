import { useEffect, useRef, useState } from "react";
import { useRevele } from "./effets";

/*
  Messagerie voyageurs : la démonstration animée du bloc « Les voyageurs ».

  Le principe, repris de chevalier-pms.com puis redessiné dans notre registre
  (crème, noir, cuivre, Federo/Outfit) : une nuit, quatre sollicitations, et
  la réponse qui part sans que le propriétaire ait à se lever. Les heures
  servent de sélecteur ; la conversation s'écrit en trois temps — la question
  arrive, la réponse suit, la ligne de confirmation se pose.

  Le défilement automatique ne démarre qu'une fois la carte à l'écran, se
  coupe dès que le visiteur clique une heure lui-même, et n'a pas lieu du
  tout si le système demande moins d'animations.
*/

interface Echange {
  heure: string;
  canal: string;
  question: string;
  reponse: string;
  confirmation: string;
}

const ECHANGES: Echange[] = [
  {
    heure: "22 h 41",
    canal: "Airbnb",
    question: "Bonsoir, on est devant la porte mais la boîte à clés ne s'ouvre pas.",
    reponse:
      "Le code est bien le 4180 — il faut pousser le clapet vers le haut avant de tourner. Je reste en ligne le temps que vous entriez.",
    confirmation: "Entrés à 22 h 46. Vous n'avez rien eu à faire.",
  },
  {
    heure: "23 h 07",
    canal: "WhatsApp",
    question: "Le chauffage ne démarre pas et il fait vraiment froid dans le salon.",
    reponse:
      "Le thermostat du couloir était resté en mode absence, je viens de le repasser en confort à distance. Dites-moi dans dix minutes si la température monte.",
    confirmation: "Réglé à distance, à 23 h 09.",
  },
  {
    heure: "23 h 52",
    canal: "Booking",
    question: "Notre train a du retard, nous n'arriverons pas avant une heure du matin.",
    reponse:
      "Aucun souci, l'arrivée est autonome et le logement vous attend. Je vous renvoie le code et le plan d'accès au parking des Italiens.",
    confirmation: "Arrivée tardive gérée, à 23 h 54.",
  },
  {
    heure: "06 h 40",
    canal: "Airbnb",
    question: "On part tôt — est-ce qu'on peut laisser les valises quelque part ?",
    reponse:
      "Laissez-les dans l'entrée : l'équipe de ménage passe à 11 h et les gardera jusqu'à 18 h. Bon retour.",
    confirmation: "Départ organisé, à 06 h 43.",
  },
];

const CYCLE = 5200;

export function Messagerie() {
  const [ref, visible] = useRevele<HTMLDivElement>(0.25);
  const [index, setIndex] = useState(0);
  const [etape, setEtape] = useState(0);
  const [auto, setAuto] = useState(true);
  const sobre = useRef(false);

  useEffect(() => {
    sobre.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sobre.current) setEtape(3);
  }, []);

  /* Les trois temps de l'échange, rejoués à chaque changement d'heure. */
  useEffect(() => {
    if (!visible || sobre.current) return;
    setEtape(0);
    const t = [
      window.setTimeout(() => setEtape(1), 180),
      window.setTimeout(() => setEtape(2), 1100),
      window.setTimeout(() => setEtape(3), 2000),
    ];
    return () => t.forEach(window.clearTimeout);
  }, [index, visible]);

  /* Passage à l'heure suivante, tant que le visiteur n'a pas pris la main. */
  useEffect(() => {
    if (!visible || !auto || sobre.current) return;
    const t = window.setTimeout(
      () => setIndex((i) => (i + 1) % ECHANGES.length),
      CYCLE,
    );
    return () => window.clearTimeout(t);
  }, [index, visible, auto]);

  const e = ECHANGES[index];

  return (
    <div className="chv-messagerie" ref={ref}>
      <div className="chv-messagerie__barre">
        <div className="chv-messagerie__heures" role="tablist" aria-label="Sollicitations de la nuit">
          {ECHANGES.map((item, i) => (
            <button
              key={item.heure}
              type="button"
              role="tab"
              id={`chv-heure-${i}`}
              aria-selected={i === index}
              aria-controls="chv-messagerie-fil"
              className={`chv-messagerie__heure ${i === index ? "est-active" : ""}`}
              onClick={() => {
                setAuto(false);
                setIndex(i);
              }}
            >
              {item.heure}
            </button>
          ))}
        </div>
        <span className="chv-messagerie__nuit">
          <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
          Cette nuit
        </span>
      </div>

      <div
        className="chv-messagerie__fil"
        id="chv-messagerie-fil"
        role="tabpanel"
        aria-labelledby={`chv-heure-${index}`}
      >
        <div className={`chv-bulle chv-bulle--voyageur ${etape >= 1 ? "est-posee" : ""}`}>
          <span className="chv-bulle__canal">{e.canal}</span>
          <p>{e.question}</p>
        </div>

        <div className={`chv-bulle chv-bulle--nous ${etape >= 2 ? "est-posee" : ""}`}>
          <p>{e.reponse}</p>
        </div>

        <p className={`chv-messagerie__preuve ${etape >= 3 ? "est-posee" : ""}`}>
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
          {e.confirmation}
        </p>
      </div>
    </div>
  );
}
