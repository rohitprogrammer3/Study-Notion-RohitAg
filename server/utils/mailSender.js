// server/utils/mailSender.js
require('dotenv').config();

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error('Missing BREVO_API_KEY in environment');
    }

    const payload = {
      sender: { name: 'StudyNotion', email: 'rohitagarwalnit@gmail.com' },
      to: [{ email }],
      subject: title,
      htmlContent: body
    };

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify(payload),
      // optional: set a timeout using AbortController if you want
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Log full error for debugging
      console.error('Brevo API error:', res.status, json);
      throw new Error(`Brevo API ${res.status}: ${JSON.stringify(json)}`);
    }

    console.log('Email sent via Brevo:', json);
    return json;
  } catch (error) {
    console.error('Brevo error:', error);
    return error;
  }
};

module.exports = mailSender;


