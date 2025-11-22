
const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,      // smtp-relay.brevo.com
      port: parseInt(process.env.MAIL_PORT), // 587
      secure: false,
      auth: {
        user: process.env.MAIL_USER,    // your brevo smtp login
        pass: process.env.MAIL_PASS,    // your brevo smtp key
      },
      tls: {
        rejectUnauthorized: false       // IMPORTANT for Render + Brevo
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Mail sending failed:", error);
    throw error;
  }
};

module.exports = mailSender;

