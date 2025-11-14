import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail, checkRateLimit } from '@/lib/email';

// Input validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200, 'Subject must be less than 200 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
});

// Rate limiting headers
const RATE_LIMIT_HEADERS = {
  'X-RateLimit-Limit': '3',
  'X-RateLimit-Remaining': '2',
  'X-RateLimit-Reset': '60',
};

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            ...RATE_LIMIT_HEADERS,
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: errors,
        },
        {
          status: 400,
          headers: RATE_LIMIT_HEADERS,
        }
      );
    }

    const data = validationResult.data;

    // Sanitize input (basic XSS protection)
    const sanitizedData = {
      name: data.name.trim().replace(/[<>]/g, ''),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim().replace(/[<>]/g, ''),
      message: data.message.trim().replace(/[<>]/g, ''),
    };

    // Send email
    const emailResult = await sendContactEmail(sanitizedData);

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.message);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send message. Please try again later.',
        },
        {
          status: 500,
          headers: RATE_LIMIT_HEADERS,
        }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
      },
      {
        status: 200,
        headers: {
          ...RATE_LIMIT_HEADERS,
          'X-RateLimit-Remaining': String(Math.max(0, 2 - (rateLimitMap.get(ip)?.count || 0))),
        },
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      },
      {
        status: 500,
        headers: RATE_LIMIT_HEADERS,
      }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST to submit contact forms.',
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST to submit contact forms.',
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST to submit contact forms.',
    },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST to submit contact forms.',
    },
    { status: 405 }
  );
}

export async function HEAD() {
  return new NextResponse(null, { status: 405 });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}