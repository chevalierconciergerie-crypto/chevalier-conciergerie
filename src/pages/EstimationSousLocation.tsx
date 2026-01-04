import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Home, User, ChevronRight, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Étape 1 - Le bien
  adresse: string;
  codePostal: string;
  ville: string;
  typeLogement: string;
  superficie: string;
  nombrePieces: string;
  meuble: boolean;
  parking: boolean;
  exterieur: boolean;
  equipements: string;
  // Étape 2 - Contact
  nomComplet: string;
  telephone: string;
  email: string;
  disponibilite: string;
  commentaire: string;
}

const steps = [
  { id: 1, title: "Le Bien", icon: Home },
  { id: 2, title: "Vous Contacter", icon: User },
];

const EstimationSousLocation = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    adresse: "",
    codePostal: "",
    ville: "",
    typeLogement: "",
    superficie: "",
    nombrePieces: "",
    meuble: false,
    parking: false,
    exterieur: false,
    equipements: "",
    nomComplet: "",
    telephone: "",
    email: "",
    disponibilite: "",
    commentaire: "",
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!formData.nomComplet || !formData.email || !formData.telephone) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir votre nom, email et téléphone.",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(`Nouvelle demande sous-location - ${formData.nomComplet}`);
    const body = encodeURIComponent(
`LE BIEN
-------
Adresse : ${formData.adresse}
Code postal : ${formData.codePostal}
Ville : ${formData.ville}
Type : ${formData.typeLogement}
Superficie : ${formData.superficie} m²
Nombre de pièces : ${formData.nombrePieces}
Meublé : ${formData.meuble ? "Oui" : "Non"}
Parking : ${formData.parking ? "Oui" : "Non"}
Extérieur : ${formData.exterieur ? "Oui" : "Non"}
Équipements particuliers : ${formData.equipements || "Non précisé"}

CONTACT
-------
Nom : ${formData.nomComplet}
Téléphone : ${formData.telephone}
Email : ${formData.email}
Disponibilité : ${formData.disponibilite}
Commentaire : ${formData.commentaire || "Aucun"}
`
    );

    window.location.href = `mailto:contact@chevalier-conciergerie.fr?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous recontacterons sous 48h.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Estimation Sous-Location | Chevalier Conciergerie</title>
        <meta
          name="description"
          content="Obtenez une estimation gratuite pour la sous-location de votre bien à Avignon. Formulaire simple et rapide."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">
                Estimation Gratuite
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-4">
                Estimez votre Loyer Garanti
              </h1>
              <p className="font-sans text-muted-foreground text-lg">
                Décrivez votre bien, nous vous proposons une offre sous 48h.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {/* Steps indicator */}
              <div className="flex items-center justify-center gap-4 mb-10">
                {steps.map((s, index) => (
                  <div key={s.id} className="flex items-center">
                    <button
                      onClick={() => s.id <= step && setStep(s.id)}
                      disabled={s.id > step}
                      className={`flex items-center gap-3 px-5 py-3 rounded-full transition-all ${
                        step === s.id
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : s.id < step
                          ? "bg-gold/20 text-gold cursor-pointer hover:bg-gold/30"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          step === s.id
                            ? "bg-gold text-primary"
                            : s.id < step
                            ? "bg-gold text-primary"
                            : "bg-muted-foreground/20 text-muted-foreground"
                        }`}
                      >
                        {s.id < step ? <Check className="w-4 h-4" /> : s.id}
                      </div>
                      <span className="font-medium hidden sm:inline">{s.title}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-2 ${step > s.id ? "bg-gold" : "bg-border"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Form Card */}
              <div className="bg-card rounded-2xl shadow-soft p-6 md:p-10 border border-border/50">
                
                {/* Étape 1 - Le bien */}
                {step === 1 && (
                  <div className="space-y-8 animate-fade-in">
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-foreground mb-1">
                        Localisation
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4">Où se situe votre bien ?</p>
                      
                      <div className="space-y-4">
                        <Input
                          placeholder="Adresse (numéro et rue)"
                          value={formData.adresse}
                          onChange={(e) => updateField("adresse", e.target.value)}
                          className="border-border focus:border-gold"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Code postal"
                            value={formData.codePostal}
                            onChange={(e) => updateField("codePostal", e.target.value)}
                            className="border-border focus:border-gold"
                          />
                          <Input
                            placeholder="Ville"
                            value={formData.ville}
                            onChange={(e) => updateField("ville", e.target.value)}
                            className="border-border focus:border-gold"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-serif text-xl font-semibold text-foreground mb-1">
                        Caractéristiques
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4">Décrivez votre logement</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div>
                          <Label className="text-sm text-muted-foreground mb-2 block">Type</Label>
                          <Select
                            value={formData.typeLogement}
                            onValueChange={(value) => updateField("typeLogement", value)}
                          >
                            <SelectTrigger className="border-border focus:border-gold bg-background">
                              <SelectValue placeholder="Choisir" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border">
                              <SelectItem value="studio">Studio</SelectItem>
                              <SelectItem value="t1">T1</SelectItem>
                              <SelectItem value="t2">T2</SelectItem>
                              <SelectItem value="t3">T3</SelectItem>
                              <SelectItem value="t4+">T4 et plus</SelectItem>
                              <SelectItem value="maison">Maison</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground mb-2 block">Surface (m²)</Label>
                          <Input
                            placeholder="Ex: 45"
                            value={formData.superficie}
                            onChange={(e) => updateField("superficie", e.target.value)}
                            className="border-border focus:border-gold"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground mb-2 block">Pièces</Label>
                          <Input
                            placeholder="Ex: 3"
                            value={formData.nombrePieces}
                            onChange={(e) => updateField("nombrePieces", e.target.value)}
                            className="border-border focus:border-gold"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <Checkbox
                            checked={formData.meuble}
                            onCheckedChange={(checked) => updateField("meuble", checked as boolean)}
                            className="border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                          />
                          <span className="text-foreground group-hover:text-gold transition-colors">Meublé</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <Checkbox
                            checked={formData.parking}
                            onCheckedChange={(checked) => updateField("parking", checked as boolean)}
                            className="border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                          />
                          <span className="text-foreground group-hover:text-gold transition-colors">Parking</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <Checkbox
                            checked={formData.exterieur}
                            onCheckedChange={(checked) => updateField("exterieur", checked as boolean)}
                            className="border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                          />
                          <span className="text-foreground group-hover:text-gold transition-colors">Extérieur (balcon, terrasse...)</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">
                        Équipements ou points forts (optionnel)
                      </Label>
                      <Input
                        placeholder="Climatisation, vue, parking privé..."
                        value={formData.equipements}
                        onChange={(e) => updateField("equipements", e.target.value)}
                        className="border-border focus:border-gold"
                      />
                    </div>
                  </div>
                )}

                {/* Étape 2 - Contact */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-foreground mb-1">
                        Vos coordonnées
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">Pour vous recontacter avec notre proposition</p>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="text-foreground font-medium mb-2 block">
                            Nom complet <span className="text-gold">*</span>
                          </Label>
                          <Input
                            placeholder="Jean Dupont"
                            value={formData.nomComplet}
                            onChange={(e) => updateField("nomComplet", e.target.value)}
                            className="border-border focus:border-gold"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-foreground font-medium mb-2 block">
                              Téléphone <span className="text-gold">*</span>
                            </Label>
                            <Input
                              type="tel"
                              placeholder="06 12 34 56 78"
                              value={formData.telephone}
                              onChange={(e) => updateField("telephone", e.target.value)}
                              className="border-border focus:border-gold"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-foreground font-medium mb-2 block">
                              E-mail <span className="text-gold">*</span>
                            </Label>
                            <Input
                              type="email"
                              placeholder="jean.dupont@email.com"
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              className="border-border focus:border-gold"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-foreground font-medium mb-2 block">
                            Quand êtes-vous disponible pour un appel ?
                          </Label>
                          <Input
                            placeholder="En semaine après 18h, le week-end..."
                            value={formData.disponibilite}
                            onChange={(e) => updateField("disponibilite", e.target.value)}
                            className="border-border focus:border-gold"
                          />
                        </div>

                        <div>
                          <Label className="text-foreground font-medium mb-2 block">
                            Une question ? Un commentaire ?
                          </Label>
                          <Textarea
                            placeholder="Dites-nous en plus sur votre projet..."
                            value={formData.commentaire}
                            onChange={(e) => updateField("commentaire", e.target.value)}
                            className="border-border focus:border-gold min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>

                    {isSubmitted && (
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-green-700 font-sans text-sm">
                          Merci ! Nous vous recontacterons sous 48h avec votre estimation.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-10 pt-6 border-t border-border/50">
                  {step > 1 ? (
                    <Button
                      variant="ghost"
                      onClick={handlePrev}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Retour
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 2 ? (
                    <Button variant="gold" onClick={handleNext} className="group">
                      Continuer
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button variant="gold" onClick={handleSubmit} className="group">
                      Envoyer ma demande
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EstimationSousLocation;
