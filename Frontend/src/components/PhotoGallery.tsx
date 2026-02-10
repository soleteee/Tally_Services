import React, { useEffect, useState } from 'react';
import { galleryImages } from '../assets/assets';

// --- Types ---
type BentoItemProps = {
    children: React.ReactNode;
    className?: string;
    title?: string; // Optional title for accessibility/debugging
};

type ImageTileProps = {
    images: string[];
    interval?: number;
};

// --- Components ---

const BentoItem: React.FC<BentoItemProps> = ({ children, className = "", title }) => {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white ${className}`}
            title={title}
        >
            <div className="w-full h-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

const ImageTile: React.FC<ImageTileProps> = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        // Ensure we have valid images
        if (!images || images.length <= 1) return;

        const timer = setInterval(() => {
            setIsTransitioning(true);

            // Wait for fade out to complete
            setTimeout(() => {
                // Update indices to next set
                setCurrentIndex((prev) => (prev + 1) % images.length);

                // Disable transitions to snap back to opacity-100 instantly
                setIsResetting(true);
                setIsTransitioning(false);

                // Re-enable transitions after a brief tick
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        setIsResetting(false);
                    }, 50);
                });
            }, 1000); // Transition duration
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);

    // Safety check if no images
    if (!images || images.length === 0) return null;

    const currentImage = images[currentIndex];
    const nextImage = images[(currentIndex + 1) % images.length];

    return (
        <div className="relative w-full h-full group bg-white flex items-center justify-center">
            {/* Current Image (Top Layer) */}
            <img
                src={currentImage}
                alt="Gallery"
                className={`absolute w-full h-full object-contain z-10 
                    ${isResetting ? 'transition-none' : 'transition-opacity duration-1000'}
                    ${isTransitioning ? 'opacity-0' : 'opacity-100'}
                `}
            />

            {/* Next Image (Bottom Layer) */}
            <img
                src={nextImage}
                alt="Gallery Next"
                className={`absolute w-full h-full object-contain z-0`}
            />

            {/* Hover Effects (Overlay on top of everything) */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

            <style>{`
                /* Removed zoom effect on images since object-contain makes it look weird on the container background */
                .group:hover .bg-black {
                    /* Optional: slight lighten of bg on hover? */
                }
                img {
                    transition: opacity 1s;
                }
                /* Override opacity transition when resetting */
                .transition-none {
                    transition: none !important;
                }
            `}</style>
        </div>
    );
};

const VideoTile: React.FC = () => {
    return (
        <div className="relative w-full h-full group overflow-hidden bg-black">
            {/* <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            >
                 Video asset removed to fix git size issue - uncomment when optimized video is available
                <source src={assets.galleryVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white/50 font-bold text-xl">
                Video Coming Soon
            </div>
            {/* Overlay for polish */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
    );
};

// --- Main PhotoGallery Component ---

const PhotoGallery: React.FC = () => {
    // Distribute images for variety using Round Robin to ensure even distribution
    // structure to hold images for each tile key
    const distributedImages = {
        salmon: [] as string[],
        broccoli: [] as string[],
        tamago: [] as string[],
        pork: [] as string[],
        edamame: [] as string[],
        tofu: [] as string[],
    };

    const keys = Object.keys(distributedImages) as Array<keyof typeof distributedImages>;

    if (galleryImages && galleryImages.length > 0) {
        galleryImages.forEach((img, index) => {
            const key = keys[index % keys.length];
            distributedImages[key].push(img);
        });
    }

    return (
        <section className="h-screen w-full bg-white flex flex-col items-center justify-center px-4 lg:px-8 py-8 md:py-16 font-['M_PLUS_2',sans-serif] overflow-hidden">
            <h1 className="text-4xl md:text-5xl text-primary mb-8 font-bold relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:bg-accent after:mt-2 after:mx-auto tracking-tight">Gallery</h1>

            <div className="w-full max-w-[1400px] flex-grow min-h-0">
                {/* 
                  Grid Layout: 4 columns x 4 rows
                  h-full ensures it fills the remaining space defined by flex-grow
                */}
                <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-8 md:grid-rows-4 gap-3 md:gap-4 w-full h-full">

                    {/* Salmon: 1x2 */}
                    <BentoItem className="col-span-1 row-span-1 md:row-span-2 order-1 mx-5">
                        <ImageTile images={distributedImages.salmon} interval={3500} />
                    </BentoItem>

                    {/* Broccoli: 1x2 */}
                    <BentoItem className="col-span-1 row-span-1 md:row-span-2 order-2 mx-5">
                        <ImageTile images={distributedImages.broccoli} interval={4000} />
                    </BentoItem>

                    {/* Tamago: 1x2 */}
                    <BentoItem className="col-span-1 row-span-1 md:row-span-2 order-3 mx-5">
                        <ImageTile images={distributedImages.tamago} interval={3200} />
                    </BentoItem>

                    {/* Pork: 1x2 */}
                    <BentoItem className="col-span-1 row-span-1 md:row-span-2 order-4 mx-5">
                        <ImageTile images={distributedImages.pork} interval={4500} />
                    </BentoItem>

                    {/* Row 2/3 items for desktop */}

                    {/* Edamame: 1x2 */}
                    <BentoItem className="col-span-1 row-span-1 md:row-span-2 order-5 mx-5">
                        <ImageTile images={distributedImages.edamame} interval={3800} />
                    </BentoItem>

                    {/* Tomato (MAIN FEATURE): 2x2 */}
                    {/* 
                        Desktop: col-span-2 row-span-2 
                        Mobile: col-span-2 row-span-2 (dominant)
                    */}
                    <BentoItem className="col-span-2 row-span-2 order-6 border-4 border-white/50">
                        <VideoTile />
                    </BentoItem>

                    {/* Tofu: 1x2 */}
                    <BentoItem className="col-span-1 row-span-1 md:row-span-2 order-7 mx-5">
                        <ImageTile images={distributedImages.tofu} interval={4200} />
                    </BentoItem>
                </div>
            </div>
        </section>
    );
};

export default PhotoGallery;
