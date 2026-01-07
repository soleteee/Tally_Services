import PageLayout from '../../layouts/PageLayout';

const Accounting = () => {
    return (
        <PageLayout title="Accounting Services" sidebarType="services">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Outsource Your Accounts</h2>
                <p className="mb-4">Focus on your core business while we handle your accounting needs. Our team of experts ensures accurate and timely bookkeeping.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Daily/Weekly bookkeeping.</li>
                    <li>GST Filing and Compliance.</li>
                    <li>Financial Statement preparation.</li>
                    <li>Payroll management.</li>
                </ul>
                <p>Reliable accounting services tailored for your business.</p>
            </div>
        </PageLayout>
    );
};

export default Accounting;
