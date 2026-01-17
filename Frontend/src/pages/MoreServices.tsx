
import PageLayout from '../layouts/PageLayout';
import { Link } from 'react-router-dom';

const MoreServices = () => {
    return (
        <PageLayout title="More Services" sidebarType="services">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-6">Financial & Professional Services</h2>
                <p className="mb-8">
                    We go beyond software to provide a holistic ecosystem of financial products and professional consultancy to support your business growth.
                </p>

                <div className="space-y-12">
                    {/* Insurance */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-secondary mb-3">Insurance Services</h3>
                        <p className="mb-4">
                            Secure your future and your business with our comprehensive insurance solutions. We partner with leading providers to offer you the best coverage.
                        </p>
                        <ul className="list-disc pl-5 mb-6 space-y-1">
                            <li><strong>Life Insurance (LIC):</strong> Protect your family's financial future.</li>
                            <li><strong>Health Insurance:</strong> Comprehensive plans for you and your employees.</li>
                            <li><strong>General Insurance (HDFC Ergo):</strong> Coverage for assets, vehicles, and liability.</li>
                        </ul>
                        <Link to="/services/insurance" className="text-primary font-semibold hover:underline">Explore Insurance Options &rarr;</Link>
                    </div>

                    {/* Loan Services */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-secondary mb-3">Loan Services</h3>
                        <p className="mb-4">
                            Fuel your business expansion with our tailored loan services. We help you navigate the lending landscape to find the right capital solutions.
                        </p>
                        <ul className="list-disc pl-5 mb-6 space-y-1">
                            <li>Business loans for expansion and working capital.</li>
                            <li>Personal loans for individual needs.</li>
                            <li>Quick processing and competitive interest rates.</li>
                        </ul>
                        <Link to="/services/loan" className="text-primary font-semibold hover:underline">Get a Loan Consultation &rarr;</Link>
                    </div>

                    {/* Deposit Services */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-secondary mb-3">Deposit Services</h3>
                        <p className="mb-4">
                            Grow your savings with secure and high-yield deposit schemes. We offer safe investment avenues for your surplus funds.
                        </p>
                        <Link to="/services/deposit" className="text-primary font-semibold hover:underline">View Deposit Plans &rarr;</Link>
                    </div>

                    {/* Accounting & Consultancy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-secondary mb-3">Accounting Services</h3>
                            <p className="mb-4">
                                Professional bookkeeping and accounting services to keep your financial records accurate and up-to-date.
                            </p>
                            <Link to="/services/accounting" className="text-primary font-semibold hover:underline">Learn More &rarr;</Link>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-secondary mb-3">Consultancy</h3>
                            <p className="mb-4">
                                Expert business consultancy to help you optimize operations, compliance, and strategic planning.
                            </p>
                            <Link to="/services/consultancy" className="text-primary font-semibold hover:underline">Get Expert Advice &rarr;</Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default MoreServices;
