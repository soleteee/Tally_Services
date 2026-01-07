import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar: React.FC = () => {
    const location = useLocation();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const handleMouseEnter = (menu: string) => {
        setActiveDropdown(menu);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <nav className={`fixed top-0 z-[1000] w-full border-b transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-white/30' : 'bg-transparent border-white/10'
            }`}>
            <div className="max-w-[1200px] mx-auto px-4 py-2 flex justify-between items-center">
                <Link to="/" className={`text-3xl font-bold flex items-center transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}>
                    <img src={assets.logoMOS} alt="Logo" className="h-[50px] w-auto" />
                </Link>
                <ul className="flex gap-8 text-lg">
                    <li className="relative cursor-pointer">
                        <Link to="/" className={`font-medium py-2.5 relative transition-colors duration-300 block ${scrolled || location.pathname !== '/' ? 'text-text hover:text-[#c8c81c]' : 'text-white hover:text-[#FCAF1B]'
                            }`}>Home</Link>
                    </li>

                    <li className="relative cursor-pointer">
                        <Link to="/about" className={`font-medium py-2.5 relative transition-colors duration-300 block ${scrolled || location.pathname !== '/' ? 'text-text hover:text-[#c8c81c]' : 'text-white hover:text-[#FCAF1B]'
                            }`}>About Us</Link>
                    </li>

                    <li
                        className="relative cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('products')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className={`font-medium py-2.5 relative transition-colors duration-300 block ${scrolled || location.pathname !== '/' ? 'text-text hover:text-[#c8c81c]' : 'text-white hover:text-[#FCAF1B]'
                            }`}>Products <span className="font-secondary">&</span> Services</span>
                        {activeDropdown === 'products' && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-2xl rounded-lg p-6 z-[1001] animate-fadeIn border-t-4 border-primary">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-primary mb-3 border-b pb-1">Products</h3>
                                        <Link to="/products" className="block mb-2 text-sm text-secondary hover:underline">View All Products →</Link>
                                        <ul className="space-y-2 text-sm text-text/80">
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
                                        <ul className="space-y-2 text-sm text-text/80">
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

                    <li className="relative cursor-pointer">
                        <Link to="/resources" className={`font-medium py-2.5 relative transition-colors duration-300 block ${scrolled || location.pathname !== '/' ? 'text-text hover:text-[#c8c81c]' : 'text-white hover:text-[#FCAF1B]'
                            }`}>Resources</Link>
                    </li>

                    <li className="relative cursor-pointer">
                        <Link to="/testimonials" className={`font-medium py-2.5 relative transition-colors duration-300 block ${scrolled || location.pathname !== '/' ? 'text-text hover:text-[#c8c81c]' : 'text-white hover:text-[#FCAF1B]'
                            }`}>Testimonials</Link>
                    </li>

                    <li className="relative cursor-pointer">
                        <Link to="/contact" className={`font-medium py-2.5 relative transition-colors duration-300 block ${scrolled || location.pathname !== '/' ? 'text-text hover:text-[#c8c81c]' : 'text-white hover:text-[#FCAF1B]'
                            }`}>Contact Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
