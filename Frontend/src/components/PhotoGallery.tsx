import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { assets } from '../assets/assets';

// Placeholder images if real ones aren't available
// In a real scenario, these would be specific award or event photos
const defaultImages = [
    { src: assets.certification, alt: "3 Star Certified Partner Award" },
    { src: assets.aboutus, alt: "Team at Work" },
    { src: assets.hero1, alt: "Office Event" },
    { src: assets.hero2, alt: "Annual Meet" },
    { src: assets.hero3, alt: "Award Ceremony" }
];

const PhotoGallery: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    // Auto-scroll
    useEffect(() => {
        if (!emblaApi) return;
        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 4000);
        return () => clearInterval(interval);
    }, [emblaApi]);

    return (
        <div className="py-20 bg-gray-50">
            <div className="max-w-[1200px] mx-auto px-5">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">Awards & Gallery</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Celebrating our achievements and life at Mittal Online Services.
                    </p>
                </div>

                <div className="relative group">
                    <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {defaultImages.map((img, index) => (
                                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 min-w-0">
                                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-100">
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                                            <p className="text-white font-medium text-sm md:text-base">{img.alt}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-primary w-12 h-12 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-primary hover:text-white lg:-left-6"
                    >
                        ←
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white text-primary w-12 h-12 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-primary hover:text-white lg:-right-6"
                    >
                        →
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {defaultImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${selectedIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoGallery;
