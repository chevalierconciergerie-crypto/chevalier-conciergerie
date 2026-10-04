import { useT } from "@/i18n/langue";
import { Link } from "react-router-dom";
import { articles, type Article } from "@/lib/journal";
import { avis, AVIS_TOTAL_GOOGLE, GOOGLE_REVIEWS_URL, type Avis } from "@/data/avis";
import { COUVERTURES_BLOG, COURRIEL, TELEPHONE } from "@/data/accueil";
import { usePivot } from "./effets";
import { Etiquette, Revele, TitreAnime } from "./Primitives";

const dateCourte = (iso: string) => iso.split("-").reverse().join("/");

/*
  Les cinq articles de la maquette, avec leurs couvertures : la routine de
  publication ajoute des articles au Journal, mais l'accueil garde cette
  sélection tant que Victor ne la change pas.
*/
const ARTICLES_ACCUEIL = articles.filter((a) => a.slug in COUVERTURES_BLOG);

/*
  Couverture d'une carte : celle choisie pour l'accueil si elle existe, sinon la variante
  -card (800 px) de l'image de l'article, sinon l'image par défaut du Journal. Les
  couvertures .svg n'ont pas de variante et se redimensionnent sans perte.
*/
const couverture = (a: Article) =>
  COUVERTURES_BLOG[a.slug] ??
  (a.image ? a.image.replace(/\.(jpg|webp)$/, "-card.$1") : "/journal/journal-defaut-card.jpg");

function CarteArticle({ article, rang }: { article: Article; rang: number }) {
  const t = useT();
  const carte = usePivot<HTMLAnchorElement>(rang % 2 ? -1 : 1);
  return (
    <Revele as="article" effet="volume" delai={rang * 120} className={`chv-article ${rang % 2 ? "chv-article--decale" : ""}`}>
      <Link ref={carte} to={article.path} className="chv-article__carte">
        <div className="chv-article__interieur">
          <div className="chv-article__couverture">
            <img src={couverture(article)} alt="" loading="lazy" />
          </div>
          <div className="chv-article__texte">
            <p className="chv-article__meta">
              {t(article.category)} · {dateCourte(article.date)}
            </p>
            <h3>{t(article.title)}</h3>
            <p>{t(article.description)}</p>
          </div>
        </div>
      </Link>
    </Revele>
  );
}

/*
  Les articles du Journal, en cartes qui pivotent dans la profondeur pendant le défilement.

  Sur l'accueil : la sélection de cinq articles. Sur sa propre page (/journal), la même
  section porte le titre principal (`commeH1`) et liste tous les articles (`tous`), pour
  qu'aucun ne perde son lien depuis la liste.
*/
export function BlogAccueil({ commeH1 = false, tous = false }: { commeH1?: boolean; tous?: boolean }) {
  const t = useT();
  const liste = tous ? articles : ARTICLES_ACCUEIL;
  return (
    <section id="blog" className="chv-section" aria-label="Blog">
      <TitreAnime as={commeH1 ? "h1" : "h2"} lignes={[t("Blog")]} />
      <p className="chv-blog__intro">
        Réglementation, rentabilité, fiscalité : ce qu'il faut savoir avant de louer en courte durée à Avignon.
      </p>
      <div className="chv-blog__grille">
        {liste.map((a, i) => (
          <CarteArticle key={a.slug} article={a} rang={i} />
        ))}
      </div>
    </section>
  );
}

const TEINTES = ["#b8652c", "#7a5c8a", "#3c6e71", "#8a5a3c", "#4a6b8a", "#8a6d3b"];

function CarteAvis({ a, rang, doublon }: { a: Avis; rang: number; doublon?: boolean }) {
  const t = useT();
  return (
    <figure className="chv-carte-avis" aria-hidden={doublon || undefined}>
      <div className="chv-carte-avis__haut">
        <span className="chv-carte-avis__initiale" style={{ background: TEINTES[rang % TEINTES.length] }} aria-hidden="true">
          {a.name.trim().charAt(0).toUpperCase()}
        </span>
        <div>
          <figcaption>{a.name}</figcaption>
          <p className="chv-carte-avis__etoiles" aria-label={`${a.rating} ${t("étoiles sur 5")}`}>★★★★★</p>
        </div>
      </div>
      <blockquote>{t(a.text)}</blockquote>
      <p className="chv-carte-avis__source">{t("Publié sur Google")}</p>
    </figure>
  );
}

/*
  Les avis Google, sur des cartes blanches qui rappellent Google. Ils défilent
  en continu : un mur de témoignages figé se lit comme une liste, un ruban
  qui avance se regarde. La liste est posée deux fois pour boucler sans saut.
*/
export function Temoignages() {
  const t = useT();
  return (
    <section id="avis" className="chv-section chv-avis" aria-label="Témoignages">
      <div className="chv-entete-section">
        <Etiquette>{t("Témoignages")}</Etiquette>
        <TitreAnime lignes={[t("Ils nous ont"), t("confié leur bien")]} />
      </div>
      <div className="chv-ruban__piste">
        <div className="chv-ruban">
          {avis.map((a, i) => <CarteAvis key={a.id} a={a} rang={i} />)}
          {avis.map((a, i) => <CarteAvis key={`d${a.id}`} a={a} rang={i} doublon />)}
        </div>
      </div>
      <p className="chv-avis__note">
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
          5,0 sur 5 — {AVIS_TOTAL_GOOGLE} avis Google
        </a>
      </p>
    </section>
  );
}

export function ContactAccueil({ commeH1 = false }: { commeH1?: boolean }) {
  const t = useT();
  return (
    <section id="contact" className="chv-section chv-contact" aria-label="Contact">
      <TitreAnime as={commeH1 ? "h1" : "h2"} lignes={[t("Parlons de"), t("votre logement")]} />
      <Revele as="p" className="chv-contact__intro">
        {t("Estimation gratuite et sans engagement : nous évaluons votre bien et vous disons ce qu'il peut rapporter, en conciergerie comme en sous-location.")}
      </Revele>
      <Revele className="chv-contact__coordonnees" delai={120}>
        <div>
          <p>{t("Téléphone")}</p>
          <a href={TELEPHONE.lien}>{TELEPHONE.affiche}</a>
        </div>
        <div>
          <p>{t("Courriel")}</p>
          <a href={COURRIEL.lien}>{COURRIEL.affiche}</a>
        </div>
      </Revele>

    </section>
  );
}
