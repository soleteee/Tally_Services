import { useState, useEffect } from 'react';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState<any[]>([]);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/blogs/admin/all');
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
            await fetch(`http://localhost:5000/api/blogs/${id}/approve`, { method: 'PATCH' });
            fetchBlogs(); // Refresh list
        } catch (error) {
            console.error('Error approving blog:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:5000/api/blogs/${id}`, { method: 'DELETE' });
            setBlogs(prev => prev.filter(blog => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
            fetchBlogs();
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
        </div>
    );
};

export default BlogManagement;
