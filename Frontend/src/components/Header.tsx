import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { assets } from '../assets/assets';

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
            image: assets.hero1,
            title: "Experience the Power",
            highlight: "TallyPrime 7.1",
            subtitle: "",
            features: [
                "- Invoices That Reflect The Professional You",
                "- AI Powered Document Processing With TallyIra",
                "- Connected Payments With ICICI Bank",
                "- Smart Schedule III Support"
            ],
            primaryBtn: "Upgrade Now",
            primaryLink: "/upgrade",
            secondaryBtn: "Learn More",
            secondaryLink: "/products/prime-gold"
        },
        {
            id: 2,
            image: assets.hero2,
            title: "Uninterrupted Growth with",
            highlight: "Tally Software Services (TSS)",
            features: [
                "Renew before expiry and get 1 month free",
                "Always stay updated with latest releases",
                "Priority support from certified experts",
                "Access connected business features anytime"
            ],
            primaryBtn: "Renew TSS",
            primaryLink: "/renew-tss",
            secondaryBtn: "Contact Us",
            secondaryLink: "/contact"
        },
        {
            id: 3,
            image: assets.hero3,
            title: "Access Tally Anywhere with",
            highlight: "Tally on Cloud",
            features: [
                "Access data securely from anywhere, anytime",
                "Scale users and storage as your business grows",
                "Run TallyPrime on any device with ease",
                "Automatic backup and high uptime reliability"
            ],
            primaryBtn: "Start Free Trial",
            primaryLink: "/services/cloud",
            secondaryBtn: "View Features",
            secondaryLink: "/services/cloud"
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
        <header className="relative w-full min-h-[calc(80vh+40px)] md:h-[calc(125vh-180px)] lg:h-[calc(115vh-180px)] overflow-hidden bg-blue-50">
            {/* Carousel viewport */}
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="relative flex-[0_0_100%] h-full">
                            {/* Slide Container (Split Layout) */}
                            <div className="w-full h-full flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-10 lg:px-16 pt-5 md:pt-0 pb-3 md:pb-0 bg-gradient-to-r from-blue-50 to-blue-200">

                                {/* Left Content (Text) */}
                                <div className={`flex-1 max-w-[650px] text-gray-900 transition-all duration-700 transform ${selectedIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-4 text-gray-900">
                                        {slide.title} <br />
                                        <span className="text-primary">{slide.highlight}</span>
                                    </h1>

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
                                        className="h-[330px] md:h-[480px] lg:h-[420px] w-full max-w-[780px] md:max-w-[870px] lg:max-w-[640px] object-contain drop-shadow-2xl transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 gap-[14px] z-20">
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
