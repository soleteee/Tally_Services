import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { assets } from '../assets/assets';

const Navbar: React.FC = () => {
    const location = useLocation();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

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

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setMobileDropdownOpen(false);
    };

    return (
        <nav className={`fixed top-0 z-[1000] w-full border-b transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-white/30' : 'bg-transparent border-white/10'
            }`}>
            <div className="max-w-[1200px] mx-auto px-4 py-2 flex justify-between items-center">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`lg:hidden z-50 p-2 transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Logo - Center on mobile, left on desktop */}
                <Link to="/" className={`text-3xl font-bold flex items-center transition-colors duration-300 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 ${scrolled ? 'text-primary' : 'text-white'}`}>
                    <img src={assets.logoMOS} alt="Logo" className="h-[50px] w-auto" />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex gap-8 text-lg">
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

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-40 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="pt-20 px-6 overflow-y-auto h-full">
                        <ul className="space-y-1">
                            <li>
                                <Link to="/" onClick={closeMobileMenu} className="block py-3 px-4 text-text font-medium hover:bg-gray-100 rounded-lg transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" onClick={closeMobileMenu} className="block py-3 px-4 text-text font-medium hover:bg-gray-100 rounded-lg transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <div>
                                    <button
                                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                        className="w-full flex justify-between items-center py-3 px-4 text-text font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <span>Products & Services</span>
                                        <ChevronDown className={`transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                                    </button>
                                    {mobileDropdownOpen && (
                                        <div className="mt-2 ml-4 space-y-1 pb-2">
                                            <div className="mb-3">
                                                <h4 className="text-sm font-bold text-primary mb-2 px-4">Products</h4>
                                                <Link to="/products" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-secondary hover:bg-gray-50 rounded">View All →</Link>
                                                <Link to="/products/prime-silver" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-text/80 hover:bg-gray-50 rounded">TallyPrime Silver</Link>
                                                <Link to="/products/prime-gold" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-text/80 hover:bg-gray-50 rounded">TallyPrime Gold</Link>
                                                <Link to="/products/server" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-text/80 hover:bg-gray-50 rounded">TallyPrime Server</Link>
                                                <Link to="/products/shoper-gold" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-text/80 hover:bg-gray-50 rounded">Shoper 9</Link>
                                                <Link to="/services/cloud" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-text/80 hover:bg-gray-50 rounded">Tally on Cloud</Link>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-primary mb-2 px-4">Services</h4>
                                                <Link to="/services" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-secondary hover:bg-gray-50 rounded">View All →</Link>
                                                <Link to="/services/tss" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-text/80 hover:bg-gray-50 rounded">Tally Software Services</Link>
                                                <Link to="/solutions/customization" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-text/80 hover:bg-gray-50 rounded">Customization</Link>
                                                <Link to="/services/consultancy" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-text/80 hover:bg-gray-50 rounded">Consultancy & Support</Link>
                                                <Link to="/solutions/ai" onClick={closeMobileMenu} className="block py-2 px-4 text-sm text-text/80 hover:bg-gray-50 rounded">Tally With AI</Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </li>
                            <li>
                                <Link to="/resources" onClick={closeMobileMenu} className="block py-3 px-4 text-text font-medium hover:bg-gray-100 rounded-lg transition-colors">
                                    Resources
                                </Link>
                            </li>
                            <li>
                                <Link to="/testimonials" onClick={closeMobileMenu} className="block py-3 px-4 text-text font-medium hover:bg-gray-100 rounded-lg transition-colors">
                                    Testimonials
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" onClick={closeMobileMenu} className="block py-3 px-4 text-text font-medium hover:bg-gray-100 rounded-lg transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div
                        onClick={closeMobileMenu}
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    ></div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
