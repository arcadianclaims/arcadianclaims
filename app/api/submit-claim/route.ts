import { NextRequest, NextResponse } from 'next/server';
import { generateClaimPDF } from '@/lib/pdf-generator';
import { sendEmailWithPDF } from '@/lib/email-sender';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Generate PDF
    const pdfBuffer = await generateClaimPDF(formData);
    const pdfFileName = `claim-submission-${Date.now()}.pdf`;

    // Send email with PDF
    const emailResult = await sendEmailWithPDF(
      `New Claim Submission from ${formData.adjusterName || formData.ownerName || 'Unknown'}`,
      `A new claim has been submitted.\n\nAdjuster: ${formData.adjusterName || 'N/A'}\nEmail: ${formData.adjusterEmail || 'N/A'}\nPhone: ${formData.adjusterPhone || 'N/A'}`,
      pdfBuffer,
      pdfFileName,
      formData
    );

    if (emailResult.success) {
      return NextResponse.json(
        {
          success: true,
          message: 'Claim submitted successfully',
          claimNumber: Math.floor(Math.random() * 90000) + 10000,
          warning: (emailResult as any).warning
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
    console.error('Error processing claim:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing claim',
        error: error.message
      },
      { status: 500 }
    );
  }
}

