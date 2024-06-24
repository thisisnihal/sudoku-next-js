// src/Confetti.js

import React, { useEffect, useState } from 'react';
import './Confetti.css';

const Confetti = () => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const confettiPieces = [];
    for (let i = 0; i < 100; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const translateX = (left - 50) * 10; // Adjust multiplier for desired explosion spread
      const translateY = (top - 50) * 10; // Adjust multiplier for desired explosion spread
      confettiPieces.push({
        id: i,
        left,
        top,
        translateX,
        translateY,
        size: Math.random() * 10 + 5,
        delay: Math.random() * 2,
        backgroundColor: getRandomColor(),
      });
    }
    setPieces(confettiPieces);
  }, []);

  const getRandomColor = () => {
    const colors = ['#FFC700', '#FF0000', '#2E3192', '#41BBC7', '#FFF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="confetti-container">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.backgroundColor,
            animationDelay: `${piece.delay}s`,
            '--translateX': `${piece.translateX}px`,
            '--translateY': `${piece.translateY}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
