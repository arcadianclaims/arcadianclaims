import { NextRequest, NextResponse } from 'next/server';
import { generateContactPDF } from '@/lib/pdf-generator';
import { sendContactEmail } from '@/lib/email-sender';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Generate PDF
    const pdfBuffer = await generateContactPDF(formData);
    const pdfFileName = `contact-submission-${Date.now()}.pdf`;

    // Send email with PDF
    const emailResult = await sendContactEmail(
      `New Contact Form Submission from ${formData.name || 'Unknown'}`,
      `A new contact form has been submitted through the website.`,
      pdfBuffer,
      pdfFileName,
      formData
    );

    if (emailResult.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Message sent successfully'
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to send email',
          error: emailResult.error 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error processing contact form',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

