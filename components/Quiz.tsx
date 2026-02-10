import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';

interface QuizProps {
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    // Check for secret answer logic
    if (currentQuestion.secretAnswer && option !== currentQuestion.secretAnswer) {
      // If they click a normal option on the secret question, reveal the secret
      setShowSecret(true);
      return;
    }

    if (option === currentQuestion.correctAnswer) {
      setError('');
      setShowSecret(false); // Reset for next q
      setMistakeCount(0); // Reset mistake count for the new question
      if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        onComplete();
      }
    } else {
      const newMistakeCount = mistakeCount + 1;
      setMistakeCount(newMistakeCount);

      // Generate the growing "Niga" string
      const growingNiga = `Nigaa${'a'.repeat(newMistakeCount * 3)}!`;

      // Pool of possible error messages including the dynamic one
      const errorPhrases = [
        growingNiga,
        "Niggaaa whatttt?",
        "Tf niggaaaa!",
        "Shrmuta get it right!",
        "Batkeha 🤨"
      ];

      const randomError = errorPhrases[Math.floor(Math.random() * errorPhrases.length)];
      
      setError(randomError);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-pink-300 z-10 animate-pop-in">
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-right text-sm font-bold text-pink-600 mt-2">
          Question {currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length}
        </p>
      </div>

      <h3 className="text-3xl font-extrabold text-gray-800 mb-4 font-hand text-center">
        {currentQuestion.question}
      </h3>
      
      {currentQuestion.contextNote && (
        <p className="text-center text-pink-600 text-lg mb-6 font-bold italic animate-pulse">
          {currentQuestion.contextNote}
        </p>
      )}

      <div className="space-y-4 mt-6">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            style={{ animationDelay: `${idx * 100}ms` }}
            className="w-full p-5 text-left rounded-2xl border-4 border-pink-200 hover:border-pink-500 hover:bg-pink-100 transition-all text-gray-800 font-bold text-lg active:scale-95 bg-white shadow-md animate-pop-in"
          >
            {option}
          </button>
        ))}

        {showSecret && currentQuestion.secretAnswer && (
           <button
             onClick={() => handleAnswer(currentQuestion.secretAnswer!)}
             className="w-full p-5 text-center rounded-2xl border-4 border-yellow-400 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-extrabold text-2xl animate-heartbeat shadow-[0_0_20px_rgba(255,215,0,0.6)] transform hover:scale-105"
           >
             ✨ {currentQuestion.secretAnswer} ✨
           </button>
        )}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-100 rounded-xl border-4 border-red-500 animate-tilt-shake shadow-xl">
            <p key={error} className="text-center text-red-600 font-black text-2xl uppercase tracking-widest">
            {error}
            </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;