import { useEffect, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

type Faq = {
    _id: string;
    question: string;
    answer: string;
    sortOrder: number;
    isActive: boolean;
};

type FaqSectionProps = {
    pageKey: 'about' | 'products';
    title: string;
    subtitle: string;
};

const FaqSection = ({ pageKey, title, subtitle }: FaqSectionProps) => {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [loading, setLoading] = useState(true);
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/faqs/${pageKey}`);
                const result = await response.json();

                if (response.ok && result.success && Array.isArray(result.data)) {
                    setFaqs(result.data.slice(0, 10));
                    setOpenFaqId(result.data[0]?._id || null);
                } else {
                    setFaqs([]);
                }
            } catch (error) {
                console.error('Error fetching FAQs:', error);
                setFaqs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, [pageKey]);

    return (
        <ScrollReveal animation="fade-up">
            <section className="mt-20 rounded-[2rem] border border-gray-200 bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-6 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden relative">
                <div className="absolute -top-16 -right-12 w-44 h-44 rounded-full bg-secondary/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-16 w-52 h-52 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm border border-primary/10 mb-4">
                            <HelpCircle size={14} />
                            FAQ
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{title}</h2>
                        <p className="text-text/75 text-base md:text-lg max-w-2xl">{subtitle}</p>
                    </div>
                    <div className="text-sm text-gray-500 bg-white/80 border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                        Showing up to 10 active FAQs
                    </div>
                </div>

                {loading ? (
                    <div className="grid gap-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="h-24 rounded-2xl bg-white/70 animate-pulse border border-gray-100" />
                        ))}
                    </div>
                ) : faqs.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white/80 p-6 text-gray-600">
                        FAQs will appear here once they are added from the admin panel.
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaqId === faq._id;

                            return (
                                <article
                                    key={faq._id}
                                    className={`rounded-2xl border bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300 ${isOpen ? 'border-primary/30 shadow-lg shadow-primary/10' : 'border-gray-200 hover:border-primary/20 hover:shadow-md'}`}
                                    style={{ transitionDelay: `${index * 40}ms` }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaqId(isOpen ? null : faq._id)}
                                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="flex items-start gap-3">
                                            <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isOpen ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="text-lg font-semibold text-gray-900 leading-snug">{faq.question}</span>
                                        </span>
                                        <ChevronDown className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                                    </button>

                                    <div className={`grid overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="min-h-0 px-5 pb-5">
                                            <div className="rounded-xl bg-gray-50 px-4 py-4 text-text/80 leading-relaxed whitespace-pre-wrap border border-gray-100">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </ScrollReveal>
    );
};

export default FaqSection;