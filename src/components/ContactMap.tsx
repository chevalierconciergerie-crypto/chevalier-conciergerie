import { MapPin } from 'lucide-react';

const ContactMap = () => {
  // Avignon center coordinates for the embed
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92543.36374980652!2d4.7193!3d43.9493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5eb8739bc9f9b%3A0x40819a5fd970a30!2sAvignon!5e0!3m2!1sfr!2sfr!4v1704000000000!5m2!1sfr!2sfr";

  return (
    <div className="bg-card rounded-2xl shadow-soft overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-card/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-soft">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4 text-gold" />
          <p className="font-serif text-lg font-semibold text-foreground">Zone d'intervention</p>
        </div>
        <p className="font-sans text-sm text-muted-foreground">Avignon, Villeneuve-lès-Avignon & Les Angles</p>
      </div>
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '500px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Carte de la zone d'intervention - Avignon"
      />
    </div>
  );
};

export default ContactMap;
