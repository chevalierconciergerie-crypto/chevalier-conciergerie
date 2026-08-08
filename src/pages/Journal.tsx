import { Helmet } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles, formatDate, type Article } from "@/lib/journal";

const FALLBACK = "/journal/journal-defaut.jpg";

/** La liste utilise la variante -card (800px) ; l'article garde le bandeau 1200px. */
const cardImage = (a: Article) =>
  a.image ? a.image.replace(/\.jpg$/, "-card.jpg") : FALLBACK;

const Meta = ({ article, light = false }: { article: Article; light?: boolean }) => (
  <p
    className={`font-sans text-xs uppercase tracking-[0.2em] ${
      light ? "text-primary-foreground/70" : "text-muted-foreground"
    }`}
  >
    {article.category}
    <span aria-hidden="true"> · </span>
    {formatDate(article.date)}
    <span aria-hidden="true"> · </span>
    {article.readingTime} min
  </p>
);

const Journal = () => {
  const [featured, ...rest] = articles;

  return (
    <>
      <Helmet>
        <title>Journal | Conseils location courte durée à Avignon | Chevalier Conciergerie</title>
        <meta
          name="description"
          content="Nos guides sur la gestion locative saisonnière à Avignon : réglementation, rentabilité, conciergerie et sous-location. Publications régulières."
        />
        <link rel="canonical" href="https://chevalier-conciergerie.com/journal" />
      </Helmet>

      <Header />

      <main className="relative z-10 pt-24">
        {/* En-tête */}
        <section className="px-6 pt-16 pb-12 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Chevalier Conciergerie
            </p>
            <h1 className="mt-5 font-serif text-4xl font-light tracking-[0.02em] text-foreground md:text-6xl">
              Journal
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Réglementation, rentabilité, gestion : ce qu'il faut savoir avant de louer en
              courte durée à Avignon, Villeneuve-lès-Avignon et Les Angles.
            </p>
          </div>
        </section>

        {articles.length === 0 ? (
          <section className="px-6 pb-24 text-center">
            <p className="text-muted-foreground">Les premiers articles arrivent très bientôt.</p>
          </section>
        ) : (
          <>
            {/* Article en vedette */}
            <section className="px-6 pb-16">
              <div className="mx-auto max-w-5xl">
                <Link to={featured.path} className="group block">
                  <article className="relative overflow-hidden rounded-sm">
                    <img
                      src={featured.image || FALLBACK}
                      alt=""
                      className="h-[22rem] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] md:h-[30rem]"
                    />
                    {/* Voile pour garantir la lisibilité du texte quelle que soit la photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                      <Meta article={featured} light />
                      <h2 className="mt-3 max-w-3xl font-serif text-2xl font-light leading-tight text-primary-foreground md:text-4xl">
                        {featured.title}
                      </h2>
                      <p className="mt-4 hidden max-w-2xl text-primary-foreground/80 md:block">
                        {featured.description}
                      </p>
                      <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-sans text-sm tracking-wide text-primary-foreground">
                        Lire l'article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              </div>
            </section>

            {/* Les autres */}
            {rest.length > 0 && (
              <section className="px-6 pb-24">
                <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
                  {rest.map((a) => (
                    <Link key={a.slug} to={a.path} className="group block">
                      <article>
                        <div className="overflow-hidden rounded-sm">
                          <img
                            src={cardImage(a)}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-56 w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                          />
                        </div>
                        <div className="pt-5">
                          <Meta article={a} />
                          <h2 className="mt-3 font-serif text-xl font-light leading-snug text-foreground transition-colors group-hover:text-gold-ink md:text-2xl">
                            {a.title}
                          </h2>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {a.description}
                          </p>
                          <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-sans text-sm tracking-wide text-foreground">
                            Lire l'article
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Passage à l'action */}
        <section className="border-t border-border bg-secondary/40 px-6 py-20 text-center">
          <h2 className="font-serif text-2xl font-light text-foreground md:text-3xl">
            Une question sur votre bien ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Estimation gratuite et sans engagement, à partir des caractéristiques réelles de
            votre logement.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/estimation-sous-location"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-8 py-3 font-sans text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Demander une estimation
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-8 py-3 font-sans text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-background"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Journal;
