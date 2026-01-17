import ScrollReveal from '../components/ScrollReveal';

const About = () => {
    return (
        <div className="pt-32 pb-20 px-5 max-w-[1200px] mx-auto">
            <ScrollReveal animation="fade-up">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">About Mittal Online Services</h1>

                <div className="prose max-w-none text-lg text-text/80 mb-20">
                    <p className="mb-6 text-center max-w-4xl mx-auto">
                        Welcome to Mittal Online Services, your trusted partner for Tally solutions and business software services.
                        With years of experience in the industry, we have dedicated ourselves to empowering businesses of all sizes
                        with robust, efficient, and scalable IT solutions.
                    </p>
                    <p className="text-center max-w-4xl mx-auto mb-6">
                        Our mission is to simplify complex business processes through technology. Whether you need accounting software,
                        cloud solutions, or custom integrations, our team of experts is here to guide you every step of the way.
                    </p>
                    <p className="text-center max-w-4xl mx-auto font-medium text-primary bg-primary/5 p-6 rounded-lg border border-primary/10">
                        We are associated with Tally as a 3-Star Sales & Implementation Certified Partner since September 2017.
                        We have an excellent track record in Tally sales, services, solutions, education, and customization.
                        Our team includes professionals such as Chartered Accountants (CAs), Income Tax experts, and GST experts.
                        We are committed to delivering the best service and ensuring customer satisfaction in all Tally-related needs.
                    </p>
                </div>

                {/* Why Choose Us Section */}
                <div id="why-us" className="mb-24 scroll-mt-32">
                    <h2 className="text-3xl font-bold text-primary mb-12 text-center">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: 'Certified Experts', desc: 'Our team consists of Tally certified professionals with deep domain knowledge.' },
                            { title: 'Customer First', desc: 'We prioritize your business continuity with rapid support response times.' },
                            { title: 'End-to-End Solutions', desc: 'From license sales to customization and cloud hosting, we handle it all.' },
                            { title: 'Proven Track Record', desc: 'Serving over 2700+ happy clients across various industries. Over 1,500+ positive reviews reflect our commitment to service excellence across India.' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-md border-l-4 border-primary hover:bg-primary/5 transition-colors">
                                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                                <p className="text-text/80">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Our Team Section */}
                <div id="team" className="scroll-mt-32">
                    <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Team</h2>
                    <p className="text-lg text-center text-text/80 max-w-3xl mx-auto mb-16">
                        We are a group of certified Tally experts, professionals, and consultants passionate about helping your business thrive.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: 'Mrs. Varsha Mittal w/o CA Pawan Mittal', role: 'Owner', color: 'bg-primary' },
                            { name: 'CA Pawan Mittal', role: 'CA & Adviser', color: 'bg-secondary' },
                            { name: 'Shivam Sharma', role: 'Sales Consultant Manager', color: 'bg-gray-300' },
                            { name: 'Yash Vaish', role: 'Services & Customization Consultant Manager', color: 'bg-gray-300' },
                            { name: 'Nikhil Saini', role: 'Service & Technical Consultant Manager', color: 'bg-gray-300' },
                            { name: 'Rachit Garg', role: 'Sales Consultant Manager', color: 'bg-gray-300' },
                            { name: 'Rani Verma', role: 'Relationship Manager', color: 'bg-gray-300' },
                            { name: 'Kushi Kashyap', role: 'Relationship Manager', color: 'bg-gray-300' },
                            { name: 'Varsha Agarwal', role: 'Relationship Manager', color: 'bg-gray-300' }
                        ].map((member, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                                <div className={`h-4 ${member.color} w-full`}></div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{member.name}</h3>
                                    <p className="text-secondary font-medium text-sm">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default About;
