const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: parseInt(process.env.MAIL_PORT),
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
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
