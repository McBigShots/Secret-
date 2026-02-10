import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; animationDuration: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((current) => {
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 100 + '%',
          animationDuration: Math.random() * 3 + 4 + 's',
        };
        // Keep array size manageable
        return [...current.slice(-15), newHeart];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 text-red-300 opacity-40 animate-float text-4xl"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;