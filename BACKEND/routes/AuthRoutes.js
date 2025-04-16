const express = require("express");
const routes = express.Router();
const { signIn } = require("../controllers/AuthController");

// Perbaikan: seharusnya "signin", bukan "sigin" dan harus pakai "/" di depan path
routes.post("/signin", signIn);

module.exports = routes;
