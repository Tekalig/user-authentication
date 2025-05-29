const express = require("express");
const {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} = require("../controllers/auth.controller");
const verifyToken = require("../middleware/verifyAuth");

const authRouter = express.Router();

authRouter.get("/check-auth", verifyToken, checkAuth);

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/verify", verifyEmail);

authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/reset-password/:token", resetPassword);

module.exports = authRouter;
