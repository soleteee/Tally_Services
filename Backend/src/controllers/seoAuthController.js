const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

exports.seoLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const secret = process.env.JWT_SECRET || 'replace-with-a-strong-secret';

        let user = null;
        if (mongoose.connection.readyState === 1) {
            try {
                user = await User.findOne({ email: normalizedEmail });
            } catch (dbErr) {
                console.warn('[SEO Auth] Database lookup failed, falling back to environment credentials:', dbErr.message);
            }
        }

        if (user && user.role === 'seo') {
            const passwordMatched = await bcrypt.compare(password, user.password);
            if (!passwordMatched) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
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
        }

        // Fallback to SEO credentials in .env
        const envSeoEmail = (process.env.SEO_USER_EMAIL || 'seo@admin.com').toLowerCase().trim();
        const envSeoPassword = process.env.SEO_USER_PASSWORD || 'secure123';

        if (normalizedEmail === envSeoEmail && password === envSeoPassword) {
            const token = jwt.sign(
                { id: 'seo-env-user', role: 'seo' },
                secret,
                { expiresIn: '1d' }
            );

            return res.status(200).json({
                success: true,
                data: {
                    token,
                    user: {
                        id: 'seo-env-user',
                        email: envSeoEmail,
                        role: 'seo',
                    },
                },
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
    } catch (_error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to login SEO user',
        });
    }
};
