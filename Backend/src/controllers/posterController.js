const Poster = require('../models/Poster');

// Get poster settings (create default if not exists)
exports.getPoster = async (req, res) => {
    try {
        let poster = await Poster.findOne();
        if (!poster) {
            poster = await Poster.create({ imageUrl: '', isVisible: false });
        }
        res.json(poster);
    } catch (error) {
        console.error("Error in getPoster:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update poster settings
exports.updatePoster = async (req, res) => {
    try {
        const { imageUrl: bodyImageUrl, isVisible } = req.body;
        let finalImageUrl = bodyImageUrl;

        if (req.file) {
            // Construct URL for uploaded file
            const protocol = req.protocol;
            const host = req.get('host');
            finalImageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
        }

        let poster = await Poster.findOne();
        if (!poster) {
            poster = new Poster({ imageUrl: finalImageUrl, isVisible });
        } else {
            // Only update imageUrl if a new one is provided (file or valid string)
            if (finalImageUrl !== undefined) {
                poster.imageUrl = finalImageUrl;
            }
            poster.isVisible = isVisible;
            poster.updatedAt = Date.now();
        }

        const savedPoster = await poster.save();
        res.json(savedPoster);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
