
import PageLayout from '../../layouts/PageLayout';
import { assets } from '../../assets/assets';

const PrimeSilver = () => {
    return (
        <PageLayout title="TallyPrime Silver" sidebarType="products">
            {/* Product Image + Intro */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 pb-6 border-b border-gray-100">
                <img
                    src={assets.tallyPrimeSilverLogo}
                    alt="TallyPrime Silver"
                    className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-2xl border border-blue-100 shadow-md bg-blue-50/40 p-3 flex-shrink-0"
                />
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Single User Edition</h2>
                    <p className="text-gray-600">
                        TallyPrime Silver i.e. the single-user edition, designed for one PC.
                    </p>
                </div>
            </div>
            <div className="prose max-w-none text-gray-600">

                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Key Features</h3>
                <p className="mb-4">
                    Works on a single standalone PC with a perpetual lifetime license (one-time payment, valid for lifetime use).
                    Supports unlimited companies for unlimited years. Fully loaded with all essential business tools like accounting and inventory management.
                </p>

                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Core Benefits</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li><strong>Invoicing & Accounting:</strong> Create professional GST-compliant invoices effortlessly.</li>
                    <li><strong>Inventory Management:</strong> Manufacturing management. Track stock with batch-wise and godown-wise controls.</li>
                    <li><strong>GST Returns & Compliance:</strong> Simplified filing – GSTR-1, GSTR-3B, 2A/2B reconciliation and reporting.</li>
                    <li><strong>Banking & Cashflow:</strong> Auto bank reconciliation and cheque printing.</li>
                    <li><strong>e-Invoicing & e-Way Bills:</strong> Direct integration support.</li>
                    <li><strong>Connected Services:</strong> Remote access and seamless updates.</li>
                    <li><strong>Business Operations:</strong> PF, ESI, payroll management.</li>
                    <li><strong>Integrations:</strong> WhatsApp sharing, email, data import/export.</li>
                </ul>
            </div>
        </PageLayout>
    );
};

export default PrimeSilver;
