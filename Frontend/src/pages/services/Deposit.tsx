
import PageLayout from '../../layouts/PageLayout';

const Deposit = () => {
    return (
        <PageLayout title="Deposit Services" sidebarType="services">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Smart Investments</h2>
                <p className="mb-4">Maximize your returns with our corporate deposit schemes. Secure and high-yield options for your surplus funds.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Fixed Deposits with attractive interest rates.</li>
                    <li>Flexible tenure options.</li>
                    <li>Safe and secure investment partners.</li>
                    <li>Dedicate relationship manager.</li>
                </ul>
                <p>Make your money work for you with our deposit services.</p>
            </div>
        </PageLayout>
    );
};

export default Deposit;
