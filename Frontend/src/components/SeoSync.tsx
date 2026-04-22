import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface SeoMetadata {
    title: string;
    description: string;
    keywords?: string | string[];
    headTags?: string[];
    schemaJson?: string;
    routePath: string;
}

interface SeoSnapshot {
    byPath: Record<string, SeoMetadata>;
}

/**
 * SeoSync component responsible for updating document metadata 
 * based on the current route and the server-side SEO snapshot.
 */
const SeoSync = () => {
    const location = useLocation();
    const [snapshot, setSnapshot] = useState<SeoSnapshot | null>(null);

    // Load the snapshot once on component mount
    useEffect(() => {
        const fetchSnapshot = async () => {
            try {
                // Fetch the snapshot from the public directory
                const response = await fetch('/seo/metadata.snapshot.json');
                if (response.ok) {
                    const data = await response.json();
                    setSnapshot(data);
                }
            } catch (error) {
                console.error('[SEO] Failed to load metadata snapshot:', error);
            }
        };

        fetchSnapshot();
    }, []);

    // Update head tags whenever the route or snapshot changes
    useEffect(() => {
        if (!snapshot) return;

        const path = location.pathname;
        // Find metadata by route path
        const metadata = snapshot.byPath[path];

        if (metadata) {
            // 1. Update Document Title
            if (metadata.title) {
                document.title = metadata.title;
            }

            // 2. Update Meta Description
            updateMetaTag('name', 'description', metadata.description);

            // 3. Update Meta Keywords
            const keywordsStr = Array.isArray(metadata.keywords) 
                ? metadata.keywords.join(', ') 
                : metadata.keywords || '';
            updateMetaTag('name', 'keywords', keywordsStr);

            // 4. Update Canonical Link
            updateLinkTag('canonical', `https://mittalonlineservices.com${path}`);

            // 5. Update Common OG Tags (derived from title/description)
            updateMetaTag('property', 'og:title', metadata.title);
            updateMetaTag('property', 'og:description', metadata.description);
            updateMetaTag('property', 'og:url', `https://mittalonlineservices.com${path}`);

            // 6. Handle custom headTags from the snapshot
            // We intentionally avoid complex HTML injection here to prevent double-injection
            // with the prerendered HTML, focus on the primary meta tags for SPA navigation.
        }
    }, [location, snapshot]);

    return null;
};

/**
 * Helper to update or create a meta tag.
 */
function updateMetaTag(attrName: string, attrValue: string, content: string) {
    if (!content) return;
    
    let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
}

/**
 * Helper to update or create a link tag.
 */
function updateLinkTag(rel: string, href: string) {
    if (!href) return;
    
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
    }
    element.setAttribute('href', href);
}

export default SeoSync;
