import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <>
      <Helmet>
        <title>Mentions Légales | Chevalier Conciergerie</title>
        <meta name="description" content="Mentions légales de Chevalier Conciergerie - Conciergerie et gestion locative à Avignon." />
      </Helmet>

      <Header />

      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-12">
              Mentions Légales
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  1. Éditeur du site
                </h2>
                <div className="font-sans text-muted-foreground leading-relaxed space-y-2">
                  <p><strong className="text-foreground">Raison sociale :</strong> Chevalier Conciergerie</p>
                  <p><strong className="text-foreground">Forme juridique :</strong> [À compléter]</p>
                  <p><strong className="text-foreground">Siège social :</strong> Avignon, 84000 France</p>
                  <p><strong className="text-foreground">Téléphone :</strong> +33 7 83 19 83 41</p>
                  <p><strong className="text-foreground">Email :</strong> contact@chevalier-conciergerie.fr</p>
                  <p><strong className="text-foreground">SIRET :</strong> [À compléter]</p>
                  <p><strong className="text-foreground">Directeur de la publication :</strong> [À compléter]</p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  2. Hébergeur
                </h2>
                <div className="font-sans text-muted-foreground leading-relaxed space-y-2">
                  <p><strong className="text-foreground">Nom :</strong> Lovable</p>
                  <p><strong className="text-foreground">Site web :</strong> https://lovable.dev</p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  3. Propriété intellectuelle
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                  et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                  les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed mt-4">
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est 
                  formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  4. Limitation de responsabilité
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Les informations contenues sur ce site sont aussi précises que possible et le site est 
                  périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions 
                  ou des lacunes. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                  merci de bien vouloir le signaler par email en décrivant le problème de la manière la plus 
                  précise possible.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed mt-4">
                  Chevalier Conciergerie ne pourra être tenu responsable des dommages directs et indirects 
                  causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de 
                  l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de 
                  l'apparition d'un bug ou d'une incompatibilité.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  5. Liens hypertextes
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Le site peut contenir des liens hypertextes vers d'autres sites. Cependant, Chevalier 
                  Conciergerie n'a pas la possibilité de vérifier le contenu des sites ainsi visités, et 
                  n'assumera en conséquence aucune responsabilité de ce fait.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  6. Droit applicable
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Le présent site est régi par le droit français. En cas de litige, et après échec de toute 
                  tentative de recherche d'une solution amiable, les tribunaux français seront seuls 
                  compétents pour connaître de ce litige.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  7. Contact
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter 
                  à l'adresse email : contact@chevalier-conciergerie.fr
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

export default MentionsLegales;
