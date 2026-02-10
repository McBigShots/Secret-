import React, { useState } from 'react';

interface ProposalProps {
  onAccept: () => void;
}

const Proposal: React.FC<ProposalProps> = ({ onAccept }) => {
  const [yesScale, setYesScale] = useState(1);
  const [noCount, setNoCount] = useState(0);

  const noPhrases = [
    "No 😢",
    "Are you sure?",
    "Think of the Majbus!",
    "Really?",
    "But I love you!",
    "Last chance!"
  ];

  const handleNoClick = () => {
    if (noCount >= 4) return;

    setYesScale(prev => prev + 0.2); // Reduced growth rate so it doesn't cover the No button too quickly
    setNoCount(prev => prev + 1);
  };

  const getNoText = () => {
    return noPhrases[Math.min(noCount, noPhrases.length - 1)];
  };

  return (
    <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_0_100px_rgba(255,20,147,0.6)] border-8 border-pink-300 flex flex-col items-center text-center min-h-[500px] justify-center animate-pop-in overflow-hidden">
      
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 mb-12 font-hand leading-tight animate-rainbow relative z-10 pointer-events-none">
        Baru, my love... <br/>
        Will you be my Valentine?
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full relative z-20">
        <button
          onClick={onAccept}
          style={{ transform: `scale(${yesScale})` }}
          className="px-12 py-6 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full font-black text-3xl shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-all duration-200 z-30 whitespace-nowrap animate-heartbeat hover:shadow-[0_0_60px_rgba(255,0,0,0.9)] ring-4 ring-offset-4 ring-pink-500 animate-pulse"
        >
          YES! ❤️
        </button>

        {noCount < 4 ? (
            <button
            onClick={handleNoClick}
            className="px-8 py-4 bg-gray-200 text-gray-600 rounded-full font-bold text-lg hover:bg-gray-300 transition-all shadow-lg active:scale-90 relative z-50"
            >
            {getNoText()}
            </button>
        ) : (
            <div className="absolute bottom-10 animate-pop-in bg-gray-800 text-white px-6 py-3 rounded-full font-bold text-xl shadow-xl z-50 whitespace-nowrap">
                That's it! I am hiding this box 😤
            </div>
        )}
      </div>
    </div>
  );
};

export default Proposal;