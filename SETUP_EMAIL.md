# Email Setup Instructions

To enable email functionality for form submissions, you need to configure SMTP settings.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Recipient Email (where form submissions will be sent)
RECIPIENT_EMAIL=newclaims@arcadianclaims.com
```

## Gmail Setup

If using Gmail, you'll need to:

1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to your Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `SMTP_PASS`

## GoDaddy Email Setup

If you have email through GoDaddy with your domain name, use these settings:

### Option 1: GoDaddy Workspace Email (Microsoft 365)
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
RECIPIENT_EMAIL=newclaims@arcadianclaims.com
```

### Option 2: GoDaddy cPanel/Shared Hosting Email
```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
RECIPIENT_EMAIL=newclaims@arcadianclaims.com
```

**Note:** If you're in Europe, use `smtpout.europe.secureserver.net` instead.

### Finding Your GoDaddy Email Settings

1. Log in to your GoDaddy account
2. Go to **My Products** → **Email**
3. Click on your email account
4. Look for **Email Client Settings** or **SMTP Settings**
5. Use the SMTP server, port, and your email credentials

**Important:** Use your full email address (e.g., `info@arcadianclaims.com`) as the `SMTP_USER`.

## Other Email Providers

### Outlook/Office 365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Custom SMTP
Use your email provider's SMTP settings.

## Testing

After setting up, test the forms:
1. Submit a test claim form
2. Submit a test contact form
3. Check the recipient email for PDF attachments

## Troubleshooting

- **Authentication failed**: Check your SMTP credentials
- **Connection timeout**: Verify SMTP_HOST and SMTP_PORT
- **PDF not generating**: Check server logs for errors
- **Email not received**: Check spam folder and verify RECIPIENT_EMAIL

