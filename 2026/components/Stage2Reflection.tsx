import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from './Button';
import { StageProps } from '../types';

export const Stage2Reflection: React.FC<StageProps> = ({ onNext, userName }) => {
  // Staggered text animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 3.5, // Increased stagger to give more reading time between lines
        delayChildren: 1.5    // Increased initial delay
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 3.0, ease: "easeOut" } // Slower fade-in
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden">
      
      {/* Background Ambience: CSS-based particles/subtle fireworks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold-400 blur-xl"
            initial={{ 
              opacity: 0, 
              scale: 0, 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight 
            }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              scale: [0.5, 1.5], 
              y: Math.random() * window.innerHeight * 0.5 
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
            style={{ width: '4px', height: '4px' }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl text-center z-10 space-y-8"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-serif text-white font-medium"
        >
          {userName}, 2025 não foi um ano fácil.
        </motion.h2>

        <motion.div variants={itemVariants} className="space-y-2 text-gray-300 font-serif text-lg md:text-xl leading-relaxed">
          <p>Foi um ano de batalhas silenciosas.</p>
          <p>De decisões difíceis.</p>
          <p>De seguir em frente mesmo sem aplausos.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4">
          <p className="text-gold-200 font-serif text-xl italic">
            Nem tudo foi visto.<br/>
            Mas tudo foi vivido.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-12">
          <Button onClick={onNext}>
            Continuar
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};