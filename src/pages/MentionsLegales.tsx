import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, MapPin, Phone, Mail, Globe, Server } from "lucide-react";

const MentionsLegales = () => {
  const legalInfo = [
    {
      icon: Building2,
      title: "Éditeur du site",
      items: [
        { label: "Raison sociale", value: "CHEVALIER LOCABUSINESS" },
        { label: "Forme juridique", value: "SAS (Société par Actions Simplifiée)" },
        { label: "SIREN", value: "995 268 802" },
        { label: "SIRET", value: "995 268 802 00015" },
        { label: "TVA Intracommunautaire", value: "FR45995268802" },
        { label: "RCS", value: "Nîmes" },
        { label: "Code NAF/APE", value: "6820A - Location de logements" },
      ],
    },
    {
      icon: MapPin,
      title: "Siège social",
      items: [
        { label: "Adresse", value: "5 Lotissement Les Cades" },
        { label: "Code postal", value: "30400" },
        { label: "Ville", value: "Villeneuve-lès-Avignon" },
        { label: "Pays", value: "France" },
      ],
    },
    {
      icon: Phone,
      title: "Contact",
      items: [
        { label: "Téléphone", value: "+33 7 83 19 83 41" },
        { label: "Email", value: "contact@chevalier-conciergerie.fr" },
      ],
    },
    {
      icon: Globe,
      title: "Publication",
      items: [
        { label: "Directeur de la publication", value: "CHEVALIER LOCABUSINESS" },
        { label: "Site web", value: "chevalier-conciergerie.fr" },
      ],
    },
    {
      icon: Server,
      title: "Hébergement",
      items: [
        { label: "Hébergeur", value: "Lovable / Netlify" },
        { label: "Adresse", value: "San Francisco, CA, USA" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Mentions Légales | Chevalier Conciergerie</title>
        <meta
          name="description"
          content="Mentions légales de Chevalier Conciergerie - CHEVALIER LOCABUSINESS, conciergerie et gestion locative à Avignon."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Mentions <span className="text-gradient-gold">Légales</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 
              pour la confiance dans l&apos;économie numérique.
            </p>
          </div>

          {/* Legal Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {legalInfo.map((section, index) => (
              <div
                key={section.title}
                className="bg-card border border-border rounded-2xl p-6 shadow-soft animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>
                <dl className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wide">
                        {item.label}
                      </dt>
                      <dd className="text-sm text-foreground font-medium">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="max-w-4xl mx-auto mt-12 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Propriété intellectuelle
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                L&apos;ensemble de ce site relève de la législation française et internationale 
                sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de 
                reproduction sont réservés, y compris pour les documents téléchargeables 
                et les représentations iconographiques et photographiques. La reproduction 
                de tout ou partie de ce site sur un support électronique ou autre est 
                formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Limitation de responsabilité
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Les informations contenues sur ce site sont aussi précises que possible 
                et le site est périodiquement remis à jour, mais peut toutefois contenir 
                des inexactitudes, des omissions ou des lacunes. CHEVALIER LOCABUSINESS 
                ne pourra être tenue responsable des dommages directs et indirects causés 
                au matériel de l&apos;utilisateur, lors de l&apos;accès au site.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MentionsLegales;
