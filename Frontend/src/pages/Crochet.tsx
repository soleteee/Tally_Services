import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    FaWhatsapp,
    FaSearch,
    FaHeart,
    FaGift,
    FaTimes,
    FaCheck,
    FaMagic,
    FaQuestionCircle,
} from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';

export type CrochetProduct = {
    _id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    additionalImages?: string[];
    materials?: string;
    dimensions?: string;
    isAvailable: boolean;
    isCustomizable?: boolean;
    featured?: boolean;
    sortOrder?: number;
    createdAt?: string;
};

const WHATSAPP_PHONE = '919997952180';

const FALLBACK_PRODUCTS: CrochetProduct[] = [
    {
        _id: 'default-crochet-1',
        name: 'Handcrafted Sunflower Crochet Pot',
        category: 'Flowers & Bouquets',
        description:
            'Brighten any room or desk with this radiant handmade crochet sunflower nestled in a terracotta-style yarn pot. Hand-stitched with love using premium anti-pilling milk cotton yarn.',
        image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
        materials: '100% Milk Cotton Yarn, Wire Stem, Hypoallergenic Fiberfill',
        dimensions: 'Height: 18 cm, Diameter: 9 cm',
        isAvailable: true,
        isCustomizable: true,
        featured: true,
    },
    {
        _id: 'default-crochet-2',
        name: 'Chubby Bunny Amigurumi Plushie',
        category: 'Amigurumi & Toys',
        description:
            'An adorably soft and huggable bunny companion hand-crocheted with gentle pastel yarn. Fitted with child-safe secured safety eyes and embroidered pink blush cheeks.',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        materials: 'Super Soft Velvet Yarn, Safety Eyes, Washable Fiberfill',
        dimensions: 'Height: 22 cm (including ears)',
        isAvailable: true,
        isCustomizable: true,
        featured: true,
    },
    {
        _id: 'default-crochet-3',
        name: 'Vintage Floral Granny Square Tote Bag',
        category: 'Bags & Accessories',
        description:
            'Chic, eco-friendly, and durable crochet tote bag created from meticulously assembled daisy granny squares. Features reinforced shoulder straps for daily errands or college.',
        image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
        materials: 'Heavy-Duty Cotton Blend Yarn, Reinforced Stitching',
        dimensions: '35 cm x 32 cm (Strap drop: 28 cm)',
        isAvailable: true,
        isCustomizable: true,
        featured: true,
    },
    {
        _id: 'default-crochet-4',
        name: 'Forever Bloom Tulip Bouquet (Set of 5)',
        category: 'Flowers & Bouquets',
        description:
            'Never-fading handmade crochet tulips wrapped in luxury kraft wrapping and satin ribbon. An everlasting gift for birthdays, anniversaries, and special celebrations.',
        image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80',
        materials: 'Soft Cotton Yarn, Flexible Floral Stem, Satin Ribbon',
        dimensions: 'Length: 30 cm per stem',
        isAvailable: true,
        isCustomizable: true,
        featured: false,
    },
    {
        _id: 'default-crochet-5',
        name: 'Pastel Daisy Coaster Set of 4',
        category: 'Home Decor',
        description:
            'Protect your coffee tables with these cheerful floral crochet coasters. Highly absorbent, heat resistant, and machine washable in gentle cold cycle.',
        image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80',
        materials: '100% Mercerized Pure Cotton Yarn',
        dimensions: 'Diameter: 12 cm each',
        isAvailable: true,
        isCustomizable: true,
        featured: false,
    },
    {
        _id: 'default-crochet-6',
        name: 'Mini Strawberry Keychain Charm',
        category: 'Accessories',
        description:
            'A charming pocket-sized accessory for backpacks, key rings, and car mirrors. Features intricate crochet leaves and sweet seed accents.',
        image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
        materials: 'Mercerized Cotton Thread, Stainless Steel Keyring',
        dimensions: '5 cm x 4 cm',
        isAvailable: true,
        isCustomizable: true,
        featured: false,
    },
];

const Crochet: React.FC = () => {
    const [products, setProducts] = useState<CrochetProduct[]>(FALLBACK_PRODUCTS);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeModalProduct, setActiveModalProduct] = useState<CrochetProduct | null>(null);
    const [selectedModalImage, setSelectedModalImage] = useState<string | null>(null);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchCrochetProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${apiUrl}/api/crochet`);
                if (!res.ok) {
                    throw new Error('Could not fetch crochet products');
                }
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts(FALLBACK_PRODUCTS);
                }
            } catch (err) {
                console.warn('API error, loaded fallback crochet catalog:', err);
                setProducts(FALLBACK_PRODUCTS);
            } finally {
                setLoading(false);
            }
        };

        fetchCrochetProducts();
    }, [apiUrl]);

    const getFullImageUrl = (imagePath: string) => {
        if (!imagePath) {
            return 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80';
        }
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        return `${apiUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    };

    const handleWhatsAppOrder = (product: CrochetProduct, e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }

        const imageUrl = getFullImageUrl(product.image);
        const websiteUrl = window.location.href;

        const message =
            `Hello Mittal Online Services / Crochet Studio! 👋🌸\n\n` +
            `I am interested in getting a quotation and ordering this handmade crochet piece:\n\n` +
            `✨ *Product:* ${product.name}\n` +
            `🏷️ *Category:* ${product.category}\n` +
            (product.materials ? `🧶 *Materials:* ${product.materials}\n` : '') +
            (product.dimensions ? `📏 *Size:* ${product.dimensions}\n` : '') +
            `📝 *Details:* ${product.description}\n` +
            `🖼️ *Product Image:* ${imageUrl}\n` +
            `🔗 *Page Reference:* ${websiteUrl}\n\n` +
            `Please let me know the price quotation, customization options (colors/sizes), and delivery timeframe.\n\n` +
            `Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const handleGeneralWhatsAppInquiry = () => {
        const message =
            `Hello Mittal Online Services / Crochet Studio! 👋🧶\n\n` +
            `I am visiting your Handcrafted Crochet Creations page and would love to ask about custom orders, designs, and quotations.\n\n` +
            `Could you please share your latest catalog and custom order details? Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    };

    // Filter categories
    const categories = useMemo(() => {
        const set = new Set(products.map((p) => p.category).filter(Boolean));
        return ['All', ...Array.from(set)];
    }, [products]);

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesSearch =
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (p.materials && p.materials.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory =
                selectedCategory === 'All' || p.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-[#FFFBF7] text-[#2D2A26] font-sans">
            <Helmet>
                <title>Handcrafted Crochet Creations | Mittal Online Services</title>
                <meta
                    name="description"
                    content="Explore our beautiful handcrafted crochet collection: amigurumi toys, eternal flower bouquets, granny square bags, and home decor. Custom orders and instant quotes via WhatsApp."
                />
                <meta property="og:title" content="Handcrafted Crochet Creations" />
                <meta
                    property="og:description"
                    content="Every piece is hand-stitched with love using premium soft yarn. Order custom crochet creations directly on WhatsApp."
                />
            </Helmet>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF0E5] via-[#FFFBF7] to-[#FFFBF7] pt-12 md:pt-16 pb-12 border-b border-[#F0E6DD]">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFD1BA]/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#FFE5D9]/50 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
                    <ScrollReveal animation="fade-up">
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE5D9] text-[#C85A32] font-semibold text-xs sm:text-sm tracking-wide shadow-sm border border-[#FAD2C0] mb-4">
                                <FaMagic className="text-amber-500" />
                                100% Handcrafted with Love & Passion
                            </span>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#302117] tracking-tight leading-tight">
                                Handcrafted <span className="text-[#C85A32]">Crochet</span> Creations
                            </h1>

                            <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                                Discover our collection of hand-knitted flower bouquets, adorable amigurumi toys,
                                boho granny-square bags, and personalized home decor. Each piece is uniquely
                                stitched to perfection.
                            </p>

                            {/* Trust badges */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-gray-600">
                                <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-gray-200">
                                    <FaCheck className="text-emerald-500" /> Premium Milk Cotton
                                </span>
                                <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-gray-200">
                                    <FaCheck className="text-emerald-500" /> Custom Colors & Sizes
                                </span>
                                <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-gray-200">
                                    <FaCheck className="text-emerald-500" /> Pan-India WhatsApp Orders
                                </span>
                                <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-gray-200">
                                    <FaCheck className="text-emerald-500" /> Never-Fading Eternal Gifts
                                </span>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="sticky top-14 lg:top-12 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 py-3.5">
                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    {/* Categories scrollable pills */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                                    selectedCategory === cat
                                        ? 'bg-[#C85A32] text-white shadow-sm shadow-[#C85A32]/30 scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search box */}
                    <div className="relative w-full md:w-72">
                        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search creations..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white transition"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Showcase Grid */}
            <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-[#302117] flex items-center gap-2">
                            <span>Browse Creations</span>
                            <span className="text-xs bg-[#FFE5D9] text-[#C85A32] px-2.5 py-0.5 rounded-full font-bold">
                                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                            </span>
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                            Click any item for complete photos and specifications.
                        </p>
                    </div>

                    <button
                        onClick={handleGeneralWhatsAppInquiry}
                        className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#25D366] hover:text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-3.5 py-1.5 rounded-full transition"
                    >
                        <FaWhatsapp size={16} />
                        Request Custom Design
                    </button>
                </div>

                {loading ? (
                    <div className="py-24 text-center">
                        <div className="w-12 h-12 border-4 border-[#C85A32] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Unfolding handcrafted pieces...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
                        <FaGift className="mx-auto text-4xl text-[#C85A32]/60 mb-3" />
                        <h3 className="text-lg font-bold text-gray-800">No creations found</h3>
                        <p className="text-gray-500 text-sm mt-1">
                            No items match your current filter or search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All');
                            }}
                            className="mt-4 px-4 py-2 bg-[#C85A32] text-white text-xs font-bold rounded-lg hover:bg-[#a94622] transition"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, idx) => {
                            const imageUrl = getFullImageUrl(product.image);

                            return (
                                <ScrollReveal
                                    key={product._id}
                                    animation="fade-up"
                                    delay={idx * 50}
                                    className="h-full"
                                >
                                    <div
                                        onClick={() => {
                                            setActiveModalProduct(product);
                                            setSelectedModalImage(product.image);
                                        }}
                                        className="bg-white rounded-2xl overflow-hidden border border-[#EFE5DC] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full cursor-pointer group"
                                    >
                                        {/* Image wrapper */}
                                        <div className="relative aspect-square w-full bg-[#FBF5F0] overflow-hidden">
                                            <img
                                                src={imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                                                loading="lazy"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src =
                                                        'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80';
                                                }}
                                            />

                                            {/* Category & Badge */}
                                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#302117] shadow-sm backdrop-blur-sm border border-gray-100">
                                                    {product.category}
                                                </span>
                                                {product.featured && (
                                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-500 text-white shadow-sm flex items-center gap-1">
                                                        <FaMagic size={10} /> Popular
                                                    </span>
                                                )}
                                                {product.additionalImages && product.additionalImages.length > 0 && (
                                                    <span className="px-2 py-1 rounded-full text-[11px] font-extrabold bg-[#302117]/85 text-white shadow-sm backdrop-blur-sm">
                                                        📷 {product.additionalImages.length + 1} photos
                                                    </span>
                                                )}
                                            </div>

                                            {/* Hover View Button Overlay */}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="bg-white/95 text-[#302117] px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                                    View Details & Photos
                                                </span>
                                            </div>

                                            {/* Customization badge */}
                                            {product.isCustomizable !== false && (
                                                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#C85A32] shadow-sm border border-white">
                                                    ✨ Customizable Colors
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-[#302117] group-hover:text-[#C85A32] transition-colors line-clamp-1 mb-1.5">
                                                    {product.name}
                                                </h3>

                                                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                                                    {product.description}
                                                </p>

                                                {/* Materials / dimensions tags */}
                                                {(product.materials || product.dimensions) && (
                                                    <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] text-gray-500">
                                                        {product.materials && (
                                                            <span className="bg-[#FAF3ED] px-2 py-0.5 rounded text-[#7A4B3A] border border-[#F2E5DC] font-medium">
                                                                🧶 {product.materials}
                                                            </span>
                                                        )}
                                                        {product.dimensions && (
                                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                                                                📏 {product.dimensions}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Order Action Button - No Price Tag! */}
                                            <div className="pt-3 border-t border-[#F5ECE3] flex items-center justify-between gap-2 mt-auto">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                                                        Quotation
                                                    </span>
                                                    <span className="text-xs font-extrabold text-[#C85A32]">
                                                        Via WhatsApp
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={(e) => handleWhatsAppOrder(product, e)}
                                                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex-shrink-0"
                                                    title="Order on WhatsApp with image & details"
                                                >
                                                    <FaWhatsapp size={16} />
                                                    <span>Order on WhatsApp</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Custom Orders Spotlight Banner */}
            <section className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-16">
                <div className="relative overflow-hidden bg-gradient-to-r from-[#C85A32] via-[#B84E28] to-[#9E3E1A] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
                            <FaHeart className="text-pink-300" />
                            Made-To-Order Service
                        </span>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                            Have a Specific Design or Pinterest Idea in Mind?
                        </h3>

                        <p className="mt-3 text-sm sm:text-base text-rose-100 leading-relaxed">
                            From personalized flower bouquets matching wedding themes, to custom cute amigurumi
                            plushies, book sleeves, and wall hangings — we can handcraft any design for you. Send
                            us your reference image on WhatsApp!
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleGeneralWhatsAppInquiry}
                                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition transform active:scale-95"
                            >
                                <FaWhatsapp size={20} />
                                Chat with Us for Custom Orders
                            </button>

                            <span className="text-xs text-rose-200">
                                💬 Quick response within a few hours!
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Frequently Asked Questions / Craftsmanship Guide */}
            <section className="bg-white border-t border-[#F0E6DD] py-14">
                <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10">
                        <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">
                            Help & FAQs
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#302117] mt-1">
                            Everything You Need to Know
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 rounded-2xl bg-[#FFFBF7] border border-[#F2E5DC]">
                            <h4 className="font-bold text-[#302117] text-base mb-1.5 flex items-center gap-2">
                                <FaQuestionCircle className="text-[#C85A32]" /> How does pricing and payment work?
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Because all pieces are handmade and customizable by yarn type, dimensions, and
                                color preferences, we do not show fixed pricing. Simply tap the WhatsApp button
                                on any product to receive an instant, accurate quotation.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#FFFBF7] border border-[#F2E5DC]">
                            <h4 className="font-bold text-[#302117] text-base mb-1.5 flex items-center gap-2">
                                <FaQuestionCircle className="text-[#C85A32]" /> How long does a custom order take?
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                In-stock items are dispatched within 24-48 hours. Made-to-order creations usually
                                take 3 to 7 working days depending on the size and stitch complexity.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#FFFBF7] border border-[#F2E5DC]">
                            <h4 className="font-bold text-[#302117] text-base mb-1.5 flex items-center gap-2">
                                <FaQuestionCircle className="text-[#C85A32]" /> How should I wash & care for crochet items?
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                We recommend gentle hand-washing in cool water using mild detergent. Do not wring or
                                twist. Lay flat on a clean dry towel in the shade to maintain shape and vibrancy.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#FFFBF7] border border-[#F2E5DC]">
                            <h4 className="font-bold text-[#302117] text-base mb-1.5 flex items-center gap-2">
                                <FaQuestionCircle className="text-[#C85A32]" /> Do you deliver all over India?
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Yes! We provide safe, tracked pan-India shipping with secure protective packaging
                                so your handcrafted pieces and flower bouquets arrive in pristine condition.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Detail Modal */}
            {activeModalProduct && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                    onClick={() => setActiveModalProduct(null)}
                >
                    <div
                        className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl my-auto animate-zoom-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Product Photo & Thumbnails */}
                            <div className="flex flex-col bg-[#F7EFE9]">
                                <div className="relative aspect-square w-full bg-[#F7EFE9] overflow-hidden">
                                    <img
                                        src={getFullImageUrl(selectedModalImage || activeModalProduct.image)}
                                        alt={activeModalProduct.name}
                                        className="w-full h-full object-cover transition-all duration-300"
                                    />
                                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#302117] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                        {activeModalProduct.category}
                                    </span>
                                </div>

                                {/* Thumbnails strip if multiple photos exist */}
                                {activeModalProduct.additionalImages && activeModalProduct.additionalImages.length > 0 && (
                                    <div className="p-3 bg-white/70 border-t border-gray-100 flex items-center gap-2 overflow-x-auto">
                                        {[activeModalProduct.image, ...activeModalProduct.additionalImages].map((imgUrl, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setSelectedModalImage(imgUrl)}
                                                className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                                                    (selectedModalImage || activeModalProduct.image) === imgUrl
                                                        ? 'border-[#C85A32] scale-105 shadow-sm'
                                                        : 'border-transparent opacity-70 hover:opacity-100'
                                                }`}
                                            >
                                                <img
                                                    src={getFullImageUrl(imgUrl)}
                                                    alt={`Photo ${i + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Details Panel */}
                            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                                <div>
                                    <div className="flex justify-between items-start gap-3">
                                        <h3 className="text-2xl font-black text-[#302117] leading-tight">
                                            {activeModalProduct.name}
                                        </h3>
                                        <button
                                            onClick={() => setActiveModalProduct(null)}
                                            className="text-gray-400 hover:text-gray-700 p-1 rounded-lg flex-shrink-0"
                                        >
                                            <FaTimes size={20} />
                                        </button>
                                    </div>

                                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#C85A32] font-semibold bg-[#FFF0E5] px-2.5 py-1 rounded-md">
                                        <FaMagic size={11} /> 100% Handcrafted
                                    </div>

                                    <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                                        {activeModalProduct.description}
                                    </p>

                                    {/* Specifications */}
                                    <div className="mt-5 space-y-2 border-t border-b border-gray-100 py-3 text-xs sm:text-sm">
                                        {activeModalProduct.materials && (
                                            <div className="flex justify-between py-1">
                                                <span className="text-gray-500 font-medium">Materials:</span>
                                                <span className="text-gray-800 font-semibold text-right">
                                                    {activeModalProduct.materials}
                                                </span>
                                            </div>
                                        )}
                                        {activeModalProduct.dimensions && (
                                            <div className="flex justify-between py-1">
                                                <span className="text-gray-500 font-medium">Dimensions:</span>
                                                <span className="text-gray-800 font-semibold text-right">
                                                    {activeModalProduct.dimensions}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between py-1">
                                            <span className="text-gray-500 font-medium">Customization:</span>
                                            <span className="text-emerald-600 font-semibold">
                                                Custom Colors & Sizes Accepted
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                            <span className="text-gray-500 font-medium">Quotation:</span>
                                            <span className="text-[#C85A32] font-bold">
                                                Direct via WhatsApp
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order on WhatsApp Button */}
                                <div className="mt-6 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => handleWhatsAppOrder(activeModalProduct)}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition transform active:scale-98"
                                    >
                                        <FaWhatsapp size={20} />
                                        <span>Order & Get Quote on WhatsApp</span>
                                    </button>
                                    <p className="text-[11px] text-gray-400 text-center mt-2">
                                        Pre-fills WhatsApp message with photo link, product name & details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Crochet;
