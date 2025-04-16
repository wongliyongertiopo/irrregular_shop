const cloudinary = require("../config/cloudinary");
// ❗ Ini harusnya require ke model File, bukan ke controller
const File = require("../controllers/FileController"); // ⚠️ Kemungkinan salah import (lihat catatan di bawah)

exports.uploadFile = async (req, res) => {
  try {
    // ⚠️ Pastikan middleware multer sudah digunakan sebelum handler ini
    const result = await cloudinary.uploader.upload(req.file.path);

    const file = new File({
      name: req.file.originalname,
      url: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await file.save(); // ❗ Error jika File bukan model (lihat catatan di bawah)
    res.status(201).json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File upload failed" });
  }
};
