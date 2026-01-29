import { useState, useEffect } from 'react';
import PageLayout from '../layouts/PageLayout';
import JobApplicationModal from '../components/JobApplicationModal';
// import { Briefcase, MapPin, Clock } from 'lucide-react'; // Assuming we don't have lucide installed yet, sticking to basic layout or using available icons

interface Job {
    id: number;
    title: string;
    type: string;
    location: string;
    description: string;
    skills: string;
    date: string;
}

const Careers = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch jobs from local storage (simulated backend)
        const savedJobs = localStorage.getItem('company_jobs');
        if (savedJobs) {
            setJobs(JSON.parse(savedJobs));
        } else {
            // Fallback seed data if not yet initialized by admin
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
        }
    }, []);

    const handleApply = (jobTitle: string) => {
        setSelectedJob(jobTitle);
        setIsModalOpen(true);
    };

    return (
        <PageLayout title="Career Opportunities" sidebarType="none">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">Join Our Growing Team</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        At Mittal Online Services, we are always looking for talented individuals who are passionate about technology and business growth.
                    </p>
                </div>

                {jobs.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">No current openings. Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="p-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-primary mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full text-blue-700 font-medium">
                                                    📍 {job.location}
                                                </span>
                                                <span className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full text-green-700 font-medium">
                                                    🕒 {job.type}
                                                </span>
                                                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                                                    📅 Posted: {job.date}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleApply(job.title)}
                                            className="mt-4 md:mt-0 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                                        >
                                            Apply Now
                                        </button>
                                    </div>

                                    <div className="prose max-w-none text-gray-700">
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Job Description:</h4>
                                            <p className="whitespace-pre-line">{job.description}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Skills Required:</h4>
                                            <p>{job.skills}</p>
                                        </div>
                                    </div>
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
                        <p className="font-semibold">Email: hr@saraswatiaccountants.com</p>
                        <p className="font-semibold">Call/WhatsApp: 9891988066</p>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <JobApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                jobTitle={selectedJob || ''}
            />
        </PageLayout>
    );
};

export default Careers;
