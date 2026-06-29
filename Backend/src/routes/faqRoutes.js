const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const {
    getPublicFaqs,
    getAdminFaqs,
    createFaq,
    updateFaq,
    deleteFaq,
} = require('../controllers/faqController');

const router = express.Router();

router.get('/admin/:pageKey', verifyToken, authorizeAdmin, getAdminFaqs);
router.post('/admin', verifyToken, authorizeAdmin, createFaq);
router.put('/admin/:id', verifyToken, authorizeAdmin, updateFaq);
router.delete('/admin/:id', verifyToken, authorizeAdmin, deleteFaq);

router.get('/:pageKey', getPublicFaqs);

module.exports = router;