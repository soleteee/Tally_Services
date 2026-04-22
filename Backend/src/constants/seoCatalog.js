const BASE_URL = 'https://mittalonlineservices.com';

const SEO_PAGE_CATALOG = [
    { pageKey: 'home', pageName: 'Home', routePath: '/' },
    { pageKey: 'courses', pageName: 'Courses', routePath: '/courses' },
    { pageKey: 'about', pageName: 'About', routePath: '/about' },
    { pageKey: 'contact', pageName: 'Contact', routePath: '/contact' },
    { pageKey: 'testimonials', pageName: 'Testimonials', routePath: '/testimonials' },
    { pageKey: 'certificate-verification', pageName: 'Certificate Verification', routePath: '/certificate-verification' },
    { pageKey: 'job-application', pageName: 'Job Application', routePath: '/job-application' },
    { pageKey: 'products', pageName: 'Products', routePath: '/products' },
    { pageKey: 'services', pageName: 'Services', routePath: '/services' },
    { pageKey: 'resources', pageName: 'Resources', routePath: '/resources' },
    { pageKey: 'inquiry', pageName: 'Inquiry', routePath: '/inquiry' },
    { pageKey: 'careers', pageName: 'Careers', routePath: '/careers' },
    { pageKey: 'clients', pageName: 'Clients', routePath: '/clients' },
    { pageKey: 'renew-tss', pageName: 'Renew TSS', routePath: '/renew-tss' },
    { pageKey: 'upgrade', pageName: 'Upgrade', routePath: '/upgrade' },
    { pageKey: 'online-payment', pageName: 'Online Payment', routePath: '/online-payment' },
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
