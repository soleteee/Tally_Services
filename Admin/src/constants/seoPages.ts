export type SeoPageConfig = {
    pageKey: string;
    pageName: string;
    routePath: string;
};

export const SEO_FALLBACK_PAGES: SeoPageConfig[] = [
    { pageKey: 'home', pageName: 'Home', routePath: '/' },
    { pageKey: 'courses', pageName: 'Courses', routePath: '/courses' },
    { pageKey: 'about', pageName: 'About', routePath: '/about' },
    { pageKey: 'contact', pageName: 'Contact', routePath: '/contact' },
    { pageKey: 'testimonials', pageName: 'Testimonials', routePath: '/testimonials' },
    { pageKey: 'certificate-verification', pageName: 'Certificate Verification', routePath: '/certificate-verification' },
    { pageKey: 'job-application', pageName: 'Job Application', routePath: '/job-application' },
];

export const getFallbackPageByKey = (pageKey: string): SeoPageConfig | undefined =>
    SEO_FALLBACK_PAGES.find((page) => page.pageKey === pageKey);
