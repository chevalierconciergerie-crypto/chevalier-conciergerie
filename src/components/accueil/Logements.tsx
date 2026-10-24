import { Link } from "react-router-dom";
import { useLangue, useT } from "@/i18n/langue";
import { dossierLogement, LOGEMENTS_VITRINE, type LogementVitrine } from "@/data/logementsVitrine";
import { Revele, TitreAnime } from "./Primitives";

export function BoutonReservation({ logement, className = "" }: { logement: LogementVitrine; className?: string }) {
  const t = useT();
  const { lien } = useLangue();
  const classes = `chv-pastille chv-pastille--grand chv-logement__reserver ${className}`;
  if (logement.reservation) {
    return (
      <a className={classes} href={logement.reservation} target="_blank" rel="noopener">
        {t("Réserver")}
      </a>
    );
  }
  return (
    <Link className={classes} to={lien("/contact")}>
      {t("Réserver")}
    </Link>
  );
}

export const nombrePhotos = (l: LogementVitrine) => l.pieces.reduce((n, p) => n + p.photos.length, 0);

/* Une carte par logement : la photo, le nom, le quartier, la capacité, la note. */
function CarteLogement({ logement, rang }: { logement: LogementVitrine; rang: number }) {
  const t = useT();
  const { lien } = useLangue();
  return (
    <Revele as="li" delai={(rang % 4) * 80}>
      <Link to={lien(dossierLogement(logement.slug))} className="chv-carte-logement">
        <span className="chv-carte-logement__photo">
          <img data-zoom src={logement.photo.src} alt={t(logement.photo.alt)} width={logement.photo.largeur} height={logement.photo.hauteur} loading="lazy" />
        </span>
        <span className="chv-carte-logement__haut">
          <span className="chv-carte-logement__nom">{logement.nom}</span>
          <span className="chv-carte-logement__note">{logement.note.nouveau ? t("Nouveau") : `★ ${logement.note.valeur}`}</span>
        </span>
        <span className="chv-carte-logement__ligne">{t(logement.lieu)}</span>
        <span className="chv-carte-logement__ligne">{logement.details.slice(0, 2).map((d) => t(d)).join(" · ")}</span>
      </Link>
    </Revele>
  );
}

/*
  Nos logements, sous les avis : une grille de petites cartes (quatre par
  rangée sur ordinateur, deux sur téléphone), chacune vers la fiche du logement.
*/
export function LogementsAccueil() {
  const t = useT();
  return (
    <section id="logements" className="chv-section chv-logements" aria-labelledby="chv-titre-logements">
      <div id="chv-titre-logements" className="chv-entete-section">
        <TitreAnime lignes={[t("Nos logements")]} />
      </div>
      <ul className="chv-logements__grille">
        {LOGEMENTS_VITRINE.map((l, i) => (
          <CarteLogement key={l.slug} logement={l} rang={i} />
        ))}
      </ul>
    </section>
  );
}
