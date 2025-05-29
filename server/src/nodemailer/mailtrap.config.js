// const { MailtrapClient } = require("mailtrap");
const { google } = require("googleapis");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const mailClient = async (mailOptions) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "brukbesu1@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const response = transporter.sendMail(mailOptions);
    return response;
  } catch (error) {
    throw new Error("Email not sent");
  }
};

// const mailtrapClient = new MailtrapClient({
//   token: TOKEN,
// });

module.exports = { mailClient };
