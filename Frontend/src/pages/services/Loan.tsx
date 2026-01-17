
import PageLayout from '../../layouts/PageLayout';

const Loan = () => {
    return (
        <PageLayout title="Loan Services" sidebarType="services">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Financial Support</h2>
                <p className="mb-4">Need funds to expand? We assist you in obtaining various types of loans suited for your business needs.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Working Capital Loans.</li>
                    <li>Term Loans.</li>
                    <li>Equipment Financing.</li>
                    <li>Loan Against Property.</li>
                </ul>
                <p>Grow your business with the right financial support.</p>
            </div>
        </PageLayout>
    );
};

export default Loan;
