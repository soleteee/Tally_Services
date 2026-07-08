const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const dns = require('dns');

// Load UTF-16LE or UTF-8 .env file
const envFilePath = path.join(__dirname, '.env');
if (fs.existsSync(envFilePath)) {
    const rawEnvBuffer = fs.readFileSync(envFilePath);
    const isUtf16Le = rawEnvBuffer.length >= 2 && rawEnvBuffer[0] === 0xff && rawEnvBuffer[1] === 0xfe;
    const rawEnvText = isUtf16Le
        ? rawEnvBuffer.toString('utf16le')
        : rawEnvBuffer.toString('utf8');
    const parsedEnv = dotenv.parse(rawEnvText);
    Object.assign(process.env, parsedEnv);
}

// Set DNS servers to Google and Cloudflare DNS to avoid SRV resolution issues (e.g. querySrv ECONNREFUSED)
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (dnsErr) {
    console.warn('[DNS] Failed to set custom DNS servers:', dnsErr.message);
}

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
