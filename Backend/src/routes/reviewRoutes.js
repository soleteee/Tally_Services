const express = require('express');

const router = express.Router();

const REVIEW_KEYWORDS = [
    'best tally dealer in meerut',
    'tally software in meerut',
    'best tally partner in meerut',
    'tally erp 9 in meerut',
    'tallyprime near me in meerut',
    'tally gst software in meerut',
    'buy tally in meerut',
    'best tally support in meerut',
    'best training of tally in meerut',
    'tally cloud in meerut'
];

const STYLE_HINTS = [
    'warm and thankful tone',
    'crisp and professional tone',
    'friendly and practical tone',
    'results-focused customer tone',
    'natural small-business owner tone'
];

const REVIEW_STYLE_GUIDE = [
    'Write like a real customer in India leaving a Google review.',
    'Keep the review natural, believable, and not overly promotional.',
    'Use only one or two SEO-rich phrases, never force all keywords.',
    'Keep the wording fresh on every generation and avoid repeating sentence structure.',
    'Stay within 20 to 30 words total.'
].join('\n');

const FEW_SHOT_EXAMPLES = [
    'Example 1: Quick support and smooth Tally setup made our work easier. The team explained everything clearly and responded on time, which really helped our business.',
    'Example 2: Very professional Tally service in Meerut. Their guidance was practical, fast, and reliable, and the overall experience felt genuinely helpful for our accounting needs.'
].join('\n');

const FALLBACK_OPENERS = [
    'Excellent support from Mittal Online Services',
    'Very professional service from Mittal Online Services',
    'We had a smooth experience with Mittal Online Services',
    'The team at Mittal Online Services was prompt and helpful'
];

const getWordCount = (text) =>
    text
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

const cleanReviewText = (text) => {
    const withoutQuotes = text.replace(/["“”]/g, '').replace(/\s+/g, ' ').trim();
    return withoutQuotes.replace(/[.!?;,:]+$/g, '.');
};

const isValidReviewLength = (text) => {
    const wc = getWordCount(text);
    return wc >= 20 && wc <= 30;
};

const buildFallbackReview = (keywords = [], promptText = '') => {
    const opener = FALLBACK_OPENERS[Math.floor(Math.random() * FALLBACK_OPENERS.length)];
    const keywordPhrase = keywords.length > 0
        ? keywords.slice(0, 2).join(' and ')
        : promptText.trim()
            ? 'quick Tally guidance'
            : 'practical support';

    const review = keywords.length > 0
        ? `${opener}. ${keywordPhrase} made our accounting work smoother, faster, and genuinely reliable for daily business operations.`
        : `${opener}. The team gave quick Tally guidance and practical support, which made our accounting work smoother, faster, and genuinely reliable overall.`;

    return cleanReviewText(review);
};

const findMatchingKeywords = (text) => {
    const normalizedText = text.toLowerCase();
    return REVIEW_KEYWORDS.filter((keyword) => normalizedText.includes(keyword.toLowerCase()));
};

const buildPrompt = ({ promptInput = '', selectedKeywords = [], mode = 'prompt' }) => {
    const randomStyle = STYLE_HINTS[Math.floor(Math.random() * STYLE_HINTS.length)];
    const randomSeed = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const matchedKeywords = mode === 'prompt' ? findMatchingKeywords(promptInput) : selectedKeywords;

    const instruction = mode === 'prompt'
        ? `Create a Google review for Mittal Online Services based on this user input: ${promptInput.trim()}. If the prompt contains any of these exact keywords, keep them in the review exactly as written: ${matchedKeywords.join(', ') || 'none'}. If the user prompt is short, expand it naturally without sounding repetitive.`
        : `Create a Google review for Mittal Online Services using these keywords exactly as written: ${selectedKeywords.join(', ')}. Keep the keywords unchanged, especially with "in meerut" phrasing, and make the result sound original.`;

    return [
        REVIEW_STYLE_GUIDE,
        FEW_SHOT_EXAMPLES,
        instruction,
        `Use ${randomStyle}.`,
        'Write in natural Indian English.',
        'Include SEO-friendly, trending business words where relevant, but keep it believable and human.',
        'Use only the selected keywords exactly as written, never rewrite or paraphrase them.',
        'Return exactly one review, exactly 24 words, plain text only.',
        'Do not use numbering, bullets, emojis, hashtags, or quotation marks.',
        `Uniqueness seed: ${randomSeed}`
    ].join('\n');
};

const callGemini = async (instruction) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('Gemini API key is missing. Set GEMINI_API_KEY in Backend/.env.');
    }

    const models = (process.env.GEMINI_MODEL || 'gemini-2.5-flash')
        .split(',')
        .map((model) => model.trim())
        .filter(Boolean);

    let lastErrorMessage = '';

    for (const model of models) {
        for (const variant of [
            instruction,
            `${instruction}\nRewrite the review to be between 20 and 30 words only. Keep it natural and different from the previous version.`,
            `${instruction}\nRewrite again. Make it exactly 22 to 26 words, conversational, believable, and concise.`
        ]) {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: 'user',
                                parts: [{ text: variant }]
                            }
                        ],
                        generationConfig: {
                            temperature: 1.1,
                            topP: 0.95,
                            topK: 40,
                            maxOutputTokens: 90
                        }
                    })
                }
            );

            if (!response.ok) {
                lastErrorMessage = await response.text();
                continue;
            }

            const data = await response.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const review = cleanReviewText(rawText);

            if (isValidReviewLength(review)) {
                return review;
            }

            lastErrorMessage = `Generated review had ${getWordCount(review)} words, expected 20-30.`;
        }
    }

    throw new Error(`Gemini request failed: ${lastErrorMessage || 'No supported model responded successfully.'}`);
};

router.post('/review-generator', async (req, res) => {
    const mode = req.body?.mode === 'keywords' ? 'keywords' : 'prompt';
    const promptInput = typeof req.body?.promptInput === 'string' ? req.body.promptInput : '';
    const selectedKeywords = Array.isArray(req.body?.selectedKeywords)
        ? req.body.selectedKeywords.filter((keyword) => typeof keyword === 'string')
        : [];

    try {
        const instruction = buildPrompt({ promptInput, selectedKeywords, mode });
        const review = await callGemini(instruction);

        if (mode === 'keywords') {
            const hasExactKeywords = selectedKeywords.every((keyword) =>
                review.toLowerCase().includes(keyword.toLowerCase())
            );

            if (!hasExactKeywords) {
                return res.status(200).json({
                    success: true,
                    review: buildFallbackReview(selectedKeywords)
                });
            }
        }

        if (mode === 'prompt') {
            const matchedKeywords = findMatchingKeywords(promptInput);
            const hasMatchedKeywords = matchedKeywords.every((keyword) =>
                review.toLowerCase().includes(keyword.toLowerCase())
            );

            if (!hasMatchedKeywords) {
                return res.status(200).json({
                    success: true,
                    review: buildFallbackReview(matchedKeywords, promptInput)
                });
            }
        }

        return res.status(200).json({
            success: true,
            review
        });
    } catch (error) {
        const fallbackKeywords = mode === 'keywords'
            ? selectedKeywords
            : findMatchingKeywords(promptInput);

        return res.status(200).json({
            success: true,
            review: buildFallbackReview(fallbackKeywords, promptInput)
        });
    }
});

module.exports = router;
