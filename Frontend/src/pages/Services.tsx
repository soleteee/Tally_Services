import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { Link } from 'react-router-dom';

const servicesList = [
    { name: 'Tally Training', link: '/services/training' },
    { name: 'Tally Capital (Loans)', link: '/services/capital' },
    { name: 'Tally Customization', link: '/solutions/customization' },
    { name: 'API Integration', link: '/solutions/customization' },
    { name: 'AMC (Annual Maintenance)', link: '/services/tss' },
    { name: 'Support (Remote/On-site)', link: '/services/consultancy' },
    { name: 'More Services', link: '/services/more' }
];

const Services: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-5 max-w-[1200px] mx-auto">
            <ScrollReveal animation="fade-up">
                <h1 className="text-4xl font-bold text-primary mb-6 text-center">Our Services</h1>
                <p className="text-lg text-center text-text/80 max-w-3xl mx-auto mb-16">
                    Beyond software, we provide a full spectrum of services to ensure your business runs smoothly and efficiently.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesList.map((service, idx) => (
                        <Link key={idx} to={service.link} className="group block">
                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-accent hover:border-primary h-full flex items-center">
                                <span className="text-lg font-semibold text-text group-hover:text-primary transition-colors">{service.name}</span>
                                <span className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-secondary">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Services;
