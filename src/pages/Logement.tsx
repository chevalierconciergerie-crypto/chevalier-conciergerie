import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { useLangue, useT } from "@/i18n/langue";
import { TELEPHONE } from "@/data/accueil";
import { logementParSlug, photoPleine, vignette, type LogementVitrine } from "@/data/logementsVitrine";
import { BoutonReservation, nombrePhotos } from "@/components/accueil/Logements";
import Visionneuse from "@/components/accueil/Visionneuse";
import "@/components/accueil/chevalier.css";

const SITE = "https://chevalier-conciergerie.com";

/*
  /logements/<slug> — la fiche complète d'un logement, avec tout le contenu
  de son annonce : photos par pièce, description, couchages, équipements,
  notes, horaires, règlement, emplacement. La réservation reste à portée :
  colonne fixe sur ordinateur, barre en bas de l'écran sur téléphone.

  Le texte lisible sans JavaScript (scripts/seo-routes.mjs) reprend celui-ci.
*/
const Logement = () => {
  const { slug } = useParams();
  const logement = logementParSlug(slug);
  if (!logement) return <NotFound />;
  return <Fiche logement={logement} />;
};

function Fiche({ logement: l }: { logement: LogementVitrine }) {
  const t = useT();
  const { langue, lien } = useLangue();
  const [ouverte, setOuverte] = useState<number | null>(null);
  const fermer = useCallback(() => setOuverte(null), []);

  // toutes les photos, dans l'ordre des pièces, pour la visionneuse
  const toutes = useMemo(
    () => l.pieces.flatMap((p) => p.photos.map((ph) => ({ fichier: ph.fichier, piece: p.piece }))),
    [l],
  );
  const indexDe = (fichier: string) => Math.max(0, toutes.findIndex((p) => p.fichier === fichier));
  const pieceDe = (fichier: string) => toutes[indexDe(fichier)]?.piece ?? "";
  const photosVisionneuse = useMemo(
    () => toutes.map((p) => ({ src: photoPleine(l.slug, p.fichier), legende: `${t(p.piece)} · ${l.nom}` })),
    [toutes, l, t],
  );
  const n = nombrePhotos(l);
  const chemin = `/logements/${l.slug}`;
  const canonique = `${SITE}${langue === "en" ? `/en${chemin}` : chemin}`;
  const titre = l.titrePage ?? `${l.nom} — ${t("Appartement à Avignon intra-muros")} | ${t("Réservation directe")} | Chevalier Conciergerie`;

  return (
    <>
      <Helmet>
        <title>{titre}</title>
        <meta name="description" content={t(l.accroche)} />
        <meta property="og:title" content={`${l.nom} — ${t("Appartement à Avignon intra-muros")}`} />
        <meta property="og:description" content={t(l.accroche)} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE}${photoPleine(l.slug, l.mosaique[0])}`} />
        <link rel="canonical" href={canonique} />
      </Helmet>

      <Header />

      <main className="chv chv-fiche">
        {/* mosaïque des photos, en tête */}
        <section className="chv-fiche__galerie" aria-label={t("Photos du logement")}>
          <div className="chv-fiche__mosaique">
            {l.mosaique.map((f, i) => (
              <button key={f} type="button" className={`chv-fiche__tuile chv-fiche__tuile--${i}`} onClick={() => setOuverte(indexDe(f))}>
                <img
                  src={i === 0 ? photoPleine(l.slug, f) : vignette(l.slug, f)}
                  alt={`${t(pieceDe(f))} — ${l.nom}`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </button>
            ))}
          </div>
          <button type="button" className="chv-fiche__toutes" onClick={() => setOuverte(0)}>
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {n} {t("photos")}
          </button>
        </section>

        <div className="chv-fiche__corps">
          <div className="chv-fiche__contenu">
            <nav className="chv-fiche__ariane" aria-label={t("Fil d'Ariane")}>
              <Link to={lien("/")}>{t("Accueil")}</Link> › <Link to={`${lien("/")}#logements`}>{t("Nos logements")}</Link> › <span>{l.nom}</span>
            </nav>

            <header className="chv-fiche__entete">
              <p className="chv-logement__lieu">{t(l.lieu)}</p>
              <h1 className="chv-fiche__titre">{l.nom}</h1>
              <p className="chv-fiche__type">{t(l.type ?? "Appartement entier")}</p>
              <ul className="chv-logement__details">
                {l.details.map((d) => (
                  <li key={d}>{t(d)}</li>
                ))}
              </ul>
              <p className="chv-logement__note">
                {l.note.nouveau ? t("Nouveau") : <><span aria-hidden="true">★</span> {l.note.valeur} · {l.note.avis} {t("avis")}</>}
              </p>
            </header>

            <section className="chv-fiche__bloc" aria-labelledby="fiche-description">
              <h2 id="fiche-description" className="chv-fiche__intertitre">{t("Le logement")}</h2>
              {l.description.intro.map((p) => (
                <p key={p} className="chv-fiche__texte">{t(p)}</p>
              ))}
              {l.description.texte && <p className="chv-fiche__texte">{t(l.description.texte)}</p>}
              <div className="chv-fiche__listes">
                {l.description.listes.map((liste) => (
                  <div key={liste.titre}>
                    <h3>{t(liste.titre)}</h3>
                    <ul>
                      {liste.elements.map((e) => (
                        <li key={e}>{t(e)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {l.description.fin.map((p) => (
                <p key={p} className="chv-fiche__texte">{t(p)}</p>
              ))}
            </section>

            {l.couchages.length > 0 && (
            <section className="chv-fiche__bloc" aria-labelledby="fiche-couchages">
              <h2 id="fiche-couchages" className="chv-fiche__intertitre">{t("Où vous dormirez")}</h2>
              <div className="chv-fiche__couchages">
                {l.couchages.map((c) => (
                  <button key={c.piece} type="button" className="chv-fiche__couchage" onClick={() => setOuverte(indexDe(c.photo))}>
                    <img src={vignette(l.slug, c.photo)} alt={`${t(c.piece)} — ${l.nom}`} loading="lazy" />
                    <strong>{t(c.piece)}</strong>
                    <span>{t(c.lit)}</span>
                  </button>
                ))}
              </div>
            </section>
            )}

            <section id="photos" className="chv-fiche__bloc" aria-labelledby="fiche-photos">
              <h2 id="fiche-photos" className="chv-fiche__intertitre">{t("Photos")}</h2>
              {l.pieces.map((p) => (
                <div key={p.piece} className="chv-fiche__piece">
                  <h3>
                    {t(p.piece)} <span>{p.photos.length} {t(p.photos.length > 1 ? "photos" : "photo")}</span>
                  </h3>
                  {p.equipements && <p className="chv-fiche__equipements-piece">{p.equipements.map((e) => t(e)).join(" · ")}</p>}
                  <div className="chv-fiche__grille">
                    {p.photos.map((ph) => (
                      <button
                        key={ph.fichier}
                        type="button"
                        className={`chv-fiche__vignette ${ph.hauteur > ph.largeur ? "chv-fiche__vignette--haute" : ""}`}
                        onClick={() => setOuverte(indexDe(ph.fichier))}
                        aria-label={`${t("Agrandir la photo")} — ${t(p.piece)}`}
                      >
                        <img src={vignette(l.slug, ph.fichier)} alt={`${t(p.piece)} — ${l.nom}`} width={ph.largeur / 2} height={ph.hauteur / 2} loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className="chv-fiche__bloc" aria-labelledby="fiche-equipements">
              <h2 id="fiche-equipements" className="chv-fiche__intertitre">{t("Équipements")}</h2>
              <div className="chv-fiche__equipements">
                {l.equipements.map((c) => (
                  <div key={c.categorie}>
                    <h3>{t(c.categorie)}</h3>
                    <ul>
                      {c.elements.map((e) => (
                        <li key={e}>{t(e)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {l.nonInclus.length > 0 && (
                <p className="chv-fiche__non-inclus">
                  {t("Non disponible :")} {l.nonInclus.map((e) => t(e).toLowerCase()).join(", ")}.
                </p>
              )}
            </section>

            {!l.note.nouveau && (
            <section className="chv-fiche__bloc" aria-labelledby="fiche-notes">
              <h2 id="fiche-notes" className="chv-fiche__intertitre">
                {l.note.nouveau ? t("Nouveau") : <><span aria-hidden="true">★</span> {l.note.valeur} · {l.note.avis} {t("avis")}</>}
              </h2>
              <p className="chv-fiche__texte chv-fiche__texte--discret">{t("Notes laissées par les voyageurs sur Airbnb.")}</p>
              <dl className="chv-fiche__notes">
                {l.note.categories.map((c) => (
                  <div key={c.nom}>
                    <dt>{t(c.nom)}</dt>
                    <dd>
                      <span className="chv-fiche__jauge" aria-hidden="true">
                        <span style={{ width: `${(parseFloat(c.valeur.replace(",", ".")) / 5) * 100}%` }} />
                      </span>
                      {c.valeur}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
            )}

            <section className="chv-fiche__bloc" aria-labelledby="fiche-savoir">
              <h2 id="fiche-savoir" className="chv-fiche__intertitre">{t("À savoir")}</h2>
              <div className="chv-fiche__savoir">
                <div>
                  <h3>{t("Arrivée et départ")}</h3>
                  <ul>
                    <li>
                      {t("Arrivée :")} {t(l.arrivee)}
                    </li>
                    <li>
                      {t("Départ :")} {t(l.depart)}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3>{t("Règlement intérieur")}</h3>
                  <ul>
                    {l.reglement.map((r) => (
                      <li key={r}>{t(r)}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>{t("Annulation")}</h3>
                  <ul>
                    <li>{t(l.annulation)}</li>
                    <li>
                      <Link to={`${lien("/cgv")}#location`}>{t("Voir les conditions de location")}</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3>{t("Gestion")}</h3>
                  <ul>
                    <li>{t("Logement loué par son propriétaire et géré par Chevalier Conciergerie.")}</li>
                    {l.numeroEnregistrement && (
                      <li>
                        {t("Numéro d'enregistrement :")} {l.numeroEnregistrement}
                      </li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3>{t("Sécurité")}</h3>
                  <ul>
                    {l.securite.map((r) => (
                      <li key={r}>{t(r)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="chv-fiche__bloc" aria-labelledby="fiche-quartier">
              <h2 id="fiche-quartier" className="chv-fiche__intertitre">{t("Emplacement")}</h2>
              {l.quartier.map((p) => (
                <p key={p} className="chv-fiche__texte">{t(p)}</p>
              ))}
            </section>
          </div>

          <aside className="chv-fiche__reservation" aria-label={t("Réservation")}>
            <div className="chv-fiche__carte">
              <p className="chv-fiche__carte-nom">{l.nom}</p>
              <p className="chv-logement__note">
                {l.note.nouveau ? t("Nouveau") : <><span aria-hidden="true">★</span> {l.note.valeur} · {l.note.avis} {t("avis")}</>}
              </p>
              <BoutonReservation logement={l} />
              <ul className="chv-fiche__carte-infos">
                <li>
                  {t("Arrivée :")} {t(l.arrivee)}
                </li>
                <li>
                  {t("Départ :")} {t(l.depart)}
                </li>
                <li>{t(l.annulation)}</li>
              </ul>
              <p className="chv-fiche__carte-conditions">
                <Link to={`${lien("/cgv")}#location`}>{t("Voir les conditions de location")}</Link>
              </p>
              <p className="chv-fiche__carte-appel">
                {t("Une question ?")} <a href={TELEPHONE.lien}>{TELEPHONE.affiche}</a>
              </p>
            </div>
          </aside>
        </div>

        <div className="chv-fiche__barre">
          <p>
            <strong>{l.nom}</strong>
            <span>
              {l.note.nouveau ? t("Nouveau") : `★ ${l.note.valeur} · ${l.note.avis} ${t("avis")}`}
            </span>
          </p>
          <BoutonReservation logement={l} />
        </div>
      </main>

      <Footer />

      {ouverte !== null && <Visionneuse photos={photosVisionneuse} depart={ouverte} fermer={fermer} />}
    </>
  );
}

export default Logement;
