import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { CheckCircle2, Edit2, Plus, Trash2, X } from 'lucide-react';
import { getToken } from '../utils/auth';

type Faq = {
    _id: string;
    pageKey: 'about' | 'products';
    question: string;
    answer: string;
    sortOrder: number;
    isActive: boolean;
    createdAt: string;
};

type FaqFormState = {
    pageKey: 'about' | 'products';
    question: string;
    answer: string;
    sortOrder: number;
    isActive: boolean;
};

const PAGE_OPTIONS: Array<{ value: 'about' | 'products'; label: string }> = [
    { value: 'about', label: 'About Page' },
    { value: 'products', label: 'Products Page' },
];

const MAX_ACTIVE_FAQS = 10;

const emptyForm = (pageKey: 'about' | 'products'): FaqFormState => ({
    pageKey,
    question: '',
    answer: '',
    sortOrder: 1,
    isActive: true,
});

const FAQManagement = () => {
    const [selectedPage, setSelectedPage] = useState<'about' | 'products'>('about');
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
    const [formData, setFormData] = useState<FaqFormState>(emptyForm('about'));

    const activeCount = useMemo(
        () => faqs.filter((faq) => faq.isActive).length,
        [faqs]
    );

    const getHeaders = () => {
        const token = getToken();
        return {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    };

    const fetchFaqs = async (pageKey: 'about' | 'products') => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/faqs/admin/${pageKey}`, {
                headers: getHeaders(),
            });
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to load FAQs');
            }

            setFaqs(Array.isArray(result.data) ? result.data : []);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load FAQs';
            toast.error(message);
            setFaqs([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs(selectedPage);
    }, [selectedPage]);

    const resetForm = (pageKey: 'about' | 'products' = selectedPage) => {
        setFormData(emptyForm(pageKey));
        setEditingFaq(null);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;

        if (type === 'checkbox' && event.target instanceof HTMLInputElement) {
            const checkbox = event.target as HTMLInputElement;
            setFormData((prev) => ({ ...prev, [name]: checkbox.checked }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'sortOrder' ? Number(value) : value,
        }));
    };

    const openCreateForm = () => {
        resetForm(selectedPage);
    };

    const openEditForm = (faq: Faq) => {
        setEditingFaq(faq);
        setFormData({
            pageKey: faq.pageKey,
            question: faq.question,
            answer: faq.answer,
            sortOrder: faq.sortOrder,
            isActive: faq.isActive,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = JSON.stringify(formData);
            const url = editingFaq
                ? `${import.meta.env.VITE_API_URL}/api/faqs/admin/${editingFaq._id}`
                : `${import.meta.env.VITE_API_URL}/api/faqs/admin`;
            const method = editingFaq ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: getHeaders(),
                body: payload,
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || result.errors?.[0] || 'Failed to save FAQ');
            }

            toast.success(editingFaq ? 'FAQ updated' : 'FAQ added');
            await fetchFaqs(formData.pageKey);
            resetForm(formData.pageKey);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to save FAQ';
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (faqId: string) => {
        if (!window.confirm('Delete this FAQ?')) {
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/faqs/admin/${faqId}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to delete FAQ');
            }

            toast.success('FAQ deleted');
            setFaqs((prev) => prev.filter((faq) => faq._id !== faqId));
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete FAQ';
            toast.error(message);
        }
    };

    const activeCapReached = activeCount >= MAX_ACTIVE_FAQS;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">FAQ Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage the About and Products FAQ sections from one place.</p>
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">Page</label>
                    <select
                        value={selectedPage}
                        onChange={(event) => setSelectedPage(event.target.value as 'about' | 'products')}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {PAGE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={openCreateForm}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
                    >
                        <Plus size={18} /> Add FAQ
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{PAGE_OPTIONS.find((option) => option.value === selectedPage)?.label}</h2>
                            <p className="text-sm text-gray-500">{activeCount} active of {MAX_ACTIVE_FAQS} allowed</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                            <p>Total FAQs: <span className="font-semibold text-gray-900">{faqs.length}</span></p>
                            {activeCapReached && <p className="text-red-600 font-medium">Active cap reached</p>}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="bg-white rounded-xl border border-gray-200 p-6 text-gray-500 shadow-sm">Loading FAQs...</div>
                    ) : faqs.length === 0 ? (
                        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500 shadow-sm">
                            No FAQs found for this page. Add the first one using the form.
                        </div>
                    ) : (
                        faqs.map((faq) => (
                            <div key={faq._id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${faq.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {faq.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">Order #{faq.sortOrder} • {faq.pageKey}</p>
                                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{faq.answer}</p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => openEditForm(faq)}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                        >
                                            <Edit2 size={16} /> Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(faq._id)}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit sticky top-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{editingFaq ? 'Edit FAQ' : 'Create FAQ'}</h2>
                            <p className="text-sm text-gray-500">Add or update a question and answer pair.</p>
                        </div>
                        {editingFaq && (
                            <button type="button" onClick={() => resetForm()} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Page</label>
                            <select
                                name="pageKey"
                                value={formData.pageKey}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {PAGE_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                            <input
                                type="text"
                                name="question"
                                value={formData.question}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type the FAQ question"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                            <textarea
                                name="answer"
                                value={formData.answer}
                                onChange={handleInputChange}
                                required
                                rows={6}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type the FAQ answer"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                                <input
                                    type="number"
                                    name="sortOrder"
                                    min={1}
                                    max={99}
                                    value={formData.sortOrder}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-end">
                                <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 w-full">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleInputChange}
                                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-green-600" />
                                        Active on live page
                                    </span>
                                </label>
                            </div>
                        </div>

                        {formData.isActive && activeCapReached && !editingFaq?.isActive && (
                            <p className="text-sm text-red-600">
                                Only {MAX_ACTIVE_FAQS} FAQs can be active at a time for each page. Save as inactive or deactivate another FAQ first.
                            </p>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => resetForm()}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700 transition-colors disabled:opacity-60"
                            >
                                {isSubmitting ? 'Saving...' : editingFaq ? 'Update FAQ' : 'Create FAQ'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FAQManagement;