const BASE_URL = 'https://mittalonlineservices.com';

const SEO_PAGE_CATALOG = [
    { pageKey: 'home', pageName: 'Home', routePath: '/' },
    { pageKey: 'about', pageName: 'About', routePath: '/about' },
    { pageKey: 'about-team', pageName: 'Our Team', routePath: '/about/team' },
    { pageKey: 'about-journey', pageName: 'Our Journey', routePath: '/about/journey' },
    { pageKey: 'about-why-us', pageName: 'Why Choose Us', routePath: '/about/why-us' },
    { pageKey: 'products', pageName: 'Products', routePath: '/products' },
    { pageKey: 'services', pageName: 'Services', routePath: '/services' },
    { pageKey: 'blogs', pageName: 'Blogs', routePath: '/blogs' },
    { pageKey: 'testimonials', pageName: 'Testimonials', routePath: '/testimonials' },
    { pageKey: 'contact', pageName: 'Contact Us', routePath: '/contact' },
    { pageKey: 'inquiry', pageName: 'Inquiry', routePath: '/inquiry' },
    { pageKey: 'careers', pageName: 'Careers', routePath: '/careers' },
    { pageKey: 'clients', pageName: 'Our Clients', routePath: '/clients' },
    
    // Product Pages
    { pageKey: 'prime-silver', pageName: 'TallyPrime Silver', routePath: '/products/prime-silver' },
    { pageKey: 'prime-gold', pageName: 'TallyPrime Gold', routePath: '/products/prime-gold' },
    { pageKey: 'auditor', pageName: 'Auditor Version', routePath: '/products/auditor' },
    { pageKey: 'server', pageName: 'TallyPrime Server', routePath: '/products/server' },
    { pageKey: 'shoper-silver', pageName: 'Shoper 9 Silver', routePath: '/products/shoper-silver' },
    { pageKey: 'shoper-gold', pageName: 'Shoper 9 Gold', routePath: '/products/shoper-gold' },
    { pageKey: 'bookkeeper', pageName: 'Bookkeeper', routePath: '/products/bookkeeper' },
    { pageKey: 'rent', pageName: 'TallyPrime on Rent', routePath: '/products/rent' },
    { pageKey: 'tvu', pageName: 'Tally Virtual User', routePath: '/products/tvu' },
    { pageKey: 'mobile', pageName: 'Tally on Mobile', routePath: '/products/mobile' },
    
    // Service Pages
    { pageKey: 'tss', pageName: 'Tally TSS Renewal', routePath: '/services/tss' },
    { pageKey: 'cloud', pageName: 'Tally on Cloud', routePath: '/services/cloud' },
    { pageKey: 'training', pageName: 'Tally Training', routePath: '/services/training' },
    { pageKey: 'capital', pageName: 'Tally Capital', routePath: '/services/capital' },
    { pageKey: 'accounting', pageName: 'Accounting Services', routePath: '/services/accounting' },
    { pageKey: 'consultancy', pageName: 'Consultancy', routePath: '/services/consultancy' },
    
    // Solutions
    { pageKey: 'solutions-ai', pageName: 'Tally With AI', routePath: '/solutions/ai' },
    { pageKey: 'solutions-customization', pageName: 'Tally Customization', routePath: '/solutions/customization' },
    
    // Utilities
    { pageKey: 'renew-tss', pageName: 'Renew TSS', routePath: '/renew-tss' },
    { pageKey: 'upgrade', pageName: 'Upgrade Tally', routePath: '/upgrade' },
    { pageKey: 'online-payment', pageName: 'Online Payment', routePath: '/online-payment' },
    { pageKey: 'landing-page', pageName: 'Landing Page (Main)', routePath: '/landing-page' },
];

const pageByKey = new Map(SEO_PAGE_CATALOG.map((page) => [page.pageKey, page]));

const getCatalogPageByKey = (pageKey) => pageByKey.get(pageKey) || null;

const canonicalUrlForPath = (routePath) => {
    const normalizedPath = routePath === '/' ? '' : routePath;
    return `${BASE_URL}${normalizedPath}`;
};

module.exports = {
    BASE_URL,
    SEO_PAGE_CATALOG,
    getCatalogPageByKey,
    canonicalUrlForPath,
};
