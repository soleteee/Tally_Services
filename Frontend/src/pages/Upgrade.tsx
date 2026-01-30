import React from 'react';
import PageLayout from '../layouts/PageLayout';
import { FaDesktop, FaDownload, FaCheck } from 'react-icons/fa';

const Upgrade: React.FC = () => {
    return (
        <PageLayout title="Upgrade to TallyPrime" sidebarType="none">
            <div className="space-y-12">

                {/* Upgrade Steps Section */}
                <section>
                    <div className="bg-blue-50 p-6 rounded-xl mb-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">How to Upgrade?</h2>
                        <p className="text-gray-600">Follow these 3 simple steps to upgrade your TallyPrime</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

                        {/* Step 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md group-hover:scale-110 transition-transform">1</div>
                            <div className="mb-4 text-blue-500">
                                <FaDesktop size={40} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Gateway of Tally</h3>
                            <p className="text-gray-600 text-sm">Open Tally and press <span className="font-mono bg-gray-100 px-2 py-1 rounded font-bold">Alt + U</span></p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md group-hover:scale-110 transition-transform">2</div>
                            <div className="mb-4 text-blue-500">
                                <FaDownload size={40} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Select Upgrade</h3>
                            <p className="text-gray-600 text-sm">Choose the latest version from the list</p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md group-hover:scale-110 transition-transform">3</div>
                            <div className="mb-4 text-green-500">
                                <FaCheck size={40} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Install</h3>
                            <p className="text-gray-600 text-sm">Click 'Yes' to install and launch</p>
                        </div>
                    </div>
                </section>

                {/* What's New Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-8 bg-accent rounded-full"></div>
                        <h2 className="text-2xl font-bold text-gray-800">What's New in TallyPrime?</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Connected Banking",
                                description: "From direct payments to accessing real-time live balances and reconciliations get everything within TallyPrime. Connected Payments supported for Axis and SBI."
                            },
                            {
                                title: "TallyDrive for Secure Cloud Backup",
                                description: "With TallyPrime, easily schedule and take data backups in TallyDrive cloud storage or other storage devices and restore within seconds. Get storage of 1GB for single user and 3GB for multi user."
                            },
                            {
                                title: "Instant discovery with SmartFind",
                                description: "With SmartFind, instantly locate anything entered in masters or vouchers—no need to remember exact names."
                            },
                            {
                                title: "Invoice Management System",
                                description: "TallyPrime’s IMS feature lets buyers track vendor sales in real-time, catch discrepancies early, and ensure timely, hassle-free Input Tax Credit and compliance."
                            },
                            {
                                title: "Enhanced HSN Summary",
                                description: "TallyPrime now supports HSN Summary reporting in GSTR-1 with separate breakups for B2B and B2C supplies, in line with the GSTIN advisory effective from 1st May, 2025."
                            },
                            {
                                title: "Revised MSME Form 1",
                                description: "TallyPrime now supports the revised MSME Form 1 for Supplier Summary reporting, as per updated MCA norms."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>


            </div>
        </PageLayout>
    );
};

export default Upgrade;
