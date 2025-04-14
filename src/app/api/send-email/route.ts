import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  console.log('API route called');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const { name, email, reason, message, wantReply } = body;

    // Validate required fields
    if (!name || !email || !reason || !message) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('Sending email to owner...');
    // Email to you (the portfolio owner)
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Sending to your own Gmail
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
      console.log('Sending acknowledgment email...');
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Thanks for reaching out!',
        text: `Hey ${name},

Thanks for reaching out! Your message has been successfully transmitted through the digital void and safely stored in my inbox.

I'm currently in the process of:
1. Decrypting your message (just kidding, I'm not that paranoid)
2. Analyzing the content (with my human brain, not AI... probably)
3. Preparing an appropriate response (that might or might not include memes)

While you wait, here's a fun fact: Did you know that the first email was sent in 1971? And here we are, still using it like it's 2024! 

I'll get back to you as soon as I can. In the meantime, feel free to:
- Check out my GitHub for more code adventures
- Connect with me on LinkedIn for professional banter
- Or just enjoy the rest of my portfolio!

Stay awesome,
Shubham Kumar

P.S. If you're reading this, you've successfully passed the Turing test! 🎉`,
        html: `
          <h2>Hey ${name},</h2>
          <p>Thanks for reaching out! Your message has been successfully transmitted through the digital void and safely stored in my inbox.</p>
          
          <p>I'm currently in the process of:</p>
          <ol>
            <li>Decrypting your message (just kidding, I'm not that paranoid)</li>
            <li>Analyzing the content (with my human brain, not AI... probably)</li>
            <li>Preparing an appropriate response (that might or might not include memes)</li>
          </ol>
          
          <p>While you wait, here's a fun fact: Did you know that the first email was sent in 1971? And here we are, still using it like it's 2024!</p>
          
          <p>I'll get back to you as soon as I can. In the meantime, feel free to:</p>
          <ul>
            <li>Check out my GitHub for more code adventures</li>
            <li>Connect with me on LinkedIn for professional banter</li>
            <li>Or just enjoy the rest of my portfolio!</li>
          </ul>
          
          <p>Stay awesome,<br>Shubham Kumar</p>
          
          <p><em>P.S. If you're reading this, you've successfully passed the Turing test! 🎉</em></p>
        `,
      });
    }

    console.log('Emails sent successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 