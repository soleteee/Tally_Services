import React from 'react';
import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import ScrollReveal from '../components/ScrollReveal';
import { ArrowRight, CheckCircle, TrendingUp, Shield, Cloud } from 'lucide-react';

const LandingPage: React.FC = () => {
    return (
        <div className="font-sans text-text overflow-x-hidden">
            <LandingNavbar />



            {/* Exclusive Offers Section */}
            <section className="py-20 bg-bg">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-primary mb-4">Exclusive Offers</h2>
                            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                            <p className="mt-4 text-gray-600 max-w-xl mx-auto">Limited time deals on our most popular Tally solutions. Grab them before they expire!</p>
                        </div>
                    </ScrollReveal>

                    <div className="relative min-h-[60vh] grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Offer Card 1 */}
                        <ScrollReveal delay={100} className="h-full">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col hover:shadow-2xl transition-shadow duration-300 group">
                                <div className="bg-gradient-to-r from-secondary to-primary p-6 text-white relative overflow-hidden">
                                    <h3 className="text-2xl font-bold relative z-10">TallyPrime Gold</h3>
                                    <p className="opacity-90 relative z-10">Multi-User License</p>
                                    <div className="absolute top-0 right-0 p-4 bg-white/20 backdrop-blur-md rounded-bl-2xl">
                                        <span className="font-bold text-yellow-300 text-xl">10% OFF</span>
                                    </div>
                                    <Cloud className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white opacity-10 rotate-12" />
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <ul className="space-y-3 mb-8 flex-grow">
                                        <li className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> License for unlimited users
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Free Installation Support
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> 1 Month Priority Support
                                        </li>
                                    </ul>
                                    <Link to="/products/prime-gold" className="w-full block text-center py-3 rounded-lg border-2 border-primary text-primary font-bold group-hover:bg-primary group-hover:text-white transition-all">
                                        Claim Offer
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Offer Card 2 */}
                        <ScrollReveal delay={200} className="h-full">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col hover:shadow-2xl transition-shadow duration-300 group">
                                <div className="bg-gradient-to-r from-accent to-yellow-600 p-6 text-white relative">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-b-lg shadow-md uppercase tracking-wider">Most Popular</div>
                                    <h3 className="text-2xl font-bold">Annual Support</h3>
                                    <p className="opacity-90">Comprehensive AMC</p>
                                    <div className="absolute top-0 right-0 p-4 bg-white/20 backdrop-blur-md rounded-bl-2xl">
                                        <span className="font-bold text-white text-xl">BONUS</span>
                                    </div>
                                    <Shield className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white opacity-10 rotate-12" />
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <ul className="space-y-3 mb-8 flex-grow">
                                        <li className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> 24/7 Priority Assistance
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Data Recovery Services
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Free Cloud Trial (7 Days)
                                        </li>
                                    </ul>
                                    <Link to="/services/consultancy" className="w-full block text-center py-3 rounded-lg bg-primary text-white font-bold shadow-lg hover:bg-blue-700 transition-all">
                                        Get Protected
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Offer Card 3 */}
                        <ScrollReveal delay={300} className="h-full">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col hover:shadow-2xl transition-shadow duration-300 group">
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white relative">
                                    <h3 className="text-2xl font-bold">Cloud Solutions</h3>
                                    <p className="opacity-90">Tally on Cloud</p>
                                    <div className="absolute top-0 right-0 p-4 bg-white/20 backdrop-blur-md rounded-bl-2xl">
                                        <span className="font-bold text-accent text-xl">FREE DEMO</span>
                                    </div>
                                    <TrendingUp className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white opacity-10 rotate-12" />
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <ul className="space-y-3 mb-8 flex-grow">
                                        <li className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Access Tally Anywhere
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> 99.9% Uptime Guarantee
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Secure Data Backups
                                        </li>
                                    </ul>
                                    <Link to="/services/cloud" className="w-full block text-center py-3 rounded-lg border-2 border-gray-800 text-gray-800 font-bold group-hover:bg-gray-800 group-hover:text-white transition-all">
                                        Start Free Demo
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>


            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-primary to-secondary text-white pt-20 overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent blur-[120px] opacity-60"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal animation="fade-up" delay={0}>
                        <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-6">
                            Exclusive Tally Solutions
                        </span>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={200}>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Elevate Your Business <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-accent">
                                With Expert Tools
                            </span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={400}>
                        <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Discover our premium Tally products & services designed to streamline your accounting and growth.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={600}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/products" className="px-8 py-4 bg-accent text-white rounded-full font-bold text-lg hover:bg-yellow-500 transition-all hover:shadow-[0_0_20px_rgba(240,173,78,0.6)] transform hover:-translate-y-1">
                                Explore Products
                            </Link>
                            <Link to="/" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all transform hover:-translate-y-1">
                                Go to Homepage
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Quick Access Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-3xl font-bold text-center text-primary mb-12">Explore All Solutions</h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'TallyPrime', link: '/products/prime-gold', icon: '🚀', color: 'bg-blue-50' },
                            { name: 'Tally Server', link: '/products/server', icon: '🖥️', color: 'bg-green-50' },
                            { name: 'Customization', link: '/solutions/customization', icon: '⚙️', color: 'bg-yellow-50' },
                            { name: 'Accounting', link: '/services/accounting', icon: '📊', color: 'bg-purple-50' },
                            { name: 'Tally Mobile', link: '/products/mobile', icon: '📱', color: 'bg-pink-50' },
                            { name: 'TSS Renewal', link: '/services/tss', icon: '🔄', color: 'bg-indigo-50' },
                            { name: 'Consultancy', link: '/services/consultancy', icon: '💡', color: 'bg-orange-50' },
                            { name: 'Contact Us', link: '/contact', icon: '📞', color: 'bg-red-50' },
                        ].map((item, index) => (
                            <ScrollReveal key={index} delay={index * 50} animation="zoom-in">
                                <Link to={item.link} className={`block p-6 rounded-xl ${item.color} hover:shadow-lg transition-all transform hover:-translate-y-1 text-center group`}>
                                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <h4 className="font-bold text-text group-hover:text-primary transition-colors">{item.name}</h4>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-20 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <ScrollReveal animation="zoom-in">
                        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join thousands of satisfied businesses using Mittal Online Services for their accounting needs.</p>
                        <Link to="/" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary rounded-full font-bold text-xl hover:bg-yellow-400 hover:text-white transition-all shadow-lg hover:shadow-2xl">
                            Enter Main Website <ArrowRight className="w-6 h-6" />
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            <footer className="bg-gray-900 text-gray-500 py-6 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Mittal Online Services. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
