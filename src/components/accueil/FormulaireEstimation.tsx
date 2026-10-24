import { useId, useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BedSingle, Building2, Check, House, Minus, MoreHorizontal, Plus } from "lucide-react";
import { COURRIEL, TELEPHONE } from "@/data/accueil";

/*
  Le formulaire d'estimation gratuite (conciergerie ou sous-location), affiché
  sur /contact et sur /estimation-sous-location.

  Trois étapes, sur le modèle de conciergerie-pereigault.com : barre de progression,
  tuiles à icônes, pastilles à cocher, compteurs et libellés qui remontent dans le
  champ. Seule la première étape a des champs obligatoires (type et commune), puis
  les coordonnées à la dernière.

  Envoi direct vers contact@chevalier-conciergerie.com via FormSubmit, sans
  clé ni serveur. ⚠️ Au tout premier envoi, FormSubmit adresse à cette boîte
  un courriel « Activate Form » : il faut cliquer le lien une fois, ensuite
  chaque demande arrive directement.
*/
const ENVOI = "https://formsubmit.co/ajax/contact@chevalier-conciergerie.com";

type Formule = "Conciergerie" | "Sous-location" | "Je ne sais pas encore";
type Etape = 1 | 2 | 3;

interface Donnees {
  typeLogement: string;
  commune: string;
  adresse: string;
  superficie: string;
  pieces: number;
  couchages: number;
  formule: Formule;
  atouts: string[];
  plateformes: string[];
  equipements: string;
  nomComplet: string;
  telephone: string;
  email: string;
  moments: string[];
  commentaire: string;
  consentement: boolean;
  piege: string;
}

const VIDE: Donnees = {
  typeLogement: "",
  commune: "",
  adresse: "",
  superficie: "",
  pieces: 2,
  couchages: 4,
  formule: "Je ne sais pas encore",
  atouts: [],
  plateformes: [],
  equipements: "",
  nomComplet: "",
  telephone: "",
  email: "",
  moments: [],
  commentaire: "",
  consentement: false,
  piege: "",
};

const ETAPES = [
  { titre: "Votre logement", sous: "Quelques informations pour estimer votre logement." },
  { titre: "Votre projet", sous: "Tout est facultatif : cochez ce qui correspond à votre situation." },
  { titre: "Vos coordonnées", sous: "Pour vous rappeler avec votre estimation." },
];

const TYPES = [
  { nom: "Studio", Icone: BedSingle },
  { nom: "Appartement", Icone: Building2 },
  { nom: "Maison", Icone: House },
  { nom: "Autre", Icone: MoreHorizontal },
];

const COMMUNES = ["Avignon", "Villeneuve-lès-Avignon", "Les Angles"];

const FORMULES: { nom: Formule; detail: string }[] = [
  { nom: "Conciergerie", detail: "Nous gérons tout, vous percevez les revenus." },
  { nom: "Sous-location", detail: "Un loyer fixe chaque mois, sans commission." },
  { nom: "Je ne sais pas encore", detail: "Nous vous aidons à choisir." },
];

const ATOUTS = ["Meublé", "Parking", "Balcon ou terrasse", "Climatisation", "Piscine", "Ascenseur"];
const PAS_ENCORE = "Pas encore en location";
const PLATEFORMES = ["Airbnb", "Booking", "Abritel", PAS_ENCORE];
const MOMENTS = ["Le matin", "Le midi", "En fin de journée", "Le week-end"];

const liste = (l: string[], vide = "Non précisé") => (l.length ? l.join(", ") : vide);

type ListeCle = "atouts" | "plateformes" | "moments";

export default function FormulaireEstimation() {
  const [etape, setEtape] = useState<Etape>(1);
  const [d, setD] = useState<Donnees>(VIDE);
  const [etat, setEtat] = useState<"saisie" | "envoi" | "envoye" | "erreur">("saisie");
  const [message, setMessage] = useState("");
  const cadre = useRef<HTMLDivElement>(null);
  const haut = () => cadre.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const champ = <K extends keyof Donnees>(cle: K, valeur: Donnees[K]) => setD((p) => ({ ...p, [cle]: valeur }));

  const basculer = (cle: ListeCle, valeur: string) =>
    setD((p) => {
      const actuelle = p[cle];
      if (actuelle.includes(valeur)) return { ...p, [cle]: actuelle.filter((v) => v !== valeur) };
      // « Pas encore en location » exclut les plateformes, et inversement.
      if (cle === "plateformes") {
        return { ...p, plateformes: valeur === PAS_ENCORE ? [PAS_ENCORE] : [...actuelle.filter((v) => v !== PAS_ENCORE), valeur] };
      }
      return { ...p, [cle]: [...actuelle, valeur] };
    });

  const choisirType = (nom: string) => setD((p) => ({ ...p, typeLogement: nom, pieces: nom === "Studio" ? 1 : p.pieces }));

  const erreurEtape = (n: Etape): string => {
    if (n === 1 && (!d.typeLogement || !d.commune.trim())) return "Indiquez le type de logement et la commune pour continuer.";
    if (n === 3) {
      if (!d.nomComplet.trim() || !d.telephone.trim() || !d.email.trim()) return "Merci d'indiquer votre nom, votre téléphone et votre e-mail.";
      if (!d.consentement) return "Merci d'accepter l'utilisation de vos données pour traiter la demande.";
    }
    return "";
  };

  const aller = (n: Etape) => {
    setMessage("");
    setEtape(n);
    haut();
  };

  const envoyer = async (e: FormEvent) => {
    e.preventDefault();
    const erreur = erreurEtape(etape);
    if (erreur) {
      setMessage(erreur);
      return;
    }
    if (etape < 3) {
      aller((etape + 1) as Etape);
      return;
    }
    // Champ invisible rempli : c'est un robot, on fait comme si tout s'était bien passé.
    if (d.piege) {
      setEtat("envoye");
      return;
    }

    setMessage("");
    setEtat("envoi");
    try {
      const reponse = await fetch(ENVOI, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Estimation gratuite (${d.formule}) — ${d.nomComplet}`,
          _template: "table",
          _replyto: d.email,
          "Formule souhaitée": d.formule,
          Nom: d.nomComplet,
          Téléphone: d.telephone,
          "E-mail": d.email,
          "Disponibilité pour un appel": liste(d.moments),
          Type: d.typeLogement,
          Commune: d.commune,
          Adresse: d.adresse || "Non précisé",
          "Surface (m²)": d.superficie || "Non précisé",
          Pièces: d.pieces >= 10 ? "10 et plus" : String(d.pieces),
          Couchages: d.couchages >= 16 ? "16 et plus" : String(d.couchages),
          Atouts: liste(d.atouts, "Aucun indiqué"),
          "Plateformes actuelles": liste(d.plateformes),
          "Équipements, points forts": d.equipements || "Non précisé",
          Commentaire: d.commentaire || "Aucun",
        }),
      });
      const resultat = await reponse.json().catch(() => ({}));
      if (reponse.ok && String(resultat.success) === "true") {
        setEtat("envoye");
        haut();
      } else {
        setEtat("erreur");
        setMessage(resultat.message || "L'envoi n'a pas abouti.");
      }
    } catch {
      setEtat("erreur");
      setMessage("L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez.");
    }
  };

  if (etat === "envoye") {
    return (
      <div ref={cadre} id="formulaire" className="chv-formulaire-cadre">
        <div className="chv-formulaire chv-formulaire--merci">
          <span className="chv-merci__icone" aria-hidden="true"><Check size={30} strokeWidth={2.2} /></span>
          <h2>Merci, votre demande est bien arrivée.</h2>
          <p>Nous étudions votre logement et revenons vers vous sous 48 h. Pour aller plus vite, écrivez-nous sur WhatsApp.</p>
          <div className="chv-merci__actions">
            <a href={TELEPHONE.lien} target="_blank" rel="noopener" className="chv-pastille chv-pastille--grand">
              WhatsApp · {TELEPHONE.affiche}
            </a>
            <Link to="/" className="chv-lien-retour">Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    );
  }

  const { titre, sous } = ETAPES[etape - 1];

  return (
    <div ref={cadre} id="formulaire" className="chv-formulaire-cadre">
      <form className="chv-formulaire" onSubmit={envoyer} noValidate>
        <div className="chv-progression">
          <ol aria-label="Étapes">
            {ETAPES.map((e, i) => {
              const n = (i + 1) as Etape;
              const classe = n === etape ? "est-active" : n < etape ? "est-faite" : "";
              return (
                <li key={n} className={classe} aria-current={n === etape ? "step" : undefined}>
                  <button type="button" onClick={() => n < etape && aller(n)} disabled={n > etape}>
                    <span className="chv-progression__rond">{n < etape ? <Check size={16} strokeWidth={2.6} aria-hidden="true" /> : n}</span>
                    <span className="chv-progression__texte">
                      <small>Étape {n}</small>
                      {e.titre}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="chv-progression__barre" aria-hidden="true">
            <span style={{ width: `${(etape / 3) * 100}%` }} />
          </div>
        </div>

        {/* Champ piège pour les robots, invisible pour les visiteurs */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          className="chv-piege"
          value={d.piege}
          onChange={(e) => champ("piege", e.target.value)}
          aria-hidden="true"
        />

        <div className="chv-formulaire__etape" key={etape}>
          <header className="chv-formulaire__tete">
            <h2>{titre}</h2>
            <p>{sous}</p>
          </header>

          {etape === 1 && (
            <>
              <fieldset className="chv-groupe">
                <legend className="chv-groupe__titre">Type de logement<span className="chv-requis"> *</span></legend>
                <div className="chv-tuiles">
                  {TYPES.map(({ nom, Icone }) => (
                    <label key={nom} className={`chv-tuile${d.typeLogement === nom ? " est-choisi" : ""}`}>
                      <input type="radio" name="typeLogement" checked={d.typeLogement === nom} onChange={() => choisirType(nom)} />
                      <span className="chv-tuile__icone"><Icone size={22} strokeWidth={1.6} aria-hidden="true" /></span>
                      {nom}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="chv-groupe">
                <ChampFlottant libelle="Commune du logement" requis valeur={d.commune} onChange={(v) => champ("commune", v)} autoComplete="address-level2" />
                <div className="chv-options chv-options--mini">
                  {COMMUNES.map((c) => (
                    <button key={c} type="button" className={`chv-option chv-option--mini${d.commune === c ? " est-choisi" : ""}`} onClick={() => champ("commune", c)}>
                      {c}
                    </button>
                  ))}
                </div>
                <ChampFlottant libelle="Adresse (facultatif)" valeur={d.adresse} onChange={(v) => champ("adresse", v)} autoComplete="street-address" />
                <ChampFlottant libelle="Surface" suffixe="m²" inputMode="numeric" valeur={d.superficie} onChange={(v) => champ("superficie", v)} />
              </div>

              <div className="chv-compteurs">
                <Compteur libelle="Pièces" valeur={d.pieces} min={1} max={10} onChange={(v) => champ("pieces", v)} />
                <Compteur libelle="Couchages" valeur={d.couchages} min={1} max={16} onChange={(v) => champ("couchages", v)} />
              </div>
            </>
          )}

          {etape === 2 && (
            <>
              <fieldset className="chv-groupe">
                <legend className="chv-groupe__titre">Formule qui vous intéresse</legend>
                <div className="chv-tuiles chv-tuiles--offres">
                  {FORMULES.map(({ nom, detail }) => (
                    <label key={nom} className={`chv-tuile chv-tuile--offre${d.formule === nom ? " est-choisi" : ""}`}>
                      <input type="radio" name="formule" checked={d.formule === nom} onChange={() => champ("formule", nom)} />
                      <span className="chv-tuile__coche" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                      <strong>{nom}</strong>
                      <span className="chv-tuile__detail">{detail}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <Puces titre="Atouts du logement" options={ATOUTS} choisies={d.atouts} onBasculer={(v) => basculer("atouts", v)} />
              <Puces titre="Déjà en location ?" options={PLATEFORMES} choisies={d.plateformes} onBasculer={(v) => basculer("plateformes", v)} />

              <div className="chv-groupe">
                <ChampFlottant libelle="Autre atout à signaler" valeur={d.equipements} onChange={(v) => champ("equipements", v)} />
              </div>
            </>
          )}

          {etape === 3 && (
            <>
              <div className="chv-groupe">
                <ChampFlottant libelle="Nom complet" requis valeur={d.nomComplet} onChange={(v) => champ("nomComplet", v)} autoComplete="name" />
                <ChampFlottant libelle="Téléphone" requis type="tel" valeur={d.telephone} onChange={(v) => champ("telephone", v)} autoComplete="tel" />
                <ChampFlottant libelle="E-mail" requis type="email" valeur={d.email} onChange={(v) => champ("email", v)} autoComplete="email" />
              </div>

              <Puces titre="Quand vous appeler ?" options={MOMENTS} choisies={d.moments} onBasculer={(v) => basculer("moments", v)} />

              <div className="chv-groupe">
                <ChampFlottant libelle="Votre message (facultatif)" multiligne valeur={d.commentaire} onChange={(v) => champ("commentaire", v)} />
              </div>

              <label className="chv-consentement">
                <input type="checkbox" checked={d.consentement} onChange={(e) => champ("consentement", e.target.checked)} />
                <span>
                  J'accepte que mes données soient utilisées pour traiter ma demande d'estimation, conformément à la{" "}
                  <Link to="/politique-confidentialite">politique de confidentialité</Link>. *
                </span>
              </label>
            </>
          )}

          {message && (
            <p className="chv-formulaire__message" role="alert">
              {message}
              {etat === "erreur" && (
                <> Vous pouvez aussi nous écrire à <a href={COURRIEL.lien}>{COURRIEL.affiche}</a> ou sur WhatsApp au <a href={TELEPHONE.lien} target="_blank" rel="noopener">{TELEPHONE.affiche}</a>.</>
              )}
            </p>
          )}

          <div className="chv-formulaire__actions">
            {etape > 1 && (
              <button type="button" className="chv-formulaire__retour" onClick={() => aller((etape - 1) as Etape)} aria-label="Étape précédente">
                <ArrowLeft size={20} strokeWidth={1.8} />
              </button>
            )}
            <button type="submit" className="chv-pastille chv-formulaire__suivant" disabled={etat === "envoi"}>
              {etape < 3 ? "Continuer" : etat === "envoi" ? "Envoi…" : "Envoyer ma demande"}
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/** Champ dont le libellé est posé dans la case et remonte dès qu'on écrit. */
function ChampFlottant({
  libelle,
  requis,
  multiligne,
  suffixe,
  valeur,
  onChange,
  ...attributs
}: {
  libelle: string;
  requis?: boolean;
  multiligne?: boolean;
  suffixe?: string;
  valeur: string;
  onChange: (valeur: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  const id = useId();
  return (
    <div className={`chv-flottant${multiligne ? " chv-flottant--multi" : ""}${suffixe ? " chv-flottant--suffixe" : ""}`}>
      {multiligne ? (
        <textarea id={id} className="chv-flottant__champ" placeholder=" " rows={4} value={valeur} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} className="chv-flottant__champ" placeholder=" " required={requis} value={valeur} onChange={(e) => onChange(e.target.value)} {...attributs} />
      )}
      <label htmlFor={id}>
        {libelle}
        {requis && <span className="chv-requis"> *</span>}
      </label>
      {suffixe && <span className="chv-flottant__suffixe" aria-hidden="true">{suffixe}</span>}
    </div>
  );
}

/** Pastilles à cocher (plusieurs choix possibles). */
function Puces({ titre, options, choisies, onBasculer }: { titre: ReactNode; options: string[]; choisies: string[]; onBasculer: (v: string) => void }) {
  return (
    <fieldset className="chv-groupe">
      <legend className="chv-groupe__titre">{titre}</legend>
      <div className="chv-options">
        {options.map((o) => {
          const choisie = choisies.includes(o);
          return (
            <label key={o} className={`chv-option${choisie ? " est-choisi" : ""}`}>
              <input type="checkbox" checked={choisie} onChange={() => onBasculer(o)} />
              <Check className="chv-option__coche" size={15} strokeWidth={2.6} aria-hidden="true" />
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Compteur − / + avec des points qui matérialisent la valeur. */
function Compteur({ libelle, valeur, min, max, onChange }: { libelle: string; valeur: number; min: number; max: number; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <div className="chv-compteur-bloc">
      <p className="chv-groupe__titre" id={id}>{libelle}</p>
      <div className="chv-compteur" role="group" aria-labelledby={id}>
        <button type="button" onClick={() => onChange(Math.max(min, valeur - 1))} disabled={valeur <= min} aria-label={`${libelle} : un de moins`}>
          <Minus size={18} strokeWidth={1.8} />
        </button>
        <span className="chv-compteur__valeur" aria-live="polite">
          <strong>{valeur}{valeur >= max ? "+" : ""}</strong>
          <i aria-hidden="true">
            {Array.from({ length: Math.min(valeur, 8) }, (_, i) => <b key={i} />)}
          </i>
        </span>
        <button type="button" onClick={() => onChange(Math.min(max, valeur + 1))} disabled={valeur >= max} aria-label={`${libelle} : un de plus`}>
          <Plus size={18} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
