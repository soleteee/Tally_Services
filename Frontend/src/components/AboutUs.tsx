import React, { useEffect, useRef, useState } from 'react';
import assets from '../assets/assets';

const AboutUs: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about-us"
            ref={sectionRef}
            className={`py-20 bg-white transition-all duration-1000 min-h-[calc(100vh-74px)] flex items-center justify-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="max-w-[1200px] mx-auto px-5">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl text-primary mb-8 font-bold relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:bg-accent after:mt-2 after:mx-auto after:md:mx-0">About Us</h2>
                        <div className="text-lg text-gray-600 space-y-6 leading-relaxed">
                            <p>
                                Since 2000, we have been associated with Tally and recognized as a 3-Star Sales & Implementation Certified Partner since 2017. Our company takes pride in delivering outstanding Tally sales, services, solutions, education, and customization.
                            </p>
                            <p>
                                Our skilled team includes Chartered Accountants and specialists in Income Tax and GST, committed to providing exceptional service and ensuring customer satisfaction. Our consistent performance has earned us the Best Service and Highest Sales Awards in the North Zone (UP West Region) across multiple quarters.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 w-full flex justify-center">
                        <div className="w-full h-[350px] bg-gradient-to-br from-[#e0e7ff] to-[#dbeafe] rounded-2xl flex items-center justify-center text-primary font-bold text-2xl shadow-2xl relative overflow-hidden border border-white/50"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #e0e7ff 25%, #dbeafe 25%, #dbeafe 50%, #e0e7ff 50%, #e0e7ff 75%, #dbeafe 75%, #dbeafe 100%)',
                                backgroundSize: '20px 20px'
                            }}>
                            <img
                                src={assets.aboutus}
                                alt="About Us"
                                className="w-full h-full object-cover z-10"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
