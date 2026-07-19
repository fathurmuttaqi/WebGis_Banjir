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

app.use(cors({
    origin: [
        "https://web-gis-banjir-ll63-2hqe6b18i-fathur1.vercel.app",
        "https://web-gis-banjir-ll63-git-main-fathur1.vercel.app"
    ],
    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ],
    credentials: true
}));

// Handle preflight request
app.options("*", cors());


app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


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
// Error Handler
// ==============================

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    });
});


// ==============================
// Jalankan Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("====================================");
    console.log("🚀 Server Running");
    console.log(`🌐 Port: ${PORT}`);
    console.log("====================================");
});