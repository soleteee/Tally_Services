const Faq = require('../models/Faq');

const PAGE_KEYS = ['about', 'products'];
const MAX_ACTIVE_FAQS = 10;

const normalizePageKey = (pageKey) => String(pageKey || '').trim().toLowerCase();

const isSupportedPageKey = (pageKey) => PAGE_KEYS.includes(pageKey);

const getFaqList = async (pageKey, onlyActive = true) => {
    const query = {
        pageKey,
        ...(onlyActive ? { isActive: true } : {}),
    };

    return Faq.find(query)
        .sort({ sortOrder: 1, createdAt: 1 })
        .lean();
};

const countActiveFaqs = async (pageKey, excludeId = null) => {
    const query = {
        pageKey,
        isActive: true,
    };

    if (excludeId) {
        query._id = { $ne: excludeId };
    }

    return Faq.countDocuments(query);
};

const validateFaqPayload = (payload) => {
    const question = String(payload.question || '').trim();
    const answer = String(payload.answer || '').trim();
    const pageKey = normalizePageKey(payload.pageKey);
    const sortOrder = Number.isFinite(Number(payload.sortOrder)) ? Number(payload.sortOrder) : 0;
    const isActive = payload.isActive === true || payload.isActive === 'true';

    const errors = [];

    if (!isSupportedPageKey(pageKey)) {
        errors.push('pageKey must be about or products.');
    }

    if (!question) {
        errors.push('Question is required.');
    }

    if (!answer) {
        errors.push('Answer is required.');
    }

    return {
        errors,
        sanitized: {
            pageKey,
            question,
            answer,
            sortOrder,
            isActive,
        },
    };
};

exports.getPublicFaqs = async (req, res) => {
    try {
        const pageKey = normalizePageKey(req.params.pageKey);

        if (!isSupportedPageKey(pageKey)) {
            return res.status(404).json({
                success: false,
                message: `Unsupported FAQ page: ${pageKey}`,
            });
        }

        const faqs = await getFaqList(pageKey, true);
        return res.status(200).json({
            success: true,
            data: faqs.slice(0, MAX_ACTIVE_FAQS),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch FAQs',
            errors: [error.message || 'Unexpected server error while reading FAQs.'],
        });
    }
};

exports.getAdminFaqs = async (req, res) => {
    try {
        const pageKey = normalizePageKey(req.params.pageKey);

        if (!isSupportedPageKey(pageKey)) {
            return res.status(404).json({
                success: false,
                message: `Unsupported FAQ page: ${pageKey}`,
            });
        }

        const faqs = await getFaqList(pageKey, false);
        return res.status(200).json({
            success: true,
            data: faqs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch FAQ admin data',
            errors: [error.message || 'Unexpected server error while reading FAQ admin data.'],
        });
    }
};

exports.createFaq = async (req, res) => {
    try {
        const { errors, sanitized } = validateFaqPayload(req.body || {});
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'FAQ validation failed.',
                errors,
            });
        }

        if (sanitized.isActive) {
            const activeCount = await countActiveFaqs(sanitized.pageKey);
            if (activeCount >= MAX_ACTIVE_FAQS) {
                return res.status(400).json({
                    success: false,
                    message: `Only ${MAX_ACTIVE_FAQS} active FAQs are allowed per page.`,
                    errors: [`Deactivate one FAQ before activating another on ${sanitized.pageKey}.`],
                });
            }
        }

        const createdFaq = await Faq.create({
            ...sanitized,
            updatedBy: req.user?.id || 'unknown',
        });

        return res.status(201).json({
            success: true,
            data: createdFaq,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create FAQ',
            errors: [error.message || 'Unexpected server error while creating FAQ.'],
        });
    }
};

exports.updateFaq = async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found',
            });
        }

        const { errors, sanitized } = validateFaqPayload({
            pageKey: req.body?.pageKey || faq.pageKey,
            question: req.body?.question ?? faq.question,
            answer: req.body?.answer ?? faq.answer,
            sortOrder: req.body?.sortOrder ?? faq.sortOrder,
            isActive: req.body?.isActive ?? faq.isActive,
        });

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'FAQ validation failed.',
                errors,
            });
        }

        if (sanitized.isActive) {
            const activeCount = await countActiveFaqs(sanitized.pageKey, faq._id);
            if (activeCount >= MAX_ACTIVE_FAQS) {
                return res.status(400).json({
                    success: false,
                    message: `Only ${MAX_ACTIVE_FAQS} active FAQs are allowed per page.`,
                    errors: [`Deactivate one FAQ before activating another on ${sanitized.pageKey}.`],
                });
            }
        }

        faq.pageKey = sanitized.pageKey;
        faq.question = sanitized.question;
        faq.answer = sanitized.answer;
        faq.sortOrder = sanitized.sortOrder;
        faq.isActive = sanitized.isActive;
        faq.updatedBy = req.user?.id || faq.updatedBy || 'unknown';

        const updatedFaq = await faq.save();
        return res.status(200).json({
            success: true,
            data: updatedFaq,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update FAQ',
            errors: [error.message || 'Unexpected server error while updating FAQ.'],
        });
    }
};

exports.deleteFaq = async (req, res) => {
    try {
        const deletedFaq = await Faq.findByIdAndDelete(req.params.id);
        if (!deletedFaq) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'FAQ deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete FAQ',
            errors: [error.message || 'Unexpected server error while deleting FAQ.'],
        });
    }
};