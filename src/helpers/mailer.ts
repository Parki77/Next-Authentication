import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update user document with the token and expiration date
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 3600000, // Token expires in 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpire: Date.now() + 3600000, // Token expires in 1 hour
      });
    }

    // Set up the email transport
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2732e03cf60689",
        pass: "6e3a63a068f537"
      }
    });

    // Prepare the email options
    const mailOptions = {
      from: 'basakpartha595@gmail.com', // Replace with a verified sender email
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.domain!}/${
        emailType === "VERIFY" ? "verify" : "reset"
      }/${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
      text: `Click the following link to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }: ${process.env.DOMAIN_URL}/${
        emailType === "VERIFY" ? "verify" : "reset"
      }/${hashedToken}`, // Add plain text email
    };

    // Send the email
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Mail sent:", mailResponse); // Log for debugging
    return mailResponse;

  } catch (error: any) {
    console.error("Error sending email:", error.message); // Log detailed error
    throw new Error(error.message);
  }
};
