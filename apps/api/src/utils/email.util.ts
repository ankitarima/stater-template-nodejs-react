import nodemailer, { Transporter } from "nodemailer";
import { MailOptions } from "@utils/types";

export const sendEmail = (
  subject: string,
  toEmail: string,
  html: any
): void => {
  try {
    const transport: Transporter = nodemailer.createTransport({
      host: process.env["SMTP_HOST"],
      port: parseInt(process.env["SMTP_PORT"] as string),
      secure: false,
      auth: {
        user: process.env["SMTP_USER"],
        pass: process.env["SMTP_PASSWORD"],
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions: MailOptions = {
      from: process.env["SMTP_FROM_EMAIL"] as string,
      to: toEmail,
      subject,
      html,
    };

    transport.sendMail(mailOptions, (error: Error | null, info: any) => {
      if (error) {
        return console.log("Mail sending error:", error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  } catch (err) {
    console.log("Error:");
    console.log(err);
  }
};
