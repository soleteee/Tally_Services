
import PageLayout from '../../layouts/PageLayout';

const Auditor = () => {
    return (
        <PageLayout title="TallyPrime Auditor Version" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">For Chartered Accountants</h2>
                <p className="mb-4">The TallyPrime Auditor Edition is exclusively designed for Chartered Accountants to help them provide better services to their clients. It comes with powerful audit tools to streamline the compliance process.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Remote audit capabilities.</li>
                    <li>Statutory audit and compliance tools.</li>
                    <li>Data analysis and verification.</li>
                    <li>Seamless collaboration with clients.</li>
                </ul>
                <p>Enhance your practice and deliver superior value to your clients with TallyPrime Auditor Edition.</p>
            </div>
        </PageLayout>
    );
};

export default Auditor;
