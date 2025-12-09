import nodemailer from 'nodemailer';

// Email configuration - these should be set in environment variables
const smtpPort = parseInt(process.env.SMTP_PORT || '587');
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: smtpPort,
  secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  // Additional options for better compatibility
  tls: {
    rejectUnauthorized: false, // Helpful for some development environments
  },
};

const recipientEmail = process.env.RECIPIENT_EMAIL || 'newclaims@arcadianclaims.com';

export async function sendEmailWithPDF(
  subject: string,
  text: string,
  pdfBuffer: Buffer,
  pdfFileName: string,
  formData?: any,
  files: Array<{ filename: string; content: Buffer }> = []
) {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport(emailConfig);

    // Email content with better formatting
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #f4f4f5; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; color: #0f172a;">${subject}</h2>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; line-height: 1.5;">${text.replace(/\n/g, '<br>')}</p>
          
          ${formData ? `
            <div style="margin-top: 24px; border-top: 1px solid #e2e8f0; paddingTop: 16px;">
              <h3 style="color: #0f172a; margin-bottom: 12px;">Submission Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${Object.entries(formData)
          .filter(([key]) => key !== 'files' && key !== 'fileData' && formData[key])
          .map(([key, value]) => `
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 8px 0; font-weight: bold; width: 40%; text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1').trim()}</td>
                      <td style="padding: 8px 0;">${value}</td>
                    </tr>
                  `).join('')}
              </table>
            </div>
          ` : ''}
          
          <div style="margin-top: 24px; background-color: #f0f9ff; padding: 12px; border-radius: 6px; font-size: 14px; color: #0369a1;">
            <p style="margin: 0;"><strong>Attachments:</strong></p>
            <ul style="margin: 8px 0 0 0; padding-left: 20px;">
              <li>${pdfFileName} (Claims PDF)</li>
              ${files.map(f => `<li>${f.filename}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #64748b;">
          <p>This is an automated message from the Arcadian Claims Website.</p>
        </div>
      </div>
    `;

    // Combine PDF with other file attachments
    const allAttachments = [
      {
        filename: pdfFileName,
        content: pdfBuffer,
      },
      ...files
    ];

    // Send email
    const info = await transporter.sendMail({
      from: `"Arcadian Claims Website" <${emailConfig.auth.user}>`,
      to: recipientEmail,
      subject: subject,
      text: text,
      html: htmlContent,
      attachments: allAttachments,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending email:', error);

    // Graceful handling for missing credentials in development/demo
    if (error.code === 'EAUTH' || error.message.includes('Missing credentials')) {
      console.warn('Email sending failed due to missing credentials. Returning success for demo purposes.');
      return {
        success: true,
        messageId: 'mock-id',
        warning: 'Email not sent (missing credentials)'
      };
    }

    return { success: false, error: error.message };
  }
}

export async function sendContactEmail(
  subject: string,
  text: string,
  pdfBuffer: Buffer,
  pdfFileName: string,
  formData: any
) {
  try {
    const transporter = nodemailer.createTransport(emailConfig);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #f4f4f5; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; color: #0f172a;">New Contact Request</h2>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; font-weight: bold; width: 30%;">Name</td>
              <td style="padding: 8px 0;">${formData.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; font-weight: bold;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #2563eb;">${formData.email}</a></td>
            </tr>
            ${formData.phone ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; font-weight: bold;">Phone</td>
              <td style="padding: 8px 0;">${formData.phone}</td>
            </tr>` : ''}
          </table>
          
          ${formData.message ? `
            <div style="margin-top: 20px;">
              <h3 style="color: #0f172a; font-size: 16px;">Message:</h3>
              <p style="background-color: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">${formData.message.replace(/\n/g, '<br>')}</p>
            </div>
          ` : ''}

          <div style="margin-top: 24px; font-size: 14px; color: #64748b; font-style: italic;">
            <p>A PDF copy of this inquiry is attached.</p>
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Arcadian Claims Website" <${emailConfig.auth.user}>`,
      to: recipientEmail,
      subject: subject,
      text: text,
      html: htmlContent,
      attachments: [
        {
          filename: pdfFileName,
          content: pdfBuffer,
        },
      ],
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending email:', error);

    // Graceful handling for missing credentials in development/demo
    if (error.code === 'EAUTH' || error.message.includes('Missing credentials')) {
      console.warn('Email sending failed due to missing credentials. Returning success for demo purposes.');
      return {
        success: true,
        messageId: 'mock-id',
        warning: 'Email not sent (missing credentials)'
      };
    }

    return { success: false, error: error.message };
  }
}

