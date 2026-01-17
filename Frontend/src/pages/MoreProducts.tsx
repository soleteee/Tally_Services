
import PageLayout from '../layouts/PageLayout';
import { Link } from 'react-router-dom';

const MoreProducts = () => {
    return (
        <PageLayout title="More Products" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-6">Specialized Retail & Accounting Solutions</h2>
                <p className="mb-8">
                    In addition to TallyPrime, we offer specialized software solutions tailored for specific business needs, from retail management to mobile accounting.
                </p>

                <div className="space-y-12">
                    {/* Shoper 9 Silver */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-secondary mb-3">Shoper 9 Silver</h3>
                        <p className="mb-4">
                            The ultimate retail point-of-sale (POS) software designed for single retail stores. It handles billing, inventory, and finance with ease.
                        </p>
                        <ul className="list-disc pl-5 mb-6 space-y-1">
                            <li>Fast billing and barcode compatibility.</li>
                            <li>Efficient inventory tracking and reordering.</li>
                            <li>Comprehensive reporting for single store operations.</li>
                        </ul>
                        <Link to="/products/shoper-silver" className="text-primary font-semibold hover:underline">Learn more about Shoper 9 Silver &rarr;</Link>
                    </div>

                    {/* Shoper 9 Gold */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-secondary mb-3">Shoper 9 Gold</h3>
                        <p className="mb-4">
                            A robust retail management solution built for chain stores and distribution networks. Centralize control and get real-time insights across all locations.
                        </p>
                        <ul className="list-disc pl-5 mb-6 space-y-1">
                            <li>Centralized data management for head offices.</li>
                            <li>Real-time data synchronization across branches.</li>
                            <li>Advanced supply chain management features.</li>
                        </ul>
                        <Link to="/products/shoper-gold" className="text-primary font-semibold hover:underline">Learn more about Shoper 9 Gold &rarr;</Link>
                    </div>

                    {/* Bookkeeper */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-secondary mb-3">Bookkeeper Accounting Software</h3>
                        <p className="mb-4">
                            A simple yet powerful accounting app for small businesses. Manage your finances on the go with both mobile and PC compatibility.
                        </p>
                        <ul className="list-disc pl-5 mb-6 space-y-1">
                            <li>Create invoices and estimates on mobile.</li>
                            <li>Sync data between PC and mobile devices.</li>
                            <li>GST compliant billing and reporting.</li>
                        </ul>
                        <Link to="/products/bookkeeper" className="text-primary font-semibold hover:underline">Learn more about Bookkeeper &rarr;</Link>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default MoreProducts;
