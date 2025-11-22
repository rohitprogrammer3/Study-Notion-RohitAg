// mailSender.js  (API-only Brevo implementation)
const axios = require('axios');

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const API_KEY = process.env.BREVO_API_KEY;
if (!API_KEY) throw new Error('BREVO_API_KEY not set');

const axiosInstance = axios.create({
  baseURL: BREVO_API_URL,
  timeout: process.env.MAIL_TIMEOUT ? parseInt(process.env.MAIL_TIMEOUT) : 10000,
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'api-key': API_KEY
  }
});

/**
 * Send an email via Brevo HTTP API
 * @param {string} to - recipient email
 * @param {string} subject 
 * @param {string} html 
 */
async function sendMail({ to, subject, html }) {
  const payload = {
    sender: {
      name: process.env.MAIL_SENDER_NAME || 'StudyNotion',
      email: process.env.MAIL_USER || 'no-reply@example.com'
    },
    to: [{ email: to }],
    subject,
    htmlContent: html
  };

  const res = await axiosInstance.post('', payload);
  return res.data;
}

async function sendOTP(email, otp, opts = {}) {
  const subject = opts.subject || 'Your StudyNotion OTP';
  const html = opts.html || `<p>Your OTP is <strong>${otp}</strong>. Valid for ${opts.validFor || 10} minutes.</p>`;
  return sendMail({ to: email, subject, html });
}

module.exports = { sendMail, sendOTP };


