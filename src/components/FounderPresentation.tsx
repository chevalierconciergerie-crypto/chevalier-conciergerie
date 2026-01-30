import { ScrollAnimate } from "@/hooks/useScrollAnimation";
import victorPhoto from "@/assets/victor-chevalier.jpg";
import bienPhoto1 from "@/assets/bien-immobilier-1.jpg";
import bienPhoto2 from "@/assets/bien-immobilier-2.jpg";
import { Building2, GraduationCap, MapPin } from "lucide-react";

const FounderPresentation = () => {
  return (
    <section className="bg-background py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollAnimate>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Le Fondateur</span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
              Victor Chevalier
            </h2>
            <p className="font-sans text-muted-foreground text-lg">
              Un jeune entrepreneur avignonnais passionné par l'immobilier
            </p>
          </div>
        </ScrollAnimate>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Photo et infos clés */}
          <ScrollAnimate delay={100} animation="slide-right">
            <div className="relative">
              {/* Photo principale */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-medium">
                <img 
                  src={victorPhoto} 
                  alt="Victor Chevalier - Fondateur de Chevalier Conciergerie"
                  className="w-full aspect-[3/4] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                
                {/* Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-soft">
                    <p className="font-serif text-xl font-semibold text-foreground mb-1">Victor Chevalier</p>
                    <p className="font-sans text-sm text-muted-foreground">Fondateur & Gérant</p>
                  </div>
                </div>
              </div>
              
              {/* Élément décoratif */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />
            </div>
          </ScrollAnimate>

          {/* Texte de présentation */}
          <ScrollAnimate delay={200} animation="slide-left">
            <div className="space-y-6">
              {/* Points clés */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-soft">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted-foreground">Formation</p>
                    <p className="font-sans text-sm font-medium text-foreground">CUPGE Sciences</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-soft">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted-foreground">1er achat</p>
                    <p className="font-sans text-sm font-medium text-foreground">À 19 ans</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-soft">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted-foreground">Origine</p>
                    <p className="font-sans text-sm font-medium text-foreground">Avignon</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="font-sans text-muted-foreground leading-relaxed">
                  À seulement <span className="text-foreground font-medium">20 ans</span>, j'ai su allier ma passion pour les sciences — 
                  avec des études en mathématiques et physique à la CUPGE d'Avignon — à mon attrait pour l'immobilier 
                  et l'entrepreneuriat.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Mon premier investissement immobilier à <span className="text-foreground font-medium">19 ans</span> a été le déclic. 
                  En explorant le marché avignonnais, j'ai rapidement compris le potentiel extraordinaire de la location courte durée 
                  dans notre belle région.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Originaire d'Avignon</span>, je connais intimement cette ville, 
                  ses quartiers, son patrimoine et son attractivité touristique. C'est cette expertise locale, 
                  combinée à ma rigueur scientifique, qui m'a conduit à créer <span className="text-gold font-semibold">Chevalier Conciergerie</span>.
                </p>
              </div>

              {/* Photos du bien */}
              <div className="mt-8">
                <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-4">Mon premier investissement</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow duration-300">
                    <img 
                      src={bienPhoto1} 
                      alt="Premier bien immobilier de Victor Chevalier - Salon"
                      className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow duration-300">
                    <img 
                      src={bienPhoto2} 
                      alt="Premier bien immobilier de Victor Chevalier - Chambre"
                      className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
};

export default FounderPresentation;
