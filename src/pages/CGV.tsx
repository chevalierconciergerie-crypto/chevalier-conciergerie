import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CGV = () => {
  const sections = [
    {
      title: "Article 1 — Objet",
      content:
        "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la société CHEVALIER LOCABUSINESS (ci-après « le Prestataire ») et tout propriétaire ou client (ci-après « le Client ») souscrivant aux services de conciergerie et de gestion locative proposés par le Prestataire. Toute commande de prestation implique l'acceptation sans réserve par le Client des présentes CGV.",
    },
    {
      title: "Article 2 — Services proposés",
      content:
        "Le Prestataire propose deux offres principales : (1) un service de conciergerie et de gestion locative courte durée comprenant notamment la création et l'optimisation des annonces, la gestion des réservations, l'accueil des voyageurs, le ménage, le linge et la maintenance courante ; (2) un service de sous-location professionnelle avec loyer garanti, par lequel le Prestataire prend à bail le bien du Client puis en assure l'exploitation. Le détail précis des prestations est défini dans le contrat ou le mandat signé entre les parties.",
    },
    {
      title: "Article 3 — Tarifs et honoraires",
      content:
        "Les honoraires de conciergerie sont exprimés en pourcentage des revenus locatifs générés ou sous forme de forfait, selon l'offre choisie. La taxe de séjour, collectée auprès des voyageurs pour le compte de la collectivité, ne constitue pas un revenu du Prestataire et est reversée intégralement. Les tarifs applicables sont ceux en vigueur au jour de la signature du contrat. Toute prestation supplémentaire non prévue fait l'objet d'un devis préalable.",
    },
    {
      title: "Article 4 — Obligations du Prestataire",
      content:
        "Le Prestataire s'engage à exécuter les prestations avec professionnalisme et diligence, dans le respect des règles de l'art et de la réglementation applicable à la location de courte durée. Il rend compte régulièrement au Client de la gestion de son bien et lui reverse les sommes dues selon la périodicité convenue.",
    },
    {
      title: "Article 5 — Obligations du Client",
      content:
        "Le Client garantit être propriétaire du bien confié ou disposer des autorisations nécessaires à sa mise en location (règlement de copropriété, autorisation de changement d'usage, déclaration en mairie le cas échéant). Il s'engage à fournir un logement décent, assuré et conforme à la réglementation, ainsi que toutes les informations utiles à la bonne exécution des prestations.",
    },
    {
      title: "Article 6 — Durée et résiliation",
      content:
        "Le contrat est conclu pour la durée stipulée entre les parties. Sauf disposition contraire, il peut être résilié par chacune des parties moyennant le respect d'un préavis fixé au contrat, par lettre recommandée avec accusé de réception. Les prestations en cours et les réservations déjà confirmées au jour de la résiliation sont menées à leur terme.",
    },
    {
      title: "Article 7 — Responsabilité",
      content:
        "Le Prestataire est tenu d'une obligation de moyens. Sa responsabilité ne saurait être engagée en cas de force majeure, de fait d'un tiers ou de manquement du Client à ses obligations. Le Prestataire dispose des assurances nécessaires à l'exercice de son activité.",
    },
    {
      title: "Article 8 — Données personnelles",
      content:
        "Les données personnelles collectées dans le cadre des prestations sont traitées conformément au Règlement Général sur la Protection des Données (RGPD). Les modalités de ce traitement sont détaillées dans la Politique de confidentialité accessible sur le site.",
    },
    {
      title: "Article 9 — Droit applicable et litiges",
      content:
        "Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable avant toute action judiciaire. À défaut d'accord, le litige sera porté devant les tribunaux compétents du ressort du siège social du Prestataire.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Conditions Générales de Vente | Chevalier Conciergerie</title>
        <meta
          name="description"
          content="Conditions Générales de Vente de Chevalier Conciergerie (CHEVALIER LOCABUSINESS) — conciergerie et gestion locative courte durée à Avignon."
        />
        <link rel="canonical" href="https://chevalier-conciergerie.com/cgv" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Conditions Générales de <span className="text-gradient-gold">Vente</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conditions applicables aux prestations de conciergerie et de gestion
              locative fournies par CHEVALIER LOCABUSINESS.
            </p>
          </div>

          {/* Sections */}
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="bg-card border border-border rounded-2xl p-8 shadow-soft animate-fade-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            <p className="text-xs text-muted-foreground/70 text-center pt-4">
              Dernière mise à jour : juin 2026. Document fourni à titre informatif ;
              il est recommandé de le faire valider par un conseil juridique avant publication définitive.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CGV;
