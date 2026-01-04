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
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 800);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {images.map((image, index) => {
        const isActive = index === currentIndex;
        const isPrevious = index === (currentIndex - 1 + images.length) % images.length;
        
        return (
          <div
            key={image.src}
            className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
              isActive 
                ? "opacity-100 scale-100" 
                : isPrevious && isTransitioning
                  ? "opacity-0 scale-110"
                  : "opacity-0 scale-105"
            }`}
            style={{
              zIndex: isActive ? 2 : isPrevious ? 1 : 0,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                isActive ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HeroImageCarousel;
