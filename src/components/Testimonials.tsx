import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marie-Claire Dubois",
      role: "Propriétaire à Avignon intra-muros",
      content: "Grâce à Chevalier Conciergerie, mon appartement génère maintenant 40% de revenus supplémentaires. Le service est impeccable et je n'ai plus aucune contrainte de gestion.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Philippe Mercier",
      role: "Investisseur immobilier",
      content: "La sous-location professionnelle m'a permis de sécuriser mes revenus. Un loyer garanti chaque mois, c'est exactement ce dont j'avais besoin pour mes 3 appartements.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Isabelle Laurent",
      role: "Propriétaire près du Palais des Papes",
      content: "Une équipe réactive, professionnelle et à l'écoute. Mes voyageurs sont enchantés et mon bien est entretenu comme un hôtel 5 étoiles. Je recommande vivement.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Jean-Marc Fontaine",
      role: "Propriétaire de maison provençale",
      content: "Après avoir testé plusieurs conciergeries, Chevalier se démarque par son excellence. La qualité du ménage et l'accueil des voyageurs sont irréprochables.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <section className="py-24 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">Témoignages</span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            La Confiance de nos Clients
          </h2>
          <p className="font-sans text-muted-foreground text-lg">
            Découvrez les retours de propriétaires qui nous ont fait confiance pour gérer leur patrimoine.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-gold" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="font-sans text-foreground/80 leading-relaxed mb-8 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-gold/20"
                />
                <div>
                  <p className="font-serif text-lg font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="font-sans text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="font-serif text-3xl font-semibold text-foreground">4.9/5</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">Note moyenne</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-foreground">+200</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">Avis voyageurs</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-foreground">98%</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">Clients satisfaits</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-foreground">Superhost</p>
            <p className="font-sans text-sm text-muted-foreground mt-1">Statut Airbnb</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
