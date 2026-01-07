export interface ComparisonItem {
    id: string;
    title: string;
    category: 'Product' | 'Service' | 'Solution';
    description: string;
    features: string[];
    idealFor: string;
}

export const comparisonData: Record<string, ComparisonItem> = {
    // Products
    'tally-on-mobile': {
        id: 'tally-on-mobile',
        title: 'Tally on Mobile',
        category: 'Product',
        description: 'Access your critical business reports on your mobile device.',
        features: ['Real-time data access', 'View Balance Sheet & P&L', 'Secure & Encrypted', 'Android & iOS support'],
        idealFor: 'Business owners on the go'
    },
    'tally-prime-silver': {
        id: 'tally-prime-silver',
        title: 'TallyPrime Silver',
        category: 'Product',
        description: 'Single user edition for standalone PCs.',
        features: ['Single User License', 'Remote Access', 'E-Invoicing & GST', 'Business Reporting'],
        idealFor: 'Small businesses with one accountant'
    },
    'tally-prime-gold': {
        id: 'tally-prime-gold',
        title: 'TallyPrime Gold',
        category: 'Product',
        description: 'Unlimited multi-user edition for LAN environments.',
        features: ['Unlimited Multi-User', 'Centralized Data', 'High Concurrency', 'Advanced Security'],
        idealFor: 'Medium to Large businesses with multiple users'
    },
    'tally-prime-auditor': {
        id: 'tally-prime-auditor',
        title: 'TallyPrime Auditor',
        category: 'Product',
        description: 'Dedicated version for Chartered Accountants.',
        features: ['Audit Tools', 'Tax Compliance', 'Client Data Management', 'Remote Audit'],
        idealFor: 'Chartered Accountants (CAs)'
    },
    'tally-prime-server': {
        id: 'tally-prime-server',
        title: 'TallyPrime Server',
        category: 'Product',
        description: 'Enterprise-class product for high-performance concurrency.',
        features: ['Zero Downtime', 'High Speed', 'Data Security', 'Concurrent Access'],
        idealFor: 'Enterprises with high data volume'
    },
    'shoper-9-silver': {
        id: 'shoper-9-silver',
        title: 'Shoper 9 Silver',
        category: 'Product',
        description: 'Retail point-of-sale solution for single stores.',
        features: ['POS Billing', 'Inventory Management', 'Barcode Support', 'GST Ready'],
        idealFor: 'Single Retail Stores'
    },
    'shoper-9-gold': {
        id: 'shoper-9-gold',
        title: 'Shoper 9 Gold',
        category: 'Product',
        description: 'Retail solution for chain stores and distribution.',
        features: ['Chain Store Management', 'Centralized Control', 'Data Synchronization', 'Comprehensive Reporting'],
        idealFor: 'Retail Chains & Distributors'
    },
    'tally-on-rent': {
        id: 'tally-on-rent',
        title: 'Tally on Rent',
        category: 'Product',
        description: 'Flexible rental options for Tally licenses.',
        features: ['Pay as you go', 'Monthly/Quarterly Plans', 'Full Features', 'Instant Activation'],
        idealFor: 'Seasonal businesses or startups'
    },
    'tally-virtual-user': {
        id: 'tally-virtual-user',
        title: 'Tally Virtual User (TVU)',
        category: 'Product',
        description: 'Virtual access for authorized users.',
        features: ['Cloud/RDP Access', 'Secure Login', 'Location Independent', 'Optimized Performance'],
        idealFor: 'Remote teams'
    },
    'bookkeeper': {
        id: 'bookkeeper',
        title: 'Bookkeeper',
        category: 'Product',
        description: 'Accounting software for small businesses.',
        features: ['Simple Accounting', 'Invoicing', 'Inventory', 'GST Reports'],
        idealFor: 'Freelancers & Micro Businesses'
    },

    // Services
    'tss': {
        id: 'tss',
        title: 'Tally Software Services (TSS)',
        category: 'Service',
        description: 'Annual subscription for Tally updates and features.',
        features: ['Product Updates', 'Data Synch', 'Remote Access', 'Banking Features'],
        idealFor: 'Existing Tally users'
    },
    'cloud-access': {
        id: 'cloud-access',
        title: 'TallyPrime Cloud Access',
        category: 'Service',
        description: 'Host Tally on the cloud for anywhere access.',
        features: ['24/7 Availability', 'Auto Backups', 'Secure Hosting', 'Device Independent'],
        idealFor: 'Businesses needing remote flexibility'
    },
    'training': {
        id: 'training',
        title: 'Tally Training',
        category: 'Service',
        description: 'Professional training for Tally users.',
        features: ['Expert Trainers', 'Hands-on Practice', 'Certification', 'Custom Modules'],
        idealFor: 'Students & Professionals'
    },
    'consultancy': {
        id: 'consultancy',
        title: 'Consultancy',
        category: 'Service',
        description: 'Expert guidance to optimize business processes.',
        features: ['Process Audit', 'Workflow Design', 'Implementation', 'Advisory'],
        idealFor: 'Businesses optimizing operations'
    }
};

export const getComparisonItem = (id: string) => comparisonData[id];
export const getAllComparisonItems = () => Object.values(comparisonData);
