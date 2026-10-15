import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { assets } from '../assets/assets';
import HeroSlideTally from './HeroSlideTally';
import HeroSlidePricing from './HeroSlidePricing';
import HeroSlideIra from './HeroSlideIra';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 10000 })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);



    // Placeholder Slides Configuration
    const slides = [
        {
            id: 1,
            isCustom: true,
            title: "",
            highlight: "",
            features: [] as string[],
            primaryBtn: "Upgrade Now",
            primaryLink: "/upgrade",
            secondaryBtn: "Renew TSS",
            secondaryLink: "/renew-tss"
        },
        {
            id: 2,
            isCustomPricing: true,
            title: "",
            highlight: "",
            features: [] as string[],
            primaryBtn: "Buy Now",
            primaryLink: "/products/prime-silver",
            secondaryBtn: "Contact Us",
            secondaryLink: "/contact"
        },
        {
            id: 3,
            isCustomIra: true,
            title: "",
            highlight: "",
            features: [] as string[],
            primaryBtn: "Get Early Access",
            primaryLink: "/tally-ira",
            secondaryBtn: "Contact Us",
            secondaryLink: "/contact"
        },
        {
            id: 4,
            image: assets.hero4,
            title: "A New IRA Of",
            highlight: "Thoughtful Intelligence",
            features: [
                "Save up to 80% of the time spent on manual data entry with TallyIra and modernise your business."
            ],
            primaryBtn: "Know About IRA",
            primaryLink: "/tally-ira",
            secondaryBtn: "Contact Us",
            secondaryLink: "/contact"
        }
    ];

    return (
        <header className="relative w-full min-h-[535px] md:h-[555px] lg:h-[585px] overflow-hidden bg-blue-50">
            {/* Carousel viewport */}
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="relative flex-[0_0_100%] h-full">
                            {slide.isCustom ? (
                                <HeroSlideTally
                                    isActive={selectedIndex === index}
                                    upgradeHref={slide.primaryLink}
                                    renewTssHref={slide.secondaryLink}
                                />
                            ) : slide.isCustomPricing ? (
                                <HeroSlidePricing
                                    isActive={selectedIndex === index}
                                    buyNowHref={slide.primaryLink}
                                />
                            ) : slide.isCustomIra ? (
                                <HeroSlideIra
                                    isActive={selectedIndex === index}
                                    getAccessHref={slide.primaryLink}
                                />
                            ) : (
                                /* Slide Container (Split Layout) */
                                <div className="w-full h-full flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-10 lg:px-16 pt-5 md:pt-0 pb-3 md:pb-0 bg-gradient-to-r from-blue-50 to-blue-200">

                                    {/* Left Content (Text) */}
                                    <div className={`flex-1 max-w-[650px] text-gray-900 transition-all duration-700 transform ${selectedIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-4 text-gray-900">
                                        {slide.title} <br />
                                        <span className="text-primary">{slide.highlight}</span>
                                    </h2>

                                    <ul className="text-sm md:text-base lg:text-lg text-gray-700 mb-6 md:mb-8 max-w-[600px] space-y-1.5 md:space-y-2 list-none min-h-[112px] md:min-h-[140px]">
                                        {slide.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-wrap gap-3 md:gap-4">
                                        <button
                                            onClick={() => navigate(slide.primaryLink)}
                                            className="px-6 md:px-8 py-2.5 md:py-3 bg-primary text-white font-semibold rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-lg border-2 border-primary"
                                        >
                                            {slide.primaryBtn}
                                        </button>
                                        <button
                                            onClick={() => navigate(slide.secondaryLink)}
                                            className="px-6 md:px-8 py-2.5 md:py-3 bg-yellow-400 border-2 border-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 shadow-md"
                                        >
                                            {slide.secondaryBtn}
                                        </button>
                                    </div>

                                    {/* Mobile dots: placed right under buttons with 2px gap */}
                                    <div className="mt-[2px] flex md:hidden w-full justify-center gap-[14px]">
                                        {slides.map((_, dotIndex) => (
                                            <button
                                                key={`mobile-dot-${dotIndex}`}
                                                onClick={() => emblaApi && emblaApi.scrollTo(dotIndex)}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === dotIndex ? 'bg-primary w-8' : 'bg-gray-400 hover:bg-primary'
                                                    }`}
                                                aria-label={`Go to slide ${dotIndex + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Right Content (Image) */}
                                <div className={`flex-1 h-full flex items-center justify-center transition-all duration-1000 transform ${selectedIndex === index ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-10 opacity-0 scale-95'}`}>
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        fetchPriority={index === 0 ? 'high' : 'auto'}
                                        className="h-[280px] md:h-[380px] lg:h-[390px] w-full max-w-[780px] md:max-w-[870px] lg:max-w-[640px] object-contain drop-shadow-2xl transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="hidden md:flex absolute bottom-5 left-1/2 transform -translate-x-1/2 gap-[14px] z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index ? 'bg-primary w-8' : 'bg-gray-400 hover:bg-primary'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </header>
    );
};

export default Header;
