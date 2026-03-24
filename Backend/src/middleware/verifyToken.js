const jwt = require('jsonwebtoken');

const getTokenFromRequest = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }

    return null;
};

const verifyToken = (req, res, next) => {
    try {
        const token = getTokenFromRequest(req);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is missing',
            });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({
                success: false,
                message: 'JWT secret is not configured',
            });
        }

        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return next();
    } catch (_error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired authentication token',
        });
    }
};

module.exports = verifyToken;
