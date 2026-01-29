import React from 'react';
import PageLayout from '../layouts/PageLayout';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const RenewTSS: React.FC = () => {
    return (
        <PageLayout title="Renew Tally Software Services (TSS)" sidebarType="none">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Quiz Section - Custom Banner Header */}
                <section className="bg-white p-10 rounded-2xl shadow-lg border-2 border-blue-50 text-center transform hover:-translate-y-1 transition-transform duration-300">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Still thinking to renew?</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Take this 30 second quiz to see how TSS adds value to your business.
                    </p>
                    <a
                        href="https://tallysolutions.com/tally-prime-tss-quiz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                        See if TSS is right for you
                    </a>
                </section>

                {/* Benefits Grid */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">How does TSS help your business?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Connected Banking & Payment",
                                description: "From direct payments to accessing real-time live balances and reconciliations get everything within TallyPrime. Connected Payments supported for Axis and SBI."
                            },
                            {
                                title: "TallyDrive for Secure Cloud Backup",
                                description: "With TallyPrime, easily schedule and take data backups in TallyDrive cloud storage or other storage devices and restore within seconds. Get storage of 1GB for single user and 3GB for multi user."
                            },
                            {
                                title: "Connected GST Services",
                                description: "Connected solution to generate e-invoices, e-way bills, and to upload and file GST returns including auto-reconciliation."
                            },
                            {
                                title: "Powerful Upgrades",
                                description: "Free upgrades keep your business running smoothly and compliant with the latest laws."
                            },
                            {
                                title: "Online Data Synchronization",
                                description: "Seamlessly sync and consolidate data across your head office, branches, factories, and warehouses in one click."
                            },
                            {
                                title: "Secure & Remote Access to Reports",
                                description: "Securely access your business data anytime, anywhere using a web browser."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-2 h-2 bg-primary rounded-full mb-4 group-hover:scale-150 transition-transform"></div>
                                <h3 className="font-bold text-xl text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-blue-50 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Need assistance with renewal?</h3>
                        <p className="text-gray-600">Our support team is just a call away.</p>
                    </div>
                    <div className="flex gap-4">
                        <a href="tel:9997952142" className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-colors">
                            <FaPhoneAlt /> Call Now
                        </a>
                        <a href="mailto:mittalonlineservices@gmail.com" className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-sm hover:bg-blue-700 transition-colors">
                            <FaEnvelope /> Email Us
                        </a>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default RenewTSS;
