const mongoose = require("mongoose");

const UserSchema = mongoose.model("User", new mongoose.Schema({}));

module.exports = UserSchema;
