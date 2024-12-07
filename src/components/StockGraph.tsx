import React from 'react';

export default function StockGraph() {
  return (
    <div className="relative w-full h-32 overflow-hidden -mx-8 px-8">
      <svg
        className="w-[130%] h-full -ml-[15%]"
        preserveAspectRatio="none"
        viewBox="0 0 1400 100"
      >
        <defs>
          <linearGradient id="stockLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="1">
              <animate
                attributeName="stop-color"
                values="#3B82F6; #2563EB; #3B82F6"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#2563EB" stopOpacity="1">
              <animate
                attributeName="stop-color"
                values="#2563EB; #3B82F6; #2563EB"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background bars */}
        {[...Array(16)].map((_, i) => (
          <rect
            key={`bar-${i}`}
            x={i * 90}
            y={100 - (i * 6 + 15)}
            width="60"
            height={i * 6 + 15}
            fill="url(#stockLine)"
            opacity="0.3"
            rx="2"
          >
            <animate
              attributeName="height"
              values={`${i * 6 + 15};${i * 6 + 20};${i * 6 + 15}`}
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
          </rect>
        ))}

        {/* Main trend line */}
        <path
          d="M0,80 Q350,70 700,50 T1400,20"
          fill="none"
          stroke="url(#stockLine)"
          strokeWidth="4"
          filter="url(#glow)"
          className="animate-draw"
        >
          <animate
            attributeName="d"
            values="
              M0,80 Q350,70 700,50 T1400,20;
              M0,70 Q350,60 700,40 T1400,10;
              M0,80 Q350,70 700,50 T1400,20
            "
            dur="4s"
            repeatCount="indefinite"
          />
        </path>

        {/* Glowing dots */}
        {[0, 350, 700, 1050, 1400].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={50}
            r="4"
            fill="#fff"
            className="animate-pulse"
            filter="url(#glow)"
          >
            <animate
              attributeName="cy"
              values={`${80 - i * 15};${70 - i * 15};${80 - i * 15}`}
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}