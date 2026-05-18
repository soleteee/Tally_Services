import React, { useMemo, useState } from 'react';
import { ExternalLink, RefreshCw, Sparkles, CopyCheck } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

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

const findMatchingKeywords = (text: string): string[] => {
    const normalizedText = text.toLowerCase();
    return REVIEW_KEYWORDS.filter((keyword) => normalizedText.includes(keyword.toLowerCase()));
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const GOOGLE_REVIEW_URL =
    import.meta.env.VITE_GOOGLE_REVIEW_URL ||
    'https://g.page/r/CY3k8K3vWNaHEAI/review';

const getWordCount = (text: string): number =>
    text
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

const cleanReviewText = (text: string): string => {
    const withoutQuotes = text.replace(/["“”]/g, '').replace(/\s+/g, ' ').trim();
    return withoutQuotes.replace(/[.!?;,:]+$/g, '.');
};

const FALLBACK_OPENERS = [
    'Excellent support from Mittal Online Services',
    'Very professional service from Mittal Online Services',
    'We had a smooth experience with Mittal Online Services',
    'The team at Mittal Online Services was prompt and helpful'
];

const buildFallbackReview = (keywords: string[] = [], promptText = ''): string => {
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

const ReviewGenerator: React.FC = () => {
    const [promptInput, setPromptInput] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

    const [promptReview, setPromptReview] = useState('');
    const [keywordReview, setKeywordReview] = useState('');

    const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
    const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);

    const [promptError, setPromptError] = useState('');
    const [keywordError, setKeywordError] = useState('');

    const [copiedType, setCopiedType] = useState<'prompt' | 'keywords' | null>(null);

    const keywordSelectionText = useMemo(() => {
        if (selectedKeywords.length === 0) return 'No keywords selected';
        return selectedKeywords.join(', ');
    }, [selectedKeywords]);

    const toggleKeyword = (keyword: string) => {
        setKeywordError('');

        if (selectedKeywords.includes(keyword)) {
            setSelectedKeywords((prev) => prev.filter((k) => k !== keyword));
            return;
        }

        if (selectedKeywords.length >= 6) {
            setKeywordError('You can select maximum 6 keywords.');
            return;
        }

        setSelectedKeywords((prev) => [...prev, keyword]);
    };

    const callReviewApi = async (payload: { mode: 'prompt' | 'keywords'; promptInput?: string; selectedKeywords?: string[] }): Promise<string> => {
        const response = await fetch(`${API_BASE_URL}/api/review-generator`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        return cleanReviewText(data?.review || '');
    };

    const generateFromPrompt = async () => {
        setPromptError('');

        if (!promptInput.trim()) {
            setPromptError('Please enter your review idea first.');
            return;
        }

        const matchedKeywords = findMatchingKeywords(promptInput);

        setIsGeneratingPrompt(true);
        try {
            const review = await callReviewApi({
                mode: 'prompt',
                promptInput: promptInput.trim()
            });
            const hasMatchedKeywords = matchedKeywords.every((keyword) =>
                review.toLowerCase().includes(keyword.toLowerCase())
            );

            setPromptReview(hasMatchedKeywords ? review : buildFallbackReview(matchedKeywords, promptInput));
        } catch (error) {
            setPromptReview(buildFallbackReview(matchedKeywords, promptInput));
        } finally {
            setIsGeneratingPrompt(false);
        }
    };

    const generateFromKeywords = async () => {
        setKeywordError('');

        if (selectedKeywords.length < 2 || selectedKeywords.length > 6) {
            setKeywordError('Please select at least 2 and at most 6 keywords.');
            return;
        }

        setIsGeneratingKeywords(true);
        try {
            const review = await callReviewApi({
                mode: 'keywords',
                selectedKeywords
            });
            const hasExactKeywords = selectedKeywords.every((keyword) =>
                review.toLowerCase().includes(keyword.toLowerCase())
            );

            setKeywordReview(hasExactKeywords ? review : buildFallbackReview(selectedKeywords));
        } catch (error) {
            setKeywordReview(buildFallbackReview(selectedKeywords));
        } finally {
            setIsGeneratingKeywords(false);
        }
    };

    const copyAndRedirect = async (text: string, type: 'prompt' | 'keywords') => {
        if (!text.trim()) return;

        try {
            await navigator.clipboard.writeText(text);
            setCopiedType(type);
            setTimeout(() => setCopiedType(null), 1800);
        } catch {
            // Silent fallback when clipboard is unavailable.
        }

        window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="pt-32 pb-20 px-5 max-w-[1200px] mx-auto">
            <ScrollReveal animation="fade-up">
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                        <Sparkles size={16} />
                        AI Review Assistant
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mt-5 mb-4">Generate Your Google Review</h1>
                    <p className="text-lg text-text/80 max-w-3xl mx-auto leading-relaxed">
                        Mittal Online Services helps businesses with trusted Tally solutions, expert support, and long-term consultancy.
                        Use this smart page to create short, realistic and impactful Google reviews in Indian English.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <ScrollReveal animation="slide-left" delay={80}>
                    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-primary mb-2">Generate Your Review</h2>
                        <p className="text-text/80 mb-5">
                            Enter your raw thought and generate a polished 20-30 word review with trending, SEO-friendly words.
                        </p>

                        <label className="block text-sm font-semibold text-text mb-2">Your prompt</label>
                        <textarea
                            value={promptInput}
                            onChange={(e) => setPromptInput(e.target.value)}
                            rows={5}
                            placeholder="Example: I got very quick Tally support, GST filing became smooth, and the team explained everything clearly."
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />

                        {promptError && <p className="text-red-600 text-sm mt-3">{promptError}</p>}

                        <div className="flex flex-wrap gap-3 mt-5">
                            <button
                                onClick={generateFromPrompt}
                                disabled={isGeneratingPrompt}
                                className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-60"
                            >
                                {isGeneratingPrompt ? 'Generating...' : 'Generate Review'}
                            </button>

                            <button
                                onClick={generateFromPrompt}
                                disabled={isGeneratingPrompt || !promptReview}
                                className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2.5 rounded-lg font-semibold hover:bg-primary/5 disabled:opacity-60"
                            >
                                <RefreshCw size={16} />
                                Regenerate
                            </button>
                        </div>

                        {promptReview && (
                            <div className="mt-6 bg-bg rounded-xl p-4 border border-gray-200">
                                <p className="text-text leading-relaxed">{promptReview}</p>
                                <p className="text-xs text-text/60 mt-3">Word count: {getWordCount(promptReview)}</p>

                                <button
                                    onClick={() => copyAndRedirect(promptReview, 'prompt')}
                                    className="mt-4 inline-flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-lg font-semibold hover:opacity-90"
                                >
                                    {copiedType === 'prompt' ? <CopyCheck size={16} /> : <ExternalLink size={16} />}
                                    Go To Google Review
                                </button>
                            </div>
                        )}
                    </section>
                </ScrollReveal>

                <ScrollReveal animation="slide-right" delay={120}>
                    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-primary mb-2">Make Reviews Using Keywords</h2>
                        <p className="text-text/80 mb-4">
                            Select 2 to 6 keywords and generate a unique review every time.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {REVIEW_KEYWORDS.map((keyword) => {
                                const isActive = selectedKeywords.includes(keyword);
                                return (
                                    <button
                                        key={keyword}
                                        onClick={() => toggleKeyword(keyword)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                            isActive
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white text-text border-gray-300 hover:border-primary/50'
                                        }`}
                                    >
                                        {keyword}
                                    </button>
                                );
                            })}
                        </div>

                        <p className="text-sm text-text/70 mb-2">Selected: {keywordSelectionText}</p>
                        <p className="text-xs text-text/60 mb-3">Choose minimum 2 and maximum 6 keywords.</p>

                        {keywordError && <p className="text-red-600 text-sm mt-2">{keywordError}</p>}

                        <div className="flex flex-wrap gap-3 mt-4">
                            <button
                                onClick={generateFromKeywords}
                                disabled={isGeneratingKeywords}
                                className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-60"
                            >
                                {isGeneratingKeywords ? 'Generating...' : 'Generate Review'}
                            </button>

                            <button
                                onClick={generateFromKeywords}
                                disabled={isGeneratingKeywords || !keywordReview}
                                className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2.5 rounded-lg font-semibold hover:bg-primary/5 disabled:opacity-60"
                            >
                                <RefreshCw size={16} />
                                Regenerate
                            </button>
                        </div>

                        {keywordReview && (
                            <div className="mt-6 bg-bg rounded-xl p-4 border border-gray-200">
                                <p className="text-text leading-relaxed">{keywordReview}</p>
                                <p className="text-xs text-text/60 mt-3">Word count: {getWordCount(keywordReview)}</p>

                                <button
                                    onClick={() => copyAndRedirect(keywordReview, 'keywords')}
                                    className="mt-4 inline-flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-lg font-semibold hover:opacity-90"
                                >
                                    {copiedType === 'keywords' ? <CopyCheck size={16} /> : <ExternalLink size={16} />}
                                    Go To Google Review
                                </button>
                            </div>
                        )}
                    </section>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default ReviewGenerator;
