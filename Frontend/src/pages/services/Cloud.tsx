import PageLayout from '../../layouts/PageLayout';

const Cloud = () => {
    return (
        <PageLayout title="TallyPrime Cloud Access" sidebarType="services">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Tally Anytime, Anywhere</h2>
                <p className="mb-4">Host your TallyPrime on the cloud and access it from any device, anywhere, anytime. It's secure, scalable, and cost-effective.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>99.9% uptime guarantee.</li>
                    <li>Automated backups and data security.</li>
                    <li>Access from Windows, Mac, or Linux through RDP/HTML5.</li>
                    <li>Scalable resources as per business need.</li>
                </ul>
                <p>Move your business to the cloud with our reliable Tally Cloud services.</p>
            </div>
        </PageLayout>
    );
};

export default Cloud;
