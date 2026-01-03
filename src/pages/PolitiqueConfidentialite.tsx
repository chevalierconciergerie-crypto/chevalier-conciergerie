import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité | Chevalier Conciergerie</title>
        <meta name="description" content="Politique de confidentialité de Chevalier Conciergerie - Protection de vos données personnelles." />
      </Helmet>

      <Header />

      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-12">
              Politique de Confidentialité
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  1. Introduction
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Chevalier Conciergerie s'engage à protéger la vie privée des utilisateurs de son site. 
                  La présente politique de confidentialité explique comment nous collectons, utilisons et 
                  protégeons vos données personnelles conformément au Règlement Général sur la Protection 
                  des Données (RGPD) et à la loi Informatique et Libertés.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  2. Responsable du traitement
                </h2>
                <div className="font-sans text-muted-foreground leading-relaxed space-y-2">
                  <p><strong className="text-foreground">Raison sociale :</strong> CHEVALIER LOCABUSINESS (SASU)</p>
                  <p><strong className="text-foreground">Nom commercial :</strong> Chevalier Conciergerie</p>
                  <p><strong className="text-foreground">Adresse :</strong> Avignon, 84000 France</p>
                  <p><strong className="text-foreground">Email :</strong> contact@chevalier-conciergerie.fr</p>
                  <p><strong className="text-foreground">Téléphone :</strong> +33 7 83 19 83 41</p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  3. Données collectées
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                  Nous pouvons collecter les données suivantes :
                </p>
                <ul className="font-sans text-muted-foreground leading-relaxed list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Données d'identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
                  <li><strong className="text-foreground">Données relatives à votre bien :</strong> adresse, type de bien, caractéristiques</li>
                  <li><strong className="text-foreground">Données de navigation :</strong> adresse IP, type de navigateur, pages visitées</li>
                  <li><strong className="text-foreground">Données de correspondance :</strong> messages envoyés via le formulaire de contact</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  4. Finalités du traitement
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                  Vos données sont collectées pour les finalités suivantes :
                </p>
                <ul className="font-sans text-muted-foreground leading-relaxed list-disc pl-6 space-y-2">
                  <li>Répondre à vos demandes de contact et de devis</li>
                  <li>Gérer la relation client et nos prestations de services</li>
                  <li>Améliorer nos services et notre site internet</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  5. Base légale du traitement
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Le traitement de vos données repose sur :
                </p>
                <ul className="font-sans text-muted-foreground leading-relaxed list-disc pl-6 space-y-2 mt-4">
                  <li><strong className="text-foreground">Votre consentement</strong> lorsque vous remplissez un formulaire de contact</li>
                  <li><strong className="text-foreground">L'exécution d'un contrat</strong> lorsque vous faites appel à nos services</li>
                  <li><strong className="text-foreground">Notre intérêt légitime</strong> pour améliorer nos services</li>
                  <li><strong className="text-foreground">Nos obligations légales</strong> en matière de conservation des données</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  6. Durée de conservation
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Vos données personnelles sont conservées pendant une durée n'excédant pas celle nécessaire 
                  aux finalités pour lesquelles elles sont collectées. Les données clients sont conservées 
                  pendant toute la durée de la relation commerciale, puis pendant 3 ans à des fins de 
                  prospection. Les données de facturation sont conservées 10 ans conformément aux 
                  obligations légales.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  7. Destinataires des données
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Vos données sont destinées aux seuls services internes de Chevalier Conciergerie. 
                  Elles ne sont pas transmises à des tiers, sauf obligation légale ou avec votre 
                  consentement explicite. Nous pouvons faire appel à des sous-traitants (hébergement, 
                  outils de gestion) qui traitent vos données en notre nom et selon nos instructions.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  8. Vos droits
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="font-sans text-muted-foreground leading-relaxed list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                  <li><strong className="text-foreground">Droit de rectification :</strong> corriger des données inexactes</li>
                  <li><strong className="text-foreground">Droit à l'effacement :</strong> demander la suppression de vos données</li>
                  <li><strong className="text-foreground">Droit à la limitation :</strong> limiter le traitement de vos données</li>
                  <li><strong className="text-foreground">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                  <li><strong className="text-foreground">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                </ul>
                <p className="font-sans text-muted-foreground leading-relaxed mt-4">
                  Pour exercer ces droits, contactez-nous à : contact@chevalier-conciergerie.fr
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  9. Cookies
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Notre site peut utiliser des cookies pour améliorer votre expérience de navigation. 
                  Les cookies sont de petits fichiers texte stockés sur votre appareil. Vous pouvez 
                  configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités 
                  du site pourraient ne plus être disponibles.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  10. Sécurité
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
                  protéger vos données personnelles contre la destruction accidentelle ou illicite, 
                  la perte, l'altération, la divulgation ou l'accès non autorisé.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  11. Réclamation
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Si vous estimez que le traitement de vos données personnelles constitue une violation 
                  du RGPD, vous avez le droit d'introduire une réclamation auprès de la CNIL 
                  (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  12. Modification de la politique
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout 
                  moment. Toute modification sera publiée sur cette page avec une date de mise à jour.
                </p>
              </section>
            </div>

            <p className="font-sans text-sm text-muted-foreground mt-12">
              Dernière mise à jour : Janvier 2026
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PolitiqueConfidentialite;
