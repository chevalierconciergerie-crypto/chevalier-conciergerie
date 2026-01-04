import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Shield, Database, Clock, Lock, UserCheck, Cookie, Building, HelpCircle } from "lucide-react";

const PolitiqueConfidentialite = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "donnee-personnelle",
      icon: HelpCircle,
      title: "Donnée personnelle",
      subtitle: "Définition",
      content: `Une donnée personnelle est toute information permettant d'identifier directement ou indirectement une personne physique. Il peut s'agir de votre nom, prénom, adresse email, numéro de téléphone, adresse postale, ou encore de votre adresse IP.`
    },
    {
      id: "donnees-collectees",
      icon: Database,
      title: "Données collectées",
      subtitle: "Ce que nous recueillons",
      content: `• Données d'identification : nom, prénom, adresse email, numéro de téléphone
• Données relatives à votre bien : adresse, type de bien, caractéristiques
• Données de navigation : adresse IP, type de navigateur, pages visitées
• Données de correspondance : messages envoyés via le formulaire de contact`
    },
    {
      id: "responsable",
      icon: Building,
      title: "Responsable",
      subtitle: "Qui traite vos données",
      content: `CHEVALIER LOCABUSINESS (SASU)
Nom commercial : Chevalier Conciergerie
Siège social : Avignon, 84000 France
Email : chevalierconciergerie@gmail.com
Téléphone : +33 7 83 19 83 41`
    },
    {
      id: "pourquoi",
      icon: Shield,
      title: "Finalités",
      subtitle: "Pourquoi nous collectons",
      content: `Traitements contractuels :
• Gestion des demandes de contact et de devis
• Gestion de la relation client et de nos prestations
• Communication relative à nos services

Traitements avec consentement :
• Communications marketing
• Amélioration de votre expérience utilisateur

Retrait du consentement : chevalierconciergerie@gmail.com`
    },
    {
      id: "stockage",
      icon: Lock,
      title: "Stockage",
      subtitle: "Où sont vos données",
      content: `Vos données sont stockées sur des serveurs sécurisés situés dans l'Union Européenne. Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données.`
    },
    {
      id: "duree",
      icon: Clock,
      title: "Conservation",
      subtitle: "Durées de rétention",
      content: `• Données clients : durée de la relation + 3 ans
• Données de prospection : 3 ans après dernier contact
• Données de facturation : 10 ans (obligations légales)
• Données de navigation : 13 mois maximum`
    },
    {
      id: "droits",
      icon: UserCheck,
      title: "Vos droits",
      subtitle: "RGPD",
      content: `• Droit d'accès : obtenir une copie de vos données
• Droit de rectification : corriger des données inexactes
• Droit à l'effacement : demander la suppression
• Droit à la limitation : limiter le traitement
• Droit à la portabilité : recevoir vos données
• Droit d'opposition : vous opposer au traitement

Contact : chevalierconciergerie@gmail.com
Réclamation CNIL : www.cnil.fr`
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "Cookies",
      subtitle: "Navigation",
      content: `Types de cookies utilisés :
• Cookies essentiels : nécessaires au fonctionnement
• Cookies analytiques : comprendre votre utilisation

Vous pouvez configurer votre navigateur pour refuser les cookies.`
    },
  ];

  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité | Chevalier Conciergerie</title>
        <meta name="description" content="Politique de confidentialité de Chevalier Conciergerie - Protection de vos données personnelles conformément au RGPD." />
      </Helmet>

      <Header />

      <main className="pt-32 pb-20 bg-gradient-to-b from-secondary/20 via-background to-secondary/30 min-h-screen">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 mb-8">
              <Shield className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4">
              Protection des données
            </h1>
            <p className="font-sans text-muted-foreground max-w-xl mx-auto">
              Transparence et sécurité au cœur de notre engagement
            </p>
          </div>

          {/* Cards Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(isActive ? null : section.id)}
                  className={`group relative p-6 rounded-2xl text-left transition-all duration-500 ${
                    isActive 
                      ? 'bg-gold text-background shadow-lg shadow-gold/20' 
                      : 'bg-background hover:bg-gold/5 border border-border/50 hover:border-gold/30'
                  }`}
                >
                  <div className={`mb-4 transition-colors duration-300 ${isActive ? 'text-background' : 'text-gold'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`font-serif text-lg font-medium mb-1 transition-colors duration-300 ${
                    isActive ? 'text-background' : 'text-foreground'
                  }`}>
                    {section.title}
                  </h3>
                  <p className={`font-sans text-sm transition-colors duration-300 ${
                    isActive ? 'text-background/70' : 'text-muted-foreground'
                  }`}>
                    {section.subtitle}
                  </p>
                  
                  {/* Indicator */}
                  <div className={`absolute bottom-3 right-3 w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-background' : 'bg-gold/30 group-hover:bg-gold/60'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Content Panel */}
          <div className={`max-w-4xl mx-auto transition-all duration-500 ${
            activeSection ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none h-0'
          }`}>
            {sections.map((section) => (
              <div
                key={section.id}
                className={`bg-background rounded-2xl p-8 md:p-12 shadow-sm border border-border/30 ${
                  activeSection === section.id ? 'block' : 'hidden'
                }`}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                      {section.title}
                    </h2>
                    <p className="font-sans text-sm text-gold uppercase tracking-wider">
                      {section.subtitle}
                    </p>
                  </div>
                </div>
                <div className="font-sans text-muted-foreground leading-relaxed whitespace-pre-line pl-0 md:pl-18">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* No selection state */}
          <div className={`max-w-2xl mx-auto text-center transition-all duration-500 ${
            !activeSection ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
          }`}>
            <p className="font-sans text-muted-foreground">
              Sélectionnez une catégorie pour en savoir plus
            </p>
          </div>

          {/* Footer note */}
          <div className="mt-20 text-center">
            <div className="inline-block px-6 py-3 rounded-full bg-background border border-border/50">
              <p className="font-sans text-sm text-muted-foreground">
                Mise à jour : Janvier 2026 · 
                <a href="mailto:chevalierconciergerie@gmail.com" className="text-gold hover:underline ml-1">
                  Questions ?
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
