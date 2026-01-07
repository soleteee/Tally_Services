import PageLayout from '../../layouts/PageLayout';

const Capital = () => {
    return (
        <PageLayout title="Tally Capital" sidebarType="services">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Business Loans</h2>
                <p className="mb-4">Tally Capital facilitates easy and quick access to business loans from leading banks and NBFCs directly through the Tally platform.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Unsecured business loans.</li>
                    <li>Quick approval and disbursement.</li>
                    <li>Competitive interest rates.</li>
                    <li>Minimal documentation.</li>
                </ul>
                <p>Detailed financial data in Tally helps lenders assess your creditworthiness faster.</p>
            </div>
        </PageLayout>
    );
};

export default Capital;
