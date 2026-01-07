const express = require('express');
const router = express.Router();
const posterController = require('../controllers/posterController');
const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/', posterController.getPoster);
router.put('/', upload.single('image'), posterController.updatePoster);

module.exports = router;
