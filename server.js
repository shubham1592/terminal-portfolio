import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
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
      const textContent = `Hey ${name},

Thanks for your message! I've received it and will get back to you soon.

While you wait, feel free to:
- Check out my GitHub: ${process.env.GITHUB_URL || 'https://github.com/username'}
- Connect on LinkedIn: ${process.env.LINKEDIN_URL || 'https://linkedin.com/in/username'}
- Or explore the rest of my portfolio

Looking forward to our conversation!

Best,
${process.env.NAME || 'Your Name'}`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Hey ${name},</h2>
          <p style="color: #555; line-height: 1.6;">Thanks for your message! I've received it and will get back to you soon.</p>
          
          <p style="color: #555; line-height: 1.6;">While you wait, feel free to:</p>
          <ul style="color: #555; line-height: 1.6;">
            <li>Check out my <a href="${process.env.GITHUB_URL || 'https://github.com/username'}" style="color: #0078D7; text-decoration: none;">GitHub</a></li>
            <li>Connect on <a href="${process.env.LINKEDIN_URL || 'https://linkedin.com/in/username'}" style="color: #0078D7; text-decoration: none;">LinkedIn</a></li>
            <li>Or explore the rest of my portfolio</li>
          </ul>
          
          <p style="color: #555; line-height: 1.6;">Looking forward to our conversation!</p>
          
          <p style="color: #333; margin-top: 20px;">Best,<br>${process.env.NAME || 'Your Name'}</p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Thanks for reaching out!',
        text: textContent,
        html: htmlContent,
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

// Serve the index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 