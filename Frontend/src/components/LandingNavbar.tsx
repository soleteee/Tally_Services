import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const LandingNavbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (menu: string) => {
        setActiveDropdown(menu);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    // Text colors based on scroll state
    const textColorClass = scrolled ? 'text-gray-800' : 'text-white';
    const hoverColorClass = scrolled ? 'hover:text-primary' : 'hover:text-[#FCAF1B]';

    return (
        <nav className={`fixed top-0 z-[1000] w-full transition-all duration-300 font-sans ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-black/40 backdrop-blur-sm py-4'
            }`}>
            <div className="max-w-[1400px] mx-auto px-4 lg:px-6 flex justify-between items-center">

                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <img src={assets.logoMOS} alt="Mittal Online Services" className="h-12 lg:h-16 w-auto object-contain" />
                    </Link>
                    <Link to="/" className={`text-xl lg:text-2xl font-bold tracking-wide uppercase ${textColorClass}`}>
                        Mittal Online Services
                    </Link>
                </div>

                {/* Navigation Menu */}
                <ul className={`hidden lg:flex items-center gap-8 text-base font-medium ${textColorClass}`}>
                    <li>
                        <Link to="/" className={`transition-colors duration-300 ${hoverColorClass}`}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className={`transition-colors duration-300 ${hoverColorClass}`}>About Us</Link>
                    </li>
                    <li
                        className="relative cursor-pointer group h-full flex items-center"
                        onMouseEnter={() => handleMouseEnter('products')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className={`flex items-center gap-1 transition-colors duration-300 ${hoverColorClass}`}>
                            Products <span className="font-secondary">&</span> Services
                        </span>

                        {/* Dropdown Menu */}
                        {activeDropdown === 'products' && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white text-gray-800 shadow-2xl rounded-lg p-6 z-[1001] animate-fadeIn border-t-4 border-primary mt-4">
                                <div className="grid grid-cols-2 gap-8 text-left">
                                    <div>
                                        <h3 className="text-lg font-bold text-primary mb-3 border-b pb-1">Products</h3>
                                        <Link to="/products" className="block mb-2 text-sm text-secondary hover:underline">View All Products →</Link>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li><Link to="/products/prime-silver" className="hover:text-primary transition-colors">TallyPrime Silver</Link></li>
                                            <li><Link to="/products/prime-gold" className="hover:text-primary transition-colors">TallyPrime Gold</Link></li>
                                            <li><Link to="/products/server" className="hover:text-primary transition-colors">TallyPrime Server</Link></li>
                                            <li><Link to="/products/shoper-gold" className="hover:text-primary transition-colors">Shoper 9</Link></li>
                                            <li><Link to="/services/cloud" className="hover:text-primary transition-colors">Tally on Cloud</Link></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-primary mb-3 border-b pb-1">Services</h3>
                                        <Link to="/services" className="block mb-2 text-sm text-secondary hover:underline">View All Services →</Link>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li><Link to="/services/tss" className="hover:text-primary transition-colors">Tally Software Services</Link></li>
                                            <li><Link to="/solutions/customization" className="hover:text-primary transition-colors">Customization</Link></li>
                                            <li><Link to="/services/consultancy" className="hover:text-primary transition-colors">Consultancy & Support</Link></li>
                                            <li><Link to="/solutions/ai" className="hover:text-primary transition-colors">Tally With AI</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                    <li>
                        <Link to="/resources" className={`transition-colors duration-300 ${hoverColorClass}`}>Resources</Link>
                    </li>
                    <li>
                        <Link to="/testimonials" className={`transition-colors duration-300 ${hoverColorClass}`}>Testimonials</Link>
                    </li>
                    <li>
                        <Link to="/contact" className={`transition-colors duration-300 ${hoverColorClass}`}>Contact Us</Link>
                    </li>
                </ul>

                {/* Visit Main Website Button */}
                <div className="hidden lg:block">
                    <button
                        onClick={() => navigate('/')}
                        className={`px-6 py-2 rounded-full border-2 font-semibold transition-all duration-300 ${scrolled ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-white text-white hover:bg-white hover:text-primary'}`}
                    >
                        Visit Main Website
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavbar;
