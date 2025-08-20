import React from 'react';

const AnimatedParticles = ({ count = 20 }) => (
  <div className="absolute inset-0">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-purple-500 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      />
    ))}
  </div>
);

export default AnimatedParticles;