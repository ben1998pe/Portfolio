import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Shuffle = ({
  text = "Hello World",
  shuffleDirection = "right",
  duration = 0.35,
  animationMode = "evenodd",
  shuffleTimes = 1,
  ease = "power3.out",
  stagger = 0.03,
  threshold = 0.1,
  triggerOnce = true,
  triggerOnHover = true,
  respectReducedMotion = true,
  className = "",
  style = {}
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const [shuffledText, setShuffledText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold, once: triggerOnce });
  const hasTriggered = useRef(false);

  // Caracteres para el shuffle
  const shuffleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  // Verificar si el usuario prefiere movimiento reducido
  const prefersReducedMotion = respectReducedMotion && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Generar texto aleatorio para el shuffle
  const generateShuffledText = (originalText) => {
    return originalText.split('').map((char, index) => {
      if (char === ' ') return ' ';
      if (animationMode === "evenodd") {
        return (index % 2 === 0) ? shuffleChars[Math.floor(Math.random() * shuffleChars.length)] : char;
      } else if (animationMode === "random") {
        return Math.random() < 0.5 ? shuffleChars[Math.floor(Math.random() * shuffleChars.length)] : char;
      } else if (animationMode === "all") {
        return shuffleChars[Math.floor(Math.random() * shuffleChars.length)];
      }
      return char;
    }).join('');
  };

  // Función principal de animación
  const animateText = () => {
    if (isAnimating || (prefersReducedMotion && hasTriggered.current)) return;
    
    setIsAnimating(true);
    hasTriggered.current = true;
    
    let currentShuffle = 0;
    const totalShuffles = shuffleTimes * 2; // ida y vuelta
    
    const shuffleInterval = setInterval(() => {
      if (currentShuffle < totalShuffles) {
        if (currentShuffle < shuffleTimes) {
          // Fase de shuffle
          setShuffledText(generateShuffledText(text));
        } else {
          // Fase de revelado
          const progress = (currentShuffle - shuffleTimes) / shuffleTimes;
          const revealText = text.split('').map((char, index) => {
            if (char === ' ') return ' ';
            const shouldReveal = Math.random() < progress;
            return shouldReveal ? char : shuffleChars[Math.floor(Math.random() * shuffleChars.length)];
          }).join('');
          setShuffledText(revealText);
        }
        currentShuffle++;
      } else {
        // Finalizar animación
        setShuffledText(text);
        setDisplayText(text);
        setIsAnimating(false);
        clearInterval(shuffleInterval);
      }
    }, duration * 1000 / totalShuffles);
  };

  // Efectos de entrada
  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      const timer = setTimeout(() => {
        animateText();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Efectos de hover
  const handleMouseEnter = () => {
    if (triggerOnHover && !isAnimating) {
      animateText();
    }
  };

  // Configurar easing
  const getEasing = (easeType) => {
    const easingMap = {
      'linear': 'linear',
      'ease': 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
      'power1.in': [0.55, 0.055, 0.675, 0.19],
      'power1.out': [0.215, 0.61, 0.355, 1],
      'power2.in': [0.55, 0.055, 0.675, 0.19],
      'power2.out': [0.215, 0.61, 0.355, 1],
      'power3.in': [0.55, 0.055, 0.675, 0.19],
      'power3.out': [0.215, 0.61, 0.355, 1],
      'back.in': [0.6, -0.28, 0.735, 0.045],
      'back.out': [0.175, 0.885, 0.32, 1.275],
      'elastic.in': [0.55, 0.055, 0.675, 0.19],
      'elastic.out': [0.215, 0.61, 0.355, 1],
    };
    return easingMap[easeType] || 'ease-out';
  };

  // Si el usuario prefiere movimiento reducido, mostrar texto normal
  if (prefersReducedMotion && hasTriggered.current) {
    return (
      <span ref={ref} className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={`shuffle-text ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isAnimating ? shuffledText : displayText}
    </motion.span>
  );
};

export default Shuffle;
