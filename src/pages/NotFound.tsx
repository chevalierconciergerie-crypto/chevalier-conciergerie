import { Link } from "react-router-dom";
import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Page d'erreur.
 *
 * Le site est une SPA servie derrière un rewrite : Vercel répond HTTP 200 sur une URL
 * inconnue, puis React monte ce composant. Aux yeux de Google c'est un « soft 404 » —
 * une page d'erreur annoncée comme valide — et c'est explicitement pénalisé.
 *
 * Faute de pouvoir changer le code HTTP sans passer par une fonction serveur, on pose
 * au moins un `noindex` : Google retire alors l'URL de son index au lieu d'y voir une
 * page pauvre. Les liens ci-dessous récupèrent le visiteur plutôt que de le laisser
 * repartir, et redistribuent la navigation interne.
 */
const NotFound = () => {
  const raccourcis = [
    { label: "Conciergerie", href: "/conciergerie", texte: "Gestion complète de votre location saisonnière." },
    { label: "Sous-location", href: "/sous-location", texte: "Un loyer garanti chaque mois, sans vacance locative." },
    { label: "Journal", href: "/journal", texte: "Nos guides sur la location courte durée à Avignon." },
  ];

  return (
    <>
      <Helmet>
        <title>Page introuvable | Chevalier Conciergerie</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Cette page n'existe pas ou a été déplacée." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="font-sans text-sm text-muted-foreground mb-4">Erreur 404</p>

            <h1 className="font-serif text-3xl md:text-5xl font-light text-foreground leading-tight mb-6">
              Cette page n'existe pas.
            </h1>

            <p className="font-sans text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Elle a peut-être été déplacée, ou l'adresse comporte une erreur. Voici les
              pages les plus consultées.
            </p>

            <div className="border-t border-border">
              {raccourcis.map((r) => (
                <Link
                  key={r.href}
                  to={r.href}
                  className="group flex items-baseline justify-between gap-6 border-b border-border py-5 transition-colors hover:bg-muted/40"
                >
                  <span>
                    <span className="font-serif text-xl text-foreground">{r.label}</span>
                    <span className="font-sans block text-sm text-muted-foreground mt-1">{r.texte}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="gold" size="lg">
                <Link to="/">Retour à l'accueil</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;
