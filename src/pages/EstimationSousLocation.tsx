import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@/lib/seo";
import EnTete from "@/components/accueil/EnTete";
import PiedDePage from "@/components/accueil/PiedDePage";
import { Etiquette, TitreAnime } from "@/components/accueil/Primitives";
import { COURRIEL, TELEPHONE } from "@/data/accueil";

/*
  Estimation gratuite, conciergerie comme sous-location. Même URL que
  l'ancienne page (déjà indexée et liée depuis tout le site), nouveau design.

  Envoi : l'ancienne version ouvrait la messagerie du visiteur (mailto:) — la
  demande n'arrivait que s'il appuyait lui-même sur « Envoyer », et jamais
  depuis un téléphone sans messagerie configurée. Le formulaire part désormais
  directement vers contact@chevalier-conciergerie.com via FormSubmit, sans
  clé ni serveur. ⚠️ Au tout premier envoi, FormSubmit adresse à cette boîte
  un courriel « Activate Form » : il faut cliquer le lien une fois, ensuite
  chaque demande arrive directement.
*/
const ENVOI = "https://formsubmit.co/ajax/contact@chevalier-conciergerie.com";

type Formule = "Conciergerie" | "Sous-location" | "Je ne sais pas encore";

interface Donnees {
  formule: Formule;
  adresse: string;
  codePostal: string;
  ville: string;
  typeLogement: string;
  superficie: string;
  nombrePieces: string;
  nombreChambres: string;
  nombreSdb: string;
  meuble: boolean;
  parking: boolean;
  exterieur: boolean;
  equipements: string;
  nomComplet: string;
  telephone: string;
  email: string;
  disponibilite: string;
  commentaire: string;
  consentement: boolean;
  piege: string;
}

const VIDE: Donnees = {
  formule: "Je ne sais pas encore",
  adresse: "",
  codePostal: "",
  ville: "",
  typeLogement: "",
  superficie: "",
  nombrePieces: "",
  nombreChambres: "",
  nombreSdb: "",
  meuble: false,
  parking: false,
  exterieur: false,
  equipements: "",
  nomComplet: "",
  telephone: "",
  email: "",
  disponibilite: "",
  commentaire: "",
  consentement: false,
  piege: "",
};

const FORMULES: Formule[] = ["Conciergerie", "Sous-location", "Je ne sais pas encore"];

const oui = (b: boolean) => (b ? "Oui" : "Non");

const Estimation = () => {
  const [etape, setEtape] = useState<1 | 2>(1);
  const [d, setD] = useState<Donnees>(VIDE);
  const [etat, setEtat] = useState<"saisie" | "envoi" | "envoye" | "erreur">("saisie");
  const [message, setMessage] = useState("");

  const champ = <K extends keyof Donnees>(cle: K, valeur: Donnees[K]) => setD((p) => ({ ...p, [cle]: valeur }));

  const envoyer = async (e: FormEvent) => {
    e.preventDefault();
    if (!d.nomComplet.trim() || !d.telephone.trim() || !d.email.trim()) {
      setMessage("Merci d'indiquer votre nom, votre téléphone et votre e-mail.");
      return;
    }
    if (!d.consentement) {
      setMessage("Merci d'accepter l'utilisation de vos données pour traiter la demande.");
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
          "Disponibilité pour un appel": d.disponibilite || "Non précisé",
          Adresse: d.adresse || "Non précisé",
          "Code postal": d.codePostal || "Non précisé",
          Ville: d.ville || "Non précisé",
          Type: d.typeLogement || "Non précisé",
          "Surface (m²)": d.superficie || "Non précisé",
          Pièces: d.nombrePieces || "Non précisé",
          ...(d.typeLogement === "Maison" ? { Chambres: d.nombreChambres || "Non précisé", "Salles de bain": d.nombreSdb || "Non précisé" } : {}),
          Meublé: oui(d.meuble),
          Parking: oui(d.parking),
          Extérieur: oui(d.exterieur),
          "Équipements, points forts": d.equipements || "Non précisé",
          Commentaire: d.commentaire || "Aucun",
        }),
      });
      const resultat = await reponse.json().catch(() => ({}));
      if (reponse.ok && String(resultat.success) === "true") {
        setEtat("envoye");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setEtat("erreur");
        setMessage(resultat.message || "L'envoi n'a pas abouti.");
      }
    } catch {
      setEtat("erreur");
      setMessage("L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Estimation gratuite | Conciergerie et sous-location à Avignon | Chevalier</title>
        <meta
          name="description"
          content="Estimation gratuite et sans engagement de votre bien à Avignon, Villeneuve-lès-Avignon et Les Angles, en conciergerie comme en sous-location. Réponse sous 48 h."
        />
        <link rel="canonical" href="https://chevalier-conciergerie.com/estimation-sous-location" />
      </Helmet>

      <div className="chv">
        <EnTete />
        <main className="chv-section chv-estimation">
          <div className="chv-entete-section">
            <Etiquette>Estimation gratuite</Etiquette>
            <TitreAnime as="h1" lignes={["Estimons", "votre bien"]} />
            <p className="chv-estimation__intro">
              Décrivez votre logement : nous vous disons ce qu'il peut rapporter, en conciergerie comme en sous-location.
              Réponse sous 48 h, sans engagement.
            </p>
          </div>

          {etat === "envoye" ? (
            <div className="chv-formulaire chv-formulaire--merci">
              <h2>Merci, votre demande est bien arrivée.</h2>
              <p>
                Nous étudions votre bien et revenons vers vous sous 48 h. Pour aller plus vite, appelez-nous au{" "}
                <a href={TELEPHONE.lien}>{TELEPHONE.affiche}</a>.
              </p>
              <Link to="/" className="chv-pastille">Retour à l'accueil</Link>
            </div>
          ) : (
            <form className="chv-formulaire" onSubmit={envoyer} noValidate>
              <ol className="chv-etapes-form" aria-label="Étapes">
                <li className={etape === 1 ? "est-active" : "est-faite"}>
                  <button type="button" onClick={() => setEtape(1)}>1 · Le bien</button>
                </li>
                <li className={etape === 2 ? "est-active" : ""}>
                  <button type="button" onClick={() => setEtape(2)}>2 · Vos coordonnées</button>
                </li>
              </ol>

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

              {etape === 1 && (
                <div className="chv-formulaire__etape">
                  <fieldset>
                    <legend>Quelle formule vous intéresse ?</legend>
                    <div className="chv-choix">
                      {FORMULES.map((f) => (
                        <label key={f} className={d.formule === f ? "est-choisi" : ""}>
                          <input type="radio" name="formule" checked={d.formule === f} onChange={() => champ("formule", f)} />
                          {f}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>Où se situe votre bien ?</legend>
                    <input className="chv-champ" placeholder="Adresse (numéro et rue)" value={d.adresse} onChange={(e) => champ("adresse", e.target.value)} autoComplete="street-address" />
                    <div className="chv-grille-2">
                      <input className="chv-champ" placeholder="Code postal" inputMode="numeric" value={d.codePostal} onChange={(e) => champ("codePostal", e.target.value)} autoComplete="postal-code" />
                      <input className="chv-champ" placeholder="Ville" value={d.ville} onChange={(e) => champ("ville", e.target.value)} autoComplete="address-level2" />
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>Votre logement</legend>
                    <div className="chv-grille-3">
                      <label className="chv-libelle">
                        Type
                        <select className="chv-champ" value={d.typeLogement} onChange={(e) => champ("typeLogement", e.target.value)}>
                          <option value="">Choisir</option>
                          {["Studio", "T1", "T2", "T3", "T4 et plus", "Maison"].map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </label>
                      <label className="chv-libelle">
                        Surface (m²)
                        <input className="chv-champ" inputMode="numeric" placeholder="Ex : 45" value={d.superficie} onChange={(e) => champ("superficie", e.target.value)} />
                      </label>
                      <label className="chv-libelle">
                        Pièces
                        <input className="chv-champ" inputMode="numeric" placeholder="Ex : 3" value={d.nombrePieces} onChange={(e) => champ("nombrePieces", e.target.value)} />
                      </label>
                    </div>
                    {d.typeLogement === "Maison" && (
                      <div className="chv-grille-2">
                        <label className="chv-libelle">
                          Chambres
                          <input className="chv-champ" inputMode="numeric" value={d.nombreChambres} onChange={(e) => champ("nombreChambres", e.target.value)} />
                        </label>
                        <label className="chv-libelle">
                          Salles de bain
                          <input className="chv-champ" inputMode="numeric" value={d.nombreSdb} onChange={(e) => champ("nombreSdb", e.target.value)} />
                        </label>
                      </div>
                    )}
                    <div className="chv-cases">
                      {([["meuble", "Meublé"], ["parking", "Parking"], ["exterieur", "Extérieur (balcon, terrasse…)"]] as const).map(([cle, libelle]) => (
                        <label key={cle}>
                          <input type="checkbox" checked={d[cle]} onChange={(e) => champ(cle, e.target.checked)} />
                          {libelle}
                        </label>
                      ))}
                    </div>
                    <input className="chv-champ" placeholder="Équipements ou points forts (climatisation, vue, parking privé…)" value={d.equipements} onChange={(e) => champ("equipements", e.target.value)} />
                  </fieldset>

                  <div className="chv-formulaire__actions">
                    <span />
                    <button type="button" className="chv-pastille" onClick={() => { setEtape(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      Continuer
                    </button>
                  </div>
                </div>
              )}

              {etape === 2 && (
                <div className="chv-formulaire__etape">
                  <fieldset>
                    <legend>Vos coordonnées</legend>
                    <label className="chv-libelle">
                      Nom complet *
                      <input className="chv-champ" value={d.nomComplet} onChange={(e) => champ("nomComplet", e.target.value)} autoComplete="name" required />
                    </label>
                    <div className="chv-grille-2">
                      <label className="chv-libelle">
                        Téléphone *
                        <input className="chv-champ" type="tel" value={d.telephone} onChange={(e) => champ("telephone", e.target.value)} autoComplete="tel" required />
                      </label>
                      <label className="chv-libelle">
                        E-mail *
                        <input className="chv-champ" type="email" value={d.email} onChange={(e) => champ("email", e.target.value)} autoComplete="email" required />
                      </label>
                    </div>
                    <label className="chv-libelle">
                      Quand êtes-vous disponible pour un appel ?
                      <input className="chv-champ" placeholder="En semaine après 18 h, le week-end…" value={d.disponibilite} onChange={(e) => champ("disponibilite", e.target.value)} />
                    </label>
                    <label className="chv-libelle">
                      Une question, un commentaire ?
                      <textarea className="chv-champ" rows={4} value={d.commentaire} onChange={(e) => champ("commentaire", e.target.value)} />
                    </label>
                  </fieldset>

                  <label className="chv-consentement">
                    <input type="checkbox" checked={d.consentement} onChange={(e) => champ("consentement", e.target.checked)} />
                    <span>
                      J'accepte que mes données soient utilisées pour traiter ma demande d'estimation, conformément à la{" "}
                      <Link to="/politique-confidentialite">politique de confidentialité</Link>. *
                    </span>
                  </label>

                  {message && (
                    <p className="chv-formulaire__message" role="alert">
                      {message}
                      {etat === "erreur" && (
                        <> Vous pouvez aussi nous écrire à <a href={COURRIEL.lien}>{COURRIEL.affiche}</a> ou appeler le <a href={TELEPHONE.lien}>{TELEPHONE.affiche}</a>.</>
                      )}
                    </p>
                  )}

                  <div className="chv-formulaire__actions">
                    <button type="button" className="chv-lien-retour" onClick={() => setEtape(1)}>Retour</button>
                    <button type="submit" className="chv-pastille" disabled={etat === "envoi"}>
                      {etat === "envoi" ? "Envoi…" : "Envoyer ma demande"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </main>
        <PiedDePage />
      </div>
    </>
  );
};

export default Estimation;
