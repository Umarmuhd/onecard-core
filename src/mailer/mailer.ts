import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export interface SendMailI {
  from: string;
  html: string;
  subject: string;
  text: string;
  to: string;
  attachments?: Mail.Attachment[];
}

export interface IMailerService {
  sendMail({
    // templatePath,
    // context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    // templatePath: string;
    // context: Record<string, unknown>;
  } & SendMailI): Promise<void>;
}
