import React, { useState } from 'react';

interface BlogModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (blog: { title: string; author: string; content: string; image: string }) => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, author, content, image });
        // Reset form
        setTitle('');
        setAuthor('');
        setContent('');
        setImage('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-zoom-in">
                <div className="bg-primary p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Write a Blog</h2>
                    <button onClick={onClose} className="text-white hover:text-accent text-2xl">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">Blog Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            placeholder="Enter an engaging title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">Your Name</label>
                        <input
                            type="text"
                            required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            placeholder="Who is writing this?"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">Image URL</label>
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">Content</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-32 resize-none"
                            placeholder="Share your thoughts..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-text hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md hover:shadow-lg"
                        >
                            Submit for Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogModal;
