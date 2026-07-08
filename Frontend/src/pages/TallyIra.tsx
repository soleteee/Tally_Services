import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { assets } from '../assets/assets';
import {
    FaChevronDown,
    FaChevronUp,
    FaApple,
    FaGooglePlay,
    FaLock,
    FaUserCheck,
    FaRegCheckCircle,
    FaFileInvoice,
    FaClock,
    FaArrowRight
} from 'react-icons/fa';

type Blog = {
    _id: string;
    title: string;
    author: string;
    content: string;
    image?: string;
    youtubeUrl?: string;
    createdAt: string;
};

const TallyIra: React.FC = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const docsSectionRef = useRef<HTMLDivElement>(null);

    // Fetch latest 3 blogs for the updates carousel/grid
    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    const latestBlogs = data
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, 3);
                    setBlogs(latestBlogs);
                }
            } catch (error) {
                console.error('Error fetching latest blogs for TallyIra:', error);
            }
        };
        fetchLatestBlogs();
    }, []);

    const scrollToDocsSection = () => {
        docsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    // YouTube Thumbnail parser helpers
    const getYouTubeVideoId = (urlValue?: string): string | null => {
        if (!urlValue) return null;
        try {
            const parsedUrl = new URL(urlValue);
            const host = parsedUrl.hostname.replace('www.', '');
            if (host === 'youtube.com' || host === 'm.youtube.com') {
                const videoId = parsedUrl.searchParams.get('v');
                if (videoId && videoId.length === 11) return videoId;
            }
            if (host === 'youtu.be') {
                const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0];
                return videoId && videoId.length === 11 ? videoId : null;
            }
        } catch (_error) {
            return null;
        }
        return null;
    };

    const getDisplayImage = (blog: Blog): string | null => {
        if (blog.image) return blog.image;
        const videoId = getYouTubeVideoId(blog.youtubeUrl);
        if (!videoId) return null;
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    const capabilities = [
        {
            title: "Scan or Import with Ease",
            desc: "Scan or import invoices from your mobile app or system directly into TallyPrime. No more manual sorting of hard copies."
        },
        {
            title: "AI-Powered Data Extraction",
            desc: "Automatically extract key invoice details such as party name, invoice number, date, amounts, GST, and line items with high precision."
        },
        {
            title: "Exception Highlighting",
            desc: "Identify mismatches or missing details instantly. The system flags discrepancies so you can review and correct them quickly."
        },
        {
            title: "Bulk Voucher Creation",
            desc: "Process multiple invoices at once and create draft vouchers in minutes, dramatically cutting down processing backlogs."
        },
        {
            title: "Smart Mapping & Master Creation",
            desc: "Automatically map parties and items to existing masters, create new masters when needed, and detect duplicate invoices to avoid errors. Correct a mapping once, and Docs by Ira remembers it for next time."
        }
    ];

    return (
        <div className="w-full bg-white text-gray-800">

            {/* SECTION 1: HERO SECTION */}
            <header className="relative w-full min-h-[calc(80vh+40px)] md:min-h-[calc(85vh-80px)] lg:min-h-[calc(95vh-80px)] overflow-hidden bg-gradient-to-r from-blue-50 to-blue-200 flex items-center">
                <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

                    {/* Left Content (Text) */}
                    <div className="flex-1 max-w-[650px] text-gray-900 z-10 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 md:mb-6 text-gray-900">
                            AI that's <span className="text-primary">thoughtfully built</span>,<br />
                            so you stay in control
                        </h1>
                        <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-8 max-w-[600px] leading-relaxed">
                            TallyIra brings thoughtful intelligence to accounting workflows, helping you modernise document processing, reduce manual effort, and stay in control. Starting with Docs by Ira - AI-powered invoice processor.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <button
                                onClick={scrollToDocsSection}
                                className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-lg border-2 border-primary hover:scale-[1.03] flex items-center gap-2"
                            >
                                KNOW MORE
                                <FaChevronDown className="animate-bounce" size={12} />
                            </button>
                        </div>
                    </div>

                    {/* Right Content (Image) */}
                    <div className="flex-1 w-full max-w-[480px] md:max-w-[550px] lg:max-w-[500px] flex items-center justify-center">
                        <img
                            src={assets.iraImage}
                            alt="Tally Ira Logo"
                            className="w-full h-auto object-contain drop-shadow-2xl animate-fadeIn"
                        />
                    </div>
                </div>
            </header>

            {/* SECTION 2: DOCS BY IRA (FEATURE OVERVIEW) */}
            <div id="docs-by-ira" ref={docsSectionRef} className="py-20 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">

                    <ScrollReveal animation="fade-up">
                        <span className="text-accent font-bold tracking-widest text-center uppercase mb-3 block text-sm">
                            --- Docs by Ira ---
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary text-center mb-12 max-w-[900px] mx-auto leading-tight">
                            Turn Business Documents into Accounting-Ready Entries
                        </h2>
                    </ScrollReveal>

                    {/* Key Stats / Info Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <ScrollReveal animation="slide-right" delay={100}>
                            <div className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-accent hover:shadow-lg transition-all duration-300 h-full">
                                <div className="p-4 bg-blue-50 text-primary rounded-xl flex-shrink-0">
                                    <FaFileInvoice size={28} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">Seamless Entry Flow</h4>
                                    <p className="text-sm text-gray-600">No more typing the same invoice twice. Process documents instantly.</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-left" delay={200}>
                            <div className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-accent hover:shadow-lg transition-all duration-300 h-full">
                                <div className="p-4 bg-amber-50 text-accent rounded-xl flex-shrink-0">
                                    <FaClock size={28} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">Drastic Time Savings</h4>
                                    <p className="text-sm text-gray-600">80% of the time spent on manual data entry — saved.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Long Copy Paragraph */}
                    <ScrollReveal animation="fade-up" delay={150}>
                        <p className="text-base md:text-lg text-gray-600 text-center max-w-[950px] mx-auto mb-20 leading-relaxed">
                            Docs by Ira is TallyIra's first offering that intelligently reads business documents, understands relevant information, and prepares accounting entries for review before posting into TallyPrime. Simply scan or upload your documents to auto-create invoices in TallyPrime. The result is less manual effort, faster processing, and greater consistency across accounting workflows. You review. You approve. You stay in control.
                        </p>
                    </ScrollReveal>

                    {/* Video and Steps split */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Video player on Left */}
                        <div className="lg:col-span-5 flex justify-center">
                            <ScrollReveal animation="zoom-in" className="w-full max-w-[300px]">
                                <video
                                    src={assets.tallyIraScreenPhone}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-auto object-cover rounded-3xl shadow-2xl border border-gray-100 bg-gray-50"
                                />
                            </ScrollReveal>
                        </div>

                {/* Steps lists on Right */}
                <div className="lg:col-span-7 space-y-8">
                    <ScrollReveal animation="slide-left" delay={100}>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                                1
                            </div>
                            <div className="pt-1">
                                <h4 className="text-xl font-bold text-gray-900 mb-1">Scan and Import</h4>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    Scan and import invoices directly from the TallyIra mobile app or directly into TallyPrime.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="slide-left" delay={200}>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                                2
                            </div>
                            <div className="pt-1">
                                <h4 className="text-xl font-bold text-gray-900 mb-1">Auto-Create Draft Vouchers</h4>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    Auto-create transactions in TallyPrime in draft mode, ready for verification without typing.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="slide-left" delay={300}>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                                3
                            </div>
                            <div className="pt-1">
                                <h4 className="text-xl font-bold text-gray-900 mb-1">Review & Post</h4>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    Review, verify data discrepancies, and approve with a single click to save directly to ledger.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

        </div>
            </div >

    {/* SECTION 3: CAPABILITIES ACCORDION (FAQ STYLE) */}
    <div className="py-12 lg:py-16 bg-gray-50 border-t border-b border-gray-100 flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                {/* Left Column: Info Header */}
                <div className="lg:col-span-5 lg:sticky lg:top-24">
                    <ScrollReveal animation="slide-right">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 leading-tight text-center lg:text-left">
                            Built for how invoices actually arrive
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 italic text-center lg:text-left leading-relaxed">
                            Five capabilities doing the heavy lifting, so you don't have to. Click on each capability to explore how Docs by Ira simplifies data extraction and mappings.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Right Column: Accordion List */}
                <div className="lg:col-span-7 space-y-4">
                    {capabilities.map((faq, index) => {
                        const isExpanded = expandedFaq === index;
                        return (
                            <ScrollReveal key={index} animation="fade-up" delay={index * 50}>
                                <div className="border border-gray-200 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-accent font-extrabold text-lg md:text-xl w-6">
                                                0{index + 1}
                                            </span>
                                            <span className="text-base md:text-lg font-bold text-gray-900">
                                                {faq.title}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                                            {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                                        </div>
                                    </button>

                                    {/* Dropdown Content with smooth height toggle */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[250px] border-t border-gray-100' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="p-5 md:p-6 bg-gray-50/50 text-sm md:text-base text-gray-600 leading-relaxed">
                                            {faq.desc}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>

            </div>
        </div>
    </div>

    {/* SECTION 4: PRODUCT PRINCIPLES */ }
    < div className = "py-20 bg-white" >
        <div className="max-w-[1200px] mx-auto px-6">

            <ScrollReveal animation="fade-up">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary text-center mb-6 leading-tight max-w-[800px] mx-auto">
                    Speed is easy. Getting it right is the hard part.
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 text-center max-w-[850px] mx-auto mb-16 leading-relaxed">
                    AI can help businesses work faster. But for businesses, speed alone is never enough. The technology must be reliable, protect business data, and deliver outcomes that users can trust. That's why TallyIra is thoughtfully built around three principles.
                </p>
            </ScrollReveal>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <ScrollReveal animation="fade-up" delay={100} className="h-full">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-6 shadow-inner">
                            <FaLock size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">1. Privacy of business data</h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            Your documents and data are used only to get the job done. Never shared. Never used to train models for anyone else's benefit.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200} className="h-full">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 text-accent flex items-center justify-center mb-6 shadow-inner">
                            <FaRegCheckCircle size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">2. Dependable outcomes</h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            Entries are drafted to match how your business actually works, with exceptions flagged before they ever reach you.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300} className="h-full">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-inner">
                            <FaUserCheck size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">3. Human control at every step</h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            Nothing posts to TallyPrime without your review and approval. Always.
                        </p>
                    </div>
                </ScrollReveal>

            </div>

        </div>
            </div >

    {/* SECTION 5: APP DOWNLOAD CALL TO ACTION */ }
    < div className = "py-16 bg-gradient-to-br from-primary to-[#0f2e5c] text-white overflow-hidden relative" >
        {/* Background decorative vector circle */ }
        < div className = "absolute right-[-100px] top-[-100px] w-96 h-96 rounded-full bg-blue-500/10 pointer-events-none blur-3xl" ></div >
                <div className="absolute left-[-50px] bottom-[-50px] w-80 h-80 rounded-full bg-blue-600/10 pointer-events-none blur-3xl"></div>

                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">

                    {/* Left Mockup Graphic */}
                    <div className="md:col-span-5 flex justify-center">
                        <ScrollReveal animation="slide-right">
                            <img
                                src={assets.iraDownload}
                                alt="TallyIra App Mockup"
                                className="w-full max-w-[340px] md:max-w-[380px] h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                            />
                        </ScrollReveal>
                    </div>

                    {/* Right Download Buttons */}
                    <div className="md:col-span-7 text-center md:text-left">
                        <ScrollReveal animation="slide-left">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                                Download the TallyIra app
                            </h2>
                            <p className="text-base md:text-lg text-blue-100 mb-8 max-w-[550px]">
                                Scan, upload, and manage invoices on the go. Synchronize seamlessly with your local TallyPrime setup.
                            </p>

                            {/* SVG Store Badges */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">

                                {/* Play Store */}
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.tally.heytally&hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-2xl shadow-lg border border-gray-100 hover:bg-blue-50 transition-all font-bold hover:scale-[1.03]"
                                >
                                    <FaGooglePlay className="text-secondary" size={24} />
                                    <div className="text-left leading-tight">
                                        <p className="text-[10px] text-gray-500 font-semibold uppercase">Get it on</p>
                                        <p className="text-sm font-extrabold text-gray-800">Google Play</p>
                                    </div>
                                </a>

                                {/* App Store */}
                                <a
                                    href="https://apps.apple.com/in/app/tallyira/id6740851785"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-2xl shadow-lg border border-gray-100 hover:bg-blue-50 transition-all font-bold hover:scale-[1.03]"
                                >
                                    <FaApple className="text-gray-900" size={26} />
                                    <div className="text-left leading-tight">
                                        <p className="text-[10px] text-gray-500 font-semibold uppercase">Download on the</p>
                                        <p className="text-sm font-extrabold text-gray-800">App Store</p>
                                    </div>
                                </a>

                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div >

    {/* SECTION 6: BLOGS LIST */ }
    < div className = "py-20 bg-gray-50" >
        <div className="max-w-[1200px] mx-auto px-6">

            <ScrollReveal animation="fade-up">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
                        Latest Updates & Insights
                    </h2>
                    <button
                        type="button"
                        onClick={() => navigate('/blogs')}
                        className="text-secondary font-bold hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                        View All
                        <FaArrowRight size={14} />
                    </button>
                </div>
            </ScrollReveal>

            {blogs.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500 shadow-sm font-medium">
                    Latest posts are loading...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => {
                        const displayImage = getDisplayImage(blog);
                        return (
                            <ScrollReveal key={blog._id} animation="fade-up" delay={idx * 100}>
                                <article className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
                                    <div className="h-48 bg-gray-200 overflow-hidden relative">
                                        {displayImage ? (
                                            <img
                                                src={displayImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                                                Tally Services
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <p className="text-xs font-bold text-accent uppercase mb-2">
                                            {blog.author}
                                        </p>
                                        <h3 className="text-lg font-bold text-primary mb-3 line-clamp-2 hover:text-accent transition-colors cursor-pointer" onClick={() => navigate(`/blogs?blog=${blog._id}`)}>
                                            {blog.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                                            {blog.content}
                                        </p>

                                        <div className="grid grid-cols-2 gap-3 mt-auto">
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/blogs?blog=${blog._id}`)}
                                                className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-white font-bold hover:bg-blue-700 transition-all text-xs"
                                            >
                                                Read More
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`${window.location.origin}/blogs?blog=${blog._id}`);
                                                    alert('Link copied to clipboard!');
                                                }}
                                                className="inline-flex items-center justify-center rounded-xl bg-blue-50 border border-blue-100 px-4 py-2.5 text-primary font-bold hover:bg-blue-100 transition-all text-xs"
                                            >
                                                Copy Link
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            </ScrollReveal>
                        );
                    })}
                </div>
            )}

        </div>
            </div >

        </div >
    );
};

export default TallyIra;
