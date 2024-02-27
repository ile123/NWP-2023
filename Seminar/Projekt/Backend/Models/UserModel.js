const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, dropDups: true, required: true },
  role: { type: String, required: true }
});

const User = mongoose.model("User", userModel, "users");

module.exports = User;