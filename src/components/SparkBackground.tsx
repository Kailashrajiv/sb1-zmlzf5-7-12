import React, { useEffect, useRef } from 'react';

export default function SparkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createSpark = () => {
      const spark = document.createElement('div');
      spark.className = 'spark';

      // Random starting position
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      spark.style.left = `${startX}px`;
      spark.style.top = `${startY}px`;

      // Random travel distance
      const travelX = (Math.random() - 0.5) * 200;
      const travelY = (Math.random() - 0.5) * 200;
      const rotation = Math.random() * 360;

      spark.style.setProperty('--travel-x', `${travelX}px`);
      spark.style.setProperty('--travel-y', `${travelY}px`);
      spark.style.setProperty('--rotation', `${rotation}deg`);

      // Animation properties
      spark.style.animation = `spark ${2 + Math.random() * 3}s ease-out forwards`;

      container.appendChild(spark);

      // Remove spark after animation
      spark.addEventListener('animationend', () => {
        spark.remove();
      });
    };

    // Create initial sparks
    for (let i = 0; i < 50; i++) {
      setTimeout(createSpark, Math.random() * 3000);
    }

    // Continuously create new sparks
    const interval = setInterval(() => {
      if (container.children.length < 50) {
        createSpark();
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-black overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}