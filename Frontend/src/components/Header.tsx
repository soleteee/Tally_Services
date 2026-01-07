import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about-us');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className="relative h-[110vh] w-full flex items-center justify-end text-end p-0 -mt-[74px] pt-[74px] text-white overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${assets.homeHeader})` }}
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-white/20 to-primary animate-blue-white bg-[length:200%_200%] mix-blend-overlay opacity-80"></div>
            <div
                className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    backgroundPosition: `${mousePos.x / 20}px ${mousePos.y / 20}px`
                }}
            ></div>

            <div className={`relative z-10 max-w-[900px] mx-auto px-5 transition-all duration-1000 mr-[100px] ${isVisible ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-4xl md:text-6xl mb-4 font-semibold opacity-90 tracking-tight">
                    Tally, Cloud <span className="font-secondary">&</span> IT Solutions To Empower Your Business
                </h1>
                <h2 className="text-2xl md:text-3xl mb-12 font-normal">
                    <span className="font-extrabold text-accent text-5xl md:text-7xl block leading-[1.1] mt-4 drop-shadow-lg">Tally Services</span>
                </h2>
                <div className="flex flex-col sm:flex-row justify-end gap-5">
                    <button
                        onClick={scrollToAbout}
                        className="px-8 py-3.5 bg-primary text-white font-semibold rounded-lg text-lg transition-all duration-300 transform hover:bg-[#004494] hover:-translate-y-1 hover:shadow-lg border-2 border-primary"
                    >
                        Get Started
                    </button>
                    <button
                        onClick={() => navigate('/about')}
                        className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-lg text-lg transition-all duration-300 hover:bg-white hover:text-primary hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm"
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
