import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

const WhyUs: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-5 max-w-[1200px] mx-auto">
            <ScrollReveal animation="fade-up">
                <h1 className="text-4xl font-bold text-primary mb-12 text-center">Why Choose Us?</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { title: 'Certified Experts', desc: 'Our team consists of Tally certified professionals with deep domain knowledge.' },
                        { title: 'Customer First', desc: 'We prioritize your business continuity with rapid support response times.' },
                        { title: 'End-to-End Solutions', desc: 'From license sales to customization and cloud hosting, we handle it all.' },
                        { title: 'Proven Track Record', desc: 'Serving over 500+ happy clients across various industries.' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-md border-l-4 border-primary hover:bg-primary/5 transition-colors">
                            <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                            <p className="text-text/80">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    );
};

export default WhyUs;
