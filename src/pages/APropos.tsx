import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, Sparkles, MapPin, HandHeart } from "lucide-react";

const APropos = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: "Transparence",
      text: "Des comptes rendus clairs, des reversements à date fixe et aucune mauvaise surprise. La taxe de séjour, collectée pour la collectivité, n'est jamais comptée comme un revenu : vous touchez vos honoraires, votre ménage et vos suppléments, point.",
    },
    {
      icon: Sparkles,
      title: "Exigence",
      text: "Accueil soigné, linge hôtelier, ménage professionnel et annonces optimisées. Chaque séjour est pensé pour décrocher les meilleures évaluations et fidéliser les voyageurs.",
    },
    {
      icon: MapPin,
      title: "Ancrage local",
      text: "Basés à Villeneuve-lès-Avignon, nous connaissons Avignon, Les Angles et la rive provençale comme notre poche. Une présence terrain réelle, pas une gestion à distance.",
    },
    {
      icon: HandHeart,
      title: "Tranquillité",
      text: "Vous nous confiez votre bien, nous gérons tout : réservations, voyageurs, entretien, maintenance. Vous percevez des revenus sans y consacrer de temps.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>À propos | Chevalier Conciergerie — Conciergerie & gestion locative à Avignon</title>
        <meta
          name="description"
          content="Découvrez Chevalier Conciergerie : une conciergerie indépendante et locale à Avignon, fondée par Victor Chevalier, spécialiste de la location courte durée et de la sous-location avec loyer garanti."
        />
        <link rel="canonical" href="https://chevalier-conciergerie.com/a-propos" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-gold mb-4">Notre histoire</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Une conciergerie <span className="text-gradient-gold">locale et exigeante</span> à Avignon
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Chevalier Conciergerie accompagne les propriétaires de la région d'Avignon
              dans la gestion de leur location courte durée. Notre métier : transformer
              votre bien en une source de revenus sereine, sans que vous ayez à vous
              occuper de quoi que ce soit.
            </p>
          </div>

          {/* Story */}
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Le mot du fondateur
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                « J'ai créé Chevalier Conciergerie avec une conviction simple : un
                propriétaire ne devrait jamais avoir à choisir entre la rentabilité de
                son bien et sa tranquillité d'esprit. Trop de propriétaires renoncent à
                la location courte durée par manque de temps, ou se font dépasser par les
                réservations, le ménage et les imprévus.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous prenons tout en charge, de la création de l'annonce à l'accueil des
                voyageurs, avec un niveau de service digne de l'hôtellerie. Et nous le
                faisons en local, à taille humaine : à Avignon, nous sommes sur place,
                joignables, et nous traitons chaque logement comme s'il était le nôtre. »
              </p>
              <p className="text-foreground font-medium">— Victor Chevalier, fondateur</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Ce que nous faisons
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous proposons deux formules complémentaires. Avec la{" "}
                <Link to="/conciergerie" className="text-gold hover:underline">conciergerie</Link>,
                nous gérons votre location courte durée de A à Z et vous reversons les
                revenus, en toute transparence. Avec la{" "}
                <Link to="/sous-location" className="text-gold hover:underline">sous-location professionnelle</Link>,
                nous prenons votre bien à bail et vous garantissons un loyer fixe chaque
                mois, que le logement soit occupé ou non.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dans les deux cas, vous bénéficiez d'une gestion soignée, d'un interlocuteur
                unique et d'un suivi clair de vos revenus. Nous intervenons à Avignon,
                Villeneuve-lès-Avignon, Les Angles et leurs environs.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
              Nos <span className="text-gradient-gold">valeurs</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-card border border-border rounded-2xl p-6 shadow-soft animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Confiez-nous votre bien
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Estimation gratuite et sans engagement de vos revenus potentiels.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Demander mon estimation
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default APropos;
