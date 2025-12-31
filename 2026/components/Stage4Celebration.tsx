import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { StageProps } from '../types';

// Moving the audio URL to this stage
const AUDIO_URL = "https://s3.typebot.io/public/workspaces/cmfuk60nx0008jl046d57hakk/typebots/m456cl9zo6musp2ebp2fdk82/blocks/h8kzati7sz8my2ta9ckszgv9?v=1767193718953";
const PROFILE_IMG = "https://i.imgur.com/VQpd3jN.png";

export const Stage4Celebration: React.FC<StageProps> = ({ onNext, userName, onPauseBackgroundMusic }) => {
  const [viewMode, setViewMode] = useState<'card' | 'chat'>('card');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  
  // Estados separados para controlar o fluxo temporal
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);
  
  const [message, setMessage] = useState('');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const balloonImages = [
    'https://i.imgur.com/1tQ5iLH.png', // Gold
    'https://i.imgur.com/nppFUYm.png'  // Silver
  ];

  // Memoize balloon data so it doesn't change on re-renders
  const balloons = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      image: balloonImages[i % 2],
      width: 80 + Math.random() * 80,
      left: Math.random() * 90,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
      repeatDelay: Math.random() * 5,
      xSway: Math.sin(i) * 40,
      rotateSway: Math.sin(i) * 5
    }));
  }, []);

  // Scroll to bottom logic
  useEffect(() => {
    if ((showFinalMessage || showBottomBar) && scrollRef.current) {
        // Pequeno delay para garantir que o DOM renderizou antes do scroll
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    }
  }, [showFinalMessage, showBottomBar]);

  // Variants for the Card Text Animation
  const cardContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.2,
        delayChildren: 0.5
      }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.5 } }
  };

  const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handlePlay = () => {
    // Transition to Chat Mode on first play
    if (viewMode === 'card') {
        setViewMode('chat');
        // Small timeout to allow layout transition to start before playing
        setTimeout(() => {
            if (audioRef.current) audioRef.current.play();
            setIsPlaying(true);
        }, 300);
        
        if (onPauseBackgroundMusic) {
            onPauseBackgroundMusic();
        }
    } else {
        // Toggle play in chat mode
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(100);
    
    // 1. Mostrar a mensagem de texto imediatamente abaixo do áudio
    setShowFinalMessage(true);

    // 2. Aguardar 3 segundos para mostrar a barra de input inferior
    setTimeout(() => {
        setShowBottomBar(true);
    }, 3000);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const encodedText = encodeURIComponent(message);
    const url = `https://wa.me/5562984888498?text=${encodedText}`;
    window.location.href = url;
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center overflow-hidden transition-colors duration-1000 ${viewMode === 'chat' ? 'bg-[#0b141a]' : 'bg-gradient-to-b from-deep-900 via-deep-800 to-deep-900'}`}>
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={AUDIO_URL}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Balloons Animation - Low opacity in chat mode */}
      <motion.div 
        animate={{ opacity: viewMode === 'chat' ? 0.1 : 0.9 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {balloons.map((balloon) => (
          <motion.img
            key={balloon.id}
            src={balloon.image} 
            alt="Balão"
            className="absolute bottom-[-300px] object-contain"
            style={{ 
              width: `${balloon.width}px`, 
              left: `${balloon.left}%`
            }}
            initial={{ y: 0, rotate: 0 }}
            animate={{ 
              y: -window.innerHeight - 400,
              x: balloon.xSway,
              rotate: balloon.rotateSway
            }}
            transition={{ 
              duration: balloon.duration,
              ease: "linear",
              delay: balloon.delay,
              repeat: Infinity,
              repeatDelay: balloon.repeatDelay
            }}
          />
        ))}
      </motion.div>

      {/* Main Content Area */}
      <div className="z-10 w-full h-full flex flex-col relative max-w-lg mx-auto">
        
        {/* CARD MODE CONTENT */}
        <AnimatePresence mode="wait">
            {viewMode === 'card' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <motion.div
                        key="card-container"
                        variants={cardContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full bg-deep-900/60 backdrop-blur-sm p-8 rounded-lg border border-white/5 shadow-2xl flex flex-col items-center text-center space-y-6 mb-32" 
                    >
                        <motion.h1 
                            variants={cardItemVariants}
                            className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 leading-tight drop-shadow-sm"
                        >
                            Feliz Ano Novo, {userName}!
                        </motion.h1>

                        <motion.p 
                            variants={cardItemVariants}
                            className="text-xl md:text-2xl font-serif text-white pt-2"
                        >
                            Que 2026 seja um ano de mais clareza, consistência e resultados sustentáveis.
                        </motion.p>

                        <motion.div variants={cardItemVariants} className="w-full flex justify-center py-2">
                            <div className="w-16 h-[1px] bg-gold-600 opacity-50" />
                        </motion.div>

                        <motion.p 
                            variants={cardItemVariants}
                            className="text-gray-300 font-sans text-base md:text-lg leading-relaxed"
                        >
                            Obrigado por confiar no meu trabalho e permitir que eu te acompanhasse nessa jornada.
                        </motion.p>

                        <motion.p 
                            variants={cardItemVariants}
                            className="text-gold-300 font-serif italic text-lg pb-4"
                        >
                            Seguimos juntos. Sempre evoluindo.
                        </motion.p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* CHAT / AUDIO PLAYER LAYER */}
        <div className={`flex-1 flex flex-col w-full p-6 transition-all duration-1000 ${viewMode === 'card' ? 'justify-end items-center pb-16' : 'justify-start items-center pt-[15vh]'}`}>
            
            {/* Wrapper Container para Agrupar Áudio e Mensagem */}
            <div className="w-full max-w-sm flex flex-col items-start space-y-4">
                
                {/* AUDIO PLAYER COMPONENT (Moves with layoutId) */}
                <motion.div 
                    layoutId="audio-player-bubble"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        delay: viewMode === 'card' ? 6.5 : 0, 
                        duration: 1.5 
                    }}
                    className="w-full bg-[#202c33] rounded-lg p-3 flex items-center gap-3 shadow-lg relative z-20"
                    style={{ borderRadius: "0px 16px 16px 16px" }}
                >
                    {/* Play Button */}
                    <button 
                        onClick={handlePlay}
                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                    >
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-400 fill-current">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-400 fill-current">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    {/* Progress Area */}
                    <div className="flex-1 flex flex-col justify-center h-full pt-1">
                        <div className="h-1 bg-gray-600 w-full rounded-full relative overflow-hidden">
                            <div 
                                className="absolute top-0 left-0 h-full bg-[#25D366] transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-400 font-sans">
                                {currentTime}
                                {duration !== "0:00" && !isPlaying && progress === 0 && ` / ${duration}`}
                            </span>
                        </div>
                    </div>

                    {/* Mic Icon */}
                    <div className="flex-shrink-0 relative top-2">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#25D366] fill-current opacity-80">
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                        </svg>
                    </div>

                    {/* Profile Picture */}
                    <div className="flex-shrink-0 w-12 h-12 ml-1">
                        <img 
                            src={PROFILE_IMG} 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover border border-gray-600"
                        />
                    </div>

                    {/* Tail */}
                    <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[0px] border-r-[15px] border-b-[15px] border-transparent border-r-[#202c33] filter drop-shadow-sm"></div>
                </motion.div>

                {/* FINAL TEXT MESSAGE (Appears below audio after finish) */}
                <AnimatePresence>
                    {showFinalMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="w-full bg-[#202c33] rounded-lg p-4 shadow-lg relative text-white font-sans text-base leading-relaxed"
                            style={{ borderRadius: "0px 16px 16px 16px" }}
                        >
                            <p>{userName}, vamos juntos dominar 2026?</p>
                            <span className="block text-right text-[10px] text-gray-400 mt-2">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {/* Tail */}
                            <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[0px] border-r-[15px] border-b-[15px] border-transparent border-r-[#202c33] filter drop-shadow-sm"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
            
            {/* Scroll Anchor */}
            <div ref={scrollRef} className="h-4 flex-shrink-0" />
        </div>

        {/* INPUT BAR (Fixed Bottom) - Only appears after delay */}
        <AnimatePresence>
            {showBottomBar && (
                <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="absolute bottom-0 left-0 w-full bg-[#202c33] p-3 flex items-center gap-2 border-t border-gray-700 shadow-2xl z-50"
                >
                     <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escreva sua mensagem aqui..."
                        className="flex-1 bg-[#2a3942] rounded-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#25D366] transition-all font-sans text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className="w-12 h-12 bg-[#00a884] hover:bg-[#008f6f] rounded-full flex items-center justify-center transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                         <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current ml-1">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};