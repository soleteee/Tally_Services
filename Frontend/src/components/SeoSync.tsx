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
            updateLinkTag('canonical', `https://www.mittalonlineservices.com${path}`);

            // 5. Update Common OG Tags (derived from title/description)
            updateMetaTag('property', 'og:title', metadata.title);
            updateMetaTag('property', 'og:description', metadata.description);
            updateMetaTag('property', 'og:url', `https://www.mittalonlineservices.com${path}`);
            updateMetaTag('property', 'og:type', 'website');
            updateMetaTag('property', 'og:site_name', 'Mittal Online Services');

            // 6. Update Twitter Card Tags
            updateMetaTag('name', 'twitter:card', 'summary_large_image');
            updateMetaTag('name', 'twitter:title', metadata.title);
            updateMetaTag('name', 'twitter:description', metadata.description);

            // 7. Inject BreadcrumbList structured data
            injectBreadcrumbSchema(path, metadata.title);
            injectOrganizationSchema();
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

/**
 * Injects BreadcrumbList JSON-LD structured data based on the current path.
 */
function injectBreadcrumbSchema(path: string, title: string) {
    const SCHEMA_ID = 'seo-sync-breadcrumb';
    
    // Remove existing breadcrumb schema
    const existing = document.getElementById(SCHEMA_ID);
    if (existing) existing.remove();

    // Build breadcrumb items from path segments
    const segments = path.split('/').filter(Boolean);
    const breadcrumbItems = [
        {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://www.mittalonlineservices.com/'
        }
    ];

    let cumulativePath = '';
    segments.forEach((segment, index) => {
        cumulativePath += `/${segment}`;
        const name = index === segments.length - 1
            ? title
            : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        breadcrumbItems.push({
            '@type': 'ListItem',
            'position': index + 2,
            'name': name,
            'item': `https://www.mittalonlineservices.com${cumulativePath}`
        });
    });

    // Only inject if we have more than just "Home"
    if (breadcrumbItems.length > 1) {
        const script = document.createElement('script');
        script.id = SCHEMA_ID;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': breadcrumbItems
        });
        document.head.appendChild(script);
    }
}

function injectOrganizationSchema() {
    const SCHEMA_ID = 'seo-sync-organization';
    if (document.getElementById(SCHEMA_ID)) return;

    const script = document.createElement('script');
    script.id = SCHEMA_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Mittal Online Services',
        url: 'https://www.mittalonlineservices.com/',
        description: 'Authorized 3-Star Tally Partner providing TallyPrime, TSS, cloud, customization, training, and consultancy services in Meerut.',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-99979-52180',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi']
        }
    });
    document.head.appendChild(script);
}

export default SeoSync;

