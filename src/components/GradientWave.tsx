import React from 'react';

export default function GradientWave() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 200"
        style={{ transform: 'translateY(-50%)' }}
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.8">
              <animate
                attributeName="stop-color"
                values="#4A90E2; #9B4DCA; #FF6B6B; #4A90E2"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#9B4DCA" stopOpacity="0.8">
              <animate
                attributeName="stop-color"
                values="#9B4DCA; #FF6B6B; #4A90E2; #9B4DCA"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[0, 1, 2].map((i) => (
          <path
            key={i}
            className="wave-path"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{
              animation: `wave ${6 + i}s ease-in-out infinite`,
              opacity: 1 - i * 0.2
            }}
            d={`M -100 ${80 + i * 20} C 400 ${40 + i * 20}, 800 ${120 + i * 20}, 1540 ${80 + i * 20}`}
          />
        ))}
      </svg>
    </div>
  );
}