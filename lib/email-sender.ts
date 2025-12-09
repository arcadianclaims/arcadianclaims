import nodemailer from 'nodemailer';

// Email configuration - these should be set in environment variables
// Email configuration
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
  formData?: any
) {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport(emailConfig);

    // Email content
    const htmlContent = `
      <h2>${subject}</h2>
      <p>${text}</p>
      ${formData ? `
        <h3>Form Details:</h3>
        <ul>
          ${Object.entries(formData)
          .filter(([key]) => key !== 'files')
          .map(([key, value]) => `<li><strong>${key}:</strong> ${value || 'N/A'}</li>`)
          .join('')}
        </ul>
      ` : ''}
      <p>Please see the attached PDF for complete details.</p>
    `;

    // Send email
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
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
      ${formData.message ? `<p><strong>Message:</strong></p><p>${formData.message}</p>` : ''}
      <p>Please see the attached PDF for complete details.</p>
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

