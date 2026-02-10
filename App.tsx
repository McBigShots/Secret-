import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import Quiz from './components/Quiz';
import MiniGame from './components/MiniGame';
import Proposal from './components/Proposal';
import { GamePhase } from './types';
import { USER_CONTEXT } from './constants';

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('intro');

  const handleStart = () => setPhase('quiz');
  const handleQuizComplete = () => setPhase('minigame');
  const handleMinigameComplete = () => setPhase('proposal');
  const handleProposalAccepted = () => setPhase('success');

  // Global click effect to spawn roses/hearts
  const handleGlobalClick = (e: React.MouseEvent) => {
    const el = document.createElement('div');
    el.innerHTML = Math.random() > 0.5 ? '🌹' : '✨';
    el.style.position = 'fixed';
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
    el.style.fontSize = '1.5rem';
    el.style.pointerEvents = 'none';
    el.style.animation = 'float-up 1s ease-out forwards';
    el.style.zIndex = '9999';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative font-sans text-gray-800 overflow-hidden animate-gradient-xy"
      onClick={handleGlobalClick}
    >
      <FloatingHearts />
      
      {/* Background Image Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 z-0 animate-pulse" />

      <main className="z-10 w-full flex justify-center">
        {phase === 'intro' && (
          <div className="text-center bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.7)] max-w-lg border-4 border-white animate-pop-in hover:rotate-1 transition-transform">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-2 font-hand animate-rainbow">
              Hi {USER_CONTEXT.partner}!
            </h1>
            <p className="text-xl text-gray-800 mb-6 font-bold">
              I invited you to this special mission... ❤️
            </p>
            
            <div className="flex justify-center mb-8 relative">
               <div className="relative animate-wiggle">
                 <div className="bg-white p-6 rounded-full shadow-2xl text-7xl border-4 border-pink-300">👩‍❤️‍👨</div>
               </div>
            </div>

            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-extrabold py-5 px-16 rounded-full text-2xl shadow-xl transform transition hover:scale-110 active:scale-95 animate-heartbeat hover:shadow-[0_0_30px_rgba(255,105,180,0.8)]"
            >
              Start Mission 🚀
            </button>
          </div>
        )}

        {phase === 'quiz' && <Quiz onComplete={handleQuizComplete} />}

        {phase === 'minigame' && <MiniGame onComplete={handleMinigameComplete} />}

        {phase === 'proposal' && <Proposal onAccept={handleProposalAccepted} />}

        {phase === 'success' && (
          <div className="text-center bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-8 border-yellow-400 animate-jello max-w-2xl relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0 fireworks-bg"></div>

            <h1 className="text-6xl md:text-7xl mb-4 z-10 relative font-extrabold animate-rainbow font-hand">
              🎆 SHE SAID YES! 🎆
            </h1>
            
            <div className="my-6 relative z-10 text-8xl animate-spin-slow">
              💍
            </div>

            <h2 className="text-4xl font-bold text-red-600 font-hand mb-6 z-10 relative animate-bounce">
              Get ready for our date!
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left z-10 relative">
               <div className="bg-pink-100 p-5 rounded-2xl border-4 border-pink-300 transform hover:scale-110 transition-transform animate-wiggle">
                 <span className="text-5xl mb-2 block animate-bounce">🧖‍♀️</span>
                 <p className="font-bold text-pink-600 text-xl">Activity 1</p>
                 <p className="text-gray-900 font-bold">Private Spa Relaxation</p>
               </div>
               <div className="bg-blue-100 p-5 rounded-2xl border-4 border-blue-300 transform hover:scale-110 transition-transform animate-wiggle" style={{animationDelay: '0.2s'}}>
                 <span className="text-5xl mb-2 block animate-bounce">🐠</span>
                 <p className="font-bold text-blue-600 text-xl">Activity 2</p>
                 <p className="text-gray-900 font-bold">Romantic Aquarium Date</p>
               </div>
            </div>
            
            <p className="mt-8 text-2xl font-hand text-pink-600 font-bold z-10 relative animate-pulse">
              I love you infinitely, Baru. ❤️
            </p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-4 text-white font-bold text-sm z-10 bg-black/30 px-4 py-2 rounded-full backdrop-blur-md animate-bounce">
        Made with ❤️ by {USER_CONTEXT.proposer}
      </footer>
    </div>
  );
};

export default App;