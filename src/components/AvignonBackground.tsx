const AvignonBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08]">
      <svg 
        viewBox="0 0 1200 200" 
        className="absolute bottom-0 left-0 w-full h-auto text-gold"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Pont d'Avignon - Gauche */}
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Arches du pont */}
          <path d="M30 180 Q70 120 110 180" />
          <path d="M110 180 Q150 120 190 180" />
          <path d="M190 180 Q230 120 270 180" />
          <path d="M270 180 Q310 120 350 180" />
          {/* Tablier du pont */}
          <line x1="30" y1="130" x2="350" y2="130" strokeWidth="3" />
          <line x1="30" y1="135" x2="350" y2="135" strokeWidth="1" />
          {/* Chapelle Saint-Nicolas */}
          <rect x="160" y="85" width="50" height="45" strokeWidth="2" />
          <path d="M160 85 L185 55 L210 85" strokeWidth="2" />
          <circle cx="185" cy="70" r="8" strokeWidth="1.5" />
          <line x1="185" y1="55" x2="185" y2="45" strokeWidth="2" />
          <circle cx="185" cy="42" r="4" fill="currentColor" />
          {/* Fenêtre chapelle */}
          <path d="M180 100 L180 120 M180 100 Q185 95 190 100 L190 120" strokeWidth="1.5" />
        </g>

        {/* Remparts - Centre gauche */}
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(380, 0)">
          <path d="M0 180 L0 120 L15 120 L15 110 L30 110 L30 120 L45 120 L45 110 L60 110 L60 120 L75 120 L75 110 L90 110 L90 120 L105 120 L105 180" />
          {/* Meurtrières */}
          <line x1="22" y1="140" x2="22" y2="155" strokeWidth="1.5" />
          <line x1="52" y1="140" x2="52" y2="155" strokeWidth="1.5" />
          <line x1="82" y1="140" x2="82" y2="155" strokeWidth="1.5" />
        </g>

        {/* Palais des Papes - Centre */}
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(520, 0)">
          {/* Tour gauche */}
          <rect x="0" y="70" width="45" height="110" />
          <path d="M0 70 L22.5 35 L45 70" />
          {/* Créneaux tour gauche */}
          <path d="M0 70 L0 60 L9 60 L9 70 M18 70 L18 60 L27 60 L27 70 M36 70 L36 60 L45 60 L45 70" strokeWidth="1.5" />
          {/* Fenêtres tour gauche */}
          <path d="M15 100 L15 130 M15 100 Q22.5 90 30 100 L30 130" strokeWidth="1.5" />
          
          {/* Corps central */}
          <rect x="45" y="90" width="110" height="90" />
          {/* Grandes fenêtres gothiques */}
          <path d="M60 110 L60 160 M60 110 Q75 95 90 110 L90 160" strokeWidth="1.5" />
          <path d="M110 110 L110 160 M110 110 Q125 95 140 110 L140 160" strokeWidth="1.5" />
          {/* Rosace */}
          <circle cx="100" cy="105" r="12" strokeWidth="1.5" />
          <circle cx="100" cy="105" r="6" strokeWidth="1" />
          
          {/* Tour centrale avec flèche */}
          <rect x="75" y="50" width="50" height="130" />
          <path d="M75 50 L100 10 L125 50" />
          <line x1="100" y1="10" x2="100" y2="0" strokeWidth="2" />
          <circle cx="100" cy="0" r="6" fill="currentColor" />
          {/* Fenêtre centrale */}
          <path d="M90 70 L90 100 M90 70 Q100 60 110 70 L110 100" strokeWidth="1.5" />
          
          {/* Tour droite */}
          <rect x="155" y="60" width="50" height="120" />
          <path d="M155 60 L180 20 L205 60" />
          {/* Créneaux tour droite */}
          <path d="M155 60 L155 50 L165 50 L165 60 M175 60 L175 50 L185 50 L185 60 M195 60 L195 50 L205 50 L205 60" strokeWidth="1.5" />
          {/* Fenêtres tour droite */}
          <path d="M170 85 L170 115 M170 85 Q180 75 190 85 L190 115" strokeWidth="1.5" />
          <rect x="170" y="130" width="20" height="30" strokeWidth="1.5" />
        </g>

        {/* Cathédrale Notre-Dame des Doms - Droite */}
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(780, 0)">
          <rect x="0" y="100" width="70" height="80" />
          <path d="M0 100 L35 60 L70 100" />
          {/* Fenêtre rosace */}
          <circle cx="35" cy="85" r="10" strokeWidth="1.5" />
          {/* Porte */}
          <path d="M25 150 L25 180 M25 150 Q35 140 45 150 L45 180" strokeWidth="1.5" />
          {/* Clocher */}
          <rect x="70" y="70" width="35" height="110" />
          <path d="M70 70 L87.5 40 L105 70" />
          <line x1="87.5" y1="40" x2="87.5" y2="25" strokeWidth="2" />
          {/* Statue dorée de la Vierge */}
          <ellipse cx="87.5" cy="18" rx="6" ry="10" fill="currentColor" />
          {/* Fenêtres clocher */}
          <path d="M80 90 L80 110 M80 90 Q87.5 83 95 90 L95 110" strokeWidth="1.5" />
          <path d="M80 125 L80 145 M80 125 Q87.5 118 95 125 L95 145" strokeWidth="1.5" />
        </g>

        {/* Maisons provençales - Extrême droite */}
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(920, 0)">
          <rect x="0" y="130" width="50" height="50" />
          <path d="M0 130 L25 100 L50 130" />
          <rect x="15" y="145" width="15" height="20" strokeWidth="1.5" />
          <rect x="35" y="150" width="10" height="10" strokeWidth="1" />
          
          <rect x="60" y="120" width="45" height="60" />
          <path d="M60 120 L82.5 90 L105 120" />
          <rect x="72" y="135" width="12" height="15" strokeWidth="1.5" />
          <rect x="72" y="160" width="20" height="20" strokeWidth="1.5" />
        </g>

        {/* Cyprès */}
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1050 180 L1050 100 Q1060 70 1070 100 L1070 180" />
          <path d="M1055 120 Q1060 90 1065 120" strokeWidth="1" />
          <path d="M1055 150 Q1060 130 1065 150" strokeWidth="1" />
          
          <path d="M1100 180 L1100 90 Q1112 50 1124 90 L1124 180" />
          <path d="M1105 110 Q1112 75 1119 110" strokeWidth="1" />
          <path d="M1105 145 Q1112 120 1119 145" strokeWidth="1" />
          
          <path d="M1150 180 L1150 110 Q1160 80 1170 110 L1170 180" />
          <path d="M1155 130 Q1160 100 1165 130" strokeWidth="1" />
        </g>

        {/* Ligne de sol stylisée */}
        <path d="M0 180 Q300 175 600 180 T1200 180" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
      </svg>
    </div>
  );
};

export default AvignonBackground;
