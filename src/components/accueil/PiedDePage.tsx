import { useT, useLangue } from "@/i18n/langue";
import { Link } from "react-router-dom";
import { COURRIEL, LEGAL, RESEAUX, TELEPHONE } from "@/data/accueil";
import { EVENEMENT_COOKIES } from "./BandeauCookies";
import "./chevalier.css";

/*
  Toutes les pages du site restent liées depuis le pied de page : l'accueil
  tient sur une seule page, mais Google indexe /conciergerie-avignon,
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
      { libelle: "Estimation gratuite", lien: "/contact" },
      { libelle: "Devenir franchisé", lien: "/franchise" },
      { libelle: "Blog", lien: "/blog" },
    ],
  },
  {
    titre: "Nos villes",
    liens: [
      { libelle: "Toutes nos villes", lien: "/villes" },
      { libelle: "Conciergerie à Avignon", lien: "/conciergerie-avignon" },
      { libelle: "Villeneuve-lès-Avignon", lien: "/conciergerie-villeneuve-les-avignon" },
      { libelle: "Les Angles", lien: "/conciergerie-les-angles" },
      { libelle: "Aix-en-Provence", lien: "/conciergerie-aix-en-provence" },
      { libelle: "Montpellier", lien: "/conciergerie-montpellier" },
    ],
  },
  {
    titre: "Chevalier",
    liens: [
      { libelle: "Accueil", lien: "/" },
      { libelle: "À propos", lien: "/a-propos" },
      { libelle: "Contact", lien: "/contact" },
    ],
  },
  {
    titre: "Informations légales",
    liens: [
      { libelle: "Mentions légales", lien: "/mentions-legales" },
      { libelle: "CGV", lien: "/cgv" },
      { libelle: "Conditions de location", lien: "/cgv#location" },
      { libelle: "Confidentialité (RGPD)", lien: "/politique-confidentialite" },
    ],
  },
];

const PiedDePage = () => {
  const t = useT();
  const { lien } = useLangue();
  return (
  <footer className="chv-pied">
    <div className="chv-pied__haut">
      <div className="chv-pied__marque">
        <img src="/accueil/logo-chevalier-blanc.png" alt="CHEVALIER" width={996} height={129} loading="lazy" />
        <p style={{ maxWidth: 330 }}>
          {t("Conciergerie et sous-location de meublés de tourisme à Avignon, Villeneuve-lès-Avignon et Les Angles.")}
        </p>
        <div className="chv-pied__contact">
          <a href={TELEPHONE.lien} target="_blank" rel="noopener">WhatsApp {TELEPHONE.international}</a>
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
        <nav key={colonne.titre} className="chv-pied__colonne" aria-label={t(colonne.titre)}>
          <h2>{t(colonne.titre)}</h2>
          {colonne.liens.map((l) => (
            <Link key={l.lien} to={lien(l.lien)}>{t(l.libelle)}</Link>
          ))}
          {colonne.titre === "Informations légales" && (
            <button type="button" className="chv-pied__cookies" onClick={() => window.dispatchEvent(new Event(EVENEMENT_COOKIES))}>
              {t("Gestion des cookies")}
            </button>
          )}
        </nav>
      ))}
    </div>

    <p className="chv-pied__mentions">
      {LEGAL.raisonSociale} · {LEGAL.forme} · SIRET {LEGAL.siret} · TVA {LEGAL.tva} · RCS {LEGAL.rcs} · APE {LEGAL.ape}
    </p>
    {/* Les liens légaux répétés tout en bas, sur une ligne : c'est là qu'on les cherche. */}
    <nav className="chv-pied__legal" aria-label={t("Informations légales")}>
      <Link to={lien("/mentions-legales")}>{t("Mentions légales")}</Link>
      <Link to={lien("/cgv")}>{t("CGV")}</Link>
      <Link to={lien("/politique-confidentialite")}>{t("Confidentialité (RGPD)")}</Link>
      <button type="button" onClick={() => window.dispatchEvent(new Event(EVENEMENT_COOKIES))}>
        {t("Gestion des cookies")}
      </button>
    </nav>
    <p className="chv-pied__bas">
      <span>
        © {new Date().getFullYear()} Chevalier Conciergerie. {t("Tous droits réservés — Taxe de séjour collectée pour le compte de la collectivité et reversée intégralement.")}
      </span>
    </p>
    {/* La marque en très grand, sur toute la largeur, coupée en bas de page. Décorative. */}
    <div className="chv-pied__geant" aria-hidden="true">CHEVALIER</div>
  </footer>
  );
};

export default PiedDePage;
