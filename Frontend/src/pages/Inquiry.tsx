import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Inquiry: React.FC = () => {
    const [searchParams] = useSearchParams();
    const product = searchParams.get('product');
    const service = searchParams.get('service');
    const inquiryItem = product || service || 'General Inquiry';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    subject: `Inquiry: ${inquiryItem} - by ${formData.name}`,
                    message: `Inquiry for: ${inquiryItem}\n\n${formData.message}`
                }),
            });
            const data = await response.json();
            if (data.success) {
                alert(`Thank you for your inquiry about ${inquiryItem}. We will contact you soon!`);
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                alert('Failed to send inquiry: ' + data.message);
            }
        } catch (error) {
            console.error('Error sending inquiry:', error);
            alert('Failed to send inquiry. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 bg-bg min-h-screen">
            <div className="max-w-[800px] mx-auto px-5">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-primary p-8 text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">Get an Inquiry</h1>
                        <p className="text-blue-100 text-lg">
                            Requesting information for: <span className="font-bold text-white underline decoration-accent decoration-4 underline-offset-4">{inquiryItem}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-text mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="+91 98765 43210"
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-text mb-2">Message (Optional)</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                placeholder="Any specific requirements or questions..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-secondary text-white font-bold text-lg rounded-lg hover:bg-[#008ec4] transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? 'Submitting...' : 'Submit Inquiry'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Inquiry;
