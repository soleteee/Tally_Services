
import PageLayout from '../../layouts/PageLayout';
import { assets } from '../../assets/assets';

const Bookkeeper = () => {
    return (
        <PageLayout title="Bookkeeper Accounting Software" sidebarType="products">
            {/* Product Image + Intro */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 pb-6 border-b border-gray-100">
                <img
                    src={assets.tallyPrimeLogo}
                    alt="Bookkeeper"
                    className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-2xl border border-blue-100 shadow-md bg-blue-50/40 p-3 flex-shrink-0"
                />
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Simplified Accounting</h2>
                    <p className="text-gray-600">Bookkeeper is a simple yet powerful accounting software for small businesses. It allows you to manage your finances on the go with its mobile and desktop compatibility.</p>
                </div>
            </div>
            <div className="prose max-w-none text-gray-600">
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Easy invoicing and expense tracking.</li>
                    <li>Inventory management.</li>
                    <li>GST ready.</li>
                    <li>Sync across devices (Mobile & PC).</li>
                </ul>
                <p>Keep your books in order effortlessly with Bookkeeper.</p>
            </div>
        </PageLayout>
    );
};

export default Bookkeeper;
