const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  role: {
    type: String,
    required: [true, "role is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

module.exports = mongoose.model("User", userSchema);
