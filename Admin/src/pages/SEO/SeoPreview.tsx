import type { SeoFormValues } from './SeoForm';

type SeoPreviewProps = {
    pageSlug: string;
    routePath: string;
    values: SeoFormValues;
};

const SeoPreview = ({ pageSlug, routePath, values }: SeoPreviewProps) => {
    const displayTitle = values.title || 'Your SEO title preview appears here';
    const displayDescription = values.description || 'Your SEO description preview appears here.';
    const canonicalUrl = `https://mittalonlineservices.com${routePath}`;

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">SERP Preview</h2>
                <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
                    <p className="text-sm text-green-700">{canonicalUrl}</p>
                    <p className="text-lg text-blue-700 leading-tight mt-1">{displayTitle}</p>
                    <p className="text-sm text-gray-700 mt-1">{displayDescription}</p>
                </div>
                <p className="text-xs text-gray-500 mt-3">Slug used in API: {pageSlug}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Head Tags Preview</h2>
                <pre className="rounded-lg bg-gray-900 text-gray-100 p-4 text-xs overflow-auto whitespace-pre-wrap">
{values.headTags || '<!-- Custom head tags will appear here -->'}
                </pre>
            </div>
        </div>
    );
};

export default SeoPreview;
