/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const distTemplatePath = path.join(distDir, 'index.html');
const publicSnapshotPath = path.join(projectRoot, 'public', 'seo', 'metadata.snapshot.json');
const distSnapshotPath = path.join(distDir, 'seo', 'metadata.snapshot.json');
const siteBaseUrl = 'https://mittalonlineservices.com';
const SEO_BLOCK_START = '<!-- SEO_PRERENDER_START -->';
const SEO_BLOCK_END = '<!-- SEO_PRERENDER_END -->';

const readJsonFile = async (filePath) => {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
};

const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (_error) {
        return false;
    }
};

const escapeHtml = (value) =>
    String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const routeToOutputPath = (routePath) => {
    if (!routePath || routePath === '/') {
        return path.join(distDir, 'index.html');
    }

    const cleaned = routePath.replace(/^\//, '');
    return path.join(distDir, cleaned, 'index.html');
};

const removeExistingSeoTags = (html) => {
    let next = html;

    // Remove previously injected SEO prerender block wholesale to avoid cumulative duplicates.
    next = next.replace(
        /<!-- SEO_PRERENDER_START -->[\s\S]*?<!-- SEO_PRERENDER_END -->\s*/gi,
        ''
    );

    next = next.replace(/<title>[\s\S]*?<\/title>/gi, '');
    next = next.replace(/<meta\s+name=(?:"|')description(?:"|')[^>]*>/gi, '');
    next = next.replace(/<meta\s+name=(?:"|')keywords(?:"|')[^>]*>/gi, '');
    next = next.replace(/<meta\s+name=(?:"|')robots(?:"|')[^>]*>/gi, '');
    next = next.replace(/<meta\s+property=(?:"|')og:[^"']+(?:"|')[^>]*>/gi, '');
    next = next.replace(/<meta\s+name=(?:"|')twitter:[^"']+(?:"|')[^>]*>/gi, '');
    next = next.replace(/<meta\s+name=(?:"|')google-site-verification(?:"|')[^>]*>/gi, '');
    next = next.replace(/<link\s+rel=(?:"|')canonical(?:"|')[^>]*>/gi, '');
    next = next.replace(/<script[^>]*type=(?:"|')application\/ld\+json(?:"|')[^>]*>[\s\S]*?<\/script>/gi, '');

    return next;
};

const canonicalUrlForPath = (routePath) => {
    if (!routePath || routePath === '/') {
        return siteBaseUrl;
    }
    return `${siteBaseUrl}${routePath}`;
};

const normalizeHeadTag = (tag) => {
    // Some sources may accidentally prefix tags with punctuation (e.g. ",,,,,<meta ...>").
    const trimmed = String(tag || '').trim();
    if (!trimmed) {
        return '';
    }

    const firstTagIndex = trimmed.indexOf('<');
    if (firstTagIndex === -1) {
        return '';
    }

    const withoutPrefixNoise = trimmed.slice(firstTagIndex).trim();
    const withoutTrailingPunctuation = withoutPrefixNoise.replace(/[,;]+$/, '').trim();

    if (!withoutTrailingPunctuation.startsWith('<')) {
        return '';
    }

    return withoutTrailingPunctuation;
};

const buildSeoHeadMarkup = (metadata) => {
    const title = escapeHtml(metadata.title || 'Mittal Online Services');
    const description = escapeHtml(metadata.description || '');
    const keywords = Array.isArray(metadata.keywords)
        ? metadata.keywords.join(', ')
        : String(metadata.keywords || '');
    const canonical = escapeHtml(canonicalUrlForPath(metadata.routePath));

    const tags = [];
    tags.push(`<title>${title}</title>`);

    if (description) {
        tags.push(`<meta name="description" content="${description}" />`);
    }

    if (keywords) {
        tags.push(`<meta name="keywords" content="${escapeHtml(keywords)}" />`);
    }

    tags.push(`<link rel="canonical" href="${canonical}" />`);

    if (Array.isArray(metadata.headTags)) {
        const seenHeadTags = new Set();
        for (const tag of metadata.headTags) {
            const normalized = normalizeHeadTag(tag);
            if (!normalized || seenHeadTags.has(normalized)) {
                continue;
            }

            seenHeadTags.add(normalized);
            tags.push(normalized);
        }
    }

    const schemaJson = String(metadata.schemaJson || '').trim();
    if (schemaJson) {
        tags.push(`<script type="application/ld+json">\n${schemaJson}\n</script>`);
    }

    return tags.join('\n  ');
};

const injectSeoHeadMarkup = (html, seoHeadMarkup) => {
    const withHeadClean = removeExistingSeoTags(html);

    if (!/<head[^>]*>/i.test(withHeadClean)) {
        throw new Error('Cannot inject SEO tags: missing <head> element in template');
    }

    const wrappedMarkup = `${SEO_BLOCK_START}\n  ${seoHeadMarkup}\n  ${SEO_BLOCK_END}`;
    return withHeadClean.replace(/(<head[^>]*>)/i, `$1\n  ${wrappedMarkup}`);
};

const loadSnapshot = async () => {
    if (await fileExists(distSnapshotPath)) {
        return readJsonFile(distSnapshotPath);
    }

    if (await fileExists(publicSnapshotPath)) {
        return readJsonFile(publicSnapshotPath);
    }

    throw new Error('SEO snapshot file not found in dist/seo or public/seo');
};

const getKnownRoutesFromSnapshot = (snapshot) => {
    const catalogRoutes = Array.isArray(snapshot.routeCatalog)
        ? snapshot.routeCatalog.map((entry) => entry.routePath).filter(Boolean)
        : [];

    const mappedRoutes = Object.keys(snapshot.byPath || {});
    const routeSet = new Set(['/', ...catalogRoutes, ...mappedRoutes]);
    return [...routeSet];
};

const renderAllRouteFiles = async () => {
    if (!(await fileExists(distTemplatePath))) {
        console.warn('[SEO prerender] dist/index.html not found. Skipping prerender.');
        return;
    }

    const templateHtml = await fs.readFile(distTemplatePath, 'utf8');
    const snapshot = await loadSnapshot();
    const routes = getKnownRoutesFromSnapshot(snapshot);

    const writes = [];

    for (const routePath of routes) {
        const metadata = snapshot.byPath?.[routePath] || {
            routePath,
            title: 'Mittal Online Services',
            description: '',
            keywords: [],
            headTags: [],
            schemaJson: '',
        };

        const seoHeadMarkup = buildSeoHeadMarkup(metadata);
        const routeHtml = injectSeoHeadMarkup(templateHtml, seoHeadMarkup);
        const outputPath = routeToOutputPath(routePath);

        writes.push(
            fs.mkdir(path.dirname(outputPath), { recursive: true })
                .then(() => fs.writeFile(outputPath, routeHtml, 'utf8'))
        );
    }

    await Promise.all(writes);
    console.log(`[SEO prerender] rendered ${routes.length} routes.`);
};

renderAllRouteFiles().catch((error) => {
    console.error('[SEO prerender] failed:', error.message);
    process.exit(1);
});
