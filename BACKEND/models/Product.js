const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  size: {
    type: String,
    required: [true, "size is required"],
  },
  description: {
    type: String,
    required: [true, "descriptioni required"],
  },

  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"], // Pastikan ada ini
  },

  cloudinary: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
