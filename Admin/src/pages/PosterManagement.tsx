import React, { useState, useEffect } from 'react';

const PosterManagement = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHelper();
    }, []);

    const fetchHelper = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/poster');
            const data = await response.json();
            setImageUrl(data.imageUrl || '');
            setIsVisible(data.isVisible || false);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching poster settings:', error);
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('isVisible', String(isVisible));

            if (selectedFile) {
                formData.append('image', selectedFile);
            } else if (imageUrl) {
                // If no new file, send the existing URL (or updated text URL)
                formData.append('imageUrl', imageUrl);
            }

            const response = await fetch('http://localhost:5000/api/poster', {
                method: 'PUT',
                body: formData, // No Content-Type header when sending FormData; browser sets boundary
            });

            if (response.ok) {
                const data = await response.json();
                setImageUrl(data.imageUrl); // Update view with the returned (potentially new) URL
                setSelectedFile(null); // Clear selected file
                alert('Poster settings updated successfully!');
            } else {
                alert('Failed to update poster settings.');
            }
        } catch (error) {
            console.error('Error updating poster:', error);
            alert('Error updating poster.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Manage Poster Popup</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Poster Image URL (A4 Ratio Recommended)</label>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="https://example.com/poster.jpg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">OR Upload Poster Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="visible"
                        checked={isVisible}
                        onChange={(e) => setIsVisible(e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="visible" className="ml-2 block text-sm text-gray-900">
                        Enable Poster Popup on Site Startup
                    </label>
                </div>

                {(selectedFile || imageUrl) && (
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-700">Preview:</p>
                        <div className="border rounded p-2 inline-block bg-gray-50">
                            <img
                                src={selectedFile ? URL.createObjectURL(selectedFile) : imageUrl}
                                alt="Poster Preview"
                                className="max-w-xs h-auto shadow-md"
                                style={{ aspectRatio: '1 / 1.414' }}
                            />
                        </div>
                    </div>
                )}

                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-500/30"
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PosterManagement;
