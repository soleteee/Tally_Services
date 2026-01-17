
import PageLayout from '../../layouts/PageLayout';

const Mobile = () => {
    return (
        <PageLayout title="Tally on Mobile" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Business on the Go</h2>
                <p className="mb-4">Access your critical business reports on your mobile device. Stay connected to your business anytime, anywhere.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Real-time data access.</li>
                    <li>View balance sheet, P&L, and outstanding reports.</li>
                    <li>Secure and encrypted.</li>
                    <li>Compatible with Android and iOS.</li>
                </ul>
                <p>Make informed decisions instantly with Tally on Mobile.</p>
            </div>
        </PageLayout>
    );
};

export default Mobile;
