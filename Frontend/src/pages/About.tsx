import ScrollReveal from '../components/ScrollReveal';
import PhotoGallery from '../components/PhotoGallery';
import { assets } from '../assets/assets';
import FaqSection from '../components/FaqSection';

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

                {/* Certificate Section */}
                <div className="mb-16 flex justify-center">
                    <div className="max-w-3xl w-full">
                        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Certification</h2>
                        <img 
                            src={assets.certificateFull} 
                            alt="3-Star Partner Certificate" 
                            className="w-full h-auto rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                        />
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {[
                            { name: 'Mrs. Varsha Mittal w/o CA Pawan Mittal', role: 'Owner', color: 'bg-primary', photo: null },
                            { name: 'CA Pawan Mittal', role: 'CA & Adviser', color: 'bg-secondary', photo: null },
                            { name: 'Shivam Sharma', role: 'Sales Consultant Manager', color: 'bg-gray-300', photo: assets.teamShivam },
                            { name: 'Yash Vaish', role: 'Services & Customization Consultant Manager', color: 'bg-gray-300', photo: assets.teamYash },
                            { name: 'Nikhil Saini', role: 'Service & Technical Consultant Manager', color: 'bg-gray-300', photo: assets.teamNikhil },
                            { name: 'Rachit Garg', role: 'Sales Consultant Manager', color: 'bg-gray-300', photo: null },
                            { name: 'Rani Verma', role: 'Relationship Manager', color: 'bg-gray-300', photo: assets.teamRani },
                            { name: 'Khushi Kashyap', role: 'Relationship Manager', color: 'bg-gray-300', photo: assets.teamKhushi },
                            { name: 'Varsha Agarwal', role: 'Relationship Manager', color: 'bg-gray-300', photo: assets.teamVarsha }
                        ].map((member, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl  transition-all duration-300 group">
                                {/* Member Photo */}
                                <div className="relative h-64 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                                    {member.photo ? (
                                        <img 
                                            src={member.photo} 
                                            alt={member.name} 
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300 "
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className={`w-32 h-32 rounded-full ${member.color} flex items-center justify-center text-white text-4xl font-bold`}>
                                                {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={`h-1 ${member.color} w-full`}></div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{member.name}</h3>
                                    <p className="text-secondary font-medium text-sm">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Awards & Gallery Section */}
                <div className="mb-20">
                    <PhotoGallery />
                </div>
                <FaqSection
                    pageKey="about"
                    title="Frequently Asked Questions About Our Services"
                    subtitle="Answers to the most common questions about our team, support, certifications, and service offerings."
                />
                {/* Google Map Section */}
                <div className="mt-20 w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Mittal%20Online%20Services%20Meerut%20Mall&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        title="Mittal Online Services Location"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default About;
