import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { StageProps } from '../types';

export const Stage5Feedback: React.FC<StageProps> = ({ userName }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const encodedText = encodeURIComponent(message);
    const url = `https://wa.me/5562984888498?text=${encodedText}`;
    window.location.href = url;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md bg-deep-800/80 backdrop-blur-md border border-gold-500/30 p-8 rounded-sm shadow-2xl flex flex-col items-center"
      >
        
        {/* Feedback Form */}
        <div className="w-full text-center space-y-6">
          <h2 className="text-xl font-serif text-white">
            {userName}, vamos juntos dominar 2026?
          </h2>
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva sua mensagem aqui..."
            rows={3}
            className="w-full bg-deep-900/50 border border-gray-700 rounded p-4 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all font-sans resize-none text-sm"
          />

          <div className="min-h-[60px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
                {message.trim().length > 0 && (
                    <motion.div
                        key="button"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="w-full"
                    >
                        <Button onClick={handleSend} className="w-full">
                            Enviar Mensagem
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};