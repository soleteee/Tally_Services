export type SeoPageConfig = {
    pageKey: string;
    pageName: string;
    routePath: string;
};

export const SEO_FALLBACK_PAGES: SeoPageConfig[] = [
    // Main Pages
    { pageKey: 'home', pageName: 'Home', routePath: '/' },
    { pageKey: 'about', pageName: 'About Us', routePath: '/about' },
    { pageKey: 'blogs', pageName: 'Blogs', routePath: '/blogs' },
    { pageKey: 'testimonials', pageName: 'Testimonials', routePath: '/testimonials' },
    { pageKey: 'clients', pageName: 'Our Clients', routePath: '/clients' },
    { pageKey: 'careers', pageName: 'Careers', routePath: '/careers' },
    { pageKey: 'online-payment', pageName: 'Online Payment', routePath: '/online-payment' },
    { pageKey: 'contact', pageName: 'Contact Us', routePath: '/contact' },
    { pageKey: 'inquiry', pageName: 'Inquiry', routePath: '/inquiry' },
    { pageKey: 'review-generator', pageName: 'Review Generator', routePath: '/review-generator' },
    { pageKey: 'landing-page', pageName: 'Landing Page (Main)', routePath: '/landing-page' },
    { pageKey: 'renew-tss', pageName: 'Renew TSS', routePath: '/renew-tss' },
    { pageKey: 'upgrade', pageName: 'Upgrade Tally', routePath: '/upgrade' },
    { pageKey: 'tally-ira', pageName: 'TallyIra', routePath: '/tally-ira' },

    // Product Pages
    { pageKey: 'products', pageName: 'Products (All)', routePath: '/products' },
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
    { pageKey: 'services', pageName: 'Services (All)', routePath: '/services' },
    { pageKey: 'tss', pageName: 'Tally TSS Renewal', routePath: '/services/tss' },
    { pageKey: 'cloud', pageName: 'Tally on Cloud', routePath: '/services/cloud' },
    { pageKey: 'training', pageName: 'Tally Training', routePath: '/services/training' },
    { pageKey: 'capital', pageName: 'Tally Capital', routePath: '/services/capital' },
    { pageKey: 'accounting', pageName: 'Accounting Services', routePath: '/services/accounting' },
    { pageKey: 'consultancy', pageName: 'Consultancy & AMC Support', routePath: '/services/consultancy' },
];

export const getFallbackPageByKey = (pageKey: string): SeoPageConfig | undefined =>
    SEO_FALLBACK_PAGES.find((page) => page.pageKey === pageKey);
