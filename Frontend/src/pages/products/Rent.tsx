
import PageLayout from '../../layouts/PageLayout';
import { assets } from '../../assets/assets';

const Rent = () => {
    return (
        <PageLayout title="Tally on Rent" sidebarType="products">
            {/* Product Image + Intro */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 pb-6 border-b border-gray-100">
                <img
                    src={assets.tallyPrimeLogo}
                    alt="Tally on Rent"
                    className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-2xl border border-blue-100 shadow-md bg-blue-50/40 p-3 flex-shrink-0"
                />
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Flexible Licensing</h2>
                    <p className="text-gray-600">Get TallyPrime on a flexible rental model. Ideal for short-term projects or businesses that prefer operational expenditure over capital expenditure.</p>
                </div>
            </div>
            <div className="prose max-w-none text-gray-600">
                <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Monthly, quarterly, or yearly rental plans.</li>
                    <li>Access to all features of TallyPrime.</li>
                    <li>Easy upgrade to permanent license.</li>
                    <li>Latest updates included during rental period.</li>
                </ul>
                <p>Start using TallyPrime today with affordable rental plans.</p>
            </div>
        </PageLayout>
    );
};

export default Rent;
