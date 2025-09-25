import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = ({ children, location }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pixels, setPixels] = useState([]);
  const [showContent, setShowContent] = useState(true);
  const [currentPath, setCurrentPath] = useState(location?.pathname);
  const gridSize = 16;
  const previousPathRef = useRef(location?.pathname);

  // Generar grid de píxeles
  useEffect(() => {
    const totalPixels = gridSize * gridSize;
    const newPixels = Array.from({ length: totalPixels }, (_, index) => ({
      id: index,
      delay: Math.random() * 0.4,
      isVisible: false
    }));
    setPixels(newPixels);
  }, []);

  // Trigger de transición cuando cambia la ubicación
  useEffect(() => {
    if (location?.pathname && location.pathname !== previousPathRef.current) {
      handlePageTransition();
      previousPathRef.current = location.pathname;
    }
  }, [location?.pathname]);

  const handlePageTransition = () => {
    setIsTransitioning(true);
    
    // Ocultar contenido actual
    setShowContent(false);

    // Animar píxeles de entrada
    setPixels(prevPixels => 
      prevPixels.map(pixel => ({
        ...pixel,
        isVisible: true
      }))
    );

    // Mostrar nuevo contenido después de la mitad de la animación
    setTimeout(() => {
      setShowContent(true);
      setCurrentPath(location?.pathname);
    }, 400);

    // Completar transición
    setTimeout(() => {
      setPixels(prevPixels => 
        prevPixels.map(pixel => ({
          ...pixel,
          isVisible: false
        }))
      );
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }, 800);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Contenido de la página */}
      <div className={`w-full h-full transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>

      {/* Overlay de píxeles */}
      {isTransitioning && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <div
            className="grid w-full h-full"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`
            }}
          >
            {pixels.map((pixel) => (
              <motion.div
                key={pixel.id}
                className="w-full h-full page-transition-pixel"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: pixel.isVisible ? 1 : 0,
                  scale: pixel.isVisible ? 1 : 0.8
                }}
                transition={{
                  duration: 0.4,
                  delay: pixel.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageTransition;
