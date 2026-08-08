import { Helmet } from "@/lib/seo";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles, formatDate } from "@/lib/journal";

const Journal = () => {
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
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            {/* Libellé de section : foreground plutôt que gold — l'or sur blanc plafonne à 2,2:1 */}
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Chevalier Conciergerie
            </p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl font-light text-foreground">
              Journal
            </h1>
            <p className="mt-6 text-muted-foreground">
              Nos guides sur la location courte durée à Avignon, Villeneuve-lès-Avignon et Les
              Angles. Réglementation, rentabilité, gestion : ce qu'il faut savoir avant de se
              lancer.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl">
            {articles.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Les premiers articles arrivent très bientôt.
              </p>
            ) : (
              <ul className="space-y-10">
                {articles.map((a) => (
                  <li key={a.slug} className="border-b border-border pb-10 last:border-0">
                    <p className="font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {a.category} · {formatDate(a.date)} · {a.readingTime} min
                    </p>
                    <h2 className="mt-3 font-serif text-2xl md:text-3xl font-light text-foreground">
                      <Link
                        to={a.path}
                        className="transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                      >
                        {a.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-muted-foreground">{a.description}</p>
                    {/* min-h-11 = 44px, seuil de cible tactile */}
                    <Link
                      to={a.path}
                      className="mt-5 inline-flex min-h-11 items-center font-sans text-sm font-medium tracking-wide text-foreground underline underline-offset-4 hover:no-underline"
                    >
                      Lire l'article
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Journal;
