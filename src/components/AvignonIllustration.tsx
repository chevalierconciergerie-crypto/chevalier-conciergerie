interface AvignonIllustrationProps {
  variant: "pont" | "palais" | "remparts";
  className?: string;
}

const AvignonIllustration = ({ variant, className = "" }: AvignonIllustrationProps) => {
  const renderIllustration = () => {
    switch (variant) {
      case "pont":
        return (
          <svg 
            viewBox="0 0 800 300" 
            className={`w-full h-full ${className}`}
            preserveAspectRatio="xMidYMax meet"
          >
            {/* Pont d'Avignon */}
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {/* Arches du pont */}
              <path d="M50 280 Q130 180 210 280" />
              <path d="M210 280 Q290 180 370 280" />
              <path d="M370 280 Q450 180 530 280" />
              <path d="M530 280 Q610 180 690 280" />
              
              {/* Tablier du pont */}
              <line x1="50" y1="200" x2="690" y2="200" strokeWidth="5" />
              <line x1="50" y1="210" x2="690" y2="210" strokeWidth="2" />
              
              {/* Piliers */}
              <line x1="210" y1="200" x2="210" y2="280" strokeWidth="4" />
              <line x1="370" y1="200" x2="370" y2="280" strokeWidth="4" />
              <line x1="530" y1="200" x2="530" y2="280" strokeWidth="4" />
              
              {/* Chapelle Saint-Nicolas */}
              <rect x="300" y="120" width="80" height="80" strokeWidth="3" />
              <path d="M300 120 L340 70 L380 120" strokeWidth="3" />
              <circle cx="340" cy="95" r="15" strokeWidth="2" />
              <line x1="340" y1="70" x2="340" y2="50" strokeWidth="3" />
              <circle cx="340" cy="42" r="8" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
              
              {/* Fenêtre chapelle */}
              <path d="M325 150 L325 185 M325 150 Q340 135 355 150 L355 185" strokeWidth="2" />
              
              {/* Garde-corps stylisés */}
              <line x1="50" y1="195" x2="290" y2="195" strokeWidth="1" />
              <line x1="390" y1="195" x2="690" y2="195" strokeWidth="1" />
            </g>
            
            {/* Reflets dans l'eau */}
            <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
              <path d="M100 290 Q120 285 140 290" />
              <path d="M250 295 Q280 288 310 295" />
              <path d="M450 290 Q480 283 510 290" />
              <path d="M600 295 Q630 288 660 295" />
            </g>
          </svg>
        );
      
      case "palais":
        return (
          <svg 
            viewBox="0 0 600 350" 
            className={`w-full h-full ${className}`}
            preserveAspectRatio="xMidYMax meet"
          >
            {/* Palais des Papes */}
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {/* Tour gauche */}
              <rect x="50" y="120" width="80" height="180" />
              <path d="M50 120 L90 60 L130 120" />
              {/* Créneaux tour gauche */}
              <path d="M50 120 L50 105 L65 105 L65 120 M80 120 L80 105 L95 105 L95 120 M110 120 L110 105 L130 105 L130 120" strokeWidth="2" />
              {/* Fenêtres */}
              <path d="M75 160 L75 210 M75 160 Q90 145 105 160 L105 210" strokeWidth="2" />
              <rect x="75" y="240" width="30" height="40" strokeWidth="2" />
              
              {/* Corps central */}
              <rect x="130" y="150" width="180" height="150" />
              {/* Grandes fenêtres gothiques */}
              <path d="M160 180 L160 270 M160 180 Q190 155 220 180 L220 270" strokeWidth="2" />
              <path d="M250 180 L250 270 M250 180 Q280 155 310 180 L310 270" strokeWidth="2" />
              {/* Rosace centrale */}
              <circle cx="235" cy="170" r="20" strokeWidth="2" />
              <circle cx="235" cy="170" r="10" strokeWidth="1" />
              
              {/* Tour centrale avec flèche */}
              <rect x="200" y="80" width="70" height="220" />
              <path d="M200 80 L235 20 L270 80" />
              <line x1="235" y1="20" x2="235" y2="0" strokeWidth="3" />
              <circle cx="235" cy="0" r="10" fill="currentColor" opacity="0.4" stroke="currentColor" strokeWidth="2" />
              {/* Fenêtre centrale */}
              <path d="M220 110 L220 150 M220 110 Q235 95 250 110 L250 150" strokeWidth="2" />
              
              {/* Tour droite */}
              <rect x="310" y="100" width="90" height="200" />
              <path d="M310 100 L355 30 L400 100" />
              {/* Créneaux tour droite */}
              <path d="M310 100 L310 85 L325 85 L325 100 M340 100 L340 85 L355 85 L355 100 M370 100 L370 85 L385 85 L385 100" strokeWidth="2" />
              {/* Fenêtres */}
              <path d="M340 140 L340 190 M340 140 Q355 125 370 140 L370 190" strokeWidth="2" />
              <rect x="340" y="220" width="30" height="50" strokeWidth="2" />
              
              {/* Petite tour à droite */}
              <rect x="400" y="160" width="60" height="140" />
              <path d="M400 160 L430 110 L460 160" />
              <path d="M415 190 L415 220 M415 190 Q430 180 445 190 L445 220" strokeWidth="2" />
            </g>
          </svg>
        );
      
      case "remparts":
        return (
          <svg 
            viewBox="0 0 1000 200" 
            className={`w-full h-full ${className}`}
            preserveAspectRatio="xMidYMax meet"
          >
            {/* Remparts d'Avignon */}
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {/* Tour gauche */}
              <rect x="50" y="60" width="60" height="140" />
              <path d="M50 60 L80 30 L110 60" />
              <path d="M50 60 L50 50 L60 50 L60 60 M70 60 L70 50 L80 50 L80 60 M90 60 L90 50 L100 50 L100 60" strokeWidth="2" />
              <rect x="65" y="100" width="20" height="30" strokeWidth="2" />
              
              {/* Premier segment de muraille */}
              <path d="M110 200 L110 100 L130 100 L130 90 L150 90 L150 100 L170 100 L170 90 L190 90 L190 100 L210 100 L210 90 L230 90 L230 100 L250 100 L250 200" strokeWidth="2" />
              
              {/* Tour centrale 1 */}
              <rect x="250" y="80" width="50" height="120" />
              <path d="M250 80 L275 50 L300 80" />
              <path d="M260 110 L260 140 M260 110 Q275 100 290 110 L290 140" strokeWidth="2" />
              
              {/* Deuxième segment */}
              <path d="M300 200 L300 110 L320 110 L320 100 L340 100 L340 110 L360 110 L360 100 L380 100 L380 110 L400 110 L400 200" strokeWidth="2" />
              
              {/* Grande tour centrale */}
              <rect x="400" y="50" width="80" height="150" />
              <path d="M400 50 L440 10 L480 50" />
              <path d="M400 50 L400 35 L415 35 L415 50 M430 50 L430 35 L445 35 L445 50 M460 50 L460 35 L480 35 L480 50" strokeWidth="2" />
              <path d="M425 80 L425 120 M425 80 Q440 65 455 80 L455 120" strokeWidth="2" />
              <rect x="425" y="140" width="30" height="40" strokeWidth="2" />
              
              {/* Troisième segment */}
              <path d="M480 200 L480 110 L500 110 L500 100 L520 100 L520 110 L540 110 L540 100 L560 100 L560 110 L580 110 L580 200" strokeWidth="2" />
              
              {/* Tour droite 1 */}
              <rect x="580" y="70" width="55" height="130" />
              <path d="M580 70 L607 40 L635 70" />
              <rect x="595" y="100" width="20" height="25" strokeWidth="2" />
              
              {/* Dernier segment */}
              <path d="M635 200 L635 100 L655 100 L655 90 L675 90 L675 100 L695 100 L695 90 L715 90 L715 100 L735 100 L735 200" strokeWidth="2" />
              
              {/* Tour finale */}
              <rect x="735" y="75" width="50" height="125" />
              <path d="M735 75 L760 45 L785 75" />
              <path d="M750 105 L750 130 M750 105 Q760 95 770 105 L770 130" strokeWidth="2" />
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-5xl text-gold opacity-[0.25]">
        {renderIllustration()}
      </div>
    </div>
  );
};

export default AvignonIllustration;
