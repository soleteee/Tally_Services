
import PageLayout from '../../layouts/PageLayout';
import { assets } from '../../assets/assets';

const Server = () => {
    return (
        <PageLayout title="TallyPrime Server" sidebarType="products">
            {/* Product Image + Intro */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 pb-6 border-b border-gray-100">
                <img
                    src={assets.tallyPrimeServerLogo}
                    alt="TallyPrime Server"
                    className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-2xl border border-blue-100 shadow-md bg-blue-50/40 p-3 flex-shrink-0"
                />
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Enterprise-Class Power</h2>
                    <p className="text-gray-600">TallyPrime Server is an enterprise-class product that offers high-performance concurrency and security. It is built for businesses that require fast, reliable, and secure access to data for multiple users.</p>
                </div>
            </div>
            <div className="prose max-w-none text-gray-600">
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>High concurrency with zero downtime.</li>
                    <li>Enhanced data security and control.</li>
                    <li>Optimized performance for large data volumes.</li>
                    <li>monitoring and administrative control.</li>
                </ul>
                <p>Scale your business operations with the robust power of TallyPrime Server.</p>
            </div>
        </PageLayout>
    );
};

export default Server;
