const express = require('express');
const router = express.Router();
const crochetController = require('../controllers/crochetController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDirectory = path.join(__dirname, '../../uploads');
fs.mkdirSync(uploadsDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadsDirectory);
    },
    filename: (_req, file, cb) => {
        cb(null, 'crochet-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Public routes
router.get('/', crochetController.getPublicCrochetProducts);
router.get('/:id', crochetController.getCrochetProductById);

// Admin routes
router.get('/admin/all', crochetController.getAdminCrochetProducts);
router.post('/', upload.any(), crochetController.createCrochetProduct);
router.put('/:id', upload.any(), crochetController.updateCrochetProduct);
router.patch('/:id/toggle', crochetController.toggleAvailability);
router.delete('/:id', crochetController.deleteCrochetProduct);

module.exports = router;

