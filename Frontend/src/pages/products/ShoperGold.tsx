
import PageLayout from '../../layouts/PageLayout';

const ShoperGold = () => {
    return (
        <PageLayout title="Shoper 9 Gold" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Retail Management for Chain Stores</h2>
                <p className="mb-4">Shoper 9 Gold is built for retail chains and large stores. It offers centralized control over multiple outlets, ensuring seamless data synchronization and management.</p>
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
