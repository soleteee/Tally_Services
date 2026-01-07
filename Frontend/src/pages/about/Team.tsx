import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

const Team: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-5 max-w-[1200px] mx-auto">
            <ScrollReveal animation="fade-up">
                <h1 className="text-4xl font-bold text-primary mb-12 text-center">Our Team</h1>
                <p className="text-lg text-center text-text/80 max-w-3xl mx-auto mb-16">
                    We are a group of certified Tally experts, software developers, and support specialists passionate about helping your business thrive.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="h-64 bg-gray-200 w-full animate-pulse"></div> {/* Placeholder for Image */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary">Team Member Name</h3>
                                <p className="text-secondary font-medium mb-3">Position / Role</p>
                                <p className="text-text/70 text-sm">Brief bio about the team member's expertise and experience in the industry.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Team;
