const fs = require('fs/promises');
const path = require('path');
const { SEO_PAGE_CATALOG } = require('../constants/seoCatalog');

const resolvePaths = () => {
    const workspaceRoot = path.resolve(__dirname, '../../..');
    const frontendRoot = path.join(workspaceRoot, 'Frontend');

    return {
        publicSnapshotPath: path.join(frontendRoot, 'public', 'seo', 'metadata.snapshot.json'),
        distSnapshotPath: path.join(frontendRoot, 'dist', 'seo', 'metadata.snapshot.json'),
    };
};

const toPublicMetadata = (seoDoc) => ({
    pageKey: seoDoc.pageKey,
    pageName: seoDoc.pageName,
    routePath: seoDoc.routePath,
    title: seoDoc.title,
    description: seoDoc.description,
    keywords: seoDoc.keywords,
    headTags: seoDoc.headTags,
    schemaJson: seoDoc.schemaJson,
    updatedAt: seoDoc.updatedAt,
    updatedBy: seoDoc.updatedBy,
});

const buildSnapshot = (seoDocuments) => {
    const byPageKey = {};
    const byPath = {};

    for (const page of SEO_PAGE_CATALOG) {
        const found = seoDocuments.find((doc) => doc.pageKey === page.pageKey);
        if (!found) {
            continue;
        }

        const mapped = toPublicMetadata(found);
        byPageKey[page.pageKey] = mapped;
        byPath[page.routePath] = mapped;
    }

    return {
        updatedAt: new Date().toISOString(),
        routeCatalog: SEO_PAGE_CATALOG,
        byPageKey,
        byPath,
    };
};

const writeJsonFile = async (targetPath, payload) => {
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, JSON.stringify(payload, null, 2), 'utf8');
};

const writeSeoSnapshot = async (seoDocuments) => {
    const snapshot = buildSnapshot(seoDocuments);
    const { publicSnapshotPath, distSnapshotPath } = resolvePaths();

    await writeJsonFile(publicSnapshotPath, snapshot);

    try {
        await writeJsonFile(distSnapshotPath, snapshot);
    } catch (_error) {
        // dist is optional before build output exists.
    }

    return {
        snapshot,
        paths: {
            publicSnapshotPath,
            distSnapshotPath,
        },
    };
};

module.exports = {
    writeSeoSnapshot,
    buildSnapshot,
};
