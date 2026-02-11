import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react';

interface Job {
    _id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    salaryRange: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    isActive: boolean;
    createdAt: string;
}

const JobManagement = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        experience: '',
        salaryRange: '',
        description: '',
        requirements: '',
        responsibilities: '',
        isActive: true
    });

    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchJobs = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/admin/all`);
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Process arrays (split by newline or comma)
        const processedData = {
            ...formData,
            requirements: formData.requirements.split('\n').filter(item => item.trim() !== ''),
            responsibilities: formData.responsibilities.split('\n').filter(item => item.trim() !== '')
        };

        try {
            const url = editingId
                ? `${import.meta.env.VITE_API_URL}/api/jobs/${editingId}`
                : `${import.meta.env.VITE_API_URL}/api/jobs`;

            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(processedData)
            });

            if (response.ok) {
                fetchJobs();
                resetForm();
            } else {
                console.error('Failed to save job');
            }
        } catch (error) {
            console.error('Error saving job:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (job: Job) => {
        setFormData({
            title: job.title,
            department: job.department,
            location: job.location,
            type: job.type,
            experience: job.experience,
            salaryRange: job.salaryRange || '',
            description: job.description,
            requirements: job.requirements.join('\n'),
            responsibilities: job.responsibilities.join('\n'),
            isActive: job.isActive
        });
        setEditingId(job._id);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, { method: 'DELETE' });
            setJobs(prev => prev.filter(job => job._id !== id));
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            department: '',
            location: '',
            type: 'Full-time',
            experience: '',
            salaryRange: '',
            description: '',
            requirements: '',
            responsibilities: '',
            isActive: true
        });
        setEditingId(null);
        setIsFormOpen(false);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Job Management</h1>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                    <Plus size={20} /> Add New Job
                </button>
            </div>

            {/* Job List */}
            {!isFormOpen ? (
                <div className="grid grid-cols-1 gap-6">
                    {jobs.map((job) => (
                        <div key={job._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                        {job.isActive ? (
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                <Check size={12} /> Active
                                            </span>
                                        ) : (
                                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Inactive</span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">{job.department} • {job.location} • {job.type}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-100">Exp: {job.experience}</span>
                                        {job.salaryRange && <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded border border-purple-100">Salary: {job.salaryRange}</span>}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(job)}
                                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(job._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {jobs.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                            No jobs found. Click "Add New Job" to create one.
                        </div>
                    )}
                </div>
            ) : (
                /* Add/Edit Form */
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-2xl font-bold text-gray-800">{editingId ? 'Edit Job' : 'Create New Job'}</h2>
                        <button onClick={resetForm} className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Senior Accountant" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <input type="text" name="department" required value={formData.department} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Finance" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input type="text" name="location" required value={formData.location} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. New Delhi / Remote" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                                <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Required</label>
                                <input type="text" name="experience" required value={formData.experience} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 2-5 Years" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range (Optional)</label>
                                <input type="text" name="salaryRange" value={formData.salaryRange} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. ₹5L - ₹8L PA" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                            <textarea name="description" required rows={4} value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Detailed job description..." />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Key Requirements (One per line)</label>
                                <textarea name="requirements" rows={5} value={formData.requirements} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="- Requirement 1&#10;- Requirement 2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities (One per line)</label>
                                <textarea name="responsibilities" rows={5} value={formData.responsibilities} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="- Responsibility 1&#10;- Responsibility 2" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleCheckboxChange} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                            <label className="text-gray-700 font-medium">Active (Visible on Careers Page)</label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition">Cancel</button>
                            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                                {loading ? 'Saving...' : (editingId ? 'Update Job' : 'Post Job')}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default JobManagement;
