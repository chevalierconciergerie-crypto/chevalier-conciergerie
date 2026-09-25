import { Link } from "react-router-dom";
import { articles } from "@/lib/journal";
import { avis, AVIS_TOTAL_GOOGLE, GOOGLE_REVIEWS_URL, type Avis } from "@/data/avis";
import { COUVERTURES_BLOG, COURRIEL, RESEAUX, TELEPHONE } from "@/data/accueil";

/* Les comptes affichés sous chaque réseau, pour que le lien soit vérifiable. */
const COMPTES: Record<string, string> = {
  Instagram: "@chevalier_conciergerie",
  LinkedIn: "Victor Chevalier",
  Facebook: "Chevalier Conciergerie",
};
import { usePivot } from "./effets";
import { Etiquette, Revele, TitreAnime } from "./Primitives";

const dateCourte = (iso: string) => iso.split("-").reverse().join("/");

/*
  Les cinq articles de la maquette, avec leurs couvertures : la routine de
  publication ajoute des articles au Journal, mais l'accueil garde cette
  sélection tant que Victor ne la change pas.
*/
const ARTICLES_ACCUEIL = articles.filter((a) => a.slug in COUVERTURES_BLOG);

function CarteArticle({ rang }: { rang: number }) {
  const article = ARTICLES_ACCUEIL[rang];
  const carte = usePivot<HTMLAnchorElement>(rang % 2 ? -1 : 1);
  return (
    <Revele as="article" effet="volume" delai={rang * 120} className={`chv-article ${rang % 2 ? "chv-article--decale" : ""}`}>
      <Link ref={carte} to={article.path} className="chv-article__carte">
        <div className="chv-article__interieur">
          <div className="chv-article__couverture">
            <img src={COUVERTURES_BLOG[article.slug]} alt="" loading="lazy" />
          </div>
          <div className="chv-article__texte">
            <p className="chv-article__meta">
              {article.category} · {dateCourte(article.date)}
            </p>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </div>
        </div>
      </Link>
    </Revele>
  );
}

/* Les articles du Journal, en cartes qui pivotent dans la profondeur pendant le défilement. */
export function BlogAccueil() {
  return (
    <section id="blog" className="chv-section" aria-label="Blog">
      <TitreAnime lignes={["Blog"]} />
      <p className="chv-blog__intro">
        Réglementation, rentabilité, fiscalité : ce qu'il faut savoir avant de louer en courte durée à Avignon.
      </p>
      <div className="chv-blog__grille">
        {ARTICLES_ACCUEIL.map((a, i) => (
          <CarteArticle key={a.slug} rang={i} />
        ))}
      </div>
    </section>
  );
}

const TEINTES = ["#b8652c", "#7a5c8a", "#3c6e71", "#8a5a3c", "#4a6b8a", "#8a6d3b"];

function CarteAvis({ a, rang, doublon }: { a: Avis; rang: number; doublon?: boolean }) {
  return (
    <figure className="chv-carte-avis" aria-hidden={doublon || undefined}>
      <div className="chv-carte-avis__haut">
        <span className="chv-carte-avis__initiale" style={{ background: TEINTES[rang % TEINTES.length] }} aria-hidden="true">
          {a.name.trim().charAt(0).toUpperCase()}
        </span>
        <div>
          <figcaption>{a.name}</figcaption>
          <p className="chv-carte-avis__etoiles" aria-label={`${a.rating} étoiles sur 5`}>★★★★★</p>
        </div>
      </div>
      <blockquote>{a.text}</blockquote>
      <p className="chv-carte-avis__source">Publié sur Google</p>
    </figure>
  );
}

/*
  Les avis Google, sur des cartes blanches qui rappellent Google. Ils défilent
  en continu : un mur de témoignages figé se lit comme une liste, un ruban
  qui avance se regarde. La liste est posée deux fois pour boucler sans saut.
*/
export function Temoignages() {
  return (
    <section id="avis" className="chv-section chv-avis" aria-label="Témoignages">
      <div className="chv-entete-section">
        <Etiquette>Témoignages</Etiquette>
        <TitreAnime lignes={["Ils nous ont", "confié leur bien"]} />
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

export function ContactAccueil() {
  return (
    <section id="contact" className="chv-section chv-contact" aria-label="Contact">
      <TitreAnime lignes={["Parlons de", "votre logement"]} />
      <Revele as="p" className="chv-contact__intro">
        Estimation gratuite et sans engagement : nous évaluons votre bien et vous disons ce qu'il peut rapporter, en
        conciergerie comme en sous-location.
      </Revele>
      <Revele className="chv-contact__coordonnees" delai={120}>
        <div>
          <p>Téléphone</p>
          <a href={TELEPHONE.lien}>{TELEPHONE.affiche}</a>
        </div>
        <div>
          <p>Courriel</p>
          <a href={COURRIEL.lien}>{COURRIEL.affiche}</a>
        </div>
      </Revele>

      {/*
        Les réseaux ont quitté la barre du haut, où leurs trois pastilles de
        couleur tiraient l'oeil plus que la navigation. Ils reviennent ici, à
        leur taille, avec le nom du compte : à cet endroit de la page le
        visiteur est convaincu et cherche à vérifier qui nous sommes.
      */}
      <Revele className="chv-suivre" delai={180}>
        <p className="chv-suivre__titre">Suivez le quotidien de la conciergerie</p>
        <ul className="chv-suivre__liste">
          {RESEAUX.map((r) => (
            <li key={r.nom}>
              <a href={r.lien} target="_blank" rel="noopener noreferrer">
                <img src={r.logo} alt="" width={30} height={30} loading="lazy" />
                <span>
                  <b>{r.nom}</b>
                  {COMPTES[r.nom] ? <em>{COMPTES[r.nom]}</em> : null}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Revele>
    </section>
  );
}
