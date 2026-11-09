const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
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
        const secret = process.env.JWT_SECRET || 'replace-with-a-strong-secret';

        // Check if database is connected
        let user = null;
        if (mongoose.connection.readyState === 1) {
            try {
                user = await User.findOne({ email: normalizedEmail });
            } catch (dbErr) {
                console.warn('[Auth] Database lookup failed, falling back to environment credentials:', dbErr.message);
            }
        }

        // If user found in database, verify hashed password
        if (user) {
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

        // Fallback / Environment credentials check (ensures login works even if Atlas connection is offline or unwhitelisted)
        const envAdminEmail = (process.env.ADMIN_USER_EMAIL || 'admin@admin.com').toLowerCase().trim();
        const envAdminPassword = process.env.ADMIN_USER_PASSWORD || 'admin123';
        const envSeoEmail = (process.env.SEO_USER_EMAIL || 'seo@admin.com').toLowerCase().trim();
        const envSeoPassword = process.env.SEO_USER_PASSWORD || 'secure123';

        if (normalizedEmail === envAdminEmail && password === envAdminPassword) {
            const token = jwt.sign(
                { id: 'admin-env-user', role: 'admin' },
                secret,
                { expiresIn: '1d' }
            );

            return res.status(200).json({
                success: true,
                data: {
                    token,
                    user: {
                        id: 'admin-env-user',
                        email: envAdminEmail,
                        role: 'admin',
                    },
                },
            });
        }

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
    } catch (error) {
        console.error('[Auth] Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to login user',
        });
    }
};
