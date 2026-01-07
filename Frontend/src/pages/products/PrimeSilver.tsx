import PageLayout from '../../layouts/PageLayout';

const PrimeSilver = () => {
    return (
        <PageLayout title="TallyPrime Silver" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Single User Edition</h2>
                <p className="mb-4">TallyPrime Silver is the perfect accounting solution for small businesses and individuals who need a reliable, single-user system. It offers all the powerful features of TallyPrime, tailored for a standalone PC.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Complete accounting and inventory management.</li>
                    <li>Statutory compliance (GST, TDS, TCS).</li>
                    <li>Banking integration and reconciliation.</li>
                    <li>Insightful business reports.</li>
                </ul>
                <p>Experience the simplicity and speed of TallyPrime Silver, designed to help you manage your business with ease.</p>
            </div>
        </PageLayout>
    );
};

export default PrimeSilver;
