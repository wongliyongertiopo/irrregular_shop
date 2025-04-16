const express = require("express");
const { getUsers, createUser } = require("../controllers/UserController.js"); // ✅ Gunakan require()

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;
