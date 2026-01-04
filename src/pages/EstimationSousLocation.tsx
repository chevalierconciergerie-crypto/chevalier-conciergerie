import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Home, FileText, User, ChevronRight, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Étape 1 - Informations du bien
  adresse: string;
  superficie: string;
  typeLogement: string;
  nombreChambres: string;
  nombreSallesDeBain: string;
  nombreEtages: string;
  ascenseur: string;
  stationnement: string;
  accesExterieur: string;
  // Étape 2 - Détails sous-location
  duree: string;
  periodes: string;
  tarifSouhaite: string;
  restrictions: string;
  // Étape 3 - Coordonnées
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  message: string;
}

const steps = [
  { id: 1, title: "Votre Bien", icon: Home },
  { id: 2, title: "Votre Projet", icon: FileText },
  { id: 3, title: "Vos Coordonnées", icon: User },
];

const EstimationSousLocation = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    adresse: "",
    superficie: "",
    typeLogement: "",
    nombreChambres: "",
    nombreSallesDeBain: "",
    nombreEtages: "",
    ascenseur: "",
    stationnement: "",
    accesExterieur: "",
    duree: "",
    periodes: "",
    tarifSouhaite: "",
    restrictions: "",
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    message: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const goToStep = (targetStep: number) => {
    if (targetStep <= step) {
      setStep(targetStep);
    }
  };

  const handleSubmit = () => {
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(`Demande d'estimation sous-location - ${formData.prenom} ${formData.nom}`);
    const body = encodeURIComponent(
`INFORMATIONS DU BIEN
--------------------
Adresse : ${formData.adresse}
Superficie : ${formData.superficie} m²
Type de logement : ${formData.typeLogement}
Nombre de chambres : ${formData.nombreChambres}
Nombre de salles de bain : ${formData.nombreSallesDeBain}
Nombre d'étages : ${formData.nombreEtages}
Ascenseur : ${formData.ascenseur}
Stationnement : ${formData.stationnement}
Accès extérieur : ${formData.accesExterieur}

DÉTAILS DE LA SOUS-LOCATION
---------------------------
Durée prévue : ${formData.duree}
Périodes disponibles : ${formData.periodes}
Tarif mensuel souhaité : ${formData.tarifSouhaite}
Restrictions : ${formData.restrictions}

COORDONNÉES
-----------
Nom : ${formData.nom}
Prénom : ${formData.prenom}
Téléphone : ${formData.telephone}
Email : ${formData.email}
Message : ${formData.message}
`
    );

    window.location.href = `mailto:contact@chevalier-conciergerie.fr?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    
    toast({
      title: "Demande envoyée !",
      description: "Nous reviendrons vers vous rapidement.",
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
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">
                Estimation Gratuite
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-4">
                Estimez votre Loyer Garanti
              </h1>
              <p className="font-sans text-muted-foreground text-lg">
                Quelques informations suffisent pour vous proposer une offre personnalisée.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Steps Navigation - Sidebar style on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left sidebar with steps */}
                <div className="lg:col-span-1">
                  <div className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                    {steps.map((s, index) => (
                      <button
                        key={s.id}
                        onClick={() => goToStep(s.id)}
                        disabled={s.id > step}
                        className={`flex items-center gap-3 p-4 rounded-xl transition-all text-left min-w-[160px] lg:min-w-0 ${
                          step === s.id
                            ? "bg-primary text-primary-foreground shadow-medium"
                            : s.id < step
                            ? "bg-gold/10 text-gold cursor-pointer hover:bg-gold/20"
                            : "bg-muted/50 text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step === s.id
                              ? "bg-gold text-primary"
                              : s.id < step
                              ? "bg-gold/20 text-gold"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {s.id < step ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <s.icon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="hidden lg:block">
                          <span className="text-xs uppercase tracking-wider opacity-70">
                            Étape {s.id}
                          </span>
                          <p className="font-serif font-medium">{s.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right content area */}
                <div className="lg:col-span-3">
                  <div className="bg-card rounded-2xl shadow-soft p-6 md:p-10 border border-border/50">
                    {/* Step Title */}
                    <div className="mb-8">
                      <h2 className="font-serif text-2xl font-semibold text-foreground">
                        {steps[step - 1].title}
                      </h2>
                      <div className="w-16 h-1 bg-gold mt-3 rounded-full" />
                    </div>

                    {/* Étape 1 - Informations du bien */}
                    {step === 1 && (
                      <div className="space-y-6 animate-fade-in">
                        <div>
                          <Label className="text-foreground font-medium mb-2 block">
                            Adresse du logement
                          </Label>
                          <Input
                            placeholder="12 Rue des Lilas, 84000 Avignon"
                            value={formData.adresse}
                            onChange={(e) => updateField("adresse", e.target.value)}
                            className="border-border focus:border-gold focus:ring-gold/20"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-foreground font-medium mb-2 block">
                              Superficie (m²)
                            </Label>
                            <Input
                              placeholder="45"
                              value={formData.superficie}
                              onChange={(e) => updateField("superficie", e.target.value)}
                              className="border-border focus:border-gold focus:ring-gold/20"
                            />
                          </div>
                          <div>
                            <Label className="text-foreground font-medium mb-2 block">
                              Type de logement
                            </Label>
                            <Select
                              value={formData.typeLogement}
                              onValueChange={(value) => updateField("typeLogement", value)}
                            >
                              <SelectTrigger className="border-border focus:border-gold bg-background">
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="appartement">Appartement</SelectItem>
                                <SelectItem value="maison">Maison</SelectItem>
                                <SelectItem value="studio">Studio</SelectItem>
                                <SelectItem value="loft">Loft</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div>
                            <Label className="text-foreground font-medium mb-2 block text-sm">
                              Chambres
                            </Label>
                            <Select
                              value={formData.nombreChambres}
                              onValueChange={(value) => updateField("nombreChambres", value)}
                            >
                              <SelectTrigger className="border-border focus:border-gold bg-background">
                                <SelectValue placeholder="-" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                {[0, 1, 2, 3, 4, 5, "6+"].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-foreground font-medium mb-2 block text-sm">
                              Salles de bain
                            </Label>
                            <Select
                              value={formData.nombreSallesDeBain}
                              onValueChange={(value) => updateField("nombreSallesDeBain", value)}
                            >
                              <SelectTrigger className="border-border focus:border-gold bg-background">
                                <SelectValue placeholder="-" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                {[1, 2, 3, "4+"].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-foreground font-medium mb-2 block text-sm">
                              Étage
                            </Label>
                            <Select
                              value={formData.nombreEtages}
                              onValueChange={(value) => updateField("nombreEtages", value)}
                            >
                              <SelectTrigger className="border-border focus:border-gold bg-background">
                                <SelectValue placeholder="-" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                {["RDC", "1", "2", "3", "4", "5+"].map((num) => (
                                  <SelectItem key={num} value={num}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-foreground font-medium mb-2 block text-sm">
                              Ascenseur
                            </Label>
                            <Select
                              value={formData.ascenseur}
                              onValueChange={(value) => updateField("ascenseur", value)}
                            >
                              <SelectTrigger className="border-border focus:border-gold bg-background">
                                <SelectValue placeholder="-" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="oui">Oui</SelectItem>
                                <SelectItem value="non">Non</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-foreground font-medium mb-2 block">
                              Stationnement
                            </Label>
                            <Select
                              value={formData.stationnement}
                              onValueChange={(value) => updateField("stationnement", value)}
                            >
                              <SelectTrigger className="border-border focus:border-gold bg-background">
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="aucun">Aucun</SelectItem>
                                <SelectItem value="parking">Parking</SelectItem>
                                <SelectItem value="garage">Garage</SelectItem>
                                <SelectItem value="rue">Rue</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-foreground font-medium mb-2 block">
                              Extérieur
                            </Label>
                            <Select
                              value={formData.accesExterieur}
                              onValueChange={(value) => updateField("accesExterieur", value)}
                            >
                              <SelectTrigger className="border-border focus:border-gold bg-background">
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="aucun">Aucun</SelectItem>
                                <SelectItem value="balcon">Balcon</SelectItem>
                                <SelectItem value="terrasse">Terrasse</SelectItem>
                                <SelectItem value="jardin">Jardin</SelectItem>
                                <SelectItem value="cour">Cour</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Étape 2 - Détails sous-location */}
                    {step === 2 && (
                      <div className="space-y-6 animate-fade-in">
                        <div>
                          <Label className="text-foreground font-medium mb-2 block">
                            Durée envisagée
                          </Label>
                          <Input
                            placeholder="1 an, 2 ans, indéterminée..."
                            value={formData.duree}
                            onChange={(e) => updateField("duree", e.target.value)}
                            className="border-border focus:border-gold focus:ring-gold/20"
                          />
                        </div>

                        <div>
                          <Label className="text-foreground font-medium mb-2 block">
                            Disponibilité
                          </Label>
                          <Input
                            placeholder="Toute l'année, hors vacances scolaires..."
                            value={formData.periodes}
                            onChange={(e) => updateField("periodes", e.target.value)}
                            className="border-border focus:border-gold focus:ring-gold/20"
                          />
                        </div>

                        <div>
                          <Label className="text-foreground font-medium mb-2 block">
                            Loyer mensuel souhaité
                          </Label>
                          <Input
                            placeholder="800€"
                            value={formData.tarifSouhaite}
                            onChange={(e) => updateField("tarifSouhaite", e.target.value)}
                            className="border-border focus:border-gold focus:ring-gold/20"
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            Nous vous proposerons notre estimation après étude.
                          </p>
                        </div>

                        <div>
                          <Label className="text-foreground font-medium mb-2 block">
                            Restrictions particulières
                          </Label>
                          <Input
                            placeholder="Pas d'animaux, non-fumeur..."
                            value={formData.restrictions}
                            onChange={(e) => updateField("restrictions", e.target.value)}
                            className="border-border focus:border-gold focus:ring-gold/20"
                          />
                        </div>
                      </div>
                    )}

                    {/* Étape 3 - Coordonnées */}
                    {step === 3 && (
                      <div className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-foreground font-medium mb-2 block">
                              Nom <span className="text-gold">*</span>
                            </Label>
                            <Input
                              placeholder="Dupont"
                              value={formData.nom}
                              onChange={(e) => updateField("nom", e.target.value)}
                              className="border-border focus:border-gold focus:ring-gold/20"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-foreground font-medium mb-2 block">
                              Prénom <span className="text-gold">*</span>
                            </Label>
                            <Input
                              placeholder="Marie"
                              value={formData.prenom}
                              onChange={(e) => updateField("prenom", e.target.value)}
                              className="border-border focus:border-gold focus:ring-gold/20"
                              required
                            />
                          </div>
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
                              className="border-border focus:border-gold focus:ring-gold/20"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-foreground font-medium mb-2 block">
                              E-mail <span className="text-gold">*</span>
                            </Label>
                            <Input
                              type="email"
                              placeholder="marie.dupont@email.com"
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              className="border-border focus:border-gold focus:ring-gold/20"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-foreground font-medium mb-2 block">
                            Message (optionnel)
                          </Label>
                          <Textarea
                            placeholder="Parlez-nous de votre projet, vos attentes..."
                            value={formData.message}
                            onChange={(e) => updateField("message", e.target.value)}
                            className="border-border focus:border-gold focus:ring-gold/20 min-h-[100px]"
                          />
                        </div>

                        {isSubmitted && (
                          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                              <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-green-700 font-sans text-sm">
                              Merci ! Nous reviendrons vers vous très rapidement.
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

                      {step < 3 ? (
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
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EstimationSousLocation;
