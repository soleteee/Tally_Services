import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '../components/ScrollReveal';
import BlogModal from '../components/BlogModal';

type Blog = {
    _id: string;
    title: string;
    author: string;
    content: string;
    image?: string;
    youtubeUrl?: string;
    createdAt: string;
};

const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ isOpen, blog, onClose }) => {
    if (!isOpen || !blog) return null;

    const displayImage = getDisplayImage(blog);
    const blogLink = `${window.location.origin}/blogs?blog=${blog._id}`;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Link copied to clipboard!');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={onClose}>
            <div
                className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl my-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-primary mb-2">{blog.title}</h2>
                        <p className="text-sm text-gray-600">
                            By <span className="font-semibold">{blog.author}</span> on {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 text-4xl ml-4 flex-shrink-0"
                    >
                        ×
                    </button>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {displayImage && (
                            <div className="lg:col-span-1">
                                <img
                                    src={displayImage}
                                    alt={blog.title}
                                    className="w-full h-64 lg:h-96 object-cover rounded-lg"
                                />
                            </div>
                        )}
                        <div className={displayImage ? 'lg:col-span-2' : 'lg:col-span-3'}>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">{blog.content}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {blog.youtubeUrl && (
                                <button
                                    type="button"
                                    onClick={() => window.open(blog.youtubeUrl, '_blank', 'noopener,noreferrer')}
                                    className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition-colors"
                                >
                                    Watch Full Video on YouTube
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => copyToClipboard(blogLink)}
                                className={`inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 text-white font-semibold hover:bg-secondary/90 transition-colors ${!blog.youtubeUrl ? 'sm:col-span-2' : ''}`}
                            >
                                Copy Blog Link
                            </button>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-xs text-gray-600 font-semibold mb-2">Shareable Link for Backlinks:</p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-3 rounded border border-gray-300 gap-2">
                                <code className="text-sm text-gray-700 break-all flex-1 font-mono">{blogLink}</code>
                                <button
                                    type="button"
                                    onClick={() => copyToClipboard(blogLink)}
                                    className="px-3 py-1 bg-primary text-white text-xs font-medium rounded hover:bg-primary/90 transition-colors flex-shrink-0"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type BlogDetailModalProps = {
    isOpen: boolean;
    blog: Blog | null;
    onClose: () => void;
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

            const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
            if (pathParts.length >= 2 && ['shorts', 'embed', 'live'].includes(pathParts[0])) {
                const pathVideoId = pathParts[1];
                return pathVideoId && pathVideoId.length === 11 ? pathVideoId : null;
            }

            return null;
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

const Resources: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState<string>('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

    const getUniqueAuthors = (): string[] => {
        const authors = new Set(blogs.map(blog => blog.author));
        return Array.from(authors).sort();
    };

    const filterAndSortBlogs = () => {
        let filtered = blogs.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 blog.content.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesAuthor = selectedAuthor === '' || blog.author === selectedAuthor;
            return matchesSearch && matchesAuthor;
        });

        // Sort
        if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        } else if (sortBy === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        setFilteredBlogs(filtered);
    };

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

    useEffect(() => {
        filterAndSortBlogs();
    }, [blogs, searchQuery, selectedAuthor, sortBy]);

    useEffect(() => {
        if (blogs.length === 0) {
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const blogId = params.get('blog');
        if (!blogId) {
            return;
        }

        const matchedBlog = blogs.find((blog) => blog._id === blogId);
        if (matchedBlog) {
            setSelectedBlog(matchedBlog);
            setIsDetailModalOpen(true);
        }
    }, [blogs]);

    const openBlogDetails = (blog: Blog) => {
        setSelectedBlog(blog);
        setIsDetailModalOpen(true);

        const url = new URL(window.location.href);
        url.searchParams.set('blog', blog._id);
        window.history.pushState({}, '', `${url.pathname}${url.search}`);
    };

    const closeBlogDetails = () => {
        setIsDetailModalOpen(false);
        setSelectedBlog(null);

        const url = new URL(window.location.href);
        url.searchParams.delete('blog');
        const nextSearch = url.searchParams.toString();
        window.history.pushState({}, '', `${url.pathname}${nextSearch ? `?${nextSearch}` : ''}`);
    };

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

    const layouts = [
        { type: 'large', gridClass: 'md:col-span-2 md:row-span-2', imageClass: 'h-56 md:h-[220px] w-full', contentClass: 'p-6 flex flex-col flex-grow justify-between', descClass: 'line-clamp-4 md:line-clamp-3' },
        { type: 'small', gridClass: 'md:col-span-1 md:row-span-1', imageClass: 'h-56 md:hidden w-full', contentClass: 'p-6 flex flex-col flex-grow justify-between h-full', descClass: 'line-clamp-4 md:line-clamp-2' },
        { type: 'small', gridClass: 'md:col-span-1 md:row-span-1', imageClass: 'h-56 md:hidden w-full', contentClass: 'p-6 flex flex-col flex-grow justify-between h-full', descClass: 'line-clamp-4 md:line-clamp-2' },
        { type: 'small', gridClass: 'md:col-span-1 md:row-span-1', imageClass: 'h-56 md:hidden w-full', contentClass: 'p-6 flex flex-col flex-grow justify-between h-full', descClass: 'line-clamp-4 md:line-clamp-2' },
        { type: 'wide',  gridClass: 'md:col-span-2 md:row-span-1', imageClass: 'h-56 md:h-full md:w-[35%] flex-shrink-0', contentClass: 'p-6 flex flex-col flex-grow justify-between', descClass: 'line-clamp-4 md:line-clamp-2' },
        { type: 'small', gridClass: 'md:col-span-1 md:row-span-1', imageClass: 'h-56 md:hidden w-full', contentClass: 'p-6 flex flex-col flex-grow justify-between h-full', descClass: 'line-clamp-4 md:line-clamp-2' },
    ];

    const getBlogLayout = (index: number) => {
        return layouts[index % layouts.length];
    };

    const selectedBlogSchema = selectedBlog ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: selectedBlog.title,
        description: selectedBlog.content.slice(0, 160),
        image: getDisplayImage(selectedBlog) || undefined,
        author: {
            '@type': 'Person',
            name: selectedBlog.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Mittal Online Services',
        },
        datePublished: new Date(selectedBlog.createdAt).toISOString(),
        dateModified: new Date(selectedBlog.createdAt).toISOString(),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${window.location.origin}/blogs?blog=${selectedBlog._id}`,
        },
    } : {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Blogs',
        description: 'Stay updated with the latest in GST, Tally tips, and business guides.',
        url: `${window.location.origin}/blogs`,
    };

    return (
        <div className="pt-32 pb-20 px-5 max-w-[1200px] mx-auto min-h-screen relative">
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(selectedBlogSchema)}
                </script>
            </Helmet>

            <ScrollReveal animation="fade-up">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-primary text-center flex-grow">Blogs</h1>
                </div>

                <p className="text-lg text-center text-text/80 max-w-3xl mx-auto mb-8">
                    Stay updated with the latest in GST, Tally tips, and business guides.
                </p>

                {/* Search and Filter Section */}
                <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Search Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Search Blogs</label>
                            <input
                                type="text"
                                placeholder="Search by title or content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Author Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Author</label>
                            <select
                                value={selectedAuthor}
                                onChange={(e) => setSelectedAuthor(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">All Authors</option>
                                {getUniqueAuthors().map(author => (
                                    <option key={author} value={author}>{author}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="title">Title (A-Z)</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-gray-600">
                        Showing {filteredBlogs.length} of {blogs.length} blog{blogs.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[250px] gap-6">
                    {filteredBlogs.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            {blogs.length === 0 ? 'No blogs available yet. Be the first to write one!' : 'No blogs match your search.'}
                        </div>
                    ) : (
                        filteredBlogs.map((blog, index) => {
                            const displayImage = getDisplayImage(blog);
                            const layout = getBlogLayout(index);

                            return (
                                <div key={blog._id} className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex ${layout.type === 'wide' ? 'flex-col md:flex-row' : 'flex-col'} h-full ${layout.gridClass}`}>
                                    <button
                                        type="button"
                                        className={`bg-gray-200 relative text-left ${layout.imageClass} ${blog.youtubeUrl ? 'cursor-pointer' : ''}`}
                                        onClick={() => {
                                            if (blog.youtubeUrl) {
                                                window.open(blog.youtubeUrl, '_blank', 'noopener,noreferrer');
                                            }
                                        }}
                                        title={blog.youtubeUrl ? `Open video for ${blog.title}` : undefined}
                                    >
                                        {displayImage ? (
                                            <img src={displayImage} alt={blog.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                        {blog.youtubeUrl && (
                                            <div className="absolute top-3 right-3 rounded-full bg-black/70 text-white text-xs px-3 py-1">
                                                Watch on YouTube
                                            </div>
                                        )}
                                    </button>
                                    <div className={layout.contentClass}>
                                        <div>
                                            <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2 block">{blog.author}</span>
                                            <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">{blog.title}</h3>
                                            <p className={`text-text/70 mb-4 ${layout.descClass}`}>{blog.content}</p>
                                        </div>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-2 mt-auto">
                                            <button
                                                type="button"
                                                onClick={() => openBlogDetails(blog)}
                                                className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-white font-medium hover:bg-primary/90 transition-colors"
                                            >
                                                Read More
                                            </button>

                                            <div className="flex gap-2">
                                                {blog.youtubeUrl && (
                                                    <button
                                                        type="button"
                                                        onClick={() => window.open(blog.youtubeUrl, '_blank', 'noopener,noreferrer')}
                                                        className="flex-1 inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-white font-medium hover:bg-red-700 transition-colors text-sm"
                                                    >
                                                        Watch Video
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const blogUrl = `${window.location.origin}/blogs?blog=${blog._id}`;
                                                        navigator.clipboard.writeText(blogUrl);
                                                        alert('Blog link copied to clipboard!');
                                                    }}
                                                    className={`${blog.youtubeUrl ? 'flex-1' : 'w-full'} inline-flex items-center justify-center rounded-lg bg-secondary px-3 py-2 text-white font-medium hover:bg-secondary/90 transition-colors text-sm`}
                                                    title="Copy link for backlinks and sharing"
                                                >
                                                    Copy Link
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
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
                isOpen={isDetailModalOpen}
                blog={selectedBlog}
                onClose={closeBlogDetails}
            />
        </div>
    );
};

export default Resources;
