require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

async function verify() {
    console.log('--- Verifying Configuration ---');
    console.log('Loaded API_URL:', process.env.VITE_API_URL);
    console.log('Loaded EMAIL_USER:', process.env.EMAIL_USER);
    // Mask password: show first 2 chars
    console.log('Loaded EMAIL_PASS:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.substring(0, 2) + '***' : 'undefined');
    console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'undefined');

    // 1. Test MongoDB Connection
    console.log('\nTesting MongoDB Connection...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connection Successful!');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error);
    } finally {
        await mongoose.disconnect();
    }

    // 2. Test Nodemailer
    console.log('\nTesting Nodemailer...');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log('✅ Nodemailer Configuration Verified (Ready to send)!');

        // Optional: Send a test email to self
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self
            subject: 'Test Email from Tally Services Config Verification',
            text: 'If you see this, email sending is working correctly.'
        });
        console.log('✅ Test Email Sent! Message ID:', info.messageId);

    } catch (error) {
        console.error('❌ Nodemailer Verification Failed:', error.message);
    }
}

verify();
