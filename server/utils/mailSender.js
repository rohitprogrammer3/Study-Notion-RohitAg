const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,      // smtp-relay.brevo.com
      port: parseInt(process.env.MAIL_PORT), // 587
      secure: false,                    // REQUIRED for Brevo
      auth: {
        user: process.env.MAIL_USER,    // 9c3b0d001@smtp-brevo.com
        pass: process.env.MAIL_PASS,    // your smtp key
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
