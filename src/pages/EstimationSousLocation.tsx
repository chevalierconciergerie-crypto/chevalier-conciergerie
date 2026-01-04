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
import { Check, ArrowLeft, ArrowRight, Send } from "lucide-react";
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

  const handleSubmit = () => {
    // Validation basique
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Construire le corps de l'email
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

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-10">
      {[1, 2, 3].map((num, index) => (
        <div key={num} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
              step >= num
                ? "bg-gold text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step > num ? <Check className="w-5 h-5" /> : num}
          </div>
          {index < 2 && (
            <div
              className={`w-16 md:w-24 h-0.5 mx-2 transition-all ${
                step > num ? "bg-gold" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

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
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">
                Estimation Gratuite
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-4">
                Demande d'Estimation
              </h1>
              <p className="font-sans text-muted-foreground text-lg">
                Remplissez ce formulaire pour recevoir votre estimation de loyer garanti.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl shadow-soft p-8 md:p-10">
                <StepIndicator />

                {/* Étape 1 - Informations du bien */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                        Adresse du logement
                      </Label>
                      <Input
                        placeholder="Exemple : 12 Rue des Lilas, 84000 Avignon"
                        value={formData.adresse}
                        onChange={(e) => updateField("adresse", e.target.value)}
                        className="border-gold/30 focus:border-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Superficie (en m²)
                        </Label>
                        <Input
                          placeholder="Exemple : 45"
                          value={formData.superficie}
                          onChange={(e) => updateField("superficie", e.target.value)}
                          className="border-gold/30 focus:border-gold"
                        />
                      </div>
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Type de logement
                        </Label>
                        <Select
                          value={formData.typeLogement}
                          onValueChange={(value) => updateField("typeLogement", value)}
                        >
                          <SelectTrigger className="border-gold/30 focus:border-gold bg-background">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gold/30">
                            <SelectItem value="appartement">Appartement</SelectItem>
                            <SelectItem value="maison">Maison</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="loft">Loft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Nombre de chambres
                        </Label>
                        <Select
                          value={formData.nombreChambres}
                          onValueChange={(value) => updateField("nombreChambres", value)}
                        >
                          <SelectTrigger className="border-gold/30 focus:border-gold bg-background">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gold/30">
                            {[0, 1, 2, 3, 4, 5, "6+"].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Nombre de salles de bain
                        </Label>
                        <Select
                          value={formData.nombreSallesDeBain}
                          onValueChange={(value) => updateField("nombreSallesDeBain", value)}
                        >
                          <SelectTrigger className="border-gold/30 focus:border-gold bg-background">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gold/30">
                            {[1, 2, 3, 4, "5+"].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Nombre d'étages
                        </Label>
                        <Select
                          value={formData.nombreEtages}
                          onValueChange={(value) => updateField("nombreEtages", value)}
                        >
                          <SelectTrigger className="border-gold/30 focus:border-gold bg-background">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gold/30">
                            {["RDC", 1, 2, 3, 4, 5, "6+"].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Présence d'un ascenseur
                        </Label>
                        <Select
                          value={formData.ascenseur}
                          onValueChange={(value) => updateField("ascenseur", value)}
                        >
                          <SelectTrigger className="border-gold/30 focus:border-gold bg-background">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gold/30">
                            <SelectItem value="oui">Oui</SelectItem>
                            <SelectItem value="non">Non</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Espace de stationnement
                        </Label>
                        <Select
                          value={formData.stationnement}
                          onValueChange={(value) => updateField("stationnement", value)}
                        >
                          <SelectTrigger className="border-gold/30 focus:border-gold bg-background">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gold/30">
                            <SelectItem value="oui">Oui</SelectItem>
                            <SelectItem value="non">Non</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Accès extérieur
                        </Label>
                        <Select
                          value={formData.accesExterieur}
                          onValueChange={(value) => updateField("accesExterieur", value)}
                        >
                          <SelectTrigger className="border-gold/30 focus:border-gold bg-background">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gold/30">
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
                  <div className="space-y-6">
                    <div>
                      <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                        Durée prévue de la sous-location
                      </Label>
                      <Input
                        placeholder="Exemple : 1 an, 2 ans, indéterminée"
                        value={formData.duree}
                        onChange={(e) => updateField("duree", e.target.value)}
                        className="border-gold/30 focus:border-gold"
                      />
                    </div>

                    <div>
                      <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                        Périodes disponibles pour la sous-location
                      </Label>
                      <Input
                        placeholder="Exemple : toute l'année, hors juillet-août, etc."
                        value={formData.periodes}
                        onChange={(e) => updateField("periodes", e.target.value)}
                        className="border-gold/30 focus:border-gold"
                      />
                    </div>

                    <div>
                      <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                        Tarif mensuel souhaité pour la sous-location
                      </Label>
                      <Input
                        placeholder="Exemple : 800€"
                        value={formData.tarifSouhaite}
                        onChange={(e) => updateField("tarifSouhaite", e.target.value)}
                        className="border-gold/30 focus:border-gold"
                      />
                    </div>

                    <div>
                      <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                        Restrictions éventuelles
                      </Label>
                      <Input
                        placeholder="Exemple : pas d'animaux, non-fumeur, etc."
                        value={formData.restrictions}
                        onChange={(e) => updateField("restrictions", e.target.value)}
                        className="border-gold/30 focus:border-gold"
                      />
                    </div>
                  </div>
                )}

                {/* Étape 3 - Coordonnées */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Nom *
                        </Label>
                        <Input
                          placeholder="Votre nom"
                          value={formData.nom}
                          onChange={(e) => updateField("nom", e.target.value)}
                          className="border-gold/30 focus:border-gold"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Prénom *
                        </Label>
                        <Input
                          placeholder="Votre prénom"
                          value={formData.prenom}
                          onChange={(e) => updateField("prenom", e.target.value)}
                          className="border-gold/30 focus:border-gold"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          Téléphone *
                        </Label>
                        <Input
                          type="tel"
                          placeholder="06 12 34 56 78"
                          value={formData.telephone}
                          onChange={(e) => updateField("telephone", e.target.value)}
                          className="border-gold/30 focus:border-gold"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                          E-mail *
                        </Label>
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="border-gold/30 focus:border-gold"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 block">
                        Message
                      </Label>
                      <Textarea
                        placeholder="Parlez-nous de votre projet !"
                        value={formData.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        className="border-gold/30 focus:border-gold min-h-[120px]"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-10">
                  {step > 1 ? (
                    <Button
                      variant="outline"
                      onClick={handlePrev}
                      className="border-gold text-gold hover:bg-gold/10"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <Button variant="gold" onClick={handleNext}>
                      Suivant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button variant="gold" onClick={handleSubmit}>
                      Envoyer
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>

                {/* Message de confirmation */}
                {isSubmitted && (
                  <div className="mt-6 flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="font-sans text-sm">
                      Merci beaucoup pour votre temps et vos réponses, nous reviendrons vers vous rapidement !
                    </span>
                  </div>
                )}
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
