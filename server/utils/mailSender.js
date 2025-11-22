// mailSender.js
const SibApiV3Sdk = require('@getbrevo/brevo');
require('dotenv').config();

const mailSender = async (email, title, body) => {
try {
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

```
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const response = await emailApi.sendTransacEmail({
  sender: {
    name: "StudyNotion",
    email: "arohitagarwal633@gmail.com",
  },
  to: [{ email }],
  subject: title,
  htmlContent: body,
});

console.log("Email sent via Brevo:", response);
return response;
```

} catch (error) {
console.error("Brevo error:", error);
return error;
}
};

module.exports = mailSender;


