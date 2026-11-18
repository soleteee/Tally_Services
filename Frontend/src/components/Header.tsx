import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import HeroSlideTally from './HeroSlideTally';
import HeroSlidePricing from './HeroSlidePricing';
import HeroSlideIra from './HeroSlideIra';

const Header: React.FC = () => {
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

    // Slides Configuration
    const slides = [
        {
            id: 1,
            isCustom: true,
            primaryLink: "/upgrade",
            secondaryLink: "/renew-tss"
        },
        {
            id: 2,
            isCustomPricing: true,
            primaryLink: "/products/prime-silver",
        },
        {
            id: 3,
            isCustomIra: true,
            primaryLink: "/tally-ira",
        },
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
                            ) : (
                                <HeroSlideIra
                                    isActive={selectedIndex === index}
                                    getAccessHref={slide.primaryLink}
                                />
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
