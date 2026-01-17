import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ServiceItem {
    name: string;
    description: string;
    link: string;
}

interface CategoryContent {
    title: string;
    description: string;
    items: ServiceItem[];
}

const servicesData: Record<string, CategoryContent> = {
    products: {
        title: 'Our Products',
        description: 'Explore our wide range of Tally products and business solutions.',
        items: [
            { name: 'TallyPrime Silver', description: 'Single User Edition for standalone PCs.', link: '/products/prime-silver' },
            { name: 'TallyPrime Gold', description: 'Multi-User Edition for unlimited users on a LAN.', link: '/products/prime-gold' },
            { name: 'TallyPrime Auditor Version', description: 'Exclusive version for Chartered Accountants.', link: '/products/auditor' },
            { name: 'TallyPrime Server', description: 'Enterprise-class product for high-performance concurrency.', link: '/products/server' },
            { name: 'Tally Software Services (TSS)', description: 'Tally Renewal for updates, remote access, and data sync.', link: '/services/tss' },
            { name: 'TallyPrime on Rent', description: 'Flexible rental plans for TallyPrime.', link: '/products/rent' },
            { name: 'Tally Virtual User', description: 'Virtualized access for TallyPrime.', link: '/products/tvu' },
            { name: 'TallyPrime Cloud Access', description: 'Access TallyPrime from anywhere, anytime on the cloud.', link: '/services/cloud' },
            { name: 'Tally on Mobile', description: 'Access your business data on your mobile device.', link: '/products/mobile' },
            { name: 'Tally With AI', description: 'Intelligent business insights and automation.', link: '/solutions/ai' },
            { name: 'More Products', description: 'Shoper 9 & Bookkeeper Accounting Software solutions.', link: '/products/more' },
        ],
    },
    services: {
        title: 'Our Services',
        description: 'Professional services to help you get the most out of Tally.',
        items: [
            { name: 'Tally Training', description: 'Expert training for your team to master Tally.', link: '/services/training' },
            { name: 'Tally Capital', description: 'Business loans from lending banks & NBFCs via Tally.', link: '/services/capital' },
            { name: 'Tally Customization', description: 'Invoice Customization, Excel/Json Import, Auto Backup, API Integration, and more.', link: '/solutions/customization' },
            { name: 'AMC (Annual Maintenance)', description: 'Comprehensive support and maintenance for your Tally installation.', link: '/services/tss' },
            { name: 'Support', description: 'Remote and on-site support services.', link: '/services/consultancy' },
            { name: 'More Services', description: 'Insurance, Loans, Deposits, Accounting, and Consultancy.', link: '/services/more' },
        ],
    },
};

const OurServices: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('products');
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
            id="our-services"
            ref={sectionRef}
            className={`py-16 bg-[#f0f8ff] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="max-w-[1200px] mx-auto px-5">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-text">Our Products & Services</h2>
                    <p className="text-xl text-gray-500">
                        Comprehensive <span className="text-primary font-semibold">Products</span> and <span className="text-primary font-semibold">Services</span> for your business
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Left Side: Tabs */}
                    <div className="flex-1 flex flex-col gap-4 w-full md:w-auto">
                        <button
                            className={`text-left p-4 border-none text-lg font-semibold cursor-pointer border-l-4 transition-all duration-300 ${activeTab === 'products'
                                ? 'text-primary border-primary bg-white shadow-sm rounded-r-lg'
                                : 'text-gray-500 border-transparent hover:text-primary hover:bg-primary/5'
                                }`}
                            onClick={() => setActiveTab('products')}
                        >
                            Products
                        </button>
                        <button
                            className={`text-left p-4 border-none text-lg font-semibold cursor-pointer border-l-4 transition-all duration-300 ${activeTab === 'services'
                                ? 'text-primary border-primary bg-white shadow-sm rounded-r-lg'
                                : 'text-gray-500 border-transparent hover:text-primary hover:bg-primary/5'
                                }`}
                            onClick={() => setActiveTab('services')}
                        >
                            Services
                        </button>
                    </div>

                    {/* Right Side: Content */}
                    <div className="flex-[2] w-full">
                        <div className={`bg-white rounded-xl p-6 shadow-lg animate-slide-in`} key={activeTab}>
                            <h3 className="text-2xl text-primary mb-2 font-bold">{servicesData[activeTab].title}</h3>
                            <p className="text-gray-500 mb-6">{servicesData[activeTab].description}</p>

                            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 mb-6">
                                {servicesData[activeTab].items.map((item, index) => (
                                    <Link to={item.link} key={index} className="block">
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-secondary h-full">
                                            <h4 className="text-gray-800 mb-1 font-semibold">{item.name}</h4>
                                            <p className="text-sm text-gray-500 leading-snug">{item.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurServices;
