const Seo = require('../models/Seo');

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const normalizePageSlug = (page) => String(page || '').trim().toLowerCase();

const validateSeoPayload = ({ title, description, keywords, headTags }) => {
    if (typeof title !== 'string' || title.trim().length === 0) {
        return 'Title is required';
    }

    if (title.trim().length > 60) {
        return 'Title cannot exceed 60 characters';
    }

    if (typeof description !== 'string' || description.trim().length === 0) {
        return 'Description is required';
    }

    if (description.trim().length > 160) {
        return 'Description cannot exceed 160 characters';
    }

    if (keywords !== undefined && typeof keywords !== 'string') {
        return 'Keywords must be a string';
    }

    if (headTags !== undefined && typeof headTags !== 'string') {
        return 'headTags must be a string';
    }

    return null;
};

exports.getSeoByPage = async (req, res) => {
    try {
        const page = normalizePageSlug(req.params.page);

        if (!slugPattern.test(page)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid page slug format',
            });
        }

        const seoData = await Seo.findOne({ page });

        if (!seoData) {
            return res.status(404).json({
                success: false,
                message: `SEO data not found for page: ${page}`,
            });
        }

        return res.status(200).json({
            success: true,
            data: seoData,
        });
    } catch (_error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch SEO data',
        });
    }
};

exports.upsertSeoByPage = async (req, res) => {
    try {
        const page = normalizePageSlug(req.params.page);

        if (!slugPattern.test(page)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid page slug format',
            });
        }

        const { title, description, keywords, headTags } = req.body;
        const validationError = validateSeoPayload({ title, description, keywords, headTags });

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        const update = {
            page,
            title: title.trim(),
            description: description.trim(),
            keywords: typeof keywords === 'string' ? keywords.trim() : '',
            headTags: typeof headTags === 'string' ? headTags.trim() : '',
        };

        const seoData = await Seo.findOneAndUpdate(
            { page },
            update,
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        );

        return res.status(200).json({
            success: true,
            data: seoData,
        });
    } catch (_error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to save SEO data',
        });
    }
};
