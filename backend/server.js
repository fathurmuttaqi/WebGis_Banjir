require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Koneksi Database
require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const banjirRoutes = require("./routes/banjirRoutes");

const app = express();



// ==============================
// Middleware
// ==============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==============================
// Default Route
// ==============================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 Web GIS Banjir API Berjalan",
        version: "1.0.0"
    });
});

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/banjir", banjirRoutes);

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint tidak ditemukan"
    });
});

// ==============================
// Jalankan Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("====================================");
    console.log(`🚀 Server Running`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("====================================");
});