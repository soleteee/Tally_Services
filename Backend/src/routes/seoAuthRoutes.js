const express = require('express');
const { seoLogin } = require('../controllers/seoAuthController');

const router = express.Router();

router.post('/seo/login', seoLogin);

module.exports = router;
