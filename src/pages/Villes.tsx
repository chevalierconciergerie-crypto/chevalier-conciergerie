import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/*
  Page d'ensemble des villes desservies. Elle existe parce que le menu principal
  propose une entrée « Villes » et que les cinq pages locales n'avaient aucune page
  mère : celle-ci les relie toutes, depuis le menu comme depuis le pied de page.

  Règle : ici, aucun chiffre de marché. Uniquement ce qui est vérifiable (la
  commune, sa situation par rapport à la base de Villeneuve-lès-Avignon, le renvoi
  vers la page locale). Le texte est dupliqué dans scripts/seo-routes.mjs pour les
  robots sans JavaScript : toute modification ici doit y être répercutée.
*/
const VILLES = [
  {
    nom: "Avignon",
    chemin: "/conciergerie-avignon",
    texte:
      "Intra-muros et alentours. Depuis le 1er janvier 2026, la ville exige un numéro d'enregistrement et, hors résidence principale, une autorisation de changement d'usage : nous montons le dossier avant la mise en ligne.",
  },
  {
    nom: "Villeneuve-lès-Avignon",
    chemin: "/conciergerie-villeneuve-les-avignon",
    texte:
      "Notre base, dans le Gard, face à Avignon. La déclaration se fait en mairie et nous nous en chargeons.",
  },
  {
    nom: "Les Angles",
    chemin: "/conciergerie-les-angles",
    texte:
      "Commune gardoise face à Avignon, à environ dix minutes du centre historique, avec une clientèle plus familiale.",
  },
  {
    nom: "Aix-en-Provence",
    chemin: "/conciergerie-aix-en-provence",
    texte:
      "À environ une heure de route de notre base. Nous vérifions auprès de la mairie le cadre applicable à chaque bien.",
  },
  {
    nom: "Montpellier",
    chemin: "/conciergerie-montpellier",
    texte:
      "À un peu plus d'une heure de route de notre base. Nous vérifions auprès de la mairie le cadre applicable à chaque bien.",
  },
] as const;

const Villes = () => {
  return (
    <>
      <Helmet>
        <title>Conciergerie Airbnb : villes desservies | Chevalier</title>
        <meta
          name="description"
          content="Conciergerie Airbnb à Avignon, Villeneuve-lès-Avignon, Les Angles, Aix-en-Provence et Montpellier. 25 % HT du net perçu, sans engagement. Estimation gratuite."
        />
        <meta property="og:title" content="Conciergerie Airbnb : villes desservies" />
        <meta
          property="og:description"
          content="Cinq villes, un seul taux : 25 % HT du net perçu, sans engagement de durée."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <link rel="canonical" href="https://chevalier-conciergerie.com/villes" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <section className="pt-36 pb-14 md:pt-44 md:pb-20 bg-background">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Villes
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-5 mb-6">
                  Conciergerie Airbnb : les villes où nous intervenons
                </h1>
                <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
                  Cinq villes, la même formule partout : 25 % HT du net perçu par le
                  propriétaire, sans abonnement ni engagement de durée, ou sous-location
                  avec un loyer fixe et 0 % de commission.
                </p>
              </div>
            </div>
          </section>

          <section className="pb-16 md:pb-24 bg-background">
            <div className="container mx-auto px-6">
              <ul className="max-w-3xl mx-auto divide-y divide-border">
                {VILLES.map((v) => (
                  <li key={v.chemin} className="py-8">
                    <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-3">
                      Conciergerie Airbnb à {v.nom}
                    </h2>
                    <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                      {v.texte}
                    </p>
                    <Link
                      to={v.chemin}
                      className="inline-flex min-h-11 items-center gap-2 font-sans text-sm text-foreground underline-offset-4 hover:underline"
                    >
                      Voir la conciergerie à {v.nom}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="max-w-3xl mx-auto mt-12 font-sans text-sm text-muted-foreground leading-relaxed">
                Les règles applicables aux meublés de tourisme dépendent de chaque commune
                et évoluent : nous les vérifions avant toute mise en ligne. Le tarif de chaque
                formule figure sur les pages{" "}
                <Link to="/conciergerie" className="underline underline-offset-4">Conciergerie</Link> et{" "}
                <Link to="/sous-location" className="underline underline-offset-4">Sous-location</Link>.
                Pour un bien dans une autre commune, <Link to="/contact" className="underline underline-offset-4">contactez-nous</Link>.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Villes;
