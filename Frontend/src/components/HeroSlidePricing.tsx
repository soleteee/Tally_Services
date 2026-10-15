import React from 'react';
import { assets } from '../assets/assets';
import HeroBackdrop from './HeroBackdrop';

interface HeroSlidePricingProps {
  isActive: boolean;
  buyNowHref?: string;
}

export const HeroSlidePricing: React.FC<HeroSlidePricingProps> = ({
  isActive,
  buyNowHref = '/products/prime-silver',
}) => {
  return (
    <div className="relative w-full h-full min-h-[535px] md:min-h-full overflow-hidden bg-[#FFF9E3] select-none font-sans">
      <HeroBackdrop />

      {/* Slide Content */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:pl-[5%] lg:pr-12 pt-6 pb-10 md:py-0">
        {/* Left Content */}
        <div className="w-full md:max-w-[720px] flex flex-col items-start justify-center flex-shrink-0">
          {/* Headline - 3 lines */}
          <h2
            className={`font-extrabold tracking-tight leading-[1.08] text-[34px] sm:text-[46px] md:text-[54px] lg:text-[64px] text-[#202124] transition-all duration-700 ease-out ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span>Everything your</span>
            <br />
            <span>business needs.</span>
            <br />
            <span className="text-[#0B6BA8]">All in TallyPrime.</span>
          </h2>

          {/* Subtext */}
          <p
            style={{ transitionDelay: '150ms' }}
            className={`mt-4 sm:mt-5 text-[#333333] font-light text-[17px] sm:text-[22px] md:text-[26px] lg:text-[28px] leading-[1.4] max-w-[640px] transition-all duration-700 ease-out ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            From billing to inventory to GST, manage it all with plans starting at{' '}
            <strong className="font-semibold text-[#111111]">₹750/month</strong>.
          </p>

          {/* Buy Now Button */}
          <div
            style={{ transitionDelay: '300ms' }}
            className={`mt-6 sm:mt-8 w-full sm:w-auto transition-all duration-600 ease-out ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <a
              href={buyNowHref}
              className="group inline-flex items-center justify-center gap-2 bg-[#F9A61A] text-[#111111] font-semibold text-[15px] sm:text-[16px] px-[22px] py-[13px] rounded-[4px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            >
              <span>Buy Now</span>
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

        {/* Right Side — Illustration / Laptop + Price Card */}
        <div
          className={`relative w-full md:w-[38%] lg:w-[35%] mt-8 md:mt-0 flex items-center justify-center transition-all duration-800 ease-out ${
            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative w-[85%] max-w-[340px] md:max-w-none md:w-full flex items-center justify-center animate-hero-float">
            <img
              src={assets.hero2}
              alt="TallyPrime laptop and business software"
              className="w-full h-auto object-contain max-h-[300px] md:max-h-[380px] lg:max-h-[420px] select-none pointer-events-none drop-shadow-md"
              loading="lazy"
            />

            {/* Price Card Overlay */}
            <div
              style={{
                transitionDelay: '300ms',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
              }}
              className={`absolute -bottom-4 -right-2 sm:-right-4 bg-white rounded-[10px] px-3.5 sm:px-4 py-3 sm:py-3.5 border border-gray-100/80 z-20 transition-all duration-600 ease-out ${
                isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
              }`}
            >
              <div className="text-[11px] sm:text-[13px] tracking-wide text-[#444444] font-medium uppercase">
                STARTER PLAN 1 MONTH
              </div>
              <div className="flex items-baseline gap-1 my-0.5">
                <span className="text-[26px] sm:text-[32px] md:text-[34px] font-extrabold text-[#111111] leading-none">
                  ₹750
                </span>
                <span className="text-[16px] sm:text-[20px] md:text-[22px] font-light text-[#555555]">
                  / month
                </span>
              </div>
              <div className="text-[11px] sm:text-[12px] md:text-[13px] text-[#666666] font-normal leading-tight">
                +18% GST Silver, single user
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlidePricing;
