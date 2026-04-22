const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const authorizeSEO = require('../middleware/authorizeSEO');
const {
	getSeoOverview,
	getSeoPagesCatalog,
	getSeoByPage,
	suggestSeoByPage,
	saveSeoByPage,
	upsertSeoByPage,
} = require('../controllers/seoController');

const router = express.Router();

router.get('/seo/overview', verifyToken, authorizeSEO, getSeoOverview);
router.get('/seo/pages', verifyToken, authorizeSEO, getSeoPagesCatalog);
router.get('/seo/:pageKey', verifyToken, authorizeSEO, getSeoByPage);
router.post('/seo/:pageKey/suggest', verifyToken, authorizeSEO, suggestSeoByPage);
router.post('/seo/:pageKey/save', verifyToken, authorizeSEO, saveSeoByPage);

// Legacy endpoint kept for backward compatibility.
router.put('/seo/:pageKey', verifyToken, authorizeSEO, upsertSeoByPage);

module.exports = router;
