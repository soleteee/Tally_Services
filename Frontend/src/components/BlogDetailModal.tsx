import React from 'react';

interface Blog {
    _id: string;
    title: string;
    author: string;
    content: string;
    image?: string;
    createdAt: string;
}

interface BlogDetailModalProps {
    blog: Blog | null;
    onClose: () => void;
}

const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ blog, onClose }) => {
    if (!blog) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-zoom-in" onClick={(e) => e.stopPropagation()}>
                <div className="relative h-64 w-full">
                    {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
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
                    <div className="prose max-w-none text-text/80 whitespace-pre-wrap leading-relaxed">
                        {blog.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailModal;
