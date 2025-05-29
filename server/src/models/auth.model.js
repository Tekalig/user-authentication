const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    loginTime: {
      type: Date,
      default: Date.now,
    },
    isVirfied: {
      type: Boolean,
      default: false,
    },
    restPasswordToken: {
      type: String,
    },
    restPasswordExpiresAt: {
      type: Date,
    },
    virficationToken: {
      type: String,
    },
    virficationExpiresAt: {
      type: Date,
      default: Date.now() + 15 * 60 * 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
