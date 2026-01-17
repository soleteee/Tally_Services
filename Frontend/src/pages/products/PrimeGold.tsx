
import PageLayout from '../../layouts/PageLayout';

const PrimeGold = () => {
    return (
        <PageLayout title="TallyPrime Gold" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Multi-User Edition</h2>
                <p className="mb-4">
                    TallyPrime Gold i.e. the multi-user edition, designed for unlimited users on a Local Area Network (LAN).
                </p>

                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Key Features</h3>
                <p className="mb-4">
                    Works on unlimited PCs connected via LAN (wired or wireless) with a perpetual lifetime license.
                    Supports unlimited companies for unlimited years. Fully loaded with all essential business tools like accounting and inventory management, plus multi-user capabilities.
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

export default PrimeGold;
