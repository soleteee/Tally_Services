import React, { useState } from 'react';

interface ClientInquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ClientInquiryModal: React.FC<ClientInquiryModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mock API call or replace with actual endpoint
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    subject: `New Client Inquiry: ${formData.companyName} (${formData.name})`, // Specific Title
                    message: `
                        Client Inquiry Details:
                        -----------------------
                        Name: ${formData.name}
                        Company: ${formData.companyName}
                        Phone: ${formData.phone}
                        Email: ${formData.email}
                        
                        Message/Requirement:
                        ${formData.message}
                     `
                }),
            });

            const data = await response.json();

            if (data.success || response.ok) {
                alert(`Thank you for your interest! We will get back to you shortly.`);
                onClose();
                setFormData({ name: '', companyName: '', email: '', phone: '', message: '' });
            } else {
                alert('Failed to submit inquiry. Please try again.');
            }

        } catch (error) {
            console.error('Error submitting inquiry:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up">
                <div className="bg-primary p-4 flex justify-between items-center text-white">
                    <h3 className="text-xl font-bold">Become a Client</h3>
                    <button onClick={onClose} className="text-white hover:text-gray-200">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            placeholder="Your Business Name"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                placeholder="+91..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (Optional)</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary h-24 resize-none"
                            placeholder="Tell us what you are looking for..."
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? 'Submitting...' : 'Send Inquiry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientInquiryModal;
