import { Link } from "react-router-dom";
import { COURRIEL, LEGAL, RESEAUX, TELEPHONE } from "@/data/accueil";
import "./chevalier.css";

/* Le pied de page de la maquette : marque, coordonnées, adresse, réseaux, puis les mentions légales. */
const PiedDePage = () => (
  <footer className="chv-pied">
    <div className="chv-pied__haut">
      <div className="chv-pied__marque">
        <img src="/accueil/logo-chevalier-blanc.png" alt="CHEVALIER" width={996} height={129} loading="lazy" />
        <p style={{ maxWidth: 330 }}>
          Conciergerie et sous-location de meublés de tourisme à Avignon, Villeneuve-lès-Avignon et Les Angles.
        </p>
      </div>

      <div className="chv-pied__colonne" style={{ flexBasis: 240 }}>
        <a href={TELEPHONE.lien}>{TELEPHONE.international}</a>
        <a href={COURRIEL.lien}>{COURRIEL.affiche}</a>
      </div>

      <address style={{ flex: "0 1 240px" }}>{LEGAL.adresse}</address>

      <div className="chv-pied__colonne chv-pied__reseaux">
        {RESEAUX.map((r) => (
          <a key={r.nom} href={r.lien} target="_blank" rel="noopener noreferrer">{r.nom}</a>
        ))}
      </div>
    </div>

    <p className="chv-pied__mentions">
      {LEGAL.raisonSociale} · {LEGAL.forme} · SIRET {LEGAL.siret} · TVA {LEGAL.tva} · RCS {LEGAL.rcs} · APE {LEGAL.ape}
    </p>
    <p className="chv-pied__bas">
      <span>
        © {new Date().getFullYear()} Chevalier Conciergerie — Taxe de séjour collectée pour le compte de la collectivité
        et reversée intégralement.
      </span>
      <Link to="/mentions-legales">Mentions légales</Link>
      <Link to="/cgv">CGV</Link>
      <Link to="/politique-confidentialite">Confidentialité</Link>
    </p>
  </footer>
);

export default PiedDePage;
