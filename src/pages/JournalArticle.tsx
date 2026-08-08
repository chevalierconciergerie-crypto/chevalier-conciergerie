import { Helmet } from "@/lib/seo";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles, getArticle, formatDate } from "@/lib/journal";

const SITE = "https://chevalier-conciergerie.com";

const JournalArticle = () => {
  const { slug } = useParams();
  const article = getArticle(slug);

  // Slug inconnu : on renvoie vers la liste plutôt que d'afficher une page vide.
  if (!article) return <Navigate to="/journal" replace />;

  const url = `${SITE}${article.path}`;
  const others = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{`${article.title} | Chevalier Conciergerie`}</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Header />

      <main className="relative z-10 pt-24">
        <article className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Fil d'Ariane" className="font-sans text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                Accueil
              </Link>
              <span aria-hidden="true"> › </span>
              <Link to="/journal" className="hover:text-foreground">
                Journal
              </Link>
            </nav>

            <p className="mt-8 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {article.category} · {formatDate(article.date)} · {article.readingTime} min de lecture
            </p>

            <h1 className="mt-4 font-serif text-3xl md:text-4xl font-light leading-tight text-foreground">
              {article.title}
            </h1>

            {article.description && (
              <p className="mt-5 font-sans text-lg font-light leading-relaxed text-muted-foreground">
                {article.description}
              </p>
            )}

            {/* Bandeau. `alt` vide : l'image est illustrative, le titre porte déjà le sens. */}
            <img
              src={article.image || "/journal/journal-defaut.jpg"}
              alt=""
              className="mt-10 h-64 w-full rounded-sm object-cover md:h-96"
            />

            {/*
              Le HTML vient de nos propres fichiers Markdown, versionnés dans le repo :
              pas de contenu tiers, pas de saisie utilisateur.
              `prose` vient de @tailwindcss/typography, activé dans tailwind.config.ts.
            */}
            <div
              className="prose prose-neutral mt-10 max-w-none prose-headings:font-serif prose-headings:font-light prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 hover:prose-a:no-underline prose-th:text-left"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />

            <div className="mt-14 flex flex-col gap-3 border-t border-border pt-10 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-8 py-3 font-sans text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Nous contacter
              </Link>
              <Link
                to="/journal"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-8 py-3 font-sans text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-secondary"
              >
                Retour au Journal
              </Link>
            </div>

            {others.length > 0 && (
              <aside className="mt-16 border-t border-border pt-10">
                <h2 className="font-serif text-xl font-light text-foreground">À lire aussi</h2>
                <ul className="mt-6 space-y-4">
                  {others.map((a) => (
                    <li key={a.slug}>
                      <Link
                        to={a.path}
                        className="inline-flex min-h-11 items-center text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground hover:no-underline"
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default JournalArticle;
