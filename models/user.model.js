const mongoose = require("mongoose");

const UserSchema = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: [true, "Firstname is required"],
      },
      lastName: {
        type: String,
        required: [true, "Lastname is required"],
      },
      email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        sparse: true,
      },
      password: { type: String, required: [true, "Password is required"] },
      agreement: {
        type: Boolean,
        required: true,
      },
      accountType: [
        {
          type: String,
          enum: ["systemAdmin", "user"],
          required: true,
        },
      ],
      token: { type: String },
    },
    { timestamps: true }
  )
);

module.exports = UserSchema;
