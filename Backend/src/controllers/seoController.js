const Seo = require('../models/Seo');
const { SEO_PAGE_CATALOG, getCatalogPageByKey, canonicalUrlForPath } = require('../constants/seoCatalog');
const {
    normalizePageKey,
    sanitizeAndValidateSeoPayload,
} = require('../utils/seoValidation');
const { writeSeoSnapshot } = require('../utils/seoSnapshot');
const { triggerSeoPrerender } = require('../utils/seoPrerenderTrigger');

const toDto = (doc) => ({
    pageKey: doc.pageKey,
    pageName: doc.pageName,
    routePath: doc.routePath,
    title: doc.title,
    description: doc.description,
    keywords: doc.keywords,
    headTags: doc.headTags,
    schemaJson: doc.schemaJson,
    updatedBy: doc.updatedBy,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});

const buildSuggestedMetadata = (catalogPage) => ({
    pageKey: catalogPage.pageKey,
    pageName: catalogPage.pageName,
    routePath: catalogPage.routePath,
    title: `${catalogPage.pageName} | Tally Services`,
    description: `Learn more about ${catalogPage.pageName} at Tally Services.`,
    keywords: ['tally services', catalogPage.pageName.toLowerCase()],
    headTags: [
        `<link rel="canonical" href="${canonicalUrlForPath(catalogPage.routePath)}" />`,
        '<meta name="robots" content="index,follow,max-image-preview:large" />',
        `<meta property="og:title" content="${catalogPage.pageName} | Tally Services" />`,
        `<meta property="og:description" content="Learn more about ${catalogPage.pageName} at Tally Services." />`,
        `<meta property="og:url" content="${canonicalUrlForPath(catalogPage.routePath)}" />`,
        '<meta property="og:type" content="website" />',
        `<meta name="twitter:title" content="${catalogPage.pageName} | Tally Services" />`,
        `<meta name="twitter:description" content="Learn more about ${catalogPage.pageName} at Tally Services." />`,
        '<meta name="twitter:card" content="summary_large_image" />',
    ],
    schemaJson: '',
});

const writeSnapshotAndTriggerPrerender = async () => {
    const allSeoDocs = await Seo.find({}).sort({ pageKey: 1 }).lean();
    const snapshotWriteResult = await writeSeoSnapshot(allSeoDocs);

    const prerenderResult = await triggerSeoPrerender();
    if (!prerenderResult.ok) {
        console.warn('[SEO] Prerender refresh failed after save:', {
            code: prerenderResult.code,
            stderr: prerenderResult.stderr,
            stdout: prerenderResult.stdout,
        });
    }

    return {
        snapshotWriteResult,
        prerenderResult,
    };
};

exports.getSeoOverview = async (_req, res) => {
    try {
        const allSeoDocs = await Seo.find({}).sort({ updatedAt: -1 }).lean();

        return res.status(200).json({
            success: true,
            data: {
                totalConfiguredPages: allSeoDocs.length,
                catalogSize: SEO_PAGE_CATALOG.length,
                pages: allSeoDocs.map(toDto),
            },
        });
    } catch (_error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch SEO overview',
            errors: ['Could not read SEO overview data from database.'],
        });
    }
};

exports.getSeoPagesCatalog = async (_req, res) =>
    res.status(200).json({
        success: true,
        data: SEO_PAGE_CATALOG,
    });

exports.getSeoByPage = async (req, res) => {
    try {
        const pageKey = normalizePageKey(req.params.pageKey);
        const catalogPage = getCatalogPageByKey(pageKey);

        if (!catalogPage) {
            return res.status(404).json({
                success: false,
                message: `Unsupported page key: ${pageKey}`,
                errors: ['Use GET /api/seo/pages to list allowed page keys.'],
            });
        }

        const seoData = await Seo.findOne({ pageKey }).lean();
        if (!seoData) {
            return res.status(200).json({
                success: true,
                data: {
                    ...buildSuggestedMetadata(catalogPage),
                    exists: false,
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                ...toDto(seoData),
                exists: true,
            },
        });
    } catch (_error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch SEO metadata',
            errors: ['Unexpected server error while reading SEO metadata.'],
        });
    }
};

exports.suggestSeoByPage = async (req, res) => {
    const pageKey = normalizePageKey(req.params.pageKey);
    const catalogPage = getCatalogPageByKey(pageKey);

    if (!catalogPage) {
        return res.status(404).json({
            success: false,
            message: `Unsupported page key: ${pageKey}`,
            errors: ['Use GET /api/seo/pages to list allowed page keys.'],
        });
    }

    return res.status(200).json({
        success: true,
        data: buildSuggestedMetadata(catalogPage),
    });
};

exports.saveSeoByPage = async (req, res) => {
    try {
        const pageKey = normalizePageKey(req.params.pageKey);
        const validation = sanitizeAndValidateSeoPayload({
            pageKeyInput: pageKey,
            payload: req.body || {},
        });

        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'SEO validation failed. Please fix the listed issues.',
                errors: validation.errors,
            });
        }

        const update = {
            ...validation.sanitized,
            updatedBy: req.user?.id || 'unknown',
        };

        const seoData = await Seo.findOneAndUpdate(
            { pageKey: validation.sanitized.pageKey },
            update,
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        ).lean();

        const { snapshotWriteResult, prerenderResult } = await writeSnapshotAndTriggerPrerender();

        return res.status(200).json({
            success: true,
            message: prerenderResult.ok
                ? 'SEO metadata saved and prerender refreshed.'
                : 'SEO metadata saved, but prerender refresh reported warnings.',
            data: toDto(seoData),
            operations: {
                snapshotWrittenAt: snapshotWriteResult.snapshot.updatedAt,
                snapshotPaths: snapshotWriteResult.paths,
                prerender: {
                    ok: prerenderResult.ok,
                    code: prerenderResult.code,
                    stderr: prerenderResult.stderr,
                },
            },
        });
    } catch (_error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to save SEO metadata',
            errors: ['Unexpected server error while saving SEO metadata.'],
        });
    }
};

// Backward compatible aliases for older clients.
exports.upsertSeoByPage = exports.saveSeoByPage;
