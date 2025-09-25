import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PixelTransition = ({
  firstContent,
  secondContent,
  gridSize = 12,
  pixelColor = '#ffffff',
  animationStepDuration = 0.4,
  className = '',
  trigger = 'click', // 'click', 'hover', 'auto'
  autoTriggerDelay = 3000,
  onTransitionComplete = null
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSecondContent, setShowSecondContent] = useState(false);
  const [pixels, setPixels] = useState([]);
  const containerRef = useRef(null);
  const autoTriggerRef = useRef(null);

  // Generar grid de píxeles
  useEffect(() => {
    const totalPixels = gridSize * gridSize;
    const newPixels = Array.from({ length: totalPixels }, (_, index) => ({
      id: index,
      delay: Math.random() * 0.5, // Delay aleatorio para efecto más orgánico
      isVisible: false
    }));
    setPixels(newPixels);
  }, [gridSize]);

  // Auto trigger
  useEffect(() => {
    if (trigger === 'auto' && autoTriggerDelay > 0) {
      autoTriggerRef.current = setTimeout(() => {
        handleTransition();
      }, autoTriggerDelay);
    }

    return () => {
      if (autoTriggerRef.current) {
        clearTimeout(autoTriggerRef.current);
      }
    };
  }, [trigger, autoTriggerDelay]);

  const handleTransition = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    
    // Animar píxeles de entrada
    setPixels(prevPixels => 
      prevPixels.map(pixel => ({
        ...pixel,
        isVisible: true
      }))
    );

    // Cambiar contenido después de la mitad de la animación
    setTimeout(() => {
      setShowSecondContent(!showSecondContent);
    }, (animationStepDuration * 1000) / 2);

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
        if (onTransitionComplete) {
          onTransitionComplete(showSecondContent);
        }
      }, animationStepDuration * 1000);
    }, animationStepDuration * 1000);
  };

  const handleClick = () => {
    if (trigger === 'click') {
      handleTransition();
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      handleTransition();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: trigger === 'click' ? 'pointer' : 'default' }}
    >
      {/* Contenido principal */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {!showSecondContent ? (
            <motion.div
              key="first"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {firstContent}
            </motion.div>
          ) : (
            <motion.div
              key="second"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {secondContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay de píxeles */}
      <div className="absolute inset-0 pointer-events-none">
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
              className="w-full h-full"
              style={{ backgroundColor: pixelColor }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: pixel.isVisible ? 1 : 0 
              }}
              transition={{
                duration: animationStepDuration,
                delay: pixel.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Indicador de interacción */}
      {trigger === 'click' && (
        <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
            <svg 
              className="w-4 h-4 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default PixelTransition;

