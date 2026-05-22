import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import OurServices from '../components/OurServices';
import ScrollReveal from '../components/ScrollReveal';
import BusinessGrowth from '../components/BusinessGrowth';
import PhotoGallery from '../components/PhotoGallery';

type Blog = {
    _id: string;
    title: string;
    author: string;
    content: string;
    image?: string;
    youtubeUrl?: string;
    createdAt: string;
};

const getYouTubeVideoId = (urlValue?: string): string | null => {
    if (!urlValue) {
        return null;
    }

    try {
        const parsedUrl = new URL(urlValue);
        const host = parsedUrl.hostname.replace('www.', '');

        if (host === 'youtube.com' || host === 'm.youtube.com') {
            const videoId = parsedUrl.searchParams.get('v');
            if (videoId && videoId.length === 11) {
                return videoId;
            }
        }

        if (host === 'youtu.be') {
            const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0];
            return videoId && videoId.length === 11 ? videoId : null;
        }
    } catch (_error) {
        return null;
    }

    return null;
};

const getDisplayImage = (blog: Blog): string | null => {
    if (blog.image) {
        return blog.image;
    }

    const videoId = getYouTubeVideoId(blog.youtubeUrl);
    if (!videoId) {
        return null;
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const Home: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
                const data: Blog[] = await response.json();

                const latestBlogs = data
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 3);

                setBlogs(latestBlogs);
            } catch (error) {
                console.error('Error fetching latest blogs:', error);
            }
        };

        fetchLatestBlogs();
    }, []);

    const openBlogInBlogs = (blogId: string) => {
        navigate(`/blogs?blog=${blogId}`);
    };

    const copyBlogLink = (blogId: string) => {
        const blogUrl = `${window.location.origin}/blogs?blog=${blogId}`;
        navigator.clipboard.writeText(blogUrl);
        alert('Blog link copied to clipboard!');
    };

    return (
        <div className="w-full">
            <Header />
            <ScrollReveal animation="fade-up">
                <AboutUs />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
                <OurServices />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
                <PhotoGallery />
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
                <section className="py-16 px-5 max-w-[1200px] mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary">Latest Blogs</h2>
                        <button
                            type="button"
                            onClick={() => navigate('/blogs')}
                            className="text-secondary font-semibold hover:text-primary transition-colors"
                        >
                            View All
                        </button>
                    </div>

                    {blogs.length === 0 ? (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-600">
                            Blogs are loading...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {blogs.map((blog) => {
                                const displayImage = getDisplayImage(blog);

                                return (
                                    <article key={blog._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
                                        <div className="h-48 bg-gray-200">
                                            {displayImage ? (
                                                <img src={displayImage} alt={blog.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                            )}
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <p className="text-xs font-semibold text-accent uppercase mb-2">{blog.author}</p>
                                            <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">{blog.title}</h3>
                                            <p className="text-sm text-text/70 line-clamp-3 mb-4 flex-grow">{blog.content}</p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-auto">
                                                <button
                                                    type="button"
                                                    onClick={() => openBlogInBlogs(blog._id)}
                                                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-white font-medium hover:bg-primary/90 transition-colors"
                                                >
                                                    Read More
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => copyBlogLink(blog._id)}
                                                    className="inline-flex items-center justify-center rounded-lg bg-secondary px-4 py-2 text-white font-medium hover:bg-secondary/90 transition-colors"
                                                    title="Copy link for backlinks and sharing"
                                                >
                                                    Copy Link
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </ScrollReveal>

            <BusinessGrowth />

        </div>
    );
};

export default Home;
