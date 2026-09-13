import { Link } from "react-router-dom";
import { COURRIEL, LEGAL, RESEAUX, TELEPHONE } from "@/data/accueil";
import { EVENEMENT_COOKIES } from "./BandeauCookies";
import "./chevalier.css";

/*
  Toutes les pages du site restent liées depuis le pied de page : l'accueil
  tient sur une seule page, mais Google indexe /conciergerie-avignon, /tarifs,
  le Journal… et ces liens, présents sur chaque page, sont ce qui les lui fait
  trouver et leur transmet du poids. Titres de colonnes en <h2> : un <h4> après
  le <h2> d'une section sauterait des niveaux.
*/
const COLONNES = [
  {
    titre: "Nos services",
    liens: [
      { libelle: "Conciergerie", lien: "/conciergerie" },
      { libelle: "Sous-location", lien: "/sous-location" },
      { libelle: "Tarifs", lien: "/tarifs" },
      { libelle: "Estimation gratuite", lien: "/estimation-sous-location" },
      { libelle: "Journal", lien: "/journal" },
    ],
  },
  {
    titre: "Nos villes",
    liens: [
      { libelle: "Conciergerie à Avignon", lien: "/conciergerie-avignon" },
      { libelle: "Villeneuve-lès-Avignon", lien: "/conciergerie-villeneuve-les-avignon" },
      { libelle: "Les Angles", lien: "/conciergerie-les-angles" },
    ],
  },
  {
    titre: "Chevalier",
    liens: [
      { libelle: "Accueil", lien: "/" },
      { libelle: "À propos", lien: "/a-propos" },
      { libelle: "Nos partenaires", lien: "/partenaires" },
      { libelle: "Contact", lien: "/contact" },
    ],
  },
  {
    titre: "Informations légales",
    liens: [
      { libelle: "Mentions légales", lien: "/mentions-legales" },
      { libelle: "CGV", lien: "/cgv" },
      { libelle: "Politique de confidentialité", lien: "/politique-confidentialite" },
    ],
  },
];

const PiedDePage = () => (
  <footer className="chv-pied">
    <div className="chv-pied__haut">
      <div className="chv-pied__marque">
        <img src="/accueil/logo-chevalier-blanc.png" alt="CHEVALIER" width={996} height={129} loading="lazy" />
        <p style={{ maxWidth: 330 }}>
          Conciergerie et sous-location de meublés de tourisme à Avignon, Villeneuve-lès-Avignon et Les Angles.
        </p>
        <div className="chv-pied__contact">
          <a href={TELEPHONE.lien}>{TELEPHONE.international}</a>
          <a href={COURRIEL.lien}>{COURRIEL.affiche}</a>
          <address>{LEGAL.adresse}</address>
        </div>
        <div className="chv-pied__icones">
          {RESEAUX.map((r) => (
            <a key={r.nom} href={r.lien} target="_blank" rel="noopener noreferrer" title={r.nom}>
              <img src={r.logo} alt={r.nom} width={34} height={34} loading="lazy" />
            </a>
          ))}
        </div>
      </div>

      {COLONNES.map((colonne) => (
        <nav key={colonne.titre} className="chv-pied__colonne" aria-label={colonne.titre}>
          <h2>{colonne.titre}</h2>
          {colonne.liens.map((l) => (
            <Link key={l.lien} to={l.lien}>{l.libelle}</Link>
          ))}
          {colonne.titre === "Informations légales" && (
            <button type="button" className="chv-pied__cookies" onClick={() => window.dispatchEvent(new Event(EVENEMENT_COOKIES))}>
              Gestion des cookies
            </button>
          )}
        </nav>
      ))}
    </div>

    <p className="chv-pied__mentions">
      {LEGAL.raisonSociale} · {LEGAL.forme} · SIRET {LEGAL.siret} · TVA {LEGAL.tva} · RCS {LEGAL.rcs} · APE {LEGAL.ape}
    </p>
    <p className="chv-pied__bas">
      <span>
        © {new Date().getFullYear()} Chevalier Conciergerie. Tous droits réservés — Taxe de séjour collectée pour le
        compte de la collectivité et reversée intégralement.
      </span>
    </p>
  </footer>
);

export default PiedDePage;
