import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import BlogModal from '../components/BlogModal';
import BlogDetailModal from '../components/BlogDetailModal';

const Resources: React.FC = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/blogs');
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleCreateBlog = async (blogData: any) => {
        try {
            const response = await fetch('http://localhost:5000/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData),
            });
            if (response.ok) {
                alert('Blog submitted for review!');
                // Since it needs approval, we don't refetch immediately or seeing it might depend on logic
                // usually we don't show it until approved.
            } else {
                alert('Failed to submit blog');
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            alert('Error creating blog');
        }
    };

    return (
        <div className="pt-32 pb-20 px-5 max-w-[1200px] mx-auto min-h-screen relative">
            <ScrollReveal animation="fade-up">
                <div className="flex justify-between items-center mb-6">
                    <div></div> {/* Spacer for centering the H1 if needed, or just flex alignment */}
                    <h1 className="text-4xl font-bold text-primary text-center flex-grow">Resources <span className="font-secondary">&</span> Blog</h1>
                    {/* Add Blog Button pinned to right as requested (in flow or absolute? "pinned to the right corner of the page") 
                         "page" usually means viewport or container. Let's put a Floating Action Button or a fixed button. 
                         User said "pinned to the right corner of the page". Fixed position is safest for "pinned".
                     */}
                </div>

                <p className="text-lg text-center text-text/80 max-w-3xl mx-auto mb-16">
                    Stay updated with the latest in GST, Tally tips, and business guides.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No blogs available yet. Be the first to write one!
                        </div>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col h-full">
                                <div className="h-48 w-full bg-gray-200 relative">
                                    {blog.image ? (
                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2 block">{blog.author}</span>
                                    <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">{blog.title}</h3>
                                    <p className="text-text/70 mb-4 line-clamp-3 flex-grow">{blog.content}</p>
                                    <button
                                        onClick={() => setSelectedBlog(blog)}
                                        className="text-secondary font-semibold hover:underline mt-auto self-start"
                                    >
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </ScrollReveal>

            {/* Pinned Add Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-10 right-10 bg-gradient-to-r from-primary to-secondary text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all z-[100] flex items-center justify-center text-2xl font-bold"
                title="Write a Blog"
            >
                +
            </button>

            <BlogModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateBlog}
            />

            <BlogDetailModal
                blog={selectedBlog}
                onClose={() => setSelectedBlog(null)}
            />
        </div>
    );
};

export default Resources;
