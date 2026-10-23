import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLangue } from "@/i18n/langue";
import "./chevalier.css";

/*
  Gabarit commun des pages légales (mentions légales, conditions générales,
  politique de confidentialité). Le contenu vient de src/data/pagesLegales.js,
  que le prérendu lit aussi : la page et le HTML servi aux robots ne divergent pas.
  Les textes légaux restent en français, y compris sous /en.
*/
type Bloc = { p?: string; liste?: string[]; dl?: [string, string][]; lien?: [string, string] };
type Section = { titre: string; blocs: Bloc[] };
type Partie = { id: string; titre: string; sections: Section[] };
export type ContenuLegal = { titre: string; intro?: string; maj: string; sections?: Section[]; parties?: Partie[] };

function Blocs({ blocs }: { blocs: Bloc[] }) {
  const { lien } = useLangue();
  return (
    <>
      {blocs.map((b, i) => (
        <Fragment key={i}>
          {b.p && <p>{b.p}</p>}
          {b.liste && (
            <ul>
              {b.liste.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          )}
          {b.dl && (
            <dl className="chv-legal__fiche">
              {b.dl.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
          {b.lien && (
            <p>
              <Link to={lien(b.lien[0])}>{b.lien[1]}</Link>
            </p>
          )}
        </Fragment>
      ))}
    </>
  );
}

export function PageLegale({ contenu, chemin, titre, description }: { contenu: ContenuLegal; chemin: string; titre: string; description: string }) {
  return (
    <>
      <Helmet>
        <title>{titre}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://chevalier-conciergerie.com${chemin}`} />
      </Helmet>

      <Header />

      <main className="chv chv-legal">
        <article className="chv-legal__article">
          <p className="chv-etiquette">Informations légales</p>
          <h1 className="chv-legal__titre">{contenu.titre}</h1>
          {contenu.intro && <p className="chv-legal__intro">{contenu.intro}</p>}

          {contenu.parties && (
            <nav className="chv-legal__sommaire" aria-label="Sommaire">
              {contenu.parties.map((p) => (
                <a key={p.id} href={`#${p.id}`}>
                  {p.titre}
                </a>
              ))}
            </nav>
          )}

          {contenu.sections?.map((s) => (
            <section key={s.titre}>
              <h2>{s.titre}</h2>
              <Blocs blocs={s.blocs} />
            </section>
          ))}

          {contenu.parties?.map((p) => (
            <section key={p.id} id={p.id} className="chv-legal__partie">
              <h2>{p.titre}</h2>
              {p.sections.map((s) => (
                <Fragment key={s.titre}>
                  <h3>{s.titre}</h3>
                  <Blocs blocs={s.blocs} />
                </Fragment>
              ))}
            </section>
          ))}

          <p className="chv-legal__maj">Dernière mise à jour : {contenu.maj}.</p>
        </article>
      </main>

      <Footer />
    </>
  );
}
