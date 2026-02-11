import React from 'react';
import { X, Briefcase, MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';

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
    createdAt: string;
}

interface JobDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    job: Job | null;
    onApply: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ isOpen, onClose, job, onApply }) => {
    if (!isOpen || !job) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="bg-white p-6 border-b flex justify-between items-start sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                        <p className="text-primary font-medium mt-1">{job.department}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        <span className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full text-blue-700 text-sm font-medium border border-blue-100">
                            <MapPin size={16} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full text-green-700 text-sm font-medium border border-green-100">
                            <Clock size={16} /> {job.type}
                        </span>
                        <span className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-full text-purple-700 text-sm font-medium border border-purple-100">
                            <Briefcase size={16} /> {job.experience}
                        </span>
                        {job.salaryRange && (
                            <span className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full text-yellow-700 text-sm font-medium border border-yellow-100">
                                ₹ {job.salaryRange}
                            </span>
                        )}
                        <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 text-sm border border-gray-200">
                            <Calendar size={16} /> Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Job Description</h3>
                        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                            {job.description}
                        </p>
                    </div>

                    {/* Responsibilities */}
                    {job.responsibilities && job.responsibilities.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Responsibilities</h3>
                            <ul className="space-y-2">
                                {job.responsibilities.map((item, index) => (
                                    <li key={index} className="flex gap-3 text-gray-600">
                                        <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Requirements */}
                    {job.requirements && job.requirements.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Requirements & Skills</h3>
                            <ul className="space-y-2">
                                {job.requirements.map((item, index) => (
                                    <li key={index} className="flex gap-3 text-gray-600">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            onApply();
                        }}
                        className="px-8 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Apply for this Role
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsModal;
