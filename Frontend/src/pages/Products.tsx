import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { Link } from 'react-router-dom';

const productsList = [
    { name: 'TallyPrime Silver', desc: 'Single user edition for standalone PCs.', link: '/products/prime-silver' },
    { name: 'TallyPrime Gold', desc: 'Unlimited multi-user edition for LAN environments.', link: '/products/prime-gold' },
    { name: 'TallyPrime Auditor Version', desc: 'Dedicated version for Chartered Accountants.', link: '/products/auditor' },
    { name: 'TallyPrime Server', desc: 'Enterprise-class product for high-performance concurrency.', link: '/products/server' },
    { name: 'Tally Software Services', desc: 'Membership for TallyPrime updates and connectivity services.', link: '/services/tss' },
    { name: 'TallyPrime on Rent', desc: 'Flexible rental options for Tally licenses.', link: '/products/rent' },
    { name: 'Tally Virtual User', desc: 'Virtual access for authorized users.', link: '/products/tvu' },
    { name: 'TallyPrime with WhatsApp', desc: 'Instantly share invoices and reports via WhatsApp.', link: '/products/prime-gold' },
    { name: 'TallyPrime Cloud Access', desc: 'Access your Tally data from anywhere, anytime.', link: '/services/cloud' },
    { name: 'Tally on Mobile', desc: 'View critical business reports on your smartphone.', link: '/products/mobile' },
    { name: 'Tally With AI', desc: 'Next-gen business insights powered by AI.', link: '/solutions/ai' },
    { name: 'More Products', desc: 'Shoper 9 & Bookkeeper Accounting Software solutions.', link: '/products/more' },
];

const Products: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-5 max-w-[1200px] mx-auto">
            <ScrollReveal animation="fade-up">
                <h1 className="text-4xl font-bold text-primary mb-6 text-center">Our Products</h1>
                <p className="text-lg text-center text-text/80 max-w-3xl mx-auto mb-16">
                    Discover our range of comprehensive business software solutions designed to streamline your operations and boost productivity.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsList.map((product, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-gray-100">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-3">{product.name}</h3>
                                <p className="text-text/70 mb-6">{product.desc}</p>
                            </div>
                            <Link to={product.link} className="inline-block px-6 py-2 bg-secondary text-white font-semibold rounded-lg text-center hover:bg-[#008ec4] transition-colors w-full">
                                Enquire / Know More
                            </Link>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Products;
