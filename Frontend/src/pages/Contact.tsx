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
                    <h2 className="text-3xl font-bold mb-4 text-primary">Contact Us</h2>
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
                            <h4 className="font-bold text-lg text-secondary mb-2">Phone</h4>
                            <p className="text-text/80">+91-0121-4000575</p>
                            <p className="text-text/80">+91 9997952142,2198,4601,7482,7892</p>
                            <p className="text-text/80 font-medium text-blue-600 font-bold">In Case of Emergency Call on 9997952180</p>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-bold text-lg text-secondary mb-2">Email</h4>
                            <p className="text-text/80">{import.meta.env.VITE_CONTACT_EMAIL}</p>
                            <p className="text-text/80">{import.meta.env.VITE_INFO_EMAIL}</p>
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
