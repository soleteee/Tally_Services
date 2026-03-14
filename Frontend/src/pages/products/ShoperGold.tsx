
import PageLayout from '../../layouts/PageLayout';
import { assets } from '../../assets/assets';

const ShoperGold = () => {
    return (
        <PageLayout title="Shoper 9 Gold" sidebarType="products">
            {/* Product Image + Intro */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 pb-6 border-b border-gray-100">
                <img
                    src={assets.tallyPrimeLogo}
                    alt="Shoper 9 Gold"
                    className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-2xl border border-blue-100 shadow-md bg-blue-50/40 p-3 flex-shrink-0"
                />
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Retail Management for Chain Stores</h2>
                    <p className="text-gray-600">Shoper 9 Gold is built for retail chains and large stores. It offers centralized control over multiple outlets, ensuring seamless data synchronization and management.</p>
                </div>
            </div>
            <div className="prose max-w-none text-gray-600">
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Centralized inventory and pricing control.</li>
                    <li>Consolidated reporting for all outlets.</li>
                    <li>Data synchronization between HQ and stores.</li>
                    <li>Scalable for growing retail businesses.</li>
                </ul>
                <p>Manage your retail empire efficiently with Shoper 9 Gold.</p>
            </div>
        </PageLayout>
    );
};

export default ShoperGold;
