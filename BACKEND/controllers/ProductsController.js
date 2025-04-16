const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

// 🔹 Mendapatkan semua produk
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Mendapatkan detail produk berdasarkan ID
exports.getDetailProducts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Membuat produk baru
exports.createProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Thumbnail is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const product = new Product({
      ...req.body,
      thumbnail: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ message: err.message });
  }
};

// 🔹 Menghapus produk
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.cloudinaryId) {
      await cloudinary.uploader.destroy(product.cloudinaryId);
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete Product" });
  }
};

// 🔹 Memperbarui produk
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let result = null;
    if (req.file && req.file.path) {
      if (product.cloudinaryId) {
        await cloudinary.uploader.destroy(product.cloudinaryId);
      }

      result = await cloudinary.uploader.upload(req.file.path);
    }

    const updatedProduct = {
      ...req.body,
      thumbnail: result?.secure_url || product.thumbnail,
      cloudinaryId: result?.public_id || product.cloudinaryId,
    };

    const updated = await Product.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
