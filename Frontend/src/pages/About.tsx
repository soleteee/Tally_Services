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

                {/* Our Journey Section */}
                <div id="journey" className="mb-24 scroll-mt-32">
                    <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Journey</h2>
                    <div className="relative border-l-4 border-primary/20 ml-4 md:ml-auto md:mr-auto md:w-3/4 space-y-12 pl-8 md:pl-0">
                        {[{ year: '2010', title: 'Inception', desc: 'Started with a vision to simplify accounting for local businesses.', color: 'bg-primary' },
                        { year: '2015', title: 'Expansion', desc: 'Became a certified 5-Star Tally Partner and expanded to cloud solutions.', color: 'bg-secondary' },
                        { year: '2020', title: 'Innovation', desc: 'Launched custom API integrations and Tally on Mobile services.', color: 'bg-accent' }
                        ].map((item, index) => (
                            <div key={index} className="relative md:flex items-center justify-between group">
                                <div className="hidden md:block w-5/12 text-right pr-8">
                                    <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                                    <p className="text-text/70">{item.desc}</p>
                                </div>
                                <div className={`absolute left-[-37px] md:left-1/2 md:-ml-3 w-6 h-6 ${item.color} rounded-full border-4 border-white shadow-md z-10`}></div>
                                <div className="md:w-5/12 pl-0 md:pl-8">
                                    <span className="text-4xl font-bold text-gray-200 block mb-2">{item.year}</span>
                                    <div className="md:hidden">
                                        <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                                        <p className="text-text/70">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div id="why-us" className="mb-24 scroll-mt-32">
                    <h2 className="text-3xl font-bold text-primary mb-12 text-center">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: 'Certified Experts', desc: 'Our team consists of Tally certified professionals with deep domain knowledge.' },
                            { title: 'Customer First', desc: 'We prioritize your business continuity with rapid support response times.' },
                            { title: 'End-to-End Solutions', desc: 'From license sales to customization and cloud hosting, we handle it all.' },
                            { title: 'Proven Track Record', desc: 'Serving over 500+ happy clients across various industries.' }
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Owner */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="h-4 bg-primary w-full"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary">Varsha Mittal</h3>
                                <p className="text-secondary font-medium mb-1">Owner</p>
                                <p className="text-xs text-secondary/80 mb-3">(M.A. English Literature)</p>
                                <ul className="text-text/70 text-sm list-disc list-inside space-y-1">
                                    <li>Tally 3-Star Sales & Implementation Certified Partner</li>
                                    <li>LIC Agent</li>
                                    <li>HDFC Ergo Agent</li>
                                    <li>PNBHFL DSA</li>
                                </ul>
                            </div>
                        </div>

                        {/* Adviser */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="h-4 bg-secondary w-full"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary">CA. Pawan Mittal</h3>
                                <p className="text-secondary font-medium mb-3">Adviser</p>
                            </div>
                        </div>

                        {/* Consultants */}
                        {[
                            { name: 'Shivam Sharma', qual: 'M.Com.' },
                            { name: 'Yash Vaish', qual: 'B.Com.' },
                            { name: 'Nikhil Saini', qual: 'B.Com.' },
                            { name: 'Rachit Garg', qual: 'B.Com.' }
                        ].map((member, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                                <div className="h-4 bg-gray-300 w-full"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                                    <p className="text-secondary font-medium mb-1">Onsite Sales Service & Functional Consultant</p>
                                    <p className="text-text/70 text-sm">{member.qual}</p>
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
