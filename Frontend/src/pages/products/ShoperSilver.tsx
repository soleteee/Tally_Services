
import PageLayout from '../../layouts/PageLayout';
import { assets } from '../../assets/assets';

const ShoperSilver = () => {
    return (
        <PageLayout title="Shoper 9 Silver" sidebarType="products">
            {/* Product Image + Intro */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 pb-6 border-b border-gray-100">
                <img
                    src={assets.tallyPrimeLogo}
                    alt="Shoper 9 Silver"
                    className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-2xl border border-blue-100 shadow-md bg-blue-50/40 p-3 flex-shrink-0"
                />
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Retail Management for Single Stores</h2>
                    <p className="text-gray-600">Shoper 9 Silver is a comprehensive retail management software designed for single retail stores. It handles everything from billing and inventory to finance and statutory compliance.</p>
                </div>
            </div>
            <div className="prose max-w-none text-gray-600">
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Fast billing and POS operations.</li>
                    <li>Inventory tracking and management.</li>
                    <li>Barcode generation and printing.</li>
                    <li>Detailed sales and stock reports.</li>
                </ul>
                <p>Optimize your retail operations with Shoper 9 Silver.</p>
            </div>
        </PageLayout>
    );
};

export default ShoperSilver;
