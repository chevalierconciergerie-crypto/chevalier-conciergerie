import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  type: "palais" | "pont" | "rempart" | "cypres";
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const FloatingAvignonElements = () => {
  const [elements] = useState<FloatingElement[]>([
    { id: 1, type: "palais", x: 5, y: 20, size: 40, delay: 0, duration: 20 },
    { id: 2, type: "pont", x: 85, y: 60, size: 35, delay: 5, duration: 25 },
    { id: 3, type: "rempart", x: 10, y: 70, size: 30, delay: 10, duration: 22 },
    { id: 4, type: "cypres", x: 90, y: 25, size: 45, delay: 3, duration: 18 },
    { id: 5, type: "palais", x: 92, y: 80, size: 25, delay: 8, duration: 24 },
  ]);

  const renderElement = (element: FloatingElement) => {
    const baseClasses = "absolute opacity-10 text-gold pointer-events-none";
    
    switch (element.type) {
      case "palais":
        return (
          <svg viewBox="0 0 60 50" className={baseClasses} style={{ width: element.size, height: element.size }}>
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="5" y="20" width="15" height="30" />
              <path d="M5 20 L12.5 8 L20 20" />
              <rect x="20" y="25" width="20" height="25" />
              <path d="M25 35 L25 45 M25 35 Q30 30 35 35 L35 45" />
              <rect x="40" y="18" width="15" height="32" />
              <path d="M40 18 L47.5 5 L55 18" />
            </g>
          </svg>
        );
      case "pont":
        return (
          <svg viewBox="0 0 60 30" className={baseClasses} style={{ width: element.size, height: element.size * 0.5 }}>
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M5 25 Q15 10 25 25" />
              <path d="M25 25 Q35 10 45 25" />
              <path d="M45 25 Q55 10 65 25" />
              <rect x="20" y="12" width="10" height="13" />
              <path d="M20 12 L25 5 L30 12" />
            </g>
          </svg>
        );
      case "rempart":
        return (
          <svg viewBox="0 0 40 30" className={baseClasses} style={{ width: element.size * 0.8, height: element.size * 0.6 }}>
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M5 30 L5 10 L10 10 L10 5 L15 5 L15 10 L20 10 L20 5 L25 5 L25 10 L30 10 L30 5 L35 5 L35 10 L40 10 L40 30" />
            </g>
          </svg>
        );
      case "cypres":
        return (
          <svg viewBox="0 0 20 50" className={baseClasses} style={{ width: element.size * 0.4, height: element.size }}>
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M10 50 L10 10 Q5 5 10 0 Q15 5 10 10" />
              <path d="M10 15 Q3 10 10 5 Q17 10 10 15" />
              <path d="M10 25 Q2 18 10 12 Q18 18 10 25" />
              <path d="M10 38 Q0 28 10 20 Q20 28 10 38" />
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        >
          {renderElement(element)}
        </div>
      ))}
    </div>
  );
};

export default FloatingAvignonElements;
