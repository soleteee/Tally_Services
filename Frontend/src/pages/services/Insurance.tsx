import PageLayout from '../../layouts/PageLayout';

const Insurance = () => {
    return (
        <PageLayout title="Insurance Services" sidebarType="services">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Protect Your Business</h2>
                <p className="mb-4">We offer a range of insurance products tailored for businesses, including Life, Health, and Vehicle insurance. Secure your assets and employees with our comprehensive plans.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Group Health Insurance for employees.</li>
                    <li>Commercial Vehicle Insurance.</li>
                    <li>Keyman Insurance.</li>
                    <li>Asset protection.</li>
                </ul>
                <p>Get peace of mind with our trusted insurance partners.</p>
            </div>
        </PageLayout>
    );
};

export default Insurance;
