const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({
                success: false,
                message: 'JWT secret is not configured',
            });
        }

        const token = jwt.sign(
            { id: user._id.toString(), role: user.role },
            secret,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (_error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to login user',
        });
    }
};
