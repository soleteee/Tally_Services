export interface NavItem {
    name: string;
    link: string;
    desc?: string;
}

export const productsNav: NavItem[] = [
    { name: 'TallyPrime Silver', desc: 'Single user edition for standalone PCs.', link: '/products/prime-silver' },
    { name: 'TallyPrime Gold', desc: 'Unlimited multi-user edition for LAN environments.', link: '/products/prime-gold' },
    { name: 'TallyPrime Auditor Version', desc: 'Dedicated version for Chartered Accountants.', link: '/products/auditor' },
    { name: 'TallyPrime Server', desc: 'Enterprise-class product for high-performance concurrency.', link: '/products/server' },
    { name: 'Shoper 9 Silver', desc: 'Retail point-of-sale solution for single stores.', link: '/products/shoper-silver' },
    { name: 'Shoper 9 Gold', desc: 'Retail solution for chain stores and distribution.', link: '/products/shoper-gold' },
    { name: 'Tally on Rent', desc: 'Flexible rental options for Tally licenses.', link: '/products/rent' },
    { name: 'Tally Virtual User', desc: 'Virtual access for authorized users.', link: '/products/tvu' },
    { name: 'Tally on Mobile', desc: 'View critical business reports on your smartphone.', link: '/products/mobile' },
    { name: 'Bookkeeper', desc: 'Accounting software for small businesses.', link: '/products/bookkeeper' },
];

export const servicesNav: NavItem[] = [
    { name: 'Tally Software Services (TSS)', link: '/services/tss' },
    { name: 'TallyPrime Cloud Access', link: '/services/cloud' },
    { name: 'Tally Training', link: '/services/training' },
    { name: 'Tally Capital', link: '/services/capital' },
    { name: 'Insurance', link: '/services/insurance' },
    { name: 'Business Loans', link: '/services/loan' },
    { name: 'Deposit Services', link: '/services/deposit' },
    { name: 'Accounting Services', link: '/services/accounting' },
    { name: 'Consultancy', link: '/services/consultancy' },
];

export const solutionsNav: NavItem[] = [
    { name: 'Tally With AI', link: '/solutions/ai' },
    { name: 'Tally Customization', link: '/solutions/customization' },
];

// Helper to get all items for finding descriptions or checking links
export const allNavItems = [...productsNav, ...servicesNav, ...solutionsNav];
