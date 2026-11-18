const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const CrochetProduct = require('../models/CrochetProduct');

// ─── In-memory store (used only when MongoDB is offline) ───────────────────────
// This lets admins manage products during local dev without Atlas access.
// Data is lost on server restart; it is NOT a substitute for the real database.
let inMemoryProducts = [
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
        sortOrder: 1,
        createdAt: new Date().toISOString(),
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
        sortOrder: 2,
        createdAt: new Date().toISOString(),
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
        sortOrder: 3,
        createdAt: new Date().toISOString(),
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
        sortOrder: 4,
        createdAt: new Date().toISOString(),
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
        sortOrder: 5,
        createdAt: new Date().toISOString(),
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
        sortOrder: 6,
        createdAt: new Date().toISOString(),
    },
];

/** Returns true if MongoDB connection is ready */
const isDbReady = () => mongoose.connection.readyState === 1;

/** Build a simple unique ID for in-memory products */
const makeId = () => `mem-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const getUploadedImages = (req) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const toUrl = (filename) => `${protocol}://${host}/uploads/${filename}`;

    const files = req.files ? (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) : (req.file ? [req.file] : []);
    const primaryFile = files.find((f) => f.fieldname === 'imageFile') || files[0];
    const additionalFiles = files.filter((f) => f !== primaryFile);

    return {
        primaryUrl: primaryFile ? toUrl(primaryFile.filename) : null,
        additionalUrls: additionalFiles.map((f) => toUrl(f.filename)),
    };
};

const parseAdditionalImages = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.filter((u) => typeof u === 'string' && u.trim());
    if (typeof raw === 'string') {
        const trimmed = raw.trim();
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) return parsed.filter((u) => typeof u === 'string' && u.trim());
            } catch (_) {}
        }
        return trimmed.split(',').map((s) => s.trim()).filter(Boolean);
    }
    return [];
};

// ─── PUBLIC ────────────────────────────────────────────────────────────────────

exports.getPublicCrochetProducts = async (req, res) => {
    try {
        if (!isDbReady()) {
            const result = inMemoryProducts.filter((p) => p.isAvailable);
            return res.json(result);
        }

        const query = { isAvailable: true };
        if (req.query.category && req.query.category !== 'All') {
            query.category = req.query.category;
        }

        const products = await CrochetProduct.find(query).sort({
            featured: -1,
            sortOrder: 1,
            createdAt: -1,
        });

        return res.json(products.length ? products : inMemoryProducts.filter((p) => p.isAvailable));
    } catch (error) {
        console.warn('[Crochet API] Public fetch failed, using fallback:', error.message);
        return res.json(inMemoryProducts.filter((p) => p.isAvailable));
    }
};

// ─── ADMIN: READ ───────────────────────────────────────────────────────────────

exports.getAdminCrochetProducts = async (_req, res) => {
    try {
        if (!isDbReady()) {
            return res.json([...inMemoryProducts].sort((a, b) => a.sortOrder - b.sortOrder));
        }

        const products = await CrochetProduct.find().sort({ createdAt: -1 });
        return res.json(products.length ? products : inMemoryProducts);
    } catch (error) {
        console.warn('[Crochet API] Admin fetch failed, using fallback:', error.message);
        return res.json(inMemoryProducts);
    }
};

exports.getCrochetProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isDbReady()) {
            const item = inMemoryProducts.find((p) => p._id === id);
            return item ? res.json(item) : res.status(404).json({ message: 'Product not found' });
        }

        const product = await CrochetProduct.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ─── ADMIN: CREATE ─────────────────────────────────────────────────────────────

exports.createCrochetProduct = async (req, res) => {
    try {
        const { name, description, category, image, materials, dimensions, isAvailable, isCustomizable, featured, sortOrder, additionalImages } = req.body;

        if (!name || !name.trim()) return res.status(400).json({ message: 'Product name is required' });
        if (!description || !description.trim()) return res.status(400).json({ message: 'Product description is required' });

        const { primaryUrl, additionalUrls } = getUploadedImages(req);
        let finalImage = primaryUrl;
        if (!finalImage && typeof image === 'string' && image.trim()) finalImage = image.trim();
        if (!finalImage && additionalUrls.length > 0) {
            finalImage = additionalUrls.shift();
        }
        if (!finalImage) return res.status(400).json({ message: 'Product photo is required (upload a photo or enter image URL)' });

        const bodyAdditional = parseAdditionalImages(additionalImages);
        const combinedAdditional = [...additionalUrls, ...bodyAdditional];

        const productData = {
            name: name.trim(),
            description: description.trim(),
            category: category ? category.trim() : 'General',
            image: finalImage,
            additionalImages: combinedAdditional,
            materials: materials ? materials.trim() : 'Premium Soft Yarn',
            dimensions: dimensions ? dimensions.trim() : '',
            isAvailable: isAvailable === undefined ? true : String(isAvailable) === 'true',
            isCustomizable: isCustomizable === undefined ? true : String(isCustomizable) === 'true',
            featured: String(featured) === 'true',
            sortOrder: Number(sortOrder) || 0,
            createdAt: new Date().toISOString(),
        };

        // ── Offline: use in-memory store ──
        if (!isDbReady()) {
            const newProduct = { _id: makeId(), ...productData };
            inMemoryProducts.unshift(newProduct);
            console.log('[Crochet API] DB offline — product saved to in-memory store:', newProduct._id);
            return res.status(201).json(newProduct);
        }

        // ── Online: persist to MongoDB ──
        const saved = await new CrochetProduct(productData).save();
        return res.status(201).json(saved);
    } catch (error) {
        console.error('[Crochet API] Create error:', error);
        return res.status(500).json({ message: error.message });
    }
};

// ─── ADMIN: UPDATE ─────────────────────────────────────────────────────────────

exports.updateCrochetProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, image, materials, dimensions, isAvailable, isCustomizable, featured, sortOrder, additionalImages } = req.body;

        const { primaryUrl, additionalUrls } = getUploadedImages(req);

        // ── Offline: update in-memory store ──
        if (!isDbReady()) {
            const idx = inMemoryProducts.findIndex((p) => p._id === id);
            if (idx === -1) return res.status(404).json({ message: 'Product not found' });

            const p = { ...inMemoryProducts[idx] };
            if (typeof name === 'string') p.name = name.trim();
            if (typeof description === 'string') p.description = description.trim();
            if (typeof category === 'string') p.category = category.trim();
            if (typeof materials === 'string') p.materials = materials.trim();
            if (typeof dimensions === 'string') p.dimensions = dimensions.trim();
            if (isAvailable !== undefined) p.isAvailable = String(isAvailable) === 'true';
            if (isCustomizable !== undefined) p.isCustomizable = String(isCustomizable) === 'true';
            if (featured !== undefined) p.featured = String(featured) === 'true';
            if (sortOrder !== undefined) p.sortOrder = Number(sortOrder) || 0;

            if (primaryUrl) p.image = primaryUrl;
            else if (typeof image === 'string' && image.trim()) p.image = image.trim();

            if (additionalImages !== undefined || additionalUrls.length > 0) {
                const bodyAdditional = parseAdditionalImages(additionalImages);
                p.additionalImages = [...(p.additionalImages || []), ...additionalUrls, ...bodyAdditional];
                // Deduplicate
                p.additionalImages = Array.from(new Set(p.additionalImages));
            }

            inMemoryProducts[idx] = p;
            return res.json(p);
        }

        // ── Online: update in MongoDB ──
        const product = await CrochetProduct.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (typeof name === 'string') product.name = name.trim();
        if (typeof description === 'string') product.description = description.trim();
        if (typeof category === 'string') product.category = category.trim();
        if (typeof materials === 'string') product.materials = materials.trim();
        if (typeof dimensions === 'string') product.dimensions = dimensions.trim();
        if (isAvailable !== undefined) product.isAvailable = String(isAvailable) === 'true';
        if (isCustomizable !== undefined) product.isCustomizable = String(isCustomizable) === 'true';
        if (featured !== undefined) product.featured = String(featured) === 'true';
        if (sortOrder !== undefined) product.sortOrder = Number(sortOrder) || 0;

        if (primaryUrl) product.image = primaryUrl;
        else if (typeof image === 'string' && image.trim()) product.image = image.trim();

        if (additionalImages !== undefined || additionalUrls.length > 0) {
            const bodyAdditional = parseAdditionalImages(additionalImages);
            product.additionalImages = Array.from(new Set([...(product.additionalImages || []), ...additionalUrls, ...bodyAdditional]));
        }

        const updated = await product.save();
        return res.json(updated);
    } catch (error) {
        console.error('[Crochet API] Update error:', error);
        return res.status(500).json({ message: error.message });
    }
};

// ─── ADMIN: TOGGLE AVAILABILITY ────────────────────────────────────────────────

exports.toggleAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        // ── Offline: toggle in-memory store ──
        if (!isDbReady()) {
            const idx = inMemoryProducts.findIndex((p) => p._id === id);
            if (idx === -1) return res.status(404).json({ message: 'Product not found' });
            inMemoryProducts[idx].isAvailable = !inMemoryProducts[idx].isAvailable;
            return res.json({ success: true, isAvailable: inMemoryProducts[idx].isAvailable, product: inMemoryProducts[idx] });
        }

        // ── Online: toggle in MongoDB ──
        const product = await CrochetProduct.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        product.isAvailable = !product.isAvailable;
        await product.save();
        return res.json({ success: true, isAvailable: product.isAvailable, product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ─── ADMIN: DELETE ─────────────────────────────────────────────────────────────

exports.deleteCrochetProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // ── Offline: delete from in-memory store ──
        if (!isDbReady()) {
            const idx = inMemoryProducts.findIndex((p) => p._id === id);
            if (idx === -1) return res.status(404).json({ message: 'Product not found' });
            inMemoryProducts.splice(idx, 1);
            console.log('[Crochet API] DB offline — product removed from in-memory store:', id);
            return res.json({ success: true, message: 'Product deleted successfully' });
        }

        // ── Online: delete from MongoDB ──
        const product = await CrochetProduct.findByIdAndDelete(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Clean up uploaded file if stored locally
        if (product.image && product.image.includes('/uploads/')) {
            const filename = product.image.split('/uploads/').pop();
            const filePath = path.join(__dirname, '../../uploads', filename);
            if (fs.existsSync(filePath)) {
                try { fs.unlinkSync(filePath); } catch (e) {
                    console.warn('[Crochet API] Could not delete image file:', e.message);
                }
            }
        }

        return res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
