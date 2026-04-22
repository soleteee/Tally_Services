const { getCatalogPageByKey } = require('../constants/seoCatalog');

const PAGE_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_KEYWORDS = 25;
const MAX_HEAD_TAGS = 50;

const normalizePageKey = (input) => String(input || '').trim().toLowerCase();

const normalizeRoutePath = (routePath) => {
    if (!routePath || routePath === '/') {
        return '/';
    }

    const ensuredLeadingSlash = routePath.startsWith('/') ? routePath : `/${routePath}`;
    return ensuredLeadingSlash.replace(/\/+$/, '') || '/';
};

const splitHeadTagEntries = (headTagsInput) => {
    const input = String(headTagsInput || '').trim();
    if (!input) {
        return [];
    }

    const tags = [];
    const lines = input.split(/\r?\n/);
    let activeScript = null;

    for (let index = 0; index < lines.length; index += 1) {
        const rawLine = lines[index];
        const line = rawLine.trim();

        if (!line) {
            continue;
        }

        if (activeScript) {
            activeScript.buffer.push(rawLine);
            if (line.includes('</script>')) {
                tags.push({ text: activeScript.buffer.join('\n').trim(), line: activeScript.line });
                activeScript = null;
            }
            continue;
        }

        if (line.startsWith('<script') && !line.includes('</script>')) {
            activeScript = { buffer: [rawLine], line: index + 1 };
            continue;
        }

        tags.push({ text: line, line: index + 1 });
    }

    if (activeScript) {
        tags.push({ text: activeScript.buffer.join('\n').trim(), line: activeScript.line, unterminatedScript: true });
    }

    return tags;
};

const quoteUnquotedAttributes = (tagText) =>
    tagText.replace(/\s([a-zA-Z_:][-a-zA-Z0-9_:.]*)=([^\s"'>`]+)(?=\s|>|\/>)/g, ' $1="$2"');

const getTagName = (tagText) => {
    const match = tagText.match(/^<\s*([a-zA-Z0-9:-]+)/);
    return match ? match[1].toLowerCase() : '';
};

const parseAttributes = (tagText) => {
    const match = tagText.match(/^<\s*[a-zA-Z0-9:-]+\s*([^>]*)>/s);
    const attrChunk = match ? match[1] : '';
    const attrs = {};
    const attrRegex = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

    let attrMatch = attrRegex.exec(attrChunk);
    while (attrMatch) {
        const key = attrMatch[1].toLowerCase();
        attrs[key] = attrMatch[2] !== undefined ? attrMatch[2] : attrMatch[3] || '';
        attrMatch = attrRegex.exec(attrChunk);
    }

    return attrs;
};

const validateScriptJsonLd = (tagText, line, errors) => {
    const scriptTypeMatch = tagText.match(/type\s*=\s*(?:"([^"]+)"|'([^']+)')/i);
    const scriptType = (scriptTypeMatch?.[1] || scriptTypeMatch?.[2] || '').toLowerCase();

    if (scriptType && scriptType !== 'application/ld+json' && scriptType !== 'text/javascript') {
        errors.push(`Line ${line}: script tag type must be application/ld+json or text/javascript`);
    }

    if (scriptType === 'application/ld+json') {
        const jsonMatch = tagText.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        const jsonContent = (jsonMatch?.[1] || '').trim();
        if (!jsonContent) {
            errors.push(`Line ${line}: JSON-LD script is empty`);
            return;
        }

        try {
            JSON.parse(jsonContent);
        } catch (error) {
            errors.push(`Line ${line}: JSON-LD parse error: ${error.message}`);
        }
    }
};

const validateHeadTags = (headTagsInput) => {
    const entries = splitHeadTagEntries(headTagsInput);
    const errors = [];

    if (entries.length > MAX_HEAD_TAGS) {
        errors.push(`Head tags exceed max count (${MAX_HEAD_TAGS}).`);
    }

    for (const entry of entries) {
        const original = entry.text;
        const repaired = quoteUnquotedAttributes(original);
        const line = entry.line;

        if (entry.unterminatedScript) {
            errors.push(`Line ${line}: unterminated <script> tag block`);
            continue;
        }

        if (!repaired.startsWith('<') || !repaired.endsWith('>')) {
            errors.push(`Line ${line}: malformed HTML tag`);
            continue;
        }

        const openAngles = (repaired.match(/</g) || []).length;
        const closeAngles = (repaired.match(/>/g) || []).length;
        if (openAngles !== closeAngles) {
            errors.push(`Line ${line}: unmatched angle brackets`);
        }

        const doubleQuotes = (repaired.match(/"/g) || []).length;
        const singleQuotes = (repaired.match(/'/g) || []).length;
        if (doubleQuotes % 2 !== 0 || singleQuotes % 2 !== 0) {
            errors.push(`Line ${line}: unmatched quotes in attributes`);
        }

        const tagName = getTagName(repaired);
        if (!['meta', 'link', 'script'].includes(tagName)) {
            errors.push(`Line ${line}: only <meta>, <link>, and <script> tags are allowed`);
            continue;
        }

        if (tagName === 'meta') {
            const attrs = parseAttributes(repaired);
            const hasName = Boolean(attrs.name);
            const hasProperty = Boolean(attrs.property);
            const hasContent = Boolean(attrs.content);

            if (!hasName && !hasProperty) {
                errors.push(`Line ${line}: meta tag requires name or property attribute`);
            }
            if (!hasContent) {
                errors.push(`Line ${line}: meta tag requires content attribute`);
            }
        }

        if (tagName === 'link') {
            const attrs = parseAttributes(repaired);
            if (!attrs.rel) {
                errors.push(`Line ${line}: link tag requires rel attribute`);
            }
            if (!attrs.href) {
                errors.push(`Line ${line}: link tag requires href attribute`);
            }
        }

        if (tagName === 'script') {
            validateScriptJsonLd(repaired, line, errors);
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        normalizedTags: entries.slice(0, MAX_HEAD_TAGS).map((entry) => {
            let text = quoteUnquotedAttributes(entry.text).trim();
            // Remove trailing commas, semicolons, and extra punctuation that breaks SEO rendering
            text = text.replace(/[,;]+$/, '').trim();
            return text;
        }),
    };
};

const validateSchemaJson = (schemaTextInput) => {
    const text = String(schemaTextInput || '').trim();
    if (!text) {
        return {
            isValid: true,
            errors: [],
            parsed: null,
            normalized: '',
        };
    }

    let parsed;
    try {
        parsed = JSON.parse(text);
    } catch (error) {
        return {
            isValid: false,
            errors: [`Schema JSON parse error: ${error.message}`],
            parsed: null,
            normalized: '',
        };
    }

    const errors = [];

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        errors.push('Schema JSON must be a JSON object.');
    }

    if (!parsed['@context']) {
        errors.push('Schema JSON must include @context.');
    }

    if (!parsed['@type']) {
        errors.push('Schema JSON must include @type.');
    }

    return {
        isValid: errors.length === 0,
        errors,
        parsed,
        normalized: JSON.stringify(parsed, null, 2),
    };
};

const normalizeKeywords = (keywordsInput) => {
    const asArray = Array.isArray(keywordsInput)
        ? keywordsInput
        : String(keywordsInput || '').split(',');

    const seen = new Set();
    const normalized = [];

    for (const token of asArray) {
        const cleaned = String(token || '').trim().toLowerCase();
        if (!cleaned || seen.has(cleaned)) {
            continue;
        }

        seen.add(cleaned);
        normalized.push(cleaned);

        if (normalized.length >= MAX_KEYWORDS) {
            break;
        }
    }

    return normalized;
};

const sanitizeAndValidateSeoPayload = ({ pageKeyInput, payload }) => {
    const errors = [];

    const pageKey = normalizePageKey(pageKeyInput);
    if (!PAGE_KEY_PATTERN.test(pageKey)) {
        errors.push('Invalid pageKey format. Use lowercase letters, numbers and hyphens only.');
    }

    const pageFromCatalog = getCatalogPageByKey(pageKey);
    if (!pageFromCatalog) {
        errors.push(`Unsupported pageKey: ${pageKey}`);
    }

    const title = String(payload.title || '').trim();
    const description = String(payload.description || '').trim();

    if (!title) {
        errors.push('Title is required.');
    }
    if (title.length > 70) {
        errors.push('Title exceeds 70 characters.');
    }

    if (!description) {
        errors.push('Description is required.');
    }
    if (description.length > 170) {
        errors.push('Description exceeds 170 characters.');
    }

    const headValidation = validateHeadTags(payload.headTags || '');
    const schemaValidation = validateSchemaJson(payload.schemaJson || '');

    errors.push(...headValidation.errors, ...schemaValidation.errors);

    const sanitized = {
        pageKey,
        pageName: pageFromCatalog?.pageName || pageKey,
        routePath: normalizeRoutePath(pageFromCatalog?.routePath || payload.routePath || '/'),
        title,
        description,
        keywords: normalizeKeywords(payload.keywords),
        headTags: headValidation.normalizedTags,
        schemaJson: schemaValidation.normalized,
    };

    return {
        isValid: errors.length === 0,
        errors,
        sanitized,
    };
};

module.exports = {
    normalizePageKey,
    normalizeRoutePath,
    validateHeadTags,
    validateSchemaJson,
    normalizeKeywords,
    sanitizeAndValidateSeoPayload,
};
