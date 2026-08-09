import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollAnimate } from "@/hooks/useScrollAnimation";

/*
  Page dédiée aux tarifs.

  Elle existe parce que le concurrent le mieux placé sur « conciergerie
  Avignon » en a une, en entrée de menu — et parce que « tarif conciergerie
  Avignon » est une requête que personne ne tape par curiosité : celui qui la
  saisit compare déjà des prestataires. Une page qui répond directement à cette
  requête capte une intention d'achat, là où le même contenu noyé dans une page
  de service n'a aucune chance de se positionner dessus.

  Différence avec eux, et c'est là que se joue la partie : leur page Tarifs
  n'annonce aucun chiffre — « des tarifs clairs et adaptés à chaque service ».
  Celle-ci donne le taux. Sur une requête de comparaison, le seul contenu qui
  convertit est celui qui répond à la question posée.

  Le tableau comparatif est en HTML lisible, pas en image : c'est lui que Google
  et les moteurs de réponse extraient pour composer un résultat enrichi.
*/

const TARIFS_FAQ = [
  {
    question: "Quel est le tarif d'une conciergerie à Avignon ?",
    answer:
      "Chez Chevalier Conciergerie, la gestion complète est facturée 20 % HT des revenus encaissés, soit 24 % TTC. Ce taux couvre l'intégralité du service : annonces, tarification, accueil des voyageurs, ménage, linge et suivi des encaissements. Il n'y a ni abonnement, ni frais de dossier, ni engagement de durée.",
  },
  {
    question: "Y a-t-il des frais en plus de la commission ?",
    answer:
      "Non. Le ménage entre deux séjours est refacturé au voyageur, comme le veut l'usage sur Airbnb et Booking : il n'entame pas vos revenus. La taxe de séjour est collectée auprès du voyageur puis reversée à la commune — elle transite, mais n'est jamais un revenu ni une charge pour vous.",
  },
  {
    question: "Combien coûte la sous-location ?",
    answer:
      "Rien. En sous-location, nous louons votre bien à l'année à notre nom et vous versons un loyer fixe chaque mois. Vous ne payez aucune commission : nos revenus viennent de l'exploitation du logement, pas de votre poche.",
  },
  {
    question: "Faut-il s'engager sur une durée ?",
    answer:
      "En conciergerie, non : le mandat est sans engagement de durée et vous pouvez y mettre fin à tout moment. En sous-location, l'engagement est celui du bail, dont la durée est fixée avec vous avant signature.",
  },
];

const Tarifs = () => {
  return (
    <>
      <Helmet>
        <title>Tarifs conciergerie Avignon | 20 % HT tout compris | Chevalier Conciergerie</title>
        <meta
          name="description"
          content="Tarifs de conciergerie à Avignon : 20 % HT des revenus encaissés, tout compris, sans abonnement ni engagement. Sous-location : 0 % de commission, loyer fixe chaque mois."
        />
        <meta name="keywords" content="tarif conciergerie Avignon, prix conciergerie Avignon, commission conciergerie Airbnb, coût gestion locative Avignon, tarif sous-location Avignon" />
        <meta property="og:title" content="Tarifs conciergerie Avignon | 20 % HT tout compris" />
        <meta property="og:description" content="20 % HT des revenus encaissés, tout compris. Sous-location : 0 % de commission, loyer fixe chaque mois." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <link rel="canonical" href="https://chevalier-conciergerie.com/tarifs" />
        {/*
          Deux blocs de données structurées. Le premier décrit l'offre avec son
          prix : c'est lui qui permet à un résultat de recherche d'afficher le
          taux directement. Le second reprend les questions en FAQPage — les
          moteurs de réponse citent ces paires question/réponse telles quelles.
        */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Conciergerie Airbnb à Avignon",
            serviceType: "Conciergerie et gestion locative saisonnière",
            provider: {
              "@type": "LocalBusiness",
              name: "Chevalier Conciergerie",
              telephone: "+33783198341",
              email: "contact@chevalier-conciergerie.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "5 Lotissement Les Cades",
                addressLocality: "Villeneuve-lès-Avignon",
                postalCode: "30400",
                addressCountry: "FR",
              },
            },
            areaServed: [
              { "@type": "City", name: "Avignon" },
              { "@type": "City", name: "Villeneuve-lès-Avignon" },
              { "@type": "City", name: "Les Angles" },
            ],
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              description: "20 % HT des revenus encaissés, tout compris, sans abonnement ni engagement",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "20",
                priceCurrency: "EUR",
                valueAddedTaxIncluded: false,
              },
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: TARIFS_FAQ.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/*
            Le <h1> reprend mot pour mot la requête visée. C'est volontaire :
            sur une page de tarifs, une formule inventive coûte le
            positionnement sans rien apporter au lecteur, qui cherche un
            chiffre et rien d'autre.
          */}
          <section className="pt-36 pb-14 md:pt-44 md:pb-20 bg-background">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Tarifs
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-5 mb-6">
                  Tarifs de conciergerie à Avignon
                </h1>
                <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
                  Un seul taux, annoncé avant tout rendez-vous. Pas d'abonnement,
                  pas de frais de dossier, pas d'engagement de durée.
                </p>
              </div>
            </div>
          </section>

          <section className="pb-16 md:pb-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                <ScrollAnimate delay={100}>
                  <div className="h-full rounded-lg bg-[hsl(0_0%_8%)] p-8 md:p-10">
                    <h2 className="font-serif text-2xl md:text-3xl font-light text-white mb-6">
                      Conciergerie
                    </h2>
                    <p className="font-serif text-6xl md:text-7xl font-light text-white leading-none">
                      20 %
                    </p>
                    <p className="font-sans text-sm text-white/55 mt-3 mb-8">
                      HT des revenus encaissés — soit 24 % TTC
                    </p>
                    <ul className="space-y-3 font-sans text-sm text-white/75">
                      <li>Annonces créées et diffusées sur Airbnb, Booking et Abritel</li>
                      <li>Prix ajustés en continu selon la saison et les événements</li>
                      <li>Échanges avec les voyageurs, remise des clés, assistance 7 j/7</li>
                      <li>Ménage et linge d'hôtel entre chaque séjour</li>
                      <li>Suivi des encaissements et récapitulatif mensuel</li>
                    </ul>
                    <p className="font-sans text-xs text-white/45 mt-8 leading-relaxed">
                      Le ménage est refacturé au voyageur, pas à vous. La taxe de séjour est
                      collectée puis reversée à la commune : elle ne passe jamais par vos revenus.
                    </p>
                    <Link
                      to="/conciergerie"
                      className="mt-8 inline-flex items-center gap-2 font-sans text-sm text-white underline-offset-4 hover:underline"
                    >
                      Le détail de la formule
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </ScrollAnimate>

                <ScrollAnimate delay={200}>
                  <div className="h-full rounded-lg border border-border p-8 md:p-10">
                    <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-6">
                      Sous-location
                    </h2>
                    <p className="font-serif text-6xl md:text-7xl font-light text-foreground leading-none">
                      0 %
                    </p>
                    <p className="font-sans text-sm text-muted-foreground mt-3 mb-8">
                      aucune commission, un loyer fixe
                    </p>
                    <ul className="space-y-3 font-sans text-sm text-foreground/75">
                      <li>Nous louons votre bien à l'année, bail à notre nom</li>
                      <li>Le même montant vous est versé chaque mois, saison creuse comprise</li>
                      <li>Aucune vacance locative à votre charge</li>
                      <li>Entretien courant et remise en état assurés par nos soins</li>
                      <li>Vous n'avez plus aucun voyageur à gérer</li>
                    </ul>
                    <p className="font-sans text-xs text-muted-foreground mt-8 leading-relaxed">
                      Le montant dépend du logement, du quartier et de la durée du bail.
                      Il est fixé avant signature et ne bouge plus.
                    </p>
                    <Link
                      to="/sous-location"
                      className="mt-8 inline-flex items-center gap-2 font-sans text-sm text-foreground underline-offset-4 hover:underline"
                    >
                      Le détail de la formule
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </ScrollAnimate>
              </div>

              <div className="mt-12 md:mt-16 text-center">
                <Link
                  to="/estimation-sous-location"
                  className="btn-ressort group relative isolate inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[hsl(0_0%_8%)] px-9 py-4 font-sans text-[15px] font-semibold tracking-wide text-white md:text-base"
                >
                  <span aria-hidden className="btn-brille" />
                  Savoir ce que rapporterait mon logement
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <p className="font-sans text-xs text-muted-foreground mt-4 tracking-[0.12em] uppercase">
                  2 minutes · réponse sous 24 h · sans engagement
                </p>
              </div>
            </div>
          </section>

          {/* Questions posées mot pour mot comme dans une recherche. */}
          <section className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-serif text-2xl md:text-4xl font-light text-foreground mb-10 text-center">
                  Questions sur les tarifs
                </h2>
                <dl className="space-y-8">
                  {TARIFS_FAQ.map((item) => (
                    <div key={item.question} className="border-b border-border pb-8 last:border-b-0">
                      <dt className="font-serif text-lg md:text-xl text-foreground mb-3">
                        {item.question}
                      </dt>
                      <dd className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Tarifs;
