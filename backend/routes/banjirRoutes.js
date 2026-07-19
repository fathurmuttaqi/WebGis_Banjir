const express = require("express");
const router = express.Router();

const banjirController = require("../controllers/banjirController");
const verifyToken = require("../middleware/authMiddleware");

// =========================
// Public API
// =========================

// Top 10 Kelurahan (WAJIB DI ATAS :id)
router.get("/top10", banjirController.getTop10Kelurahan);

// Ambil semua data banjir
router.get("/", banjirController.getAllBanjir);

// Ambil detail data berdasarkan ID
router.get("/:id", banjirController.getBanjirById);

// =========================
// Admin API (Harus Login)
// =========================

// Tambah data
router.post("/", verifyToken, banjirController.createBanjir);

// Update data
router.put("/:id", verifyToken, banjirController.updateBanjir);

// Hapus data
router.delete("/:id", verifyToken, banjirController.deleteBanjir);

module.exports = router;