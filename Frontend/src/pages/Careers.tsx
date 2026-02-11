import { useState, useEffect } from 'react';
import PageLayout from '../layouts/PageLayout';
import JobApplicationModal from '../components/JobApplicationModal';
import JobDetailsModal from '../components/JobDetailsModal';
import { MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';

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

const Careers = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/jobs');
                if (response.ok) {
                    const data = await response.json();
                    setJobs(data);
                } else {
                    console.error('Failed to fetch jobs');
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const openJobDetails = (job: Job) => {
        setSelectedJob(job);
        setIsDetailsModalOpen(true);
    };

    const openApplicationForm = () => {
        setIsApplicationModalOpen(true);
        // minimal details modal is closed by the component itself calling onClose then onApply, 
        // or we can ensure it here. The Modal component calls onClose then onApply.
    };

    return (
        <PageLayout title="Career Opportunities" sidebarType="none" showInquirySection={false}>
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">Join Our Growing Team</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        At Mittal Online Services, we are always looking for talented individuals who are passionate about technology and business growth.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading openings...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">No current openings. Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => openJobDetails(job)}
                                className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-100 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
                                            <p className="text-sm font-medium text-gray-500">{job.department}</p>
                                        </div>
                                        <div className="bg-blue-50 p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock size={16} className="text-gray-400" />
                                            <span>{job.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Briefcase size={16} className="text-gray-400" />
                                            <span>{job.experience}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-medium">
                                    <span className="text-gray-400">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                    <span className="text-blue-600 group-hover:underline">View Details</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-16 text-center bg-blue-50 p-8 rounded-xl">
                    <h3 className="text-xl font-bold text-primary mb-2">Don't see a suitable role?</h3>
                    <p className="text-gray-600 mb-6">
                        We are always interested in meeting great people. Send your resume directly to us.
                    </p>
                    <div className="space-y-2">
                        <p className="font-semibold">Email: mittalonline.services@gmail.com</p>
                        <p className="font-semibold">Call/WhatsApp: +91 9997952142</p>
                    </div>
                </div>
            </div>

            {/* Job Details Modal */}
            <JobDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                job={selectedJob}
                onApply={openApplicationForm}
            />

            {/* Application Form Modal */}
            <JobApplicationModal
                isOpen={isApplicationModalOpen}
                onClose={() => setIsApplicationModalOpen(false)}
                jobTitle={selectedJob?.title || ''}
            />
        </PageLayout>
    );
};

export default Careers;
