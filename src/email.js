const express = require('express');
const nodemailer = require('nodemailer'); // For sending emails
const app = express();
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { deviceType, osDetails, browserDetails, ip, city, country } = req.body;

    const transporter = nodemailer.createTransport({
        // Configuration for the email service (e.g., SMTP)
        // For Gmail, for example:
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@example.com',
        subject: 'Website Visit Details',
        text: `Details of the visitor:
Device: ${deviceType}
OS: ${osDetails}
Browser: ${browserDetails}
IPv4: ${ip}
City: ${city}
Country: ${country}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).send('Failed to send email');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
