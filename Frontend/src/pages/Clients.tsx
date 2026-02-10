import { useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import ClientInquiryModal from '../components/ClientInquiryModal';
import assets from '../assets/assets';

const Clients = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Placeholder client data - In a real app, these would come from assets or an API
    const clients = [
        { logo: assets.logo1 },
        { logo: assets.logo2 },
        { logo: assets.logo3 },
        { logo: assets.logo4 },
        { logo: assets.logo5 },
        { logo: assets.logo6 },
        { logo: assets.logo7 },
        { logo: assets.logo8 },
        { logo: assets.logo9 },
        { logo: assets.logo10 },
        { logo: assets.logo11 },
        { logo: assets.logo12 },
    ];

    return (
        <PageLayout title="Our Happy Clients" sidebarType="none">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-primary mb-4">Trusted by Market Leaders</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We are proud to serve over 2700+ satisfied clients across various industries including Manufacturing,
                    Retail, Services, Trading, and Distribution.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
                {clients.map((client, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-md transition-shadow h-40 group">
                        <img
                            src={client.logo}
                            alt={`Client ${index + 1}`}
                            className="max-h-24 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                ))}
            </div>

            <div className="bg-primary/5 p-10 rounded-2xl text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">Join Our Client Family</h3>
                <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                    Experience the difference of working with a certified Tally Prime Partner dedicated to your business success.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                        View Case Studies
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-3 bg-white border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                        Become a Client
                    </button>
                </div>
            </div>

            {/* Client Inquiry Modal */}
            <ClientInquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </PageLayout>
    );
};

export default Clients;
