const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {

    // Ambil token dari header Authorization
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Token tidak ditemukan"
        });
    }

    // Format: Bearer xxxxxxxxx
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token tidak valid"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(403).json({
                success: false,
                message: "Token tidak valid atau sudah kadaluarsa"
            });
        }

        // Simpan data user ke request
        req.user = decoded;

        next();

    });

};

module.exports = verifyToken;