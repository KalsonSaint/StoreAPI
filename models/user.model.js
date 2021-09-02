const mongoose = require("mongoose");

const UserSchema = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: { type: String, required: [true, "Password is required"] },
    token: { type: String },
  })
);

module.exports = UserSchema;
