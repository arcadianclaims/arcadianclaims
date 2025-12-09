import { NextRequest, NextResponse } from 'next/server';
import { generateClaimPDF } from '@/lib/pdf-generator';
import { sendEmailWithPDF } from '@/lib/email-sender';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    // Convert FormData to plain object
    const formData: Record<string, any> = {};
    const files: Array<{ filename: string; content: Buffer }> = [];

    for (const [key, value] of data.entries()) {
      if (key === 'files') {
        // Handle files
        if (value instanceof File) {
          const arrayBuffer = await value.arrayBuffer();
          files.push({
            filename: value.name,
            content: Buffer.from(arrayBuffer)
          });
        }
      } else {
        // Handle regular fields
        formData[key] = value;
      }
    }

    // Add file metadata to formData for PDF generation listing
    // We map the files to look like the objects the PDF generator expects
    formData.files = files.map(f => ({ name: f.filename }));

    // Generate PDF
    const pdfBuffer = await generateClaimPDF(formData);
    const pdfFileName = `claim-submission-${Date.now()}.pdf`;

    // Send email with PDF and attachments
    const emailResult = await sendEmailWithPDF(
      `New Claim Submission from ${formData.adjusterName || formData.ownerName || 'Unknown'}`,
      `A new claim has been submitted.\n\nAdjuster: ${formData.adjusterName || 'N/A'}\nEmail: ${formData.adjusterEmail || 'N/A'}\nPhone: ${formData.adjusterPhone || 'N/A'}`,
      pdfBuffer,
      pdfFileName,
      formData,
      files
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

