
import PageLayout from '../../layouts/PageLayout';

const Training = () => {
    return (
        <PageLayout title="Tally Training" sidebarType="services">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Master TallyPrime</h2>
                <p className="mb-4">Our expert-led training programs help you and your staff master TallyPrime. From basic accounting to advanced inventory and payroll, we cover it all.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Hands-on practical sessions.</li>
                    <li>Customized corporate training.</li>
                    <li>Certification upon completion.</li>
                    <li>On-site or online training options.</li>
                </ul>
                <p>Boost your team's productivity with improved Tally skills.</p>
            </div>
        </PageLayout>
    );
};

export default Training;
