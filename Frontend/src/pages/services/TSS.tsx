
import PageLayout from '../../layouts/PageLayout';

const TSS = () => {
    return (
        <PageLayout title="Tally Software Services (TSS)" sidebarType="services">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Stay Connected, Stay Updated</h2>
                <p className="mb-4">Tally Software Services (TSS) is an annual subscription that provides a suite of value-added services to enhance your TallyPrime experience.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Latest product updates and upgrades.</li>
                    <li>Remote access to data.</li>
                    <li>Data synchronization between branches.</li>
                    <li>Banking services (auto-reconciliation).</li>
                </ul>
                <p>Renew your TSS to experience the full potential of TallyPrime.</p>
            </div>
        </PageLayout>
    );
};

export default TSS;
