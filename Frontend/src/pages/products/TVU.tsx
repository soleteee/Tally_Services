
import PageLayout from '../../layouts/PageLayout';

const TVU = () => {
    return (
        <PageLayout title="Tally Virtual User" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Virtual Access Anywhere</h2>
                <p className="mb-4">Tally Virtual User (TVU) allows you to access TallyPrime securely from anywhere using virtualization technologies like RDP, RDS, etc.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Authorized access to TallyPrime.</li>
                    <li>Works with third-party virtualization services.</li>
                    <li>Secure and compliant.</li>
                    <li>Flexible user packs.</li>
                </ul>
                <p>Enable remote work seamlessly with Tally Virtual User.</p>
            </div>
        </PageLayout>
    );
};

export default TVU;
