// mailSender.js
const nodemailer = require("nodemailer");
require('dotenv').config();

const createTransporter = async () => {
  // Use explicit Gmail SMTP host (more transparent than 'service:gmail')
  const baseOptions = {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // must be App Password (not account password)
    },
    logger: true,
    debug: true,
    // timeouts (ms)
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
    // helpful tls option for some hosts; remove in prod if you have proper certs
    tls: { rejectUnauthorized: false }
  };

  // try secure port 465 first, fallback to 587 (STARTTLS)
  try {
    let transporter = nodemailer.createTransport({ ...baseOptions, port: 465, secure: true });
    await transporter.verify();
    console.log("Transporter verified on port 465 (secure).");
    return transporter;
  } catch (err465) {
    console.warn("Port 465 verify failed:", err465 && err465.message ? err465.message : err465);
    try {
      let transporter = nodemailer.createTransport({ ...baseOptions, port: 587, secure: false });
      await transporter.verify();
      console.log("Transporter verified on port 587 (STARTTLS).");
      return transporter;
    } catch (err587) {
      // rethrow a combined, clearer error
      const combined = new Error(
        `Both 465 and 587 failed. 465 error: ${err465 && err465.message ? err465.message : err465}; ` +
        `587 error: ${err587 && err587.message ? err587.message : err587}`
      );
      combined.details = { err465, err587 };
      throw combined;
    }
  }
};

const mailSender = async (email, title, body) => {
  try {
    // Basic environment checks
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error("Missing MAIL_USER or MAIL_PASS in environment. MAIL_PASS must be a Gmail App Password.");
    }

    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"Study Notion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body
    });

    console.log("Message sent:", info && info.messageId ? info.messageId : info);
    return info;
  } catch (error) {
    // Provide clear hints for the most common causes
    console.error("mailSender error:", error && error.message ? error.message : error);

    // If it's clearly a connection timeout/ECONNECTION, give user-friendly guidance
    const msg = (error && error.message) ? error.message.toLowerCase() : "";
    if (msg.includes("timed out") || msg.includes("econnection") || msg.includes("etimedout") || msg.includes("network")) {
      console.error("Likely cause: your server cannot reach smtp.gmail.com (outbound SMTP is blocked by host or firewall).");
      console.error("Quick checks: run `nc -vz smtp.gmail.com 465` or `openssl s_client -connect smtp.gmail.com:465` from your server.");
    } else if (msg.includes("invalid login") || msg.includes("eauth") || msg.includes("authentication")) {
      console.error("Likely cause: wrong credentials or App Password invalid. Recreate App Password at https://myaccount.google.com/apppasswords");
    } else if (msg.includes("application-specific password")) {
      console.error("Ensure you're using an App Password (2FA enabled) and not your regular account password.");
    }

    // return the error so calling code can react (and log)
    return error;
  }
};

module.exports = mailSender;

