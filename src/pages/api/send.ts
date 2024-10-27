import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY)
  throw new Error('API KEY is needed');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { toEmail, verificationToken } = req.body;

  if (!toEmail || !verificationToken) {
    return res.status(400).json({ error: 'Email de destino y token de verificación son requeridos' });
  }

  const verificationUrl = `/auth/verify?token=${verificationToken}`;
  
  const msg = {
    to: toEmail,
    from: process.env.NEXT_PUBLIC_SENDGRID_EMAIL ?? "",
    subject: 'Owltlet Account Verification',
    text: 'Please verify your email',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333333; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #333333;">Verify Your Owltlet Account 🦉</h2>
          <p style="font-size: 16px; line-height: 1.5; text-align: center; color: #666666;">
            Thank you for signing up with Owltlet! Please confirm your email address to complete your registration.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" target="_blank" style="padding: 10px 20px; background-color: #F5A623; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Your Email</a>
          </div>
          <p style="font-size: 14px; text-align: center; color: #999999;">
            If you did not create an account, no further action is required.
          </p>
          <p style="font-size: 14px; text-align: center; color: #999999; margin-top: 30px;">
            &copy; ${new Date().getFullYear()} Owltlet. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const response = await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully', response });
  } catch (error) {
    res.status(500).json({ error: 'An error ocurred, please try again' });
  }
}
