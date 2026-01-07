import PageLayout from '../../layouts/PageLayout';

const Rent = () => {
    return (
        <PageLayout title="Tally on Rent" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Flexible Licensing</h2>
                <p className="mb-4">Get TallyPrime on a flexible rental model. Ideal for short-term projects or businesses that prefer operational expenditure over capital expenditure.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Monthly, quarterly, or yearly rental plans.</li>
                    <li>Access to all features of TallyPrime.</li>
                    <li>Easy upgrade to permanent license.</li>
                    <li>Latest updates included during rental period.</li>
                </ul>
                <p>Start using TallyPrime today with affordable rental plans.</p>
            </div>
        </PageLayout>
    );
};

export default Rent;
