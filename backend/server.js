require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Database
require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const banjirRoutes = require("./routes/banjirRoutes");


const app = express();


// =================================
// MIDDLEWARE
// =================================

// CORS untuk Vercel + testing
app.use(cors({
    origin: "*",
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
    ]
}));


// Body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// =================================
// DEFAULT ROUTE
// =================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 Web GIS Banjir API Berjalan",
        version: "1.0.0"
    });
});


// =================================
// API ROUTES
// =================================

app.use("/api/auth", authRoutes);

app.use("/api/banjir", banjirRoutes);


// =================================
// 404 HANDLER
// =================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint tidak ditemukan"
    });
});


// =================================
// ERROR HANDLER
// =================================

app.use((err, req, res, next) => {

    console.error("ERROR :", err);

    res.status(500).json({
        success: false,
        message: err.message
    });

});


// =================================
// SERVER
// =================================

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log("==============================");
    console.log("🚀 Server Running");
    console.log(`PORT : ${PORT}`);
    console.log("==============================");

});