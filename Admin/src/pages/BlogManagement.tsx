import { useState, useEffect } from 'react';

type Blog = {
    _id: string;
    title: string;
    author: string;
    content: string;
    image?: string;
    youtubeUrl?: string;
    status: 'pending' | 'approved';
    createdAt: string;
};

const BlogManagement = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [editForm, setEditForm] = useState({
        title: '',
        content: '',
        image: '',
        youtubeUrl: '',
    });
    const [editImageFile, setEditImageFile] = useState<File | null>(null);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/admin/all`);
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}/approve`, { method: 'PATCH' });
            fetchBlogs(); // Refresh list
        } catch (error) {
            console.error('Error approving blog:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, { method: 'DELETE' });
            setBlogs(prev => prev.filter(blog => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
            fetchBlogs();
        }
    };

    const openEditModal = (blog: Blog) => {
        setEditingBlog(blog);
        setEditForm({
            title: blog.title || '',
            content: blog.content || '',
            image: blog.image || '',
            youtubeUrl: blog.youtubeUrl || '',
        });
        setEditImageFile(null);
    };

    const closeEditModal = () => {
        setEditingBlog(null);
        setEditImageFile(null);
    };

    const handleEditSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!editingBlog) {
            return;
        }

        try {
            const payload = new FormData();
            payload.append('title', editForm.title);
            payload.append('content', editForm.content);
            payload.append('image', editForm.image);
            payload.append('youtubeUrl', editForm.youtubeUrl);

            if (editImageFile) {
                payload.append('imageFile', editImageFile);
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${editingBlog._id}`, {
                method: 'PUT',
                body: payload,
            });

            if (!response.ok) {
                throw new Error('Failed to update blog');
            }

            closeEditModal();
            fetchBlogs();
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('Failed to update blog');
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Blog Management</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left font-medium text-gray-500 border-b">Title</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-500 border-b">Author</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-500 border-b">Status</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-500 border-b">Date</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-500 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b">{blog.title}</td>
                                <td className="py-3 px-4 border-b">{blog.author}</td>
                                <td className="py-3 px-4 border-b">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${blog.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {blog.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border-b">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-4 border-b flex gap-2">
                                    {blog.status === 'pending' && (
                                        <button
                                            onClick={() => handleApprove(blog._id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => openEditModal(blog)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingBlog && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="edit-blog-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    id="edit-blog-title"
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="edit-blog-content" className="block text-sm font-medium text-gray-700 mb-1">Blog Detail</label>
                                <textarea
                                    id="edit-blog-content"
                                    value={editForm.content}
                                    onChange={(e) => setEditForm((prev) => ({ ...prev, content: e.target.value }))}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-48"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                                <input
                                    type="url"
                                    value={editForm.image}
                                    onChange={(e) => setEditForm((prev) => ({ ...prev, image: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div>
                                <label htmlFor="edit-blog-image" className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (Optional)</label>
                                <input
                                    id="edit-blog-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setEditImageFile(e.target.files?.[0] || null)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                                <p className="mt-1 text-xs text-gray-500">If both URL and photo are provided, uploaded photo is used.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL (Optional)</label>
                                <input
                                    type="url"
                                    value={editForm.youtubeUrl}
                                    onChange={(e) => setEditForm((prev) => ({ ...prev, youtubeUrl: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 rounded-lg border border-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogManagement;
