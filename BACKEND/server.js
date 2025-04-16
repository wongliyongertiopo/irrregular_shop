const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db"); // Pastikan path benar

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
const userRoutes = require("./routes/UserRoutes"); // Pastikan nama file benar
const productRoutes = require("./routes/ProductRoutes");
const fileRoutes = require("./routes/FileRoutes");
const authRoutes = require("./routes/AuthRoutes");
const transactionRoutes = require("./routes/TransactionRoutes");

// Apply route middlewares
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
