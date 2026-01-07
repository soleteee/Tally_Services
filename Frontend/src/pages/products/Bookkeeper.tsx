import PageLayout from '../../layouts/PageLayout';

const Bookkeeper = () => {
    return (
        <PageLayout title="Bookkeeper Accounting Software" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Simplified Accounting</h2>
                <p className="mb-4">Bookkeeper is a simple yet powerful accounting software for small businesses. It allows you to manage your finances on the go with its mobile and desktop compatibility.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Easy invoicing and expense tracking.</li>
                    <li>Inventory management.</li>
                    <li>GST ready.</li>
                    <li>Sync across devices (Mobile & PC).</li>
                </ul>
                <p>Keep your books in order effortlessly with Bookkeeper.</p>
            </div>
        </PageLayout>
    );
};

export default Bookkeeper;
