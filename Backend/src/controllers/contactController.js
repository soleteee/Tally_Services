const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    const { name, email, phone, message, subject } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: subject || `New Inquiry from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
                    <h2 style="color: #02a884; border-bottom: 2px solid #02a884; padding-bottom: 10px;">New Inquiry Received</h2>
                    
                    <div style="margin-top: 20px;">
                        <p style="font-size: 16px;"><strong>Name:</strong> <span style="color: #333;">${name}</span></p>
                        <p style="font-size: 16px;"><strong>Email:</strong> <span style="color: #333;">${email}</span></p>
                        <p style="font-size: 16px;"><strong>Phone:</strong> <span style="color: #333;">${phone}</span></p>
                        
                        <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                            <p style="font-size: 16px; margin-top: 0;"><strong>Message/Details:</strong></p>
                            <p style="color: #555; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; font-size: 12px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
                        This email was sent from the Mittal Online Services website.
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
};

module.exports = { sendEmail };
