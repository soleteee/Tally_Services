
import PageLayout from '../../layouts/PageLayout';
import { assets } from '../../assets/assets';

const TVU = () => {
    return (
        <PageLayout title="Tally Virtual User" sidebarType="products">
            {/* Product Image + Intro */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 pb-6 border-b border-gray-100">
                <img
                    src={assets.virtualuser}
                    alt="Tally Virtual User"
                    className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-2xl border border-blue-100 shadow-md bg-blue-50/40 p-3 flex-shrink-0"
                />
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Virtual Access Anywhere</h2>
                    <p className="text-gray-600">Tally Virtual User (TVU) allows you to access TallyPrime securely from anywhere using virtualization technologies like RDP, RDS, etc.</p>
                </div>
            </div>
            <div className="prose max-w-none text-gray-600">
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Authorized access to TallyPrime.</li>
                    <li>Works with third-party virtualization services.</li>
                    <li>Secure and compliant.</li>
                    <li>Flexible user packs.</li>
                </ul>
                <p>Enable remote work seamlessly with Tally Virtual User.</p>
            </div>
        </PageLayout>
    );
};

export default TVU;
