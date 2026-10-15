import React from 'react';
import { assets } from '../assets/assets';
import HeroBackdrop from './HeroBackdrop';

interface HeroSlideIraProps {
  isActive: boolean;
  getAccessHref?: string;
}

export const HeroSlideIra: React.FC<HeroSlideIraProps> = ({
  isActive,
  getAccessHref = '/tally-ira',
}) => {
  return (
    <div className="relative w-full h-full min-h-[535px] md:min-h-full overflow-hidden bg-[#FFF9E3] select-none font-sans">
      <HeroBackdrop />

      {/* Slide Content */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:pl-[2.5%] lg:pr-10 pt-6 pb-10 md:py-0">
        {/* Left Content */}
        <div className="w-full md:max-w-[760px] flex flex-col items-start justify-center flex-shrink-0">
          {/* Eyebrow with extending horizontal rule */}
          <div
            className={`w-full flex items-center gap-3 transition-all duration-700 ease-out ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span className="text-[16px] sm:text-[19px] md:text-[22px] font-semibold text-[#202124] tracking-wider uppercase whitespace-nowrap">
              A NEW IRA OF
            </span>
            <div className="h-[1px] bg-[#C9C9C9] flex-grow max-w-[500px]" />
          </div>

          {/* Headline - 2 lines with DM Serif Display */}
          <div
            style={{ transitionDelay: '120ms' }}
            className={`w-full mt-1.5 sm:mt-2 transition-all duration-700 ease-out ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <h2
              className="text-[40px] sm:text-[54px] md:text-[64px] lg:text-[72px] font-normal text-[#202124] leading-[1.04] tracking-tight"
              style={{ fontFamily: "'DM Serif Display', 'Noto Serif', serif" }}
            >
              <span>Thoughtful</span>
              <br />
              <span>Intelligence</span>
            </h2>

            {/* Bottom rule under headline */}
            <div className="h-[1px] bg-[#C9C9C9] w-full max-w-[620px] mt-2.5 sm:mt-3" />
          </div>

          {/* Subtext */}
          <p
            style={{ transitionDelay: '240ms' }}
            className={`mt-4 sm:mt-4.5 text-[#333333] font-light text-[17px] sm:text-[22px] md:text-[26px] lg:text-[28px] leading-[1.4] max-w-[760px] transition-all duration-700 ease-out ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {/* "Save up to 80%" on cyan brush-stroke highlight */}
            <span
              className="relative inline-block font-normal text-[#111111] px-2.5 py-0.5 mr-1"
              style={{
                background: '#4DD9F5',
                clipPath: 'polygon(1% 14%, 99% 4%, 98% 88%, 2% 96%)',
                borderRadius: '3px',
              }}
            >
              Save up to 80%
            </span>
            <span>of the time spent on manual data entry with TallyIra and modernise your business.</span>
          </p>

          {/* Get Early Access Button */}
          <div
            style={{ transitionDelay: '360ms' }}
            className={`mt-6 sm:mt-8 w-full sm:w-auto transition-all duration-600 ease-out ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <a
              href={getAccessHref}
              className="group inline-flex items-center justify-center gap-2 bg-[#F9A61A] text-[#111111] font-semibold text-[15px] sm:text-[16px] px-[22px] py-[13px] rounded-[4px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            >
              <span>Get Early Access</span>
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
          className={`w-full md:w-[40%] lg:w-[38%] mt-8 md:mt-0 flex items-center justify-center transition-all duration-800 ease-out ${
            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative w-[85%] max-w-[360px] md:max-w-none md:w-full flex items-center justify-center animate-hero-float">
            <img
              src={assets.iraImage}
              alt="TallyPrime on a laptop with Tally Ira on a phone"
              className="w-full h-auto object-contain max-h-[300px] md:max-h-[380px] lg:max-h-[420px] select-none pointer-events-none drop-shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideIra;
