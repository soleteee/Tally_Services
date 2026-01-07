const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const envPath = path.resolve(__dirname, '.env');
console.log('Reading .env from:', envPath);

// Helper to parse env
const loadEnv = (encoding) => {
    try {
        const content = fs.readFileSync(envPath, encoding);
        const lines = content.split(/\r?\n/);
        lines.forEach(line => {
            // Simple KEY=VALUE parsing
            const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                const key = match[1];
                let val = match[2] || '';
                // basic quote handling
                if (val.startsWith('"') && val.endsWith('"')) {
                    val = val.slice(1, -1);
                }
                process.env[key] = val;
            }
        });
        return true;
    } catch (e) {
        return false;
    }
};

// Try UTF-16LE first as suspected
loadEnv('utf16le');
if (!process.env.EMAIL_USER) {
    console.log('UTF-16LE load yielded no EMAIL_USER, trying utf8...');
    loadEnv('utf8');
}

console.log('EMAIL_USER:', process.env.EMAIL_USER);

const sendTestEmail = async () => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Missing credentials (EMAIL_USER or EMAIL_PASS)');
        return;
    }

    try {
        console.log('Attempting to send email with user:', process.env.EMAIL_USER);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'anshsharma0824@gmail.com',
            subject: 'Test Email from Agent (Admin Panel Check)',
            text: 'This is a test email sent to verify that the mailing system from the Admin Panel backend is functioning correctly.'
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

sendTestEmail();
