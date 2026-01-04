import { useState, useEffect } from "react";

interface HeroImageCarouselProps {
  images: { src: string; alt: string }[];
  interval?: number;
  className?: string;
}

const HeroImageCarousel = ({ 
  images, 
  interval = 6000,
  className = "" 
}: HeroImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {images.map((image, index) => {
        const isActive = index === currentIndex;
        
        return (
          <div
            key={image.src}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: "opacity 2s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: isActive ? 1 : 0,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              style={{
                transform: isActive ? "scale(1.03)" : "scale(1)",
                transition: "transform 12s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HeroImageCarousel;
