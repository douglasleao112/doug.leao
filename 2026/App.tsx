import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stage, AppState } from './types';
import { Stage1Intro } from './components/Stage1Intro';
import { Stage2Reflection } from './components/Stage2Reflection';
import { Stage3Journey } from './components/Stage3Journey';
import { Stage4Celebration } from './components/Stage4Celebration';
import { Stage5Feedback } from './components/Stage5Feedback';
import { Button } from './components/Button';

const BG_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2025/12/28/audio_6276dc0bfe.mp3?filename=new-year-music-457947.mp3";

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [state, setState] = useState<AppState>({
    currentStage: Stage.INTRO,
    userName: '',
  });
  
  const bgAudioRef = useRef<HTMLAudioElement>(null);

  const startExperience = () => {
    setHasStarted(true);
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.3; // 30% volume for subtle background
      bgAudioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  const pauseBackgroundMusic = () => {
    if (bgAudioRef.current) {
      // Fade out effect could be added here, but simple pause for now
      bgAudioRef.current.pause();
    }
  };

  const nextStage = () => {
    setState((prev) => ({ ...prev, currentStage: prev.currentStage + 1 }));
  };

  const setUserName = (name: string) => {
    setState((prev) => ({ ...prev, userName: name }));
  };

  const renderStage = () => {
    const props = {
      onNext: nextStage,
      userName: state.userName,
      setUserName: setUserName,
      onPauseBackgroundMusic: pauseBackgroundMusic
    };

    switch (state.currentStage) {
      case Stage.INTRO:
        return <Stage1Intro {...props} />;
      case Stage.REFLECTION:
        return <Stage2Reflection {...props} />;
      case Stage.JOURNEY:
        return <Stage3Journey {...props} />;
      case Stage.CELEBRATION:
        return <Stage4Celebration {...props} />;
      case Stage.FEEDBACK:
        return <Stage5Feedback {...props} />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full h-screen bg-deep-900 text-white overflow-hidden flex flex-col items-center justify-center relative">
      {/* Global Audio */}
      <audio ref={bgAudioRef} src={BG_MUSIC_URL} loop />

      {/* Global Grain/Noise Texture for cinematic feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-deep-900 px-4 overflow-hidden"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://i.ibb.co/Jj5CKLsw/RECORDADO.png" 
                    alt="Dr. Douglas"
                    className="w-full h-full object-cover object-center opacity-10"
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
                <h1 className="text-xl md:text-2xl font-serif text-gold-200 mb-8 text-center tracking-wider opacity-90 drop-shadow-md">
                Dr. Douglas tem um recado para você...
                </h1>
                
                <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                    scale: [1, 1.05, 1], 
                    opacity: 1 
                }}
                transition={{ 
                    scale: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                    },
                    opacity: { duration: 1 }
                }}
                className="flex items-center justify-center"
                >
                <Button onClick={startExperience}>
                    Iniciar
                </Button>
                </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={state.currentStage}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {renderStage()}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;