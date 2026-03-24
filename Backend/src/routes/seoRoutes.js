const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const authorizeSEO = require('../middleware/authorizeSEO');
const { getSeoByPage, upsertSeoByPage } = require('../controllers/seoController');

const router = express.Router();

router.get('/seo/:page', verifyToken, authorizeSEO, getSeoByPage);
router.put('/seo/:page', verifyToken, authorizeSEO, upsertSeoByPage);

module.exports = router;
