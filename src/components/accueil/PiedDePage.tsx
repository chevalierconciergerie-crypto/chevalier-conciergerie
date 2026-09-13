import { Link } from "react-router-dom";
import { COURRIEL, LEGAL, RESEAUX, TELEPHONE } from "@/data/accueil";
import "./chevalier.css";

/*
  Les pages intérieures restent liées depuis le pied de page : l'accueil tient
  sur une seule page, mais Google continue d'indexer /conciergerie-avignon,
  /tarifs ou le Journal, et ces liens sont ce qui les lui fait trouver.
*/
const PAGES = [
  { libelle: "Conciergerie à Avignon", lien: "/conciergerie-avignon" },
  { libelle: "Villeneuve-lès-Avignon", lien: "/conciergerie-villeneuve-les-avignon" },
  { libelle: "Les Angles", lien: "/conciergerie-les-angles" },
  { libelle: "Tarifs", lien: "/tarifs" },
  { libelle: "Estimation gratuite", lien: "/estimation-sous-location" },
  { libelle: "Journal", lien: "/journal" },
  { libelle: "Partenaires", lien: "/partenaires" },
];

const PiedDePage = () => (
  <footer className="chv-pied">
    <div className="chv-pied__haut">
      <div className="chv-pied__marque">
        <img src="/accueil/logo-chevalier-blanc.png" alt="CHEVALIER" width={996} height={129} loading="lazy" />
        <p style={{ maxWidth: 330 }}>
          Conciergerie et sous-location de meublés de tourisme à Avignon, Villeneuve-lès-Avignon et Les Angles.
        </p>
      </div>

      <div className="chv-pied__colonne">
        <h4>Contact</h4>
        <a href={TELEPHONE.lien}>{TELEPHONE.international}</a>
        <a href={COURRIEL.lien}>{COURRIEL.affiche}</a>
        <address>{LEGAL.adresse}</address>
      </div>

      <nav className="chv-pied__colonne" aria-label="Pages du site">
        <h4>Le site</h4>
        {PAGES.map((p) => (
          <Link key={p.lien} to={p.lien}>{p.libelle}</Link>
        ))}
      </nav>

      <div className="chv-pied__colonne chv-pied__reseaux">
        <h4>Suivez-nous</h4>
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
