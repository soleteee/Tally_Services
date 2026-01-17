
import PageLayout from '../../layouts/PageLayout';

const Customization = () => {
    return (
        <PageLayout title="Tally Customization" sidebarType="none">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Tailored for You</h2>
                <p className="mb-4">Every business is unique. We provide Tally Definition Language (TDL) customization to adapt TallyPrime to your specific business requirements.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Invoice customization (formats, logos).</li>
                    <li>Custom reports and dashboards.</li>
                    <li>Workflow automation.</li>
                    <li>Integration with third-party software (API).</li>
                </ul>
                <p>Get a Tally that works exactly the way you do.</p>
            </div>
        </PageLayout>
    );
};

export default Customization;
