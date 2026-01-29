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
            highlight: "TallyPrime 7.0",
            subtitle: "",
            features: [
                "TallyDrive for Secure Cloud Backup",
                "Connected Payments with PrimeBanking",
                "Instant Discovery with SmartFind",
                "Automate Invoice-to-Payment with Bharat Connect for Business"
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
            subtitle: "Renew Anytime Before TSS Expiry and Get 1 Month Free TSS.",
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
            subtitle: "Secure, scalable, and flexible cloud solutions for 24/7 access to your TallyPrime data from any device, anywhere.",
            primaryBtn: "Start Free Trial",
            primaryLink: "/services/cloud",
            secondaryBtn: "View Features",
            secondaryLink: "/services/cloud"
        }
    ];

    return (
        <header className="relative w-full h-[calc(100vh-140px)] overflow-hidden bg-blue-50">
            {/* Carousel viewport */}
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="relative flex-[0_0_100%] h-full">
                            {/* Slide Container (Split Layout) */}
                            <div className="w-full h-full flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 bg-gradient-to-r from-blue-50 to-blue-200">

                                {/* Left Content (Text) */}
                                <div className={`flex-1 max-w-[650px] text-gray-900 transition-all duration-700 transform ${selectedIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-gray-900">
                                        {slide.title} <br />
                                        <span className="text-primary">{slide.highlight}</span>
                                    </h1>

                                    {slide.features ? (
                                        <ul className="text-lg text-gray-700 mb-8 max-w-[600px] space-y-2 list-none">
                                            {slide.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-[550px]">
                                            {slide.subtitle}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={() => navigate(slide.primaryLink)}
                                            className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-lg border-2 border-primary"
                                        >
                                            {slide.primaryBtn}
                                        </button>
                                        <button
                                            onClick={() => navigate(slide.secondaryLink)}
                                            className="px-8 py-3 bg-yellow-400 border-2 border-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 shadow-md"
                                        >
                                            {slide.secondaryBtn}
                                        </button>
                                    </div>
                                </div>

                                {/* Right Content (Image) */}
                                <div className={`flex-1 h-full flex items-center justify-center transition-all duration-1000 transform ${selectedIndex === index ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-10 opacity-0 scale-95'}`}>
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="max-h-[70%] max-w-full object-contain drop-shadow-2xl transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
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
