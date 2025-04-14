import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, reason, message, wantReply } = req.body;

    // Validate required fields
    if (!name || !email || !reason || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Email to you (the portfolio owner)
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission: ${reason}`,
      text: `
Name: ${name}
Email: ${email}
Reason: ${reason}
Message: ${message}
Want Reply: ${wantReply ? 'Yes' : 'No'}
Timestamp: ${new Date().toISOString()}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Want Reply:</strong> ${wantReply ? 'Yes' : 'No'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    });

    // Email to the sender (acknowledgement)
    if (wantReply) {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Thanks for reaching out!',
        text: `Hey ${name},

Thanks for your message! I've received it and will get back to you soon.

While you wait, feel free to:
- Check out my GitHub (github.com/shubham1592)
- Connect on LinkedIn (https://www.linkedin.com/in/shubhamkumar1592/)
- Or explore the rest of my portfolio

Looking forward to our conversation!

Best,
Shubham`,
        html: `
          <h2>Hey ${name},</h2>
          <p>Thanks for your message! I've received it and will get back to you soon.</p>
          
          <p>While you wait, feel free to:</p>
          <ul>
            <li>Check out my <a href="https://github.com/shubham1592">GitHub</a></li>
            <li>Connect on <a href="https://linkedin.com/in/shubhamkumar1592">LinkedIn</a></li>
            <li>Or explore the rest of my portfolio</li>
          </ul>
          
          <p>Looking forward to our conversation!</p>
          
          <p>Best,<br>Shubham Kumar</p>
        `,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.',
      details: error.message 
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Accessible from other devices at: http://${process.env.HOST || '192.168.1.21'}:${port}`);
}); 