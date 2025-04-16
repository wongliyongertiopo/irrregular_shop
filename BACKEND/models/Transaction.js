const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Transaction_id: {
    type: String,
  },
  first_name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  product_id: {
    type: String,
  },
  midtrans_url: {
    type: String,
  },
});

module.exports = mongoose.model("Transctions", userSchema);
