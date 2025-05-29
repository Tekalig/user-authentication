const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/auth.model");
const generateTokenSetCookie = require("../utils/generateTokenSetCookie");
const {
  sendWellcomeEmail,
  sendVerificationEmail,
  restPasswordEmail,
  restPasswordSuccessEmail,
} = require("../nodemailer/email");

const signup = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const virficationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      userName,
      email,
      password: hashedPassword,
      virficationToken,
    });
    await user.save();

    //   jwt
    generateTokenSetCookie(res, user._id);
    await sendVerificationEmail(user.email, virficationToken);

    res.status(201).json({
      sucess: true,
      message: "User created successfully",
      ...user._doc,
      password: null,
    });
  } catch (error) {
    res.status(400).json({ sucess: false, msg: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.body;
  try {
    const user = await User.findOne({
      virficationToken: verificationToken,
      virficationExpiresAt: { $gt: Date.now() },
    });
    console.log(verificationToken);

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    user.isVirfied = true;
    user.virficationToken = null;
    user.virficationExpiresAt = null;
    await user.save();

    await sendWellcomeEmail(user.email, user.userName);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokenSetCookie(res, user._id);

    user.loginTime = new Date();
    await user.save();

    res.status(200).json({ success: true, message: "Login successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.restPasswordToken = crypto.randomBytes(20).toString("hex");

    user.restPasswordExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    restPasswordEmail(email, user.restPasswordToken);

    res.status(200).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    if (!password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({
      restPasswordToken: token,
      restPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 12);
    user.restPasswordToken = null;
    user.restPasswordExpiresAt = null;

    await user.save();

    restPasswordSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
};
