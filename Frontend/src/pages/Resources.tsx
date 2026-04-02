import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import BlogModal from '../components/BlogModal';
import BlogDetailModal from '../components/BlogDetailModal';

type Blog = {
    _id: string;
    title: string;
    author: string;
    content: string;
    image?: string;
    youtubeUrl?: string;
    createdAt: string;
};

const Resources: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleCreateBlog = async (blogData: { title: string; author: string; content: string; image: string; youtubeUrl: string }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
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

    const getBentoClassName = (index: number) => {
        const pattern = [
            'md:col-span-2 md:row-span-2',
            'md:col-span-1 md:row-span-1',
            'md:col-span-1 md:row-span-1',
            'md:col-span-1 md:row-span-1',
            'md:col-span-2 md:row-span-1',
            'md:col-span-1 md:row-span-1',
        ];

        return pattern[index % pattern.length];
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

                <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[220px] gap-6">
                    {blogs.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No blogs available yet. Be the first to write one!
                        </div>
                    ) : (
                        blogs.map((blog, index) => (
                            <div key={blog._id} className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col h-full ${getBentoClassName(index)}`}>
                                <div
                                    className={`w-full bg-gray-200 relative ${getBentoClassName(index).includes('md:row-span-2') ? 'h-64 md:h-full' : 'h-48 md:h-36'} ${blog.youtubeUrl ? 'cursor-pointer' : ''}`}
                                    onClick={() => {
                                        if (blog.youtubeUrl) {
                                            window.open(blog.youtubeUrl, '_blank', 'noopener,noreferrer');
                                        }
                                    }}
                                    title={blog.youtubeUrl ? `Open video for ${blog.title}` : undefined}
                                >
                                    {blog.image ? (
                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                    {blog.youtubeUrl && (
                                        <div className="absolute top-3 right-3 rounded-full bg-black/70 text-white text-xs px-3 py-1">
                                            Watch on YouTube
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2 block">{blog.author}</span>
                                    <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">{blog.title}</h3>
                                    <p className={`text-text/70 mb-4 flex-grow ${getBentoClassName(index).includes('md:row-span-2') ? 'line-clamp-6' : 'line-clamp-3'}`}>{blog.content}</p>
                                    <div className="mt-auto flex items-center justify-between gap-4">
                                        <button
                                            onClick={() => setSelectedBlog(blog)}
                                            className="text-secondary font-semibold hover:underline"
                                        >
                                            Read More →
                                        </button>
                                        {blog.youtubeUrl && (
                                            <a
                                                href={blog.youtubeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-primary hover:underline"
                                            >
                                                Open Video
                                            </a>
                                        )}
                                    </div>
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
