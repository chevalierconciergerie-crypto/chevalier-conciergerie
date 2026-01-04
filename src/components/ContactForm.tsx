import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, User, Mail, Phone, MessageSquare, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.nom || !formData.prenom || !formData.email || !formData.message) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Création du contenu de l'email
    const subject = encodeURIComponent(`Demande de contact - ${formData.prenom} ${formData.nom}`);
    const body = encodeURIComponent(
      `Nouvelle demande de contact\n\n` +
      `Nom : ${formData.nom}\n` +
      `Prénom : ${formData.prenom}\n` +
      `Email : ${formData.email}\n` +
      `Téléphone : ${formData.telephone || "Non renseigné"}\n` +
      `Adresse du bien : ${formData.adresse || "Non renseignée"}\n\n` +
      `Message :\n${formData.message}`
    );

    // Ouvre le client mail avec les informations pré-remplies
    window.location.href = `mailto:contact@chevalier-conciergerie.fr?subject=${subject}&body=${body}`;

    toast({
      title: "Redirection vers votre messagerie",
      description: "Votre client mail s'ouvre avec le message pré-rempli.",
    });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Formulaire</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-4">
            Envoyez-nous un Message
          </h2>
          <p className="font-sans text-muted-foreground mt-4 max-w-xl mx-auto">
            Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom */}
              <div className="space-y-2">
                <Label htmlFor="nom" className="flex items-center gap-2 text-foreground font-medium">
                  <User className="h-4 w-4 text-gold" />
                  Nom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="bg-background border-border focus:border-gold focus:ring-gold/20"
                  required
                />
              </div>

              {/* Prénom */}
              <div className="space-y-2">
                <Label htmlFor="prenom" className="flex items-center gap-2 text-foreground font-medium">
                  <User className="h-4 w-4 text-gold" />
                  Prénom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className="bg-background border-border focus:border-gold focus:ring-gold/20"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-foreground font-medium">
                  <Mail className="h-4 w-4 text-gold" />
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="bg-background border-border focus:border-gold focus:ring-gold/20"
                  required
                />
              </div>

              {/* Téléphone */}
              <div className="space-y-2">
                <Label htmlFor="telephone" className="flex items-center gap-2 text-foreground font-medium">
                  <Phone className="h-4 w-4 text-gold" />
                  Téléphone
                </Label>
                <Input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="06 00 00 00 00"
                  className="bg-background border-border focus:border-gold focus:ring-gold/20"
                />
              </div>
            </div>

            {/* Adresse du bien */}
            <div className="space-y-2 mt-6">
              <Label htmlFor="adresse" className="flex items-center gap-2 text-foreground font-medium">
                <Home className="h-4 w-4 text-gold" />
                Adresse du bien (si concerné)
              </Label>
              <Input
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                placeholder="Adresse de votre propriété"
                className="bg-background border-border focus:border-gold focus:ring-gold/20"
              />
            </div>

            {/* Message */}
            <div className="space-y-2 mt-6">
              <Label htmlFor="message" className="flex items-center gap-2 text-foreground font-medium">
                <MessageSquare className="h-4 w-4 text-gold" />
                Votre message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Décrivez votre projet ou posez-nous vos questions..."
                rows={5}
                className="bg-background border-border focus:border-gold focus:ring-gold/20 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button type="submit" variant="gold" size="lg" className="w-full group">
                <Send className="h-5 w-5 mr-2 transition-transform group-hover:translate-x-1" />
                Envoyer le message
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              <span className="text-destructive">*</span> Champs obligatoires
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
