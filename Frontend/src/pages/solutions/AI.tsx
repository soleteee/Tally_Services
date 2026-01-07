
import PageLayout from '../../layouts/PageLayout';

const AI = () => {
    return (
        <PageLayout title="Tally With AI" sidebarType="none">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Future of Accounting</h2>
                <p className="mb-4">Experience the power of Artificial Intelligence integrated with Tally. Automate data entry, get predictive insights, and make smarter decisions.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Automated invoice processing.</li>
                    <li>Smart bank reconciliation.</li>
                    <li>Business trend analysis.</li>
                    <li>Anomaly detection in data.</li>
                </ul>
                <p>Step into the future with Tally AI solutions.</p>
            </div>
        </PageLayout>
    );
};

export default AI;
