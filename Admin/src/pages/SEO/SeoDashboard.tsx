import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import SeoForm, { type SeoFormValues } from './SeoForm';
import SeoPreview from './SeoPreview';
import { SEO_PAGES, buildDefaultHeadTags, getSeoPageBySlug, type SeoPage } from '../../constants/seoPages';
import { getToken } from '../../utils/auth';

type SeoApiPayload = {
    title: string;
    description: string;
    keywords?: string;
    headTags?: string;
};

const emptyForm: SeoFormValues = {
    title: '',
    description: '',
    keywords: '',
    headTags: '',
};

const getSuggestedValues = (slug: SeoPage): SeoFormValues => {
    const page = getSeoPageBySlug(slug);
    if (!page) {
        return emptyForm;
    }

    return {
        title: page.defaultTitle,
        description: page.defaultDescription,
        keywords: page.defaultKeywords,
        headTags: buildDefaultHeadTags(page),
    };
};

const SeoDashboard = () => {
    const [selectedPage, setSelectedPage] = useState<SeoPage>(SEO_PAGES[0].slug);
    const [values, setValues] = useState<SeoFormValues>(emptyForm);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const selectedPageConfig = useMemo(() => getSeoPageBySlug(selectedPage), [selectedPage]);

    const endpoint = useMemo(
        () => `${import.meta.env.VITE_API_URL}/api/seo/${selectedPage}`,
        [selectedPage]
    );

    const getHeaders = () => {
        const token = getToken();
        return {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    };

    const fetchSeoData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: getHeaders(),
            });

            if (response.status === 404) {
                setValues(getSuggestedValues(selectedPage));
                return;
            }

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to fetch SEO data');
            }

            const data = result.data as SeoApiPayload;
            setValues({
                title: data.title || '',
                description: data.description || '',
                keywords: data.keywords || '',
                headTags: data.headTags || '',
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load SEO data';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSeoData();
    }, [endpoint]);

    const handleChange = (field: keyof SeoFormValues, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const applySuggestedValues = () => {
        setValues(getSuggestedValues(selectedPage));
        toast.success('Suggested SEO tags applied');
    };

    const clearCurrentValues = () => {
        setValues(emptyForm);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to save SEO data');
            }

            toast.success('SEO data saved successfully');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to save SEO data';
            toast.error(message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">SEO Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Manage SEO metadata based on real project pages.</p>
                <div className="mt-4 max-w-sm">
                    <label htmlFor="seo-page" className="block text-sm font-medium text-gray-700 mb-1">Select Page</label>
                    <select
                        id="seo-page"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedPage}
                        onChange={(event) => setSelectedPage(event.target.value as SeoPage)}
                    >
                        {SEO_PAGES.map((page) => (
                            <option key={page.slug} value={page.slug}>{page.label} ({page.routePath})</option>
                        ))}
                    </select>
                </div>
                <p className="mt-3 text-xs text-gray-600">
                    Current Route: <span className="font-medium">{selectedPageConfig?.routePath || '/'}</span>
                </p>
            </div>

            {isLoading ? (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-gray-600">Loading SEO data...</div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <SeoForm
                        values={values}
                        onChange={handleChange}
                        onSubmit={handleSave}
                        onApplySuggested={applySuggestedValues}
                        onReset={clearCurrentValues}
                        isSaving={isSaving}
                    />
                    <SeoPreview
                        pageSlug={selectedPage}
                        routePath={selectedPageConfig?.routePath || '/'}
                        values={values}
                    />
                </div>
            )}
        </div>
    );
};

export default SeoDashboard;
