import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Link } from 'react-router-dom';

const BusinessGrowth: React.FC = () => {
    return (
        <section className="py-20 bg-white min-h-[calc(100vh-74px)] flex items-center justify-center">
            <div className="max-w-[1200px] mx-auto px-5">
                <ScrollReveal animation="fade-up">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Accelerate Your Business Growth</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Unlock new opportunities with our tailored solutions designed to scale your operations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Strategic Consulting</h3>
                            <p className="text-gray-600 mb-6">
                                Get expert advice on financial planning, tax compliance, and business strategy to stay ahead of the curve.
                            </p>
                            <Link to="/services/consultancy" className="text-primary font-semibold hover:underline">
                                Explore Consulting &rarr;
                            </Link>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl shadow-lg border border-yellow-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Financial Empowerment</h3>
                            <p className="text-gray-600 mb-6">
                                Access capital through our loan services and secure your future with comprehensive insurance plans.
                            </p>
                            <Link to="/services/more" className="text-accent font-semibold hover:underline">
                                View Financial Services &rarr;
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default BusinessGrowth;
