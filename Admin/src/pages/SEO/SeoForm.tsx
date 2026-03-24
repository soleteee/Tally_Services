import { type ChangeEvent } from 'react';

export type SeoFormValues = {
    title: string;
    description: string;
    keywords: string;
    headTags: string;
};

type SeoFormProps = {
    values: SeoFormValues;
    onChange: (field: keyof SeoFormValues, value: string) => void;
    onSubmit: () => Promise<void>;
    onApplySuggested: () => void;
    onReset: () => void;
    isSaving: boolean;
};

const SeoForm = ({ values, onChange, onSubmit, onApplySuggested, onReset, isSaving }: SeoFormProps) => {
    const handleChange = (field: keyof SeoFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(field, event.target.value);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">SEO Details</h2>
            <p className="text-xs text-gray-500 mb-4">Edit and save meta tags for search engines. Use "Apply Suggested" to load recommended SEO defaults for the selected page.</p>
            <div className="space-y-4">
                <div>
                    <label htmlFor="seo-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        id="seo-title"
                        type="text"
                        value={values.title}
                        onChange={handleChange('title')}
                        maxLength={60}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Page title (max 60 chars)"
                    />
                    <p className="mt-1 text-xs text-gray-500">{values.title.length}/60</p>
                </div>

                <div>
                    <label htmlFor="seo-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        id="seo-description"
                        rows={4}
                        value={values.description}
                        onChange={handleChange('description')}
                        maxLength={160}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Meta description (max 160 chars)"
                    />
                    <p className="mt-1 text-xs text-gray-500">{values.description.length}/160</p>
                </div>

                <div>
                    <label htmlFor="seo-keywords" className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                    <input
                        id="seo-keywords"
                        type="text"
                        value={values.keywords}
                        onChange={handleChange('keywords')}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="keyword1, keyword2"
                    />
                </div>

                <div>
                    <label htmlFor="seo-head-tags" className="block text-sm font-medium text-gray-700 mb-1">Head Tags (optional)</label>
                    <textarea
                        id="seo-head-tags"
                        rows={6}
                        value={values.headTags}
                        onChange={handleChange('headTags')}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={'<meta name="robots" content="index,follow" />'}
                    />
                </div>

                <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={isSaving}
                            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving ? 'Saving...' : 'Save SEO'}
                        </button>
                        <button
                            type="button"
                            onClick={onApplySuggested}
                            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                        >
                            Apply Suggested
                        </button>
                        <button
                            type="button"
                            onClick={onReset}
                            className="inline-flex items-center rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300"
                        >
                            Clear Fields
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeoForm;
