const express = require("express");
const multer = require("multer");
const {
  getProducts,
  createProduct,
  getDetailProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/ProductsController.js");

// Pastikan folder upload ada
const upload = multer({ dest: "uploads/products/" });

const router = express.Router(); // Pastikan "router" bukan "route"

router.get("/", getProducts);
router.get("/:id", getDetailProducts);
router.delete("/:id", deleteProduct);
router.patch("/:id", upload.single("thumbnail"), updateProduct);
router.post("/", upload.single("thumbnail"), createProduct);

module.exports = router;
