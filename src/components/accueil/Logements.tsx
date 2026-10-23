import { Link } from "react-router-dom";
import { useLangue, useT } from "@/i18n/langue";
import { dossierLogement, LOGEMENTS_VITRINE, type LogementVitrine } from "@/data/logementsVitrine";
import { Etiquette, Revele, TitreAnime } from "./Primitives";

export function BoutonReservation({ logement, className = "" }: { logement: LogementVitrine; className?: string }) {
  const t = useT();
  const { lien } = useLangue();
  const classes = `chv-pastille chv-pastille--grand chv-logement__reserver ${className}`;
  if (logement.reservation) {
    return (
      <a className={classes} href={logement.reservation} target="_blank" rel="noopener">
        {t("Réserver en direct")}
      </a>
    );
  }
  return (
    <Link className={classes} to={lien("/contact")}>
      {t("Réserver en direct")}
    </Link>
  );
}

export const nombrePhotos = (l: LogementVitrine) => l.pieces.reduce((n, p) => n + p.photos.length, 0);

function CarteLogement({ logement }: { logement: LogementVitrine }) {
  const t = useT();
  const { lien } = useLangue();
  const fiche = lien(dossierLogement(logement.slug));
  return (
    <article className="chv-logement">
      <Revele effet="volume" className="chv-logement__media">
        <Link to={fiche} className="chv-logement__lecture" aria-label={`${t("Découvrir le logement")} ${logement.nom}`}>
          <img src={logement.photo.src} alt={t(logement.photo.alt)} width={logement.photo.largeur} height={logement.photo.hauteur} loading="lazy" />
          <span className="chv-logement__badge">{t("Réservation directe")}</span>
          <span className="chv-logement__jouer">
            <span className="chv-logement__rond" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <rect x="4" y="4" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <rect x="13" y="4" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <rect x="4" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <rect x="13" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <span>
              {t("Voir les photos")}
              <small>
                {nombrePhotos(logement)} {t("photos")}
              </small>
            </span>
          </span>
        </Link>
      </Revele>

      <Revele className="chv-logement__texte" delai={120}>
        <p className="chv-logement__lieu">{t(logement.lieu)}</p>
        <h3 className="chv-logement__nom">{logement.nom}</h3>
        <p className="chv-logement__accroche">{t(logement.accroche)}</p>
        <ul className="chv-logement__details">
          {logement.details.map((d) => (
            <li key={d}>{t(d)}</li>
          ))}
        </ul>
        <ul className="chv-logement__atouts">
          {logement.atouts.map((a) => (
            <li key={a}>{t(a)}</li>
          ))}
        </ul>
        <p className="chv-logement__note">
          <span aria-hidden="true">★</span> {logement.note.valeur} · {logement.note.avis} {t("avis voyageurs sur Airbnb")}
        </p>
        <div className="chv-logement__actions">
          <BoutonReservation logement={logement} />
          <Link className="chv-logement__voir" to={fiche}>
            {t("Découvrir le logement")}
          </Link>
        </div>
        <p className="chv-logement__mention">{t("Sans frais de plateforme : vous réservez directement auprès de nous.")}</p>
      </Revele>
    </article>
  );
}

/*
  Nos logements, sous les avis : les plus beaux appartements de la
  conciergerie, chacun avec sa fiche complète et sa réservation directe.
*/
export function LogementsAccueil() {
  const t = useT();
  return (
    <section id="logements" className="chv-section chv-logements" aria-labelledby="chv-titre-logements">
      <div className="chv-entete-section">
        <Etiquette>{t("Réservez en direct")}</Etiquette>
        <div id="chv-titre-logements">
          <TitreAnime lignes={[t("Nos"), t("logements")]} />
        </div>
        <Revele as="p" className="chv-logements__intro">
          {t("Une sélection de nos plus beaux appartements à Avignon, tenus comme un hôtel. Réservez directement auprès de nous.")}
        </Revele>
      </div>
      <div className="chv-logements__liste">
        {LOGEMENTS_VITRINE.map((l) => (
          <CarteLogement key={l.slug} logement={l} />
        ))}
      </div>
    </section>
  );
}
