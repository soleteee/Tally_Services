import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: 'Admin', // Default to Admin
        content: '',
        image: '',
        youtubeUrl: '',
        status: 'approved' // Admins post approved blogs directly
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setImageFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = new FormData();
            payload.append('title', formData.title);
            payload.append('author', formData.author);
            payload.append('content', formData.content);
            payload.append('status', formData.status);
            payload.append('image', formData.image);
            payload.append('youtubeUrl', formData.youtubeUrl);
            if (imageFile) {
                payload.append('imageFile', imageFile);
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
                method: 'POST',
                body: payload,
            });

            if (response.ok) {
                alert('Blog posted successfully!');
                navigate('/');
            } else {
                alert('Failed to post blog');
            }
        } catch (error) {
            console.error('Error posting blog:', error);
            alert('Error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Add New Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Enter blog title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Author Name"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div>
                    <label htmlFor="blog-image-file" className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (Optional)</label>
                    <input
                        id="blog-image-file"
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                    <p className="mt-1 text-xs text-gray-500">If both Image URL and photo are provided, uploaded photo is used.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL (Optional)</label>
                    <input
                        type="url"
                        name="youtubeUrl"
                        value={formData.youtubeUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="https://www.youtube.com/watch?v=..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition h-64 resize-y"
                        placeholder="Write your blog content here..."
                    ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-6 py-2 mr-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-500/30"
                    >
                        Publish Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
