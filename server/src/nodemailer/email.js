const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELLCOME_EMAIL_TEMPLATE,
} = require("./email.templete");
const { mailClient } = require("./mailtrap.config");

const sender = "As company  <brukbesu1@gmail.com>";

const sendVerificationEmail = async (email, virficationToken) => {
  try {
    const mailOptions = {
      from: sender,
      to: email,
      subject: "Email verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        virficationToken
      ),
    };
    const response = await mailClient(mailOptions);
    console.log("Email sent seccussfully", response);
  } catch (error) {
    console.log("email sent error", error);
    throw new Error("Email not sent");
  }
};

const sendWellcomeEmail = async (email, userName) => {
  try {
    const mailOptions = {
      from: sender,
      to: email,
      subject: "Welcome to As company",
      html: WELLCOME_EMAIL_TEMPLATE.replace("{userName}", userName),
    };
    const response = await mailClient(mailOptions);
    console.log("Email sent seccussfully", response);
  } catch (error) {
    console.log("email sent error", error);
    throw new Error("Email not sent");
  }
};

const restPasswordEmail = async (email, resetToken) => {
  const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  try {
    const mailOptions = {
      from: sender,
      to: email,
      subject: "Reset password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };
    const response = await mailClient(mailOptions);
    console.log("Email sent seccussfully", response);
  } catch (error) {
    console.log("email sent error", error);
    throw new Error("Email not sent");
  }
};

const restPasswordSuccessEmail = async (email) => {
  try {
    const mailOptions = {
      from: sender,
      to: email,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };
    const response = await mailClient(mailOptions);
    console.log("Email sent seccussfully", response);
  } catch (error) {
    console.log("email sent error", error);
    throw new Error("Email not sent");
  }
};

module.exports = {
  sendVerificationEmail,
  sendWellcomeEmail,
  restPasswordEmail,
  restPasswordSuccessEmail,
};
