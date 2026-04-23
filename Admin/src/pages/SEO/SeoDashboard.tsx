import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import SeoForm, { type SeoFormValues } from './SeoForm';
import SeoPreview from './SeoPreview';
import { SEO_FALLBACK_PAGES, getFallbackPageByKey } from '../../constants/seoPages';
import { getToken } from '../../utils/auth';
import { validateHeadTags, validateSchemaJson } from '../../utils/seoValidation';

type SeoApiPayload = {
    title: string;
    description: string;
    keywords?: string;
    headTags?: string | string[];
    schemaJson?: string;
    updatedAt?: string;
    updatedBy?: string;
};

const normalizeHeadTagsInput = (input: string | string[] | undefined): string => {
    if (Array.isArray(input)) {
        return input
            .map((tag) => String(tag || '').trim())
            .filter(Boolean)
            .join('\n');
    }

    return String(input || '')
        .replace(/>\s*,+\s*</g, '>\n<')
        .split(/\r?\n/)
        .map((line) => {
            const trimmed = line.trim();
            const firstTagIndex = trimmed.indexOf('<');
            if (firstTagIndex === -1) {
                return trimmed;
            }
            return trimmed.slice(firstTagIndex).trim();
        })
        .filter(Boolean)
        .join('\n');
};

const emptyForm: SeoFormValues = {
    title: '',
    description: '',
    keywords: '',
    headTags: '',
    schemaJson: '',
};

const canonicalUrlForPath = (routePath: string) => `https://mittalonlineservices.com${routePath}`;

const getSuggestedValues = (pageKey: string): SeoFormValues => {
    const page = getFallbackPageByKey(pageKey);
    if (!page) {
        return emptyForm;
    }

    return {
        title: `${page.pageName} | Tally Services`,
        description: `Learn more about ${page.pageName} at Tally Services.`,
        keywords: `tally services, ${page.pageName.toLowerCase()}`,
        headTags: [
            `<link rel="canonical" href="${canonicalUrlForPath(page.routePath)}" />`,
            '<meta name="robots" content="index,follow,max-image-preview:large" />',
            `<meta property="og:title" content="${page.pageName} | Tally Services" />`,
            `<meta property="og:description" content="Learn more about ${page.pageName} at Tally Services." />`,
            `<meta property="og:url" content="${canonicalUrlForPath(page.routePath)}" />`,
            '<meta property="og:type" content="website" />',
            `<meta name="twitter:title" content="${page.pageName} | Tally Services" />`,
            `<meta name="twitter:description" content="Learn more about ${page.pageName} at Tally Services." />`,
            '<meta name="twitter:card" content="summary_large_image" />',
        ].join('\n'),
        schemaJson: '',
    };
};

const SeoDashboard = () => {
    const [selectedPage, setSelectedPage] = useState<string>(SEO_FALLBACK_PAGES[0].pageKey);
    const [values, setValues] = useState<SeoFormValues>(emptyForm);
    const [metadataInfo, setMetadataInfo] = useState<{ updatedAt?: string; updatedBy?: string; }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [apiErrors, setApiErrors] = useState<string[]>([]);

    const selectedPageConfig = useMemo(() => getFallbackPageByKey(selectedPage), [selectedPage]);

    const endpoint = useMemo(
        () => `${import.meta.env.VITE_API_URL}/api/seo/${selectedPage}`,
        [selectedPage]
    );

    const getHeaders = useCallback(() => {
        const token = getToken();
        return {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    }, []);

    const fetchSeoData = useCallback(async () => {
        setIsLoading(true);
        setApiErrors([]);
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: getHeaders(),
            });

            if (response.status === 404) {
                setValues(getSuggestedValues(selectedPage));
                setMetadataInfo({});
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
                headTags: normalizeHeadTagsInput(data.headTags),
                schemaJson: data.schemaJson || '',
            });
            setMetadataInfo({
                updatedAt: data.updatedAt,
                updatedBy: data.updatedBy,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load SEO data';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }, [endpoint, getHeaders, selectedPage]);

    useEffect(() => {
        fetchSeoData();
    }, [fetchSeoData]);

    const headTagsValidation = useMemo(() => validateHeadTags(values.headTags), [values.headTags]);
    const schemaJsonValidation = useMemo(() => validateSchemaJson(values.schemaJson), [values.schemaJson]);

    const frontendErrors = useMemo(
        () => [...headTagsValidation.errors, ...schemaJsonValidation.errors],
        [headTagsValidation, schemaJsonValidation]
    );

    const combinedErrors = useMemo(() => {
        const errors = [...apiErrors];
        for (const fe of frontendErrors) {
            if (!errors.includes(fe)) {
                errors.push(fe);
            }
        }
        return errors;
    }, [apiErrors, frontendErrors]);

    const handleChange = (field: keyof SeoFormValues, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        // Clear API errors when making edits so the user can see if frontend fixes them
        if (apiErrors.length > 0) {
            setApiErrors([]);
        }
    };

    const applySuggestedValues = () => {
        setValues(getSuggestedValues(selectedPage));
        setApiErrors([]);
        toast.success('Suggested SEO tags applied');
    };

    const clearCurrentValues = () => {
        setValues(emptyForm);
        setApiErrors([]);
        setMetadataInfo({});
    };

    const handleSave = async () => {
        if (frontendErrors.length > 0) {
            toast.error('Please fix validation errors before saving.');
            return;
        }

        setIsSaving(true);
        setApiErrors([]);
        try {
            const response = await fetch(`${endpoint}/save`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    ...values,
                    headTags: normalizeHeadTagsInput(values.headTags),
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                const errors = result.errors && Array.isArray(result.errors) && result.errors.length > 0
                    ? result.errors
                    : [result.message || 'Failed to save SEO data'];
                
                setApiErrors(errors);
                throw new Error(result.message || 'Failed to save SEO data');
            }

            toast.success('SEO data saved successfully');
            if (result.data) {
                setMetadataInfo({
                    updatedAt: result.data.updatedAt,
                    updatedBy: result.data.updatedBy,
                });
            }
            if (result.operations?.snapshotWrittenAt) {
                 setMetadataInfo(prev => ({ ...prev, updatedAt: result.operations.snapshotWrittenAt }));
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to save SEO data';
            toast.error(message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">SEO Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage SEO metadata based on real project pages.</p>
                </div>
                {metadataInfo.updatedAt && (
                    <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 flex flex-col items-end whitespace-nowrap">
                        <p>Last Saved: <span className="font-semibold">{new Date(metadataInfo.updatedAt).toLocaleString()}</span></p>
                        {metadataInfo.updatedBy && <p className="text-xs text-gray-500">By: {metadataInfo.updatedBy}</p>}
                    </div>
                )}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="max-w-sm">
                    <label htmlFor="seo-page" className="block text-sm font-medium text-gray-700 mb-1">Select Page</label>
                    <select
                        id="seo-page"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedPage}
                        onChange={(event) => setSelectedPage(event.target.value)}
                    >
                        {SEO_FALLBACK_PAGES.map((page) => (
                            <option key={page.pageKey} value={page.pageKey}>{page.pageName} ({page.routePath})</option>
                        ))}
                    </select>
                </div>
                <p className="mt-3 text-xs text-gray-600">
                    Current Route: <span className="font-medium">{selectedPageConfig?.routePath || '/'}</span>
                </p>
            </div>

            {combinedErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
                    <h3 className="text-sm font-bold text-red-800 mb-2">Please fix the following issues:</h3>
                    <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                        {combinedErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

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
                        hasErrors={combinedErrors.length > 0}
                        headTagsErrors={headTagsValidation.errors}
                        schemaJsonErrors={schemaJsonValidation.errors}
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
