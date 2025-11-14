import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

// Create a transporter using SMTP
const createTransporter = () => {
  // For production, these would come from environment variables
  const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
  const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP credentials are not configured');
  }

  return nodemailer.createTransporter({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

// Create email template
const createEmailTemplate = (data: EmailData) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
        }
        .container {
            background-color: white;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 2px solid #e5e7eb;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .title {
            color: #1f2937;
            margin: 16px 0 8px;
            font-size: 28px;
            font-weight: bold;
        }
        .subtitle {
            color: #6b7280;
            font-size: 16px;
        }
        .field {
            margin-bottom: 24px;
        }
        .label {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .value {
            color: #1f2937;
            font-size: 16px;
            background-color: #f9fafb;
            padding: 12px 16px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }
        .message-field .value {
            white-space: pre-wrap;
            line-height: 1.6;
        }
        .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }
        .timestamp {
            color: #9ca3af;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">HS</div>
            <h1 class="title">New Contact Form Submission</h1>
            <p class="subtitle">Portfolio Website - Hossam Saber</p>
        </div>

        <div class="field">
            <div class="label">Name</div>
            <div class="value">${data.name}</div>
        </div>

        <div class="field">
            <div class="label">Email Address</div>
            <div class="value">
                <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">
                    ${data.email}
                </a>
            </div>
        </div>

        <div class="field">
            <div class="label">Subject</div>
            <div class="value">${data.subject}</div>
        </div>

        <div class="field message-field">
            <div class="label">Message</div>
            <div class="value">${data.message}</div>
        </div>

        <div class="footer">
            <div class="timestamp">
                Sent on ${new Date().toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
            </div>
            <div style="margin-top: 16px;">
                This message was sent from the contact form on Hossam Saber's portfolio website.
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

// Send email function
export async function sendContactEmail(data: EmailData): Promise<EmailResponse> {
  try {
    // Validate input
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        message: 'All fields are required',
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: 'Invalid email address',
      };
    }

    // Create transporter
    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'hosssam.saberr@gmail.com',
      subject: `Portfolio Contact: ${data.subject}`,
      html: createEmailTemplate(data),
      replyTo: data.email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email',
    };
  }
}

// Rate limiting implementation (simple in-memory)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    // Reset or create new record
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.lastReset > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

// Export the rate limit map for use in API route
export { rateLimitMap };