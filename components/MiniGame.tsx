import React, { useState } from 'react';

interface MiniGameProps {
  onComplete: () => void;
}

const MiniGame: React.FC<MiniGameProps> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [isBroken, setIsBroken] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const GOAL = 20;

  const handleClick = (e: React.MouseEvent) => {
    if (isBroken) return;

    const newScore = score + 1;
    setScore(newScore);

    // Create immediate rose at click
    createRoseAt(e.clientX, e.clientY);

    if (newScore >= GOAL) {
      setIsBroken(true);
      setShowExplosion(true);
      triggerRoseRain();
      setTimeout(onComplete, 4000); // Wait for animation
    }
  };

  const createRoseAt = (x: number, y: number) => {
    const rose = document.createElement('div');
    rose.innerHTML = '🌹';
    rose.style.position = 'fixed';
    rose.style.left = `${x}px`;
    rose.style.top = `${y}px`;
    rose.style.fontSize = '3rem';
    rose.style.pointerEvents = 'none';
    rose.style.zIndex = '100';
    rose.style.animation = 'float-up 0.5s ease-out forwards';
    document.body.appendChild(rose);
    setTimeout(() => rose.remove(), 1000);
  };

  const triggerRoseRain = () => {
    const interval = setInterval(() => {
        const rose = document.createElement('div');
        rose.innerHTML = '🌹';
        rose.style.position = 'fixed';
        rose.style.left = `${Math.random() * 100}vw`;
        rose.style.top = '-50px';
        rose.style.fontSize = `${Math.random() * 3 + 2}rem`;
        rose.style.zIndex = '50';
        rose.style.animation = `fall ${Math.random() * 1 + 1}s linear forwards`;
        document.body.appendChild(rose);
        setTimeout(() => rose.remove(), 4000);
    }, 50); // Faster rain

    setTimeout(() => clearInterval(interval), 3500);
  };

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-[0_0_60px_rgba(255,105,180,0.5)] border-4 border-pink-400 z-10 text-center relative overflow-visible animate-pop-in">
      <h2 className="text-4xl font-extrabold text-pink-600 mb-2 font-hand">One last check...</h2>
      <p className="text-gray-800 mb-8 font-bold text-xl">
        How much do you think I LOVE YOU?
      </p>

      {/* The Bar */}
      <div className={`relative w-full h-16 bg-gray-200 rounded-full border-4 border-pink-500 mb-8 overflow-visible shadow-inner ${isBroken ? 'animate-tilt-shake' : 'hover:scale-105 transition-transform'}`}>
         {/* Fill */}
        <div 
          className={`h-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full transition-all duration-100 flex items-center justify-end pr-4 ${isBroken ? 'w-full shadow-[0_0_40px_rgba(255,0,0,1)]' : ''}`}
          style={{ width: isBroken ? '100%' : `${(score / GOAL) * 100}%` }}
        >
          <span className="text-white font-black text-2xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            {isBroken ? "∞ INFINITE ∞" : `${Math.round((score / GOAL) * 100)}%`}
          </span>
        </div>
        
        {/* Broken Glass / Explosion Effect */}
        {isBroken && (
            <>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <span className="text-7xl animate-ping">💥</span>
              </div>
              
              {/* Added Explosion Rings */}
              {showExplosion && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                   <div className="absolute w-20 h-20 rounded-full border-4 border-red-500 animate-explode"></div>
                   <div className="absolute w-20 h-20 rounded-full border-4 border-pink-400 animate-explode" style={{animationDelay: '0.1s'}}></div>
                   <div className="absolute w-20 h-20 rounded-full border-4 border-yellow-400 animate-explode" style={{animationDelay: '0.2s'}}></div>
                </div>
              )}
            </>
        )}
      </div>

      <button
        onClick={handleClick}
        disabled={isBroken}
        className={`w-full py-6 rounded-2xl font-black text-2xl text-white shadow-2xl transition-all transform active:scale-95 ${isBroken ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 animate-heartbeat ring-4 ring-pink-300 ring-offset-2'}`}
      >
        {isBroken ? "LOVE OVERFLOWING! ❤️" : "Click to fill my love! 🌹"}
      </button>
    </div>
  );
};

export default MiniGame;