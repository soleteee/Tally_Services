import React, { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Sparkles,
    CheckCircle2,
    XCircle,
    UploadCloud,
    MessageCircle,
    X,
    Filter,
} from 'lucide-react';

export type CrochetProduct = {
    _id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    additionalImages?: string[];
    materials?: string;
    dimensions?: string;
    isAvailable: boolean;
    isCustomizable: boolean;
    featured?: boolean;
    sortOrder?: number;
    createdAt?: string;
};

const PRESET_CATEGORIES = [
    'Flowers & Bouquets',
    'Amigurumi & Toys',
    'Bags & Totes',
    'Home Decor',
    'Accessories & Keychains',
    'Wearables & Clothing',
    'Custom Gifts',
    'General',
];

const CrochetManagement: React.FC = () => {
    const [products, setProducts] = useState<CrochetProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<CrochetProduct | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Form fields
    const [formData, setFormData] = useState({
        name: '',
        category: 'Flowers & Bouquets',
        customCategory: '',
        description: '',
        imageUrl: '',
        materials: '100% Milk Cotton Yarn',
        dimensions: '',
        isAvailable: true,
        isCustomizable: true,
        featured: false,
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [existingAdditionalImages, setExistingAdditionalImages] = useState<string[]>([]);
    const [additionalUrlsText, setAdditionalUrlsText] = useState<string>('');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/crochet/admin/all`);
            if (!response.ok) {
                throw new Error('Failed to load crochet products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error: any) {
            console.error('Error fetching crochet products:', error);
            toast.error('Failed to load crochet products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            category: 'Flowers & Bouquets',
            customCategory: '',
            description: '',
            imageUrl: '',
            materials: '100% Milk Cotton Yarn',
            dimensions: '',
            isAvailable: true,
            isCustomizable: true,
            featured: false,
        });
        setImageFiles([]);
        setImagePreviews([]);
        setExistingAdditionalImages([]);
        setAdditionalUrlsText('');
        setIsModalOpen(true);
    };

    const openEditModal = (product: CrochetProduct) => {
        setEditingProduct(product);
        const isPreset = PRESET_CATEGORIES.includes(product.category);
        setFormData({
            name: product.name,
            category: isPreset ? product.category : 'Other',
            customCategory: isPreset ? '' : product.category,
            description: product.description,
            imageUrl: product.image && product.image.startsWith('http') ? product.image : '',
            materials: product.materials || '',
            dimensions: product.dimensions || '',
            isAvailable: product.isAvailable,
            isCustomizable: product.isCustomizable ?? true,
            featured: product.featured ?? false,
        });
        setImageFiles([]);
        setImagePreviews([]);
        setExistingAdditionalImages(product.additionalImages || []);
        setAdditionalUrlsText('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setImageFiles([]);
        setImagePreviews([]);
        setExistingAdditionalImages([]);
        setAdditionalUrlsText('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setImageFiles((prev) => [...prev, ...files]);
            const newPreviews = files.map((f) => URL.createObjectURL(f));
            setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const handleRemoveNewFile = (index: number) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (index: number) => {
        setExistingAdditionalImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setFormData((prev) => ({ ...prev, imageUrl: url }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error('Please enter a product name');
            return;
        }

        if (!formData.description.trim()) {
            toast.error('Please enter a product description');
            return;
        }

        if (!editingProduct && imageFiles.length === 0 && !formData.imageUrl.trim()) {
            toast.error('Please upload at least one image or provide an image URL');
            return;
        }

        const effectiveCategory =
            formData.category === 'Other'
                ? formData.customCategory.trim() || 'General'
                : formData.category;

        try {
            setSubmitting(true);
            const payload = new FormData();
            payload.append('name', formData.name.trim());
            payload.append('category', effectiveCategory);
            payload.append('description', formData.description.trim());
            payload.append('materials', formData.materials.trim());
            payload.append('dimensions', formData.dimensions.trim());
            payload.append('isAvailable', String(formData.isAvailable));
            payload.append('isCustomizable', String(formData.isCustomizable));
            payload.append('featured', String(formData.featured));

            if (formData.imageUrl.trim()) {
                payload.append('image', formData.imageUrl.trim());
            }

            // Append all uploaded image files
            imageFiles.forEach((file) => {
                payload.append('imageFile', file);
            });

            // Parse additional URLs if any
            const extraUrls = additionalUrlsText
                .split(/[\n,]/)
                .map((u) => u.trim())
                .filter(Boolean);
            const allAdditional = [...existingAdditionalImages, ...extraUrls];
            if (allAdditional.length > 0) {
                payload.append('additionalImages', JSON.stringify(allAdditional));
            }

            const url = editingProduct
                ? `${import.meta.env.VITE_API_URL}/api/crochet/${editingProduct._id}`
                : `${import.meta.env.VITE_API_URL}/api/crochet`;

            const method = editingProduct ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: payload,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Operation failed');
            }

            toast.success(
                editingProduct
                    ? 'Crochet product updated successfully!'
                    : 'New crochet product published successfully!'
            );
            closeModal();
            fetchProducts();
        } catch (error: any) {
            console.error('Error saving crochet product:', error);
            toast.error(error.message || 'Error saving product');
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/crochet/${id}/toggle`,
                { method: 'PATCH' }
            );

            if (!response.ok) throw new Error('Toggle failed');

            setProducts((prev) =>
                prev.map((p) => (p._id === id ? { ...p, isAvailable: !currentStatus } : p))
            );
            toast.success(
                !currentStatus
                    ? 'Product marked as Available'
                    : 'Product marked as Unavailable'
            );
        } catch (error) {
            console.error('Error toggling product status:', error);
            toast.error('Failed to change product status');
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/crochet/${id}`,
                { method: 'DELETE' }
            );

            if (!response.ok) throw new Error('Delete failed');

            setProducts((prev) => prev.filter((p) => p._id !== id));
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    };

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === 'All' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    const categoriesList = useMemo(() => {
        const unique = new Set(products.map((p) => p.category).filter(Boolean));
        return ['All', ...Array.from(unique)];
    }, [products]);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header banner */}
            <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2">
                        <Sparkles size={14} />
                        Handmade Crochet Showcase
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                        Crochet Products Management
                    </h1>
                    <p className="text-rose-100 text-sm md:text-base mt-1 max-w-xl">
                        Add and manage handcrafted creations displayed on the website. No pricing is
                        shown to visitors — buyers request quotations and customize via WhatsApp.
                    </p>
                </div>

                <button
                    onClick={openAddModal}
                    className="inline-flex items-center gap-2 bg-white text-rose-600 px-5 py-3 rounded-xl font-bold shadow-md hover:bg-rose-50 transition-all transform active:scale-95"
                >
                    <Plus size={18} />
                    Add New Product
                </button>
            </div>

            {/* Quick stats & search bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-72">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search creations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-1.5 text-sm">
                        <Filter size={16} className="text-gray-400 hidden sm:block" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                        >
                            {categoriesList.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 w-full md:w-auto justify-end">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                        Total: <b className="text-gray-800">{products.length}</b>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                        Available:{' '}
                        <b className="text-gray-800">
                            {products.filter((p) => p.isAvailable).length}
                        </b>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                        Featured:{' '}
                        <b className="text-gray-800">
                            {products.filter((p) => p.featured).length}
                        </b>
                    </span>
                </div>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="py-20 text-center">
                    <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Loading crochet collection...</p>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
                    <Sparkles size={40} className="mx-auto text-rose-400 mb-3" />
                    <h3 className="text-lg font-bold text-gray-800">No crochet products found</h3>
                    <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                        {searchTerm || selectedCategory !== 'All'
                            ? 'No products match your current search/filter.'
                            : 'You have not added any crochet products yet.'}
                    </p>
                    <button
                        onClick={openAddModal}
                        className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-semibold hover:bg-rose-700 transition"
                    >
                        Add Your First Creation
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        (e.target as HTMLImageElement).src =
                                            'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80';
                                    }}
                                />

                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-800 shadow-sm backdrop-blur-sm">
                                        {product.category}
                                    </span>
                                    {product.featured && (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
                                            <Sparkles size={11} /> Featured
                                        </span>
                                    )}
                                    {product.additionalImages && product.additionalImages.length > 0 && (
                                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-900/80 text-white shadow-sm backdrop-blur-sm">
                                            📷 {product.additionalImages.length + 1} photos
                                        </span>
                                    )}
                                </div>

                                <div className="absolute top-3 right-3">
                                    <button
                                        onClick={() =>
                                            handleToggleAvailability(product._id, product.isAvailable)
                                        }
                                        title={
                                            product.isAvailable
                                                ? 'Click to set Unavailable'
                                                : 'Click to set Available'
                                        }
                                        className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm transition-all flex items-center gap-1 ${
                                            product.isAvailable
                                                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                : 'bg-gray-700 text-gray-200 hover:bg-gray-800'
                                        }`}
                                    >
                                        {product.isAvailable ? (
                                            <>
                                                <CheckCircle2 size={12} /> Available
                                            </>
                                        ) : (
                                            <>
                                                <XCircle size={12} /> Hidden
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Custom Quote info chip (No price) */}
                                <div className="absolute bottom-3 left-3 right-3 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs flex items-center justify-between">
                                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                                        <MessageCircle size={13} /> Quotation via WhatsApp
                                    </span>
                                    <span className="text-gray-300">No fixed price</span>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                        {product.description}
                                    </p>

                                    {/* Specs tags */}
                                    <div className="flex flex-wrap gap-1.5 text-xs text-gray-600 mb-4">
                                        {product.materials && (
                                            <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                                🧶 {product.materials}
                                            </span>
                                        )}
                                        {product.dimensions && (
                                            <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                                📏 {product.dimensions}
                                            </span>
                                        )}
                                        {product.isCustomizable && (
                                            <span className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded-md font-medium">
                                                🎨 Customizable
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                                    <button
                                        onClick={() => openEditModal(product)}
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-semibold transition"
                                    >
                                        <Edit size={14} /> Edit Details
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id, product.name)}
                                        className="inline-flex items-center justify-center p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                        title="Delete product"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Add / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                                    <Sparkles size={18} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {editingProduct ? 'Edit Crochet Product' : 'Add New Crochet Creation'}
                                </h2>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Notice about pricing */}
                            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                                <Sparkles size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong className="font-bold">WhatsApp Quotation Flow:</strong> Per your
                                    website requirements, products do not display a price. Customers click a
                                    pre-filled WhatsApp button to request a custom quote and confirm their
                                    order.
                                </div>
                            </div>

                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    placeholder="e.g., Handcrafted Sunflower Crochet Pot"
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                                />
                            </div>

                            {/* Category Selection */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                category: e.target.value,
                                            }))
                                        }
                                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                                    >
                                        {PRESET_CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                        <option value="Other">Other (Custom Category)</option>
                                    </select>
                                </div>

                                {formData.category === 'Other' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Custom Category Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.customCategory}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    customCategory: e.target.value,
                                                }))
                                            }
                                            placeholder="e.g. Baby Blankets"
                                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Photo Upload & Image URL (Multiple photos supported) */}
                            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-semibold text-gray-800">
                                        Product Photos <span className="text-red-500">*</span>
                                    </label>
                                    <span className="text-xs bg-rose-50 text-rose-600 font-semibold px-2 py-0.5 rounded-full">
                                        Multiple photos supported
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Upload file */}
                                    <div>
                                        <span className="text-xs font-medium text-gray-600 block mb-1">
                                            Upload from Computer (Choose multiple)
                                        </span>
                                        <label className="border-2 border-dashed border-gray-300 hover:border-rose-400 bg-white rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition text-center h-28">
                                            <UploadCloud size={24} className="text-rose-500 mb-1" />
                                            <span className="text-xs font-semibold text-gray-700">
                                                {imageFiles.length > 0
                                                    ? `${imageFiles.length} photo(s) selected`
                                                    : 'Choose Image File(s)'}
                                            </span>
                                            <span className="text-[11px] text-gray-400">PNG, JPG, WEBP (Select one or more)</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    {/* Direct URL */}
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-xs font-medium text-gray-600 block mb-1">
                                                Primary Image URL
                                            </span>
                                            <input
                                                type="url"
                                                value={formData.imageUrl}
                                                onChange={handleImageUrlChange}
                                                placeholder="https://images.unsplash.com/..."
                                                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-600 block mb-1">
                                                Additional Image URLs (one per line or comma-separated)
                                            </span>
                                            <textarea
                                                rows={2}
                                                value={additionalUrlsText}
                                                onChange={(e) => setAdditionalUrlsText(e.target.value)}
                                                placeholder="https://...&#10;https://..."
                                                className="w-full px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Previews Grid */}
                                {(imagePreviews.length > 0 ||
                                    existingAdditionalImages.length > 0 ||
                                    formData.imageUrl ||
                                    (editingProduct && editingProduct.image)) && (
                                    <div className="pt-2 border-t border-gray-200">
                                        <p className="text-xs font-semibold text-gray-700 mb-2">
                                            Product Photos:
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {/* Existing primary image in edit mode */}
                                            {editingProduct && editingProduct.image && imagePreviews.length === 0 && !formData.imageUrl && (
                                                <div className="relative group w-20 h-20 rounded-lg overflow-hidden border-2 border-rose-400 shadow-sm">
                                                    <img
                                                        src={editingProduct.image}
                                                        alt="Current Primary"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <span className="absolute bottom-0 inset-x-0 bg-rose-600 text-white text-[9px] text-center font-bold py-0.5">
                                                        Primary
                                                    </span>
                                                </div>
                                            )}

                                            {/* Primary URL preview */}
                                            {formData.imageUrl && (
                                                <div className="relative group w-20 h-20 rounded-lg overflow-hidden border-2 border-rose-400 shadow-sm">
                                                    <img
                                                        src={formData.imageUrl}
                                                        alt="URL Primary"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <span className="absolute bottom-0 inset-x-0 bg-rose-600 text-white text-[9px] text-center font-bold py-0.5">
                                                        Primary URL
                                                    </span>
                                                </div>
                                            )}

                                            {/* Newly uploaded previews */}
                                            {imagePreviews.map((src, idx) => (
                                                <div
                                                    key={`new-${idx}`}
                                                    className="relative group w-20 h-20 rounded-lg overflow-hidden border border-gray-300 shadow-sm"
                                                >
                                                    <img
                                                        src={src}
                                                        alt={`New upload ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <span className="absolute bottom-0 inset-x-0 bg-gray-900/80 text-white text-[9px] text-center font-bold py-0.5">
                                                        {idx === 0 && !formData.imageUrl ? 'Main' : `Photo ${idx + 1}`}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveNewFile(idx)}
                                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 shadow hover:bg-red-700 transition"
                                                        title="Remove photo"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}

                                            {/* Existing additional images in edit mode */}
                                            {existingAdditionalImages.map((url, idx) => (
                                                <div
                                                    key={`exist-${idx}`}
                                                    className="relative group w-20 h-20 rounded-lg overflow-hidden border border-gray-300 shadow-sm"
                                                >
                                                    <img
                                                        src={url}
                                                        alt={`Additional ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <span className="absolute bottom-0 inset-x-0 bg-blue-600 text-white text-[9px] text-center font-bold py-0.5">
                                                        Extra
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveExistingImage(idx)}
                                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 shadow hover:bg-red-700 transition"
                                                        title="Remove photo"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Product Details & Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    placeholder="Describe the product: pattern details, touch, what makes it special, occasion suitability..."
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                                />
                            </div>

                            {/* Materials & Dimensions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Materials Used
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.materials}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                materials: e.target.value,
                                            }))
                                        }
                                        placeholder="e.g., 100% Cotton Yarn, Fiberfill"
                                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Dimensions / Size
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.dimensions}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                dimensions: e.target.value,
                                            }))
                                        }
                                        placeholder="e.g., Height: 20cm, Width: 12cm"
                                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Checkbox Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={formData.isAvailable}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                isAvailable: e.target.checked,
                                            }))
                                        }
                                        className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                    />
                                    <span className="text-xs font-semibold text-gray-800">
                                        Show on Website
                                    </span>
                                </label>

                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={formData.isCustomizable}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                isCustomizable: e.target.checked,
                                            }))
                                        }
                                        className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                    />
                                    <span className="text-xs font-semibold text-gray-800">
                                        Custom Colors/Sizes
                                    </span>
                                </label>

                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                featured: e.target.checked,
                                            }))
                                        }
                                        className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                    />
                                    <span className="text-xs font-semibold text-gray-800">
                                        Featured Item ⭐
                                    </span>
                                </label>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
                                >
                                    {submitting && (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    )}
                                    {editingProduct ? 'Save Changes' : 'Publish Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrochetManagement;
