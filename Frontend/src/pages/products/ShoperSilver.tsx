import PageLayout from '../../layouts/PageLayout';

const ShoperSilver = () => {
    return (
        <PageLayout title="Shoper 9 Silver" sidebarType="products">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Retail Management for Single Stores</h2>
                <p className="mb-4">Shoper 9 Silver is a comprehensive retail management software designed for single retail stores. It handles everything from billing and inventory to finance and statutory compliance.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Fast billing and POS operations.</li>
                    <li>Inventory tracking and management.</li>
                    <li>Barcode generation and printing.</li>
                    <li>Detailed sales and stock reports.</li>
                </ul>
                <p>Optimize your retail operations with Shoper 9 Silver.</p>
            </div>
        </PageLayout>
    );
};

export default ShoperSilver;
