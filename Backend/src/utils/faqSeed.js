const Faq = require('../models/Faq');
const { FAQ_PAGE_CATALOG } = require('../constants/faqCatalog');

const ensureDefaultFaqs = async () => {
    for (const page of FAQ_PAGE_CATALOG) {
        const count = await Faq.countDocuments({ pageKey: page.pageKey });
        if (count > 0) {
            continue;
        }

        const docs = page.faqs.map((faq) => ({
            pageKey: page.pageKey,
            question: faq.question,
            answer: faq.answer,
            sortOrder: faq.sortOrder,
            isActive: true,
            updatedBy: 'system-seed',
        }));

        await Faq.insertMany(docs);
    }
};

module.exports = {
    ensureDefaultFaqs,
};