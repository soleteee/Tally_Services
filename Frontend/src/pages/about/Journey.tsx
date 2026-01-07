import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

const Journey: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-5 max-w-[1000px] mx-auto">
            <ScrollReveal animation="fade-up">
                <h1 className="text-4xl font-bold text-primary mb-12 text-center">Our Journey</h1>

                <div className="relative border-l-4 border-primary/20 ml-4 md:ml-0 space-y-12 pl-8 md:pl-0">
                    <div className="relative md:flex items-center justify-between group">
                        <div className="hidden md:block w-5/12 text-right pr-8">
                            <h3 className="text-2xl font-bold text-primary">Inception</h3>
                            <p className="text-text/70">Started with a vision to simplify accounting for local businesses.</p>
                        </div>
                        <div className="absolute left-[-37px] md:left-1/2 md:-ml-3 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-md"></div>
                        <div className="md:w-5/12 pl-0 md:pl-8">
                            <span className="text-4xl font-bold text-gray-200 block mb-2">2010</span>
                            <div className="md:hidden">
                                <h3 className="text-2xl font-bold text-primary">Inception</h3>
                                <p className="text-text/70">Started with a vision to simplify accounting for local businesses.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative md:flex items-center justify-between group">
                        <div className="hidden md:block w-5/12 text-right pr-8">
                            <span className="text-4xl font-bold text-gray-200 block mb-2">2015</span>
                        </div>
                        <div className="absolute left-[-37px] md:left-1/2 md:-ml-3 w-6 h-6 bg-secondary rounded-full border-4 border-white shadow-md"></div>
                        <div className="md:w-5/12 pl-0 md:pl-8">
                            <h3 className="text-2xl font-bold text-primary">Expansion</h3>
                            <p className="text-text/70">Became a certified 5-Star Tally Partner and expanded to cloud solutions.</p>
                            <div className="md:hidden mt-2">
                                <span className="text-4xl font-bold text-gray-200 block mb-2">2015</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative md:flex items-center justify-between group">
                        <div className="hidden md:block w-5/12 text-right pr-8">
                            <h3 className="text-2xl font-bold text-primary">Innovation</h3>
                            <p className="text-text/70">Launched custom API integrations and Tally on Mobile services.</p>
                        </div>
                        <div className="absolute left-[-37px] md:left-1/2 md:-ml-3 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-md"></div>
                        <div className="md:w-5/12 pl-0 md:pl-8">
                            <span className="text-4xl font-bold text-gray-200 block mb-2">2020</span>
                            <div className="md:hidden">
                                <h3 className="text-2xl font-bold text-primary">Innovation</h3>
                                <p className="text-text/70">Launched custom API integrations and Tally on Mobile services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Journey;
