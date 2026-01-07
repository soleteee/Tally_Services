import PageLayout from '../../layouts/PageLayout';

const PrimeGold = () => {
    return (
        <PageLayout title="TallyPrime Gold" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Multi-User Edition</h2>
                <p className="mb-4">TallyPrime Gold is designed for unlimited users on a Local Area Network (LAN). It is the ideal solution for medium to large businesses where multiple users need access to the same data simultaneously.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Unlimited user access within a LAN environment.</li>
                    <li>Real-time data synchronization.</li>
                    <li>Secure remote access for mobile workers.</li>
                    <li>Centralized data management.</li>
                </ul>
                <p>Empower your team with TallyPrime Gold and streamline collaboration across your organization.</p>
            </div>
        </PageLayout>
    );
};

export default PrimeGold;
