import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { productsNav, servicesNav } from '../data/navigation';
import { useComparison } from '../context/ComparisonContext';
import { getAllComparisonItems } from '../data/comparisonData';
import { ArrowRightLeft } from 'lucide-react';

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
    sidebarType?: 'products' | 'services' | 'none';
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, sidebarType = 'products' }) => {
    const navigate = useNavigate();
    const { openComparison } = useComparison();
    const allComparisonItems = getAllComparisonItems();

    // Find the ID based on the title (simple matching)
    const comparisonItem = allComparisonItems.find(item => item.title === title);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [title]);

    const handleInquiry = () => {
        navigate(`/inquiry?product=${encodeURIComponent(title)}`);
    };

    const sidebarItems = sidebarType === 'products' ? productsNav : servicesNav;

    return (
        <div className="pt-24 min-h-screen bg-bg">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-primary to-[#004494] py-16 px-5 text-white mb-10">
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up">{title}</h1>
                    <p className="text-blue-100 max-w-2xl text-lg animate-fade-in delay-200">
                        Explore our comprehensive solutions designed to elevate your business operations.
                    </p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-5 pb-20 flex flex-col md:flex-row gap-8">
                {/* Sidebar - Hidden on mobile, or can be collapsible */}
                {sidebarType !== 'none' && (
                    <div className="hidden md:block">
                        <Sidebar title={sidebarType === 'products' ? 'Explore Products' : 'Explore Services'} items={sidebarItems} />
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 animate-fade-up delay-100">
                    <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100 min-h-[400px] relative">
                        {children}

                        {/* Buttons Container */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50 p-6 rounded-lg">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800">Interested in {title}?</h3>
                                <p className="text-gray-500 text-sm">Compare features or get in touch with us.</p>
                            </div>
                            <div className="flex gap-4">
                                {comparisonItem && (
                                    <button
                                        onClick={() => openComparison(comparisonItem.id)}
                                        className="px-6 py-3 bg-white border-2 border-primary text-primary font-bold rounded-full hover:bg-blue-50 transition-all transform hover:-translate-y-1 shadow-sm flex items-center gap-2"
                                    >
                                        <ArrowRightLeft size={18} />
                                        Compare
                                    </button>
                                )}
                                <button
                                    onClick={handleInquiry}
                                    className="px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-[#008ec4] transition-all transform hover:scale-105 shadow-md"
                                >
                                    Get An Inquiry
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLayout;
