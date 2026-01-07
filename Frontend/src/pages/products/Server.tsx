import PageLayout from '../../layouts/PageLayout';

const Server = () => {
    return (
        <PageLayout title="TallyPrime Server" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Enterprise-Class Power</h2>
                <p className="mb-4">TallyPrime Server is an enterprise-class product that offers high-performance concurrency and security. It is built for businesses that require fast, reliable, and secure access to data for multiple users.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>High concurrency with zero downtime.</li>
                    <li>Enhanced data security and control.</li>
                    <li>Optimized performance for large data volumes.</li>
                    <li>monitoring and administrative control.</li>
                </ul>
                <p>Scale your business operations with the robust power of TallyPrime Server.</p>
            </div>
        </PageLayout>
    );
};

export default Server;
