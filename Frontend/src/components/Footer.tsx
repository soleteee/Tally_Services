import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#222] text-[#ccc] py-16">
            <div className="max-w-[1200px] mx-auto px-5 flex flex-wrap justify-between gap-8">
                <ScrollReveal animation="fade-up" delay={0}>
                    <div className="mb-8 min-w-[200px]">
                        <h3 className="text-white mb-5 font-bold text-lg">Mittal Online Services</h3>
                        <p className="max-w-xs">Empowering businesses with robust Tally solutions and expert consultancy for over a decade.</p>
                        <div className="flex gap-4 mt-6">
                            {/* Social Links */}
                            <a href="https://www.facebook.com/share/17u7msqbMH/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" className="w-8 h-8 flex-shrink-0 aspect-square flex items-center justify-center bg-gray-700 rounded-full hover:bg-[#1877F2] transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/mittalonlineservices?igsh=eXltYXJpbWwwbWd4" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram" className="w-8 h-8 flex-shrink-0 aspect-square flex items-center justify-center bg-gray-700 rounded-full hover:bg-[#E4405F] transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.281.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.486-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@mittalonlineservice" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube" className="w-8 h-8 flex-shrink-0 aspect-square flex items-center justify-center bg-gray-700 rounded-full hover:bg-[#FF0000] transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.126.338a2.01 2.01 0 0 1 1.415 1.42c.101.38.17 1.418.17 1.418s.068 1.418.068 1.418v1.418s-.068 1.418-.068 1.418c0 0-.069 1.04-.17 1.418a2.007 2.007 0 0 1-1.415 1.42c-1.139.306-5.304.335-6.126.338a16.89 16.89 0 0 1-2.167-.103c-1.14-.092-2.18-.337-2.18-.337a2.009 2.009 0 0 1-1.415-1.42c-.101-.38-.17-1.418-.17-1.418s-.068-1.418-.068-1.418v-1.418s.068-1.418.068-1.418c0 0 .069-1.04.17-1.418A2.01 2.01 0 0 1 2.14 2.337c1.139-.306 5.304-.335 6.126-.338zM6.636 10.07l2.761-1.47-2.76-1.47V10.07z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/mittal-online-services/about/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="w-8 h-8 flex-shrink-0 aspect-square flex items-center justify-center bg-gray-700 rounded-full hover:bg-[#0077B5] transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                    <div className="mb-8 min-w-[150px]">
                        <h4 className="text-white mb-5 font-bold text-lg">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
                            <li><Link to="/review-generator" className="hover:text-white transition-colors">Generate Review</Link></li>
                            <li><Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                    <div className="mb-8 min-w-[150px]">
                        <h4 className="text-white mb-5 font-bold text-lg">Products <span className="font-secondary">&</span> Services</h4>
                        <ul className="space-y-2">
                            <li><Link to="/products/prime-gold" className="hover:text-white transition-colors">TallyPrime</Link></li>
                            <li><Link to="/solutions/customization" className="hover:text-white transition-colors">Tally Customization</Link></li>
                            <li><Link to="/services/consultancy" className="hover:text-white transition-colors">AMC Support</Link></li>
                            <li><Link to="/services/cloud" className="hover:text-white transition-colors">Tally on Cloud</Link></li>
                        </ul>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                    <div className="mb-8 min-w-[200px]">
                        <h4 className="text-white mb-5 font-bold text-lg">Contact Info</h4>
                        <p className="mb-2"><strong>MITTAL ONLINE SERVICES</strong></p>
                        <p className="mb-2">B-4, Ground Floor, Meerut Mall,<br />Near Rani Mill or Metro Plaza,<br />Delhi Road, Meerut-250002 UP</p>
                        <p className="text-text/80 font-medium text-white font-bold">For Any Inquiry Call on 9997952180</p>
                        <p className="mb-2">Phone: +91-0121-4000575, 9997952142,2198,4601, <br />7482,7892</p>
                        <p className="mb-2">
                            Email: <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className="hover:text-white transition-colors">{import.meta.env.VITE_CONTACT_EMAIL}</a><br />
                            <a href={`mailto:${import.meta.env.VITE_INFO_EMAIL}`} className="hover:text-white transition-colors">{import.meta.env.VITE_INFO_EMAIL}</a>
                        </p>
                        <p className="mb-2">Hours: 10:00 AM – 06:00 PM</p>
                    </div>
                </ScrollReveal>
            </div>
            <div className="text-center border-t border-[#444] pt-5 mt-10">
                <p>&copy; {new Date().getFullYear()}  Owl Media House. All Rights Reserved.Terms & Conditions</p>
            </div>
        </footer>
    );
};

export default Footer;
