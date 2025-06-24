import React from 'react';

const Sparkles = ({ count = 30 }) => {
  const sparkles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1, // Smaller (1-5px)
      posX: Math.random() * 100,
      posY: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }));
  }, [count]);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ contentVisibility: 'auto' }}
      aria-hidden="true"
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-white animate-sparkle will-change-transform"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            left: `${sparkle.posX}%`,
            top: `${sparkle.posY}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            boxShadow: '0 0 15px 3px rgba(255, 255, 255, 0.95)',
            opacity: 0,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            filter: 'brightness(1.5)'
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(Sparkles);
