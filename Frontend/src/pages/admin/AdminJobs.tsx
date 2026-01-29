import React, { useState, useEffect } from 'react';
import PageLayout from '../../layouts/PageLayout';

interface Job {
    id: number;
    title: string;
    type: string; // Full Time / Part Time
    location: string;
    description: string;
    skills: string;
    date: string;
}

const AdminJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentJob, setCurrentJob] = useState<Job>({
        id: 0,
        title: '',
        type: 'Full Time',
        location: '',
        description: '',
        skills: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        const savedJobs = localStorage.getItem('company_jobs');
        if (savedJobs) {
            setJobs(JSON.parse(savedJobs));
        } else {
            // Initial Seed Data if empty
            const initialJobs = [
                {
                    id: 1,
                    title: "Business Development Executive",
                    type: "Full Time",
                    location: "New Delhi",
                    skills: "Strong marketing and business communication skills, 1+ years experience",
                    date: "2024-05-17",
                    description: "We are seeking a motivated candidate for the position of Business Development Executive. This role involves exploring new sales opportunities and establishing strong client relationships."
                }
            ];
            setJobs(initialJobs);
            localStorage.setItem('company_jobs', JSON.stringify(initialJobs));
        }
    }, []);

    const saveJobsToStorage = (updatedJobs: Job[]) => {
        localStorage.setItem('company_jobs', JSON.stringify(updatedJobs));
        setJobs(updatedJobs);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCurrentJob({ ...currentJob, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            const updatedJobs = jobs.map(j => j.id === currentJob.id ? currentJob : j);
            saveJobsToStorage(updatedJobs);
            setIsEditing(false);
        } else {
            const newJob = { ...currentJob, id: Date.now() };
            saveJobsToStorage([...jobs, newJob]);
        }
        resetForm();
    };

    const handleEdit = (job: Job) => {
        setCurrentJob(job);
        setIsEditing(true);
        window.scrollTo(0, 0);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            const updatedJobs = jobs.filter(j => j.id !== id);
            saveJobsToStorage(updatedJobs);
        }
    };

    const resetForm = () => {
        setCurrentJob({
            id: 0,
            title: '',
            type: 'Full Time',
            location: '',
            description: '',
            skills: '',
            date: new Date().toISOString().split('T')[0]
        });
        setIsEditing(false);
    };

    return (
        <PageLayout title="Admin Panel: Manage Jobs" sidebarType="none">
            <div className="max-w-4xl mx-auto">
                {/* Job Form */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-10">
                    <h2 className="text-xl font-bold text-primary mb-4">{isEditing ? 'Edit Job' : 'Add New Job'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Job Title</label>
                                <input type="text" name="title" value={currentJob.title} onChange={handleChange} required className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Job Type</label>
                                <select name="type" value={currentJob.type} onChange={handleChange} className="w-full p-2 border rounded">
                                    <option>Full Time</option>
                                    <option>Part Time</option>
                                    <option>Internship</option>
                                    <option>Contract</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input type="text" name="location" value={currentJob.location} onChange={handleChange} required className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input type="date" name="date" value={currentJob.date} onChange={handleChange} required className="w-full p-2 border rounded" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Skills Required</label>
                            <textarea name="skills" value={currentJob.skills} onChange={handleChange} required className="w-full p-2 border rounded h-20" placeholder="Comma separated or list"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Job Description</label>
                            <textarea name="description" value={currentJob.description} onChange={handleChange} required className="w-full p-2 border rounded h-32"></textarea>
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700">
                                {isEditing ? 'Update Job' : 'Add Job'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Jobs List table */}
                <h2 className="text-2xl font-bold text-primary mb-6">Current Job Openings</h2>
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-4 border-b">Title</th>
                                <th className="p-4 border-b">Location</th>
                                <th className="p-4 border-b">Type</th>
                                <th className="p-4 border-b text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-6 text-center text-gray-500">No jobs found. Add one above.</td>
                                </tr>
                            ) : (
                                jobs.map(job => (
                                    <tr key={job.id} className="hover:bg-gray-50 border-b last:border-0">
                                        <td className="p-4 font-medium">{job.title}</td>
                                        <td className="p-4 text-gray-600">{job.location}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                {job.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button onClick={() => handleEdit(job)} className="text-blue-600 hover:underline">Edit</button>
                                            <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageLayout>
    );
};

export default AdminJobs;
