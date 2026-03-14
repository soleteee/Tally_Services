
import PageLayout from '../../layouts/PageLayout';
import { assets } from '../../assets/assets';

const Mobile = () => {
    return (
        <PageLayout title="Tally on Mobile" sidebarType="products">
            {/* Product Image + Intro */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 pb-6 border-b border-gray-100">
                <img
                    src={assets.tallyPrimeLogo}
                    alt="Tally on Mobile"
                    className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-2xl border border-blue-100 shadow-md bg-blue-50/40 p-3 flex-shrink-0"
                />
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Business on the Go</h2>
                    <p className="text-gray-600">Access your critical business reports on your mobile device. Stay connected to your business anytime, anywhere.</p>
                </div>
            </div>
            <div className="prose max-w-none text-gray-600">
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Real-time data access.</li>
                    <li>View balance sheet, P&L, and outstanding reports.</li>
                    <li>Secure and encrypted.</li>
                    <li>Compatible with Android and iOS.</li>
                </ul>
                <p>Make informed decisions instantly with Tally on Mobile.</p>
            </div>
        </PageLayout>
    );
};

export default Mobile;
