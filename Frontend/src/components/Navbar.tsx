import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt, FaBars, FaTimes, FaChevronDown, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { assets } from '../assets/assets';

const Navbar: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleMouseEnter = (menu: string) => {
        if (window.innerWidth >= 1024) {
            setActiveDropdown(menu);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 1024) {
            setActiveDropdown(null);
        }
    };

    // Mobile specific dropdown toggle
    const toggleMobileDropdown = (menu: string) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    return (
        <header className="w-full font-sans shadow-md z-[1000] sticky top-0 bg-white">

            {/* Top Bar (Information Bar) */}
            <div className="hidden lg:block bg-white text-gray-700 py-2 md:py-3 border-b border-gray-100">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 lg:gap-8 xl:gap-12">

                    {/* Left: Logo */}
                    <div className="flex items-center gap-3 md:gap-4 w-full lg:w-auto justify-between lg:justify-start">
                        <Link to="/" className="flex items-center gap-3">
                            <img src={assets.logoMOS} alt="Mittal Online Services" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
                            <img src={assets.certification} alt="Certification" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Right: Business Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-3 xl:gap-3 text-sm w-full lg:w-auto mt-2 lg:mt-2">
                        {/* Working Hours */}
                        <div className="flex items-start gap-2 min-w-0 ml-6">
                            <FaClock className="text-primary text-base md:text-lg mt-0.5 flex-shrink-0" />
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-gray-900">Mon – Sat</span>
                                <span className="text-xs text-gray-600 font-medium">10:00 AM – 6:00 PM</span>
                            </div>
                        </div>

                        {/* Phone Numbers */}
                        <div className="flex items-start gap-1 min-w-0">
                            <FaPhoneAlt className="text-primary text-base md:text-lg mt-0.5 flex-shrink-0" />
                            <div className="flex flex-col leading-tight min-w-0">
                                <span className="font-bold text-gray-900">Call Us</span>
                                <div className="flex flex-col gap-0.5">
                                    <a href="tel:+919997952180" className="text-xs text-gray-600 font-medium hover:text-primary transition-colors">+91 99979 52180</a>
                                    <a href="tel:+919997952142" className="text-xs text-gray-600 font-medium hover:text-primary transition-colors">+91 99979 52142</a>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-2 min-w-0">
                            <FaEnvelope className="text-primary text-base md:text-lg mt-0.5 flex-shrink-0" />
                            <div className="flex flex-col leading-tight min-w-0">
                                <span className="font-bold text-gray-900">Email Us</span>
                                <a href="mailto:mittalonlineservices@gmail.com" className="text-xs text-gray-600 hover:text-primary transition-colors font-medium break-all">mittalonlineservices@gmail.com</a>
                            </div>
                        </div>

                        {/* Office Address */}
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=B-4,+Ground+Floor,+Meerut+Mall,+Delhi+Road,+Meerut"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 min-w-0 max-w-full xl:max-w-[240px] cursor-pointer hover:text-primary transition-colors"
                        >
                            <FaMapMarkerAlt className="text-primary text-base md:text-lg mt-0.5 flex-shrink-0" />
                            <div className="flex flex-col leading-tight min-w-0">
                                <span className="font-bold text-gray-900">Location</span>
                                <span className="text-xs text-gray-600 leading-snug font-medium">B-4, Ground Floor, Meerut Mall, Delhi Road, Meerut</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar (Main Navigation) */}
            <div className="bg-primary text-white w-full">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
                    <div className="flex justify-between lg:justify-center items-center h-14 lg:h-12 relative flex-nowrap">

                        {/* Mobile Logo (Visible only on mobile) */}
                        <div className="lg:hidden flex items-center gap-2">
                            <img src={assets.logoMOS} alt="MOS" className="h-10 w-auto bg-white rounded p-1" />
                            <span className="font-bold text-lg">Mittal Online Services</span>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-white focus:outline-none p-2"
                            onClick={toggleMobileMenu}
                        >
                            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>

                        {/* Navigation Links (Desktop) */}
                        <ul className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 text-[12px] xl:text-[13px] 2xl:text-[15px] font-bold tracking-normal xl:tracking-wide h-full whitespace-nowrap">
                            <li><Link to="/" className={`h-full flex items-center whitespace-nowrap hover:text-accent transition-colors ${location.pathname === '/' ? 'text-accent' : ''}`}>Home</Link></li>
                            <li><Link to="/about" className={`h-full flex items-center whitespace-nowrap hover:text-accent transition-colors ${location.pathname === '/about' ? 'text-accent' : ''}`}>About Us</Link></li>

                            {/* Dropdown */}
                            <li
                                className="relative h-full flex items-center group cursor-pointer"
                                onMouseEnter={() => handleMouseEnter('products')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link to="/products" className={`flex items-center gap-1 whitespace-nowrap hover:text-accent transition-colors ${location.pathname.includes('/products') ? 'text-accent' : ''}`}>
                                    Products & Services <FaChevronDown size={10} className={`mt-0.5 transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                                </Link>

                                {activeDropdown === 'products' && (
                                    <div className="absolute top-full left-0 w-[600px] bg-white text-gray-800 shadow-xl rounded-b-lg border-t-4 border-accent p-6 z-50 animate-fadeIn">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <Link to="/products" className="text-lg font-bold text-primary mb-3 border-b pb-2 block hover:text-accent transition-colors">Products</Link>
                                                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                                                    <li><Link to="/products/prime-silver" className="hover:text-primary transition-colors block py-1">TallyPrime Silver</Link></li>
                                                    <li><Link to="/products/prime-gold" className="hover:text-primary transition-colors block py-1">TallyPrime Gold</Link></li>
                                                    <li><Link to="/products/server" className="hover:text-primary transition-colors block py-1">TallyPrime Server</Link></li>
                                                    <li><Link to="/products/shoper-gold" className="hover:text-primary transition-colors block py-1">Shoper 9</Link></li>
                                                </ul>
                                                <Link to="/products/more" className="text-sm font-semibold text-accent hover:underline">More Products &rarr;</Link>
                                            </div>
                                            <div>
                                                <Link to="/services" className="text-lg font-bold text-primary mb-3 border-b pb-2 block hover:text-accent transition-colors">Services</Link>
                                                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                                                    <li><Link to="/services/tss" className="hover:text-primary transition-colors block py-1">Tally Software Services</Link></li>
                                                    <li><Link to="/solutions/customization" className="hover:text-primary transition-colors block py-1">Customization</Link></li>
                                                    <li><Link to="/services/consultancy" className="hover:text-primary transition-colors block py-1">Consultancy & Support</Link></li>
                                                    <li><Link to="/solutions/ai" className="hover:text-primary transition-colors block py-1">Tally With AI</Link></li>
                                                </ul>
                                                <Link to="/services/more" className="text-sm font-semibold text-accent hover:underline">More Services &rarr;</Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>

                            <li><Link to="/resources" className={`h-full flex items-center whitespace-nowrap hover:text-accent transition-colors ${location.pathname === '/resources' ? 'text-accent' : ''}`}>Blogs</Link></li>
                            <li><Link to="/testimonials" className={`h-full flex items-center whitespace-nowrap hover:text-accent transition-colors ${location.pathname === '/testimonials' ? 'text-accent' : ''}`}>Testimonials</Link></li>
                            <li><Link to="/clients" className={`h-full flex items-center whitespace-nowrap hover:text-accent transition-colors ${location.pathname === '/clients' ? 'text-accent' : ''}`}>Clients</Link></li>
                            <li><Link to="/careers" className={`h-full flex items-center whitespace-nowrap hover:text-accent transition-colors ${location.pathname === '/careers' ? 'text-accent' : ''}`}>Careers</Link></li>
                            <li><Link to="/online-payment" className={`h-full flex items-center whitespace-nowrap hover:text-accent transition-colors ${location.pathname === '/online-payment' ? 'text-accent' : ''}`}>Pay Online</Link></li>
                            <li><Link to="/contact" className={`h-full flex items-center whitespace-nowrap hover:text-accent transition-colors ${location.pathname === '/contact' ? 'text-accent' : ''}`}>Contact Us</Link></li>
                        </ul>

                        {/* WhatsApp Button */}
                        <a
                            href="https://wa.me/919997952180"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:flex items-center gap-2 bg-[#25D366] text-white px-2 xl:px-3 2xl:px-4 py-1.5 rounded-full font-bold ml-auto hover:bg-green-600 transition-all shadow-sm text-[11px] xl:text-xs 2xl:text-sm whitespace-nowrap"
                        >
                            <FaWhatsapp size={18} />
                            <span>WhatsApp</span>
                        </a>
                        <a
                            href="https://whatsapp.com/channel/0029Va6UVWjGehEHQhXVrI2P"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:flex items-center gap-2 bg-[#25D366] text-white px-2 xl:px-3 2xl:px-4 py-1.5 rounded-full font-bold ml-1 xl:ml-2 hover:bg-green-600 transition-all shadow-sm text-[11px] xl:text-xs 2xl:text-sm whitespace-nowrap"
                        >
                            <FaWhatsapp size={18} />
                            <span>Join Channel</span>
                        </a>
                        <a
                            href="https://www.youtube.com/@mittalonlineservices3412"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:flex items-center gap-2 bg-[#FF0000] text-white px-2 xl:px-3 2xl:px-4 py-1.5 rounded-full font-bold ml-1 xl:ml-2 hover:bg-red-700 transition-all shadow-sm text-[11px] xl:text-xs 2xl:text-sm whitespace-nowrap"
                        >
                            <FaYoutube size={18} />
                            <span>YouTube</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Overlay) */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white text-gray-800 shadow-xl border-t border-gray-100 animate-slideDown max-h-[80vh] overflow-y-auto">
                    <ul className="flex flex-col p-4 font-bold text-base">
                        <li><Link to="/" onClick={toggleMobileMenu} className="block py-3 border-b border-gray-100 hover:text-primary">Home</Link></li>
                        <li><Link to="/about" onClick={toggleMobileMenu} className="block py-3 border-b border-gray-100 hover:text-primary">About Us</Link></li>
                        <li>
                            <button
                                onClick={() => toggleMobileDropdown('products')}
                                className="w-full flex justify-between items-center py-3 border-b border-gray-100 hover:text-primary text-left"
                            >
                                Products & Services <FaChevronDown size={12} className={`transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                            </button>
                            {activeDropdown === 'products' && (
                                <ul className="pl-4 bg-gray-50 text-sm font-medium">
                                    <li><Link to="/products" onClick={toggleMobileMenu} className="block py-2 text-primary">All Products</Link></li>
                                    <li><Link to="/services" onClick={toggleMobileMenu} className="block py-2 text-primary">All Services</Link></li>
                                </ul>
                            )}
                        </li>
                        <li><Link to="/resources" onClick={toggleMobileMenu} className="block py-3 border-b border-gray-100 hover:text-primary">Resources</Link></li>
                        <li><Link to="/testimonials" onClick={toggleMobileMenu} className="block py-3 border-b border-gray-100 hover:text-primary">Testimonials</Link></li>
                        <li><Link to="/clients" onClick={toggleMobileMenu} className="block py-3 border-b border-gray-100 hover:text-primary">Clients</Link></li>
                        <li><Link to="/careers" onClick={toggleMobileMenu} className="block py-3 border-b border-gray-100 hover:text-primary">Careers</Link></li>
                        <li><Link to="/online-payment" onClick={toggleMobileMenu} className="block py-3 border-b border-gray-100 hover:text-primary">Pay Online</Link></li>
                        <li><Link to="/contact" onClick={toggleMobileMenu} className="block py-3 hover:text-primary">Contact Us</Link></li>
                    </ul>
                    {/* Mobile Contact Info Block */}
                    <div className="bg-gray-100 p-4 text-sm text-gray-600 border-t">
                        <div className="flex items-center gap-2 mb-2">
                            <FaPhoneAlt size={12} /> +91-0121-4000575
                        </div>
                        <div className="flex items-center gap-2">
                            <FaEnvelope size={12} /> info@mittalonlineservices.com
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
