import React from 'react';

const Contact: React.FC = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    subject: `Contact Form: Message from ${formData.name}`
                }),
            });
            const data = await response.json();
            if (data.success) {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                alert('Failed to send message: ' + data.message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-16 bg-bg min-h-[60vh]">
            <div className="max-w-[1200px] mx-auto px-5">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-4 text-primary">Contact Us</h1>
                    <p className="text-gray-500">Get in touch with our support team.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 h-fit">
                        <h3 className="text-2xl font-bold text-primary mb-6">Get In Touch</h3>

                        <div className="mb-6">
                            <h4 className="font-bold text-lg text-secondary mb-2">Address</h4>
                            <p className="text-text/80 leading-relaxed">
                                <strong>MITTAL ONLINE SERVICES</strong><br />
                                Tally Certified Partners<br />
                                B-4, Ground Floor, Meerut Mall,<br />
                                Near Rani Mill or Metro Plaza, Delhi Road,<br />
                                Meerut-250002 Uttar Pradesh
                            </p>
                        </div>

                        <div className="mb-6">
                        
                            <h4 className="font-bold text-lg text-secondary mb-2"> Phone</h4>
                            <p className="text-text/80 font-medium text-blue-600 font-bold">For Any Inquiry Call on 9997952180</p>
                            <p className="text-text/80 font-medium text-blue-600 font-bold">Additional Numbers - </p>
                            <p className="text-text/80">+91-0121-4000575</p>
                            <p className="text-text/80">+91 9997952142,2198,4601,7482,7892</p>
                            
                        </div>

                        <div className="mb-6">
                            <h4 className="font-bold text-lg text-secondary mb-2">Email</h4>
                            <div className="flex flex-col gap-2.5 bg-blue-50/70 p-3.5 rounded-lg border border-blue-100">
                                <a
                                    href="mailto:mittalonlineservices@gmail.com"
                                    className="text-blue-700 font-semibold hover:underline transition-colors break-all text-sm sm:text-base flex items-center gap-2"
                                >
                                    <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                                    mittalonlineservices@gmail.com
                                </a>
                                <a
                                    href="mailto:info@mittalonlineservices.com"
                                    className="text-blue-700 font-semibold hover:underline transition-colors break-all text-sm sm:text-base flex items-center gap-2"
                                >
                                    <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                                    info@mittalonlineservices.com
                                </a>
                            </div>
                        </div>

                        {/* WhatsApp Quick Contact */}
                        <div className="mb-2">
                            <h4 className="font-bold text-lg text-secondary mb-3">WhatsApp Us</h4>
                            <a
                                href="https://wa.me/919997952180?text=Hello%2C%20I%20have%20an%20inquiry%20about%20your%20Tally%20services."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-xl font-bold hover:bg-green-600 transition-all shadow-md text-sm w-full justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                </svg>
                                Chat on WhatsApp
                            </a>
                            <p className="text-xs text-gray-400 mt-2 text-center">Available during &amp; after office hours</p>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-bold text-lg text-secondary mb-2">Business Hours</h4>
                            <p className="text-text/80">10:00 AM – 06:00 PM</p>
                            <p className="text-sm text-primary mt-2 font-medium">
                                * After office hours, all services available online with call on 9997952180
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                        <div className="mb-5">
                            <label className="block mb-2 font-medium text-text">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="w-full p-3 border border-gray-200 rounded-md font-sans text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 font-medium text-text">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                                className="w-full p-3 border border-gray-200 rounded-md font-sans text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 font-medium text-text">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Your Phone Number"
                                required
                                className="w-full p-3 border border-gray-200 rounded-md font-sans text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 font-medium text-text">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                required
                                className="w-full p-3 border border-gray-200 rounded-md font-sans text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50 focus:bg-white h-32 resize-y"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-block px-6 py-3 rounded-md font-semibold cursor-pointer transition-all duration-300 border-none relative overflow-hidden bg-primary text-white hover:bg-[#004494] hover:-translate-y-0.5 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>

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
        </div>

    );
};

export default Contact;
