import React from 'react';
import tallyPrimeLogo from '../assets/tallyprime logo.png';
import hero5 from '../assets/hero5.png';
import HeroBackdrop from './HeroBackdrop';

interface HeroSlideTallyProps {
  isActive: boolean;
  upgradeHref?: string;
  renewTssHref?: string;
}

const CHECKLIST_ITEMS = [
  { text: 'One-Click GSTR-9 Export', isNew: true },
  { text: 'Invoices and POs That Reflect the Professional You', isNew: true },
  { text: 'AI-Powered Document Processing With Tallyira', isNew: false },
  { text: 'Smart Schedule III Support', isNew: false },
];

export const HeroSlideTally: React.FC<HeroSlideTallyProps> = ({
  isActive,
  upgradeHref = '/upgrade',
  renewTssHref = '/renew-tss',
}) => {
  return (
    <div className="relative w-full h-full min-h-[535px] md:min-h-full overflow-hidden bg-[#FFF9E3] select-none font-sans">
      <HeroBackdrop />

      {/* Slide Content */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:pl-[4%] lg:pr-12 pt-6 pb-10 md:py-0">
        {/* Left Content Block */}
        <div className="w-full md:max-w-[560px] flex flex-col items-start justify-center flex-shrink-0">
          {/* Top Wordmark & Header Group */}
          <div
            className={`flex flex-col items-center self-start transition-all duration-700 ease-out ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {/* "Latest in" with subtle flanking rules */}
            <div className="flex items-center gap-2 text-[12px] sm:text-[13px] font-semibold text-[#222222] tracking-wider uppercase mb-0.5">
              <span className="w-4 h-[1.5px] bg-[#444444] inline-block" />
              <span>Latest in</span>
              <span className="w-4 h-[1.5px] bg-[#444444] inline-block" />
            </div>

            {/* Tally Prime Logo Wordmark */}
            <div className="my-0.5">
              <img
                src={tallyPrimeLogo}
                alt="Tally Prime"
                className="w-[95px] sm:w-[105px] h-auto object-contain"
                loading="eager"
              />
            </div>

            {/* "Thoughtfully built" with cyan brush-stroke marker swipe highlight */}
            <div className="relative mt-0.5 inline-block">
              <span
                className="relative z-10 block px-3 py-0.5 text-[24px] sm:text-[26px] md:text-[28px] font-extrabold text-[#111111] leading-tight"
                style={{
                  background: '#4DD9F5',
                  clipPath: 'polygon(1% 12%, 99% 4%, 97% 88%, 2% 96%)',
                  borderRadius: '3px',
                }}
              >
                Thoughtfully built
              </span>
            </div>
          </div>

          {/* Checklist */}
          <ul className="mt-4 sm:mt-5 flex flex-col gap-2 sm:gap-2.5 list-none p-0 m-0">
            {CHECKLIST_ITEMS.map((item, index) => (
              <li
                key={item.text}
                style={{
                  transitionDelay: `${160 + index * 80}ms`,
                }}
                className={`flex items-center gap-2.5 sm:gap-3 transition-all duration-500 ease-out ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                {/* Round Amber Check Icon */}
                <span className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] rounded-full bg-[#F9A61A] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg
                    className="w-3 h-3 text-[#222222] stroke-[3.2]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                {/* Text & optional NEW badge */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#222222] text-[14px] sm:text-[16px] md:text-[17px] font-normal leading-snug">
                  <span>{item.text}</span>
                  {item.isNew && (
                    <span
                      className="inline-flex items-center justify-center bg-[#E0475B] text-white text-[10px] sm:text-[11px] font-bold tracking-wider px-2 py-0.5 uppercase leading-none shadow-sm"
                      style={{
                        clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)',
                        paddingRight: '9px',
                      }}
                    >
                      NEW
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Two Action Buttons */}
          <div
            style={{
              transitionDelay: `${160 + CHECKLIST_ITEMS.length * 80}ms`,
            }}
            className={`mt-5 sm:mt-6 flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto transition-all duration-600 ease-out ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {/* Upgrade Now */}
            <a
              href={upgradeHref}
              className="group inline-flex items-center justify-center gap-2 bg-[#F9A61A] text-[#111111] font-semibold text-[14px] sm:text-[15px] px-[16px] py-[10px] sm:py-[11px] rounded-[4px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            >
              <span>Upgrade Now</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>

            {/* Renew TSS */}
            <a
              href={renewTssHref}
              className="group inline-flex items-center justify-center gap-2 bg-white text-[#111111] font-semibold text-[14px] sm:text-[15px] px-[16px] py-[10px] sm:py-[11px] rounded-[4px] border border-[#F9A61A] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            >
              <span>Renew TSS</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side — Illustration */}
        <div
          className={`w-full md:w-[38%] lg:w-[33%] mt-6 md:mt-0 flex items-center justify-center transition-all duration-800 ease-out ${
            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative w-[75%] max-w-[320px] md:max-w-none md:w-full flex items-center justify-center animate-hero-float">
            <img
              src={hero5}
              alt="Accountant working on a laptop at a desk"
              className="w-full h-auto object-contain max-h-[290px] md:max-h-[380px] lg:max-h-[400px] select-none pointer-events-none drop-shadow-md"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Floating subtle animation keyframes */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @media (prefers-reduced-motion: no-preference) {
          .animate-hero-float {
            animation: heroFloat 6s ease-in-out infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSlideTally;
