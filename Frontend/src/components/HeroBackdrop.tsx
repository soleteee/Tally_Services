import React from 'react';

export const HeroBackdrop: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1700 742"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="swooshGradient" x1="0%" y1="100%" x2="100%" y2="20%">
          <stop offset="0%" stopColor="#FFF9E3" stopOpacity="0" />
          <stop offset="45%" stopColor="#FDE3A0" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FBB52D" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Light sky blue bottom-right area */}
      <path
        d="M 620 742 C 920 620 1280 430 1700 370 L 1700 742 L 620 742 Z"
        fill="#DDF1FB"
      />

      {/* Large curved swoosh band sweeping from bottom-left to top-right */}
      <path
        d="M -100 742 C 320 660 640 500 1020 310 C 1300 170 1520 120 1750 90 L 1750 380 C 1450 390 1180 500 780 660 C 580 740 400 742 -100 742 Z"
        fill="url(#swooshGradient)"
      />
    </svg>
  );
};

export default HeroBackdrop;
