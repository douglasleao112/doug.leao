import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { StageProps } from '../types';

export const Stage3Journey: React.FC<StageProps> = ({ onNext, userName }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Floor Reflection */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-gold-900/10 to-transparent pointer-events-none" />

      {/* Silhouette Animation Container - Zooming In */}
      <motion.div
        initial={{ scale: 1.0, opacity: 0, y: 50 }}
        animate={{ scale: 1.15, opacity: 0.95, y: 0 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {/* Image Silhouette */}
        <img 
          src="https://i.imgur.com/IEkaNlj.png" 
          alt="Jornada"
          className="h-[65vh] md:h-[80vh] object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="z-10 relative px-8 max-w-lg text-center mt-[-10vh]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 2 } }
          }}
        >
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 1.5 }}
            className="text-gray-400 font-sans tracking-widest uppercase text-sm mb-6"
          >
            E mesmo em meio às batalhas...
          </motion.p>

          <motion.h2
             variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
             transition={{ duration: 1.5 }}
             className="text-4xl md:text-5xl font-serif text-white mb-8"
          >
            Você avançou.
          </motion.h2>

          <motion.div
             variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
             transition={{ duration: 1.5 }}
             className="space-y-4 mb-10"
          >
            <p className="text-gold-100 font-serif text-xl md:text-2xl">
              Aprendeu. Ajustou. Evoluiu.
            </p>
            <p className="text-gray-400 font-sans text-sm md:text-base">
              Vitórias silenciosas, mas reais.
            </p>
          </motion.div>
          
          <motion.p
             variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
             transition={{ duration: 1.5 }}
             className="text-gold-400 font-serif italic text-lg mb-12"
          >
            Cada passo construiu algo maior, {userName}.
          </motion.p>

          <motion.div
             variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
             transition={{ duration: 1 }}
          >
            <Button onClick={onNext}>Continuar</Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};