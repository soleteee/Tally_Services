import React, { useState } from 'react';

interface JobApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ isOpen, onClose, jobTitle }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        qualification: '',
        resumeLink: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    subject: `Job Application for ${jobTitle} from ${formData.name}`,
                    message: `
                        Name: ${formData.name}
                        Phone: ${formData.phone}
                        Email: ${formData.email}
                        Qualification: ${formData.qualification}
                        Resume Link: ${formData.resumeLink}
                        Job Applied For: ${jobTitle}
                     `
                }),
            });

            const data = await response.json();

            if (data.success || response.ok) { // Adjust logic based on actual API
                alert(`Application for ${jobTitle} submitted successfully! We will contact you shortly.`);
                onClose();
                setFormData({ name: '', phone: '', email: '', qualification: '', resumeLink: '' });
            } else {
                alert('Failed to submit application. Please try again.');
            }

        } catch (error) {
            console.error('Error submitting application:', error);
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
                    <h3 className="text-xl font-bold">Apply for {jobTitle}</h3>
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
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            placeholder="+91 9876543210"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                        <input
                            type="text"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            placeholder="B.Com, MBA, etc."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link (GDrive/LinkedIn)</label>
                        <input
                            type="url"
                            name="resumeLink"
                            value={formData.resumeLink}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            placeholder="https://drive.google.com/..."
                        />
                        <p className="text-xs text-gray-500 mt-1">Please provide a public link to your resume.</p>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplicationModal;
