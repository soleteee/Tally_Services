import React from 'react';

interface Blog {
    _id: string;
    title: string;
    author: string;
    content: string;
    image?: string;
    youtubeUrl?: string;
    createdAt: string;
}

interface BlogDetailModalProps {
    blog: Blog | null;
    onClose: () => void;
}

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

const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ blog, onClose }) => {
    if (!blog) return null;

    const videoId = getYouTubeVideoId(blog.youtubeUrl);
    const displayImage = blog.image || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '');

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-zoom-in" onClick={(e) => e.stopPropagation()}>
                <div className="relative h-64 w-full">
                    {displayImage ? (
                        <img src={displayImage} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            No Image Available
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-colors font-bold z-10"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-4 text-sm text-text/60">
                        <span className="font-medium text-secondary">{blog.author}</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-primary mb-6">{blog.title}</h2>
                    {blog.youtubeUrl && (
                        <a
                            href={blog.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mb-6 rounded-lg bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 transition-colors"
                        >
                            Watch on YouTube
                        </a>
                    )}
                    <div className="prose max-w-none text-text/80 whitespace-pre-wrap leading-relaxed">
                        {blog.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailModal;
