const express = require("express");
const router = express.Router();

const db = require("../database"); // sesuaikan dengan file koneksi MySQL kamu

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = `
        SELECT *
        FROM users
        WHERE email = ? AND password = ?
    `;

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }

        if (result.length === 0) {

            return res.json({
                success: false,
                message: "Email atau Password salah"
            });

        }

        return res.json({

            success: true,
            user: result[0]

        });

    });

});

module.exports = router;