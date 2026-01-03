import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PolitiqueConfidentialite = () => {
  const sections = [
    {
      id: "donnee-personnelle",
      title: "Qu'est-ce qu'une donnée personnelle ?",
      content: `Une donnée personnelle est toute information permettant d'identifier directement ou indirectement une personne physique. Il peut s'agir de votre nom, prénom, adresse email, numéro de téléphone, adresse postale, ou encore de votre adresse IP.`
    },
    {
      id: "donnees-collectees",
      title: "Quelles sont les données personnelles collectées ?",
      content: `Chevalier Conciergerie collecte les données suivantes :

• Données d'identification : nom, prénom, adresse email, numéro de téléphone
• Données relatives à votre bien : adresse, type de bien, caractéristiques
• Données de navigation : adresse IP, type de navigateur, pages visitées
• Données de correspondance : messages envoyés via le formulaire de contact`
    },
    {
      id: "responsable",
      title: "Qui est responsable du traitement de vos données ?",
      content: `Le responsable du traitement de vos données personnelles est :

CHEVALIER LOCABUSINESS (SASU)
Nom commercial : Chevalier Conciergerie
Siège social : Avignon, 84000 France
Email : contact@chevalier-conciergerie.fr
Téléphone : +33 7 83 19 83 41`
    },
    {
      id: "pourquoi",
      title: "Pourquoi Chevalier Conciergerie collecte vos données ?",
      content: `Chevalier Conciergerie réalise différents types de traitement à partir de vos données personnelles :

Traitements opérés sur le fondement légal de l'exécution des obligations contractuelles :
• Gestion des demandes de contact et de devis
• Gestion de la relation client et de nos prestations de services
• Communication relative à nos services

Traitements opérés sur le fondement légal de votre consentement :
• Envoi de communications marketing et d'informations sur nos services
• Amélioration de notre site internet et de votre expérience utilisateur

Vous disposez du droit de retirer à tout moment votre consentement en nous écrivant à : contact@chevalier-conciergerie.fr`
    },
    {
      id: "stockage",
      title: "Où sont stockées vos données ?",
      content: `Vos données sont stockées sur des serveurs sécurisés situés dans l'Union Européenne. Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données contre la destruction, la perte, l'altération ou l'accès non autorisé.`
    },
    {
      id: "duree",
      title: "Combien de temps conservons-nous vos données ?",
      content: `Vos données personnelles sont conservées pendant une durée n'excédant pas celle nécessaire aux finalités pour lesquelles elles sont collectées :

• Données clients : durée de la relation commerciale + 3 ans
• Données de prospection : 3 ans à compter du dernier contact
• Données de facturation : 10 ans (obligations légales)
• Données de navigation : 13 mois maximum`
    },
    {
      id: "droits",
      title: "Quels sont vos droits ?",
      content: `Conformément au RGPD, vous disposez des droits suivants :

• Droit d'accès : obtenir une copie de vos données personnelles
• Droit de rectification : corriger des données inexactes ou incomplètes
• Droit à l'effacement : demander la suppression de vos données
• Droit à la limitation : limiter le traitement de vos données
• Droit à la portabilité : recevoir vos données dans un format structuré
• Droit d'opposition : vous opposer au traitement de vos données

Pour exercer ces droits, contactez-nous à : contact@chevalier-conciergerie.fr

Vous pouvez également introduire une réclamation auprès de la CNIL : www.cnil.fr`
    },
    {
      id: "cookies",
      title: "Utilisation des cookies",
      content: `Notre site peut utiliser des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil.

Types de cookies utilisés :
• Cookies essentiels : nécessaires au fonctionnement du site
• Cookies analytiques : nous aident à comprendre comment vous utilisez le site

Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient ne plus être disponibles.`
    },
  ];

  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité | Chevalier Conciergerie</title>
        <meta name="description" content="Politique de confidentialité de Chevalier Conciergerie - Protection de vos données personnelles conformément au RGPD." />
      </Helmet>

      <Header />

      <main className="pt-32 pb-20 bg-secondary/30 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold/60" />
                <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Protection des données</span>
                <div className="h-px w-12 bg-gold/60" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
                Politique de Confidentialité
              </h1>
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible className="space-y-4">
              {sections.map((section) => (
                <AccordionItem 
                  key={section.id} 
                  value={section.id}
                  className="border-none"
                >
                  <AccordionTrigger className="bg-background hover:bg-background/80 px-6 py-5 rounded-lg shadow-sm hover:no-underline group transition-all duration-300 data-[state=open]:rounded-b-none data-[state=open]:shadow-none">
                    <span className="font-serif text-lg md:text-xl text-gold group-hover:text-gold/80 transition-colors text-left">
                      {section.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="bg-background px-6 pb-6 pt-2 rounded-b-lg shadow-sm">
                    <div className="font-sans text-muted-foreground leading-relaxed whitespace-pre-line border-t border-border/50 pt-4">
                      {section.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Footer note */}
            <div className="mt-16 text-center">
              <p className="font-sans text-sm text-muted-foreground">
                Dernière mise à jour : Janvier 2026
              </p>
              <p className="font-sans text-sm text-muted-foreground mt-2">
                Pour toute question, contactez-nous à{" "}
                <a href="mailto:contact@chevalier-conciergerie.fr" className="text-gold hover:underline">
                  contact@chevalier-conciergerie.fr
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PolitiqueConfidentialite;
