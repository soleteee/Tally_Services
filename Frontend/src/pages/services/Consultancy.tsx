import PageLayout from '../../layouts/PageLayout';

const Consultancy = () => {
    return (
        <PageLayout title="Consultancy Services" sidebarType="services">
            <div className="prose max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-primary mb-4">Expert Advice</h2>
                <p className="mb-4">Our consultancy services help you optimize your business processes and leverage TallyPrime to its fullest potential.</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Business process re-engineering.</li>
                    <li>System audit and implementation.</li>
                    <li>Tally customization consulting.</li>
                    <li>IT infrastructure advisory.</li>
                </ul>
                <p>Get expert guidance to navigate business challenges.</p>
            </div>
        </PageLayout>
    );
};

export default Consultancy;
