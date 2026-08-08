import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, User, Mail, Phone, MessageSquare, Home, Copy, Check } from "lucide-react";
import { track } from "@vercel/analytics";
import { useToast } from "@/hooks/use-toast";

const EMAIL = "contact@chevalier-conciergerie.com";
const TEL = "+33783198341";

const ContactForm = () => {
  const { toast } = useToast();
  // Affiché après un envoi : voir le commentaire sur handleSubmit.
  const [envoye, setEnvoye] = useState(false);
  const [copie, setCopie] = useState(false);
  const [texteMessage, setTexteMessage] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    message: "",
    consentement: false,
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

    if (!formData.consentement) {
      toast({
        title: "Consentement requis",
        description: "Veuillez accepter la politique de confidentialité pour continuer.",
        variant: "destructive",
      });
      return;
    }

    const sujet = `Demande de contact - ${formData.prenom} ${formData.nom}`;
    const corps =
      `Nouvelle demande de contact\n\n` +
      `Nom : ${formData.nom}\n` +
      `Prénom : ${formData.prenom}\n` +
      `Email : ${formData.email}\n` +
      `Téléphone : ${formData.telephone || "Non renseigné"}\n` +
      `Adresse du bien : ${formData.adresse || "Non renseignée"}\n\n` +
      `Message :\n${formData.message}`;

    // Mesure de l'entonnoir. Aucune donnée personnelle n'est transmise : seulement le
    // fait qu'un envoi a eu lieu et si un téléphone a été laissé, ce qui suffit à
    // comparer le nombre de tentatives au nombre d'e-mails réellement reçus. Sans ça,
    // un prospect perdu l'était sans laisser de trace.
    track("contact_form_submit", { telephone_fourni: Boolean(formData.telephone) });

    setTexteMessage(corps);
    setEnvoye(true);

    // `mailto:` reste le chemin nominal, mais il échoue en silence chez qui n'a pas de
    // client mail configuré — cas courant sur mobile et en webmail. Le bloc de secours
    // affiché ensuite garantit qu'aucune demande ne se perde sans que personne le sache.
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;

    toast({
      title: "Votre messagerie devrait s'ouvrir",
      description: "Si rien ne se passe, utilisez les solutions de secours affichées sous le formulaire.",
    });
  };

  const copierMessage = async () => {
    try {
      await navigator.clipboard.writeText(`${EMAIL}\n\n${texteMessage}`);
      setCopie(true);
      setTimeout(() => setCopie(false), 2500);
    } catch {
      toast({
        title: "Copie impossible",
        description: `Sélectionnez le texte à la main, ou écrivez-nous à ${EMAIL}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">Formulaire</span>
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

            {/* Consentement RGPD */}
            <div className="flex items-start gap-3 mt-6">
              <input
                id="consentement"
                name="consentement"
                type="checkbox"
                checked={formData.consentement}
                onChange={(e) => setFormData(prev => ({ ...prev, consentement: e.target.checked }))}
                className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-gold"
                required
              />
              <Label htmlFor="consentement" className="text-sm text-muted-foreground font-normal leading-snug">
                J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
                <Link to="/politique-confidentialite" className="text-gold hover:underline">
                  politique de confidentialité
                </Link>
                . <span className="text-destructive">*</span>
              </Label>
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

          {/*
            Filet de sécurité. Le formulaire n'a pas de serveur : il ouvre le client mail
            du visiteur. Quand celui-ci n'est pas configuré — webmail, téléphone sans
            compte mail — rien ne part et personne ne le sait. Ce bloc n'apparaît qu'après
            une tentative d'envoi et propose trois issues qui ne dépendent pas du client
            mail : copier le message, téléphoner, écrire sur WhatsApp.
          */}
          {envoye && (
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-gold/40 bg-secondary p-6 md:p-8">
              <h3 className="font-serif text-xl text-foreground">
                Votre messagerie ne s'est pas ouverte ?
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                C'est fréquent sur téléphone et avec les messageries en ligne. Votre message
                n'est pas perdu : copiez-le et envoyez-le nous par le moyen qui vous
                arrange.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="gold" onClick={copierMessage}>
                  {copie ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copie ? "Message copié" : "Copier mon message"}
                </Button>
                <Button variant="outline" asChild>
                  <a href={`tel:${TEL}`} onClick={() => track("contact_tel_click")}>
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={`https://wa.me/33783198341?text=${encodeURIComponent(texteMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("contact_whatsapp_click")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>

              <p className="mt-5 font-sans text-sm text-muted-foreground">
                Ou écrivez directement à{" "}
                <a href={`mailto:${EMAIL}`} className="text-gold-ink underline underline-offset-4">
                  {EMAIL}
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
