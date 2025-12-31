import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { StageProps } from '../types';

export const Stage1Intro: React.FC<StageProps> = ({ onNext, setUserName }) => {
  const [phase, setPhase] = useState<'hourglass' | 'envelope'>('hourglass');
  const [localName, setLocalName] = useState('');
  const [isOpened, setIsOpened] = useState(false);

  // Auto transition from Hourglass to Envelope
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('envelope');
    }, 4500); // 2s anim + pause
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    if (!localName.trim()) return;
    if (setUserName) setUserName(localName);
    setIsOpened(true);
    // Increased timeout to allow the zoom animation to finish before unmounting
    setTimeout(onNext, 1500);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: HOURGLASS */}
        {phase === 'hourglass' && (
          <motion.div
            key="hourglass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center text-center max-w-md px-4"
          >
            {/* Hourglass Image with Zoom Effect */}
            <motion.img 
              src="https://i.ibb.co/Mxy4NDDj/Pngtree-hourglass-symbolism-capturing-the-essence-15456594.png"
              alt="O Tempo"
              className="w-80 md:w-[550px] object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 5, ease: "easeOut" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-gold-200 font-serif italic text-lg md:text-xl tracking-wider leading-relaxed"
            >
              Como esse ano de 2025 passou rápido... não é mesmo?
            </motion.p>
          </motion.div>
        )}

        {/* PHASE 2: ENVELOPE / CARD */}
        {phase === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} 
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full max-w-md bg-deep-800 border border-gold-700/30 p-8 md:p-12 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] relative transform-gpu"
          >
            {/* Subtle sheen effect - constrained to inside of card */}
            <motion.div 
                animate={isOpened ? { opacity: 0 } : { opacity: 1 }}
                className="absolute inset-0 rounded-sm overflow-hidden pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
            </motion.div>

            <div className="flex flex-col items-center text-center space-y-8">
              {/* Image overlapping the top - Zoom & Darken Effect */}
              <div className="-mt-24 mb-2 relative z-50 pointer-events-none">
                <motion.img 
                  src="https://i.ibb.co/LDWLpSvL/carta111.png" 
                  alt="Carta Especial"
                  className="w-40 md:w-48 object-contain drop-shadow-2xl origin-center"
                  animate={isOpened 
                    ? { scale: 35, y: 50, filter: "brightness(0)" } // Zoom in and turn black
                    : { scale: 1, y: 0, filter: "brightness(1)" }
                  }
                  transition={{ 
                    duration: 1.5, 
                    ease: [0.6, 0.05, 0, 0.9],
                  }}
                />
              </div>

              {/* Text and Inputs - Fade out when opened */}
              <motion.div 
                animate={isOpened ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full flex flex-col items-center space-y-8"
              >
                <h1 className="text-2xl md:text-3xl font-serif text-gold-100 leading-relaxed">
                  Você recebeu um cartão especial de ano novo!
                </h1>
                
                <div className="w-full pt-2 space-y-4">
                  <input
                    type="text"
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    placeholder="Digite seu nome"
                    className="w-full bg-deep-900 border-b border-gold-600 text-center py-3 text-gold-100 placeholder-gray-600 focus:outline-none focus:border-gold-300 transition-colors font-serif text-xl"
                    autoFocus
                    disabled={isOpened}
                  />
                  
                  <AnimatePresence>
                    {localName.trim().length > 0 && !isOpened && (
                      <motion.div 
                        className="pt-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <Button onClick={handleOpen}>
                          Abrir meu cartão
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};