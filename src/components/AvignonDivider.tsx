import { ScrollAnimate } from "@/hooks/useScrollAnimation";

const AvignonDivider = () => {
  return (
    <div className="relative py-8 overflow-hidden bg-gradient-to-r from-transparent via-secondary/30 to-transparent">
      <ScrollAnimate>
        <div className="container mx-auto px-6">
          {/* Avignon Skyline SVG */}
          <svg 
            viewBox="0 0 1200 120" 
            className="w-full h-16 md:h-24 text-gold/30"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Pont d'Avignon */}
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              {/* Arches du pont */}
              <path d="M50 100 Q75 70 100 100" />
              <path d="M100 100 Q125 70 150 100" />
              <path d="M150 100 Q175 70 200 100" />
              <path d="M200 100 Q225 70 250 100" />
              {/* Chapelle Saint-Nicolas */}
              <rect x="120" y="60" width="30" height="40" />
              <path d="M120 60 L135 45 L150 60" />
              <circle cx="135" cy="52" r="3" />
            </g>

            {/* Remparts */}
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M300 100 L300 70 L310 70 L310 65 L320 65 L320 70 L330 70 L330 65 L340 65 L340 70 L350 70 L350 100" />
              <path d="M360 100 L360 75 L370 75 L370 70 L380 70 L380 75 L390 75 L390 100" />
            </g>

            {/* Palais des Papes - Centre */}
            <g fill="none" stroke="currentColor" strokeWidth="1.5" transform="translate(500, 0)">
              {/* Tour principale gauche */}
              <rect x="0" y="40" width="35" height="60" />
              <path d="M0 40 L17.5 20 L35 40" />
              {/* Créneaux */}
              <path d="M0 40 L0 35 L7 35 L7 40 M14 40 L14 35 L21 35 L21 40 M28 40 L28 35 L35 35 L35 40" />
              
              {/* Corps central */}
              <rect x="35" y="50" width="80" height="50" />
              {/* Fenêtres gothiques */}
              <path d="M50 70 L50 90 M50 70 Q55 65 60 70 L60 90" />
              <path d="M75 70 L75 90 M75 70 Q80 65 85 70 L85 90" />
              <path d="M100 70 L100 90 M100 70 Q105 65 110 70 L110 90" />
              
              {/* Tour principale droite */}
              <rect x="115" y="35" width="40" height="65" />
              <path d="M115 35 L135 10 L155 35" />
              {/* Créneaux */}
              <path d="M115 35 L115 30 L123 30 L123 35 M131 35 L131 30 L139 30 L139 35 M147 35 L147 30 L155 30 L155 35" />
              
              {/* Tour centrale avec flèche */}
              <rect x="60" y="30" width="30" height="70" />
              <path d="M60 30 L75 5 L90 30" />
              <line x1="75" y1="5" x2="75" y2="0" />
              <circle cx="75" cy="0" r="3" />
            </g>

            {/* Maisons provençales droite */}
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="750" y="70" width="40" height="30" />
              <path d="M750 70 L770 55 L790 70" />
              <rect x="760" y="80" width="10" height="20" />
              
              <rect x="800" y="65" width="35" height="35" />
              <path d="M800 65 L817.5 50 L835 65" />
              <rect x="810" y="75" width="8" height="10" />
              <rect x="810" y="90" width="15" height="10" />
            </g>

            {/* Cyprès */}
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M880 100 L880 60 Q885 50 890 60 L890 100" />
              <path d="M910 100 L910 55 Q917 40 924 55 L924 100" />
              <path d="M950 100 L950 65 Q955 55 960 65 L960 100" />
            </g>

            {/* Cathédrale Notre-Dame des Doms */}
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1000" y="55" width="50" height="45" />
              <path d="M1000 55 L1025 30 L1050 55" />
              {/* Clocher */}
              <rect x="1050" y="40" width="20" height="60" />
              <path d="M1050 40 L1060 25 L1070 40" />
              <line x1="1060" y1="25" x2="1060" y2="18" />
              {/* Statue dorée */}
              <circle cx="1060" cy="15" r="5" className="fill-gold/50" />
            </g>

            {/* Ligne de sol */}
            <line x1="0" y1="100" x2="1200" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
      </ScrollAnimate>
    </div>
  );
};

export default AvignonDivider;
