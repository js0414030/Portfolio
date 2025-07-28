import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set - email notifications disabled");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

interface ContactNotification {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: Date;
}

export async function sendContactNotification(
  contact: ContactNotification
): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("Email notification would be sent:", contact);
    return false;
  }

  try {
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message.replace(/\n/g, '<br>')}</p>
      <p><strong>Submitted At:</strong> ${contact.submittedAt.toLocaleString()}</p>
    `;

    const textContent = `
New Contact Form Submission

Name: ${contact.name}
Email: ${contact.email}
Subject: ${contact.subject}
Message: ${contact.message}
Submitted At: ${contact.submittedAt.toLocaleString()}
    `;

    await mailService.send({
      to: 'js0414030@gmail.com', // Your email
      from: 'noreply@yourdomain.com', // Must be verified sender in SendGrid
      subject: `Portfolio Contact: ${contact.subject}`,
      text: textContent,
      html: htmlContent,
    });
    
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}