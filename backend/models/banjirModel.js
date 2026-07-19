const db = require("../config/db");

// Ambil semua data banjir
const getAllBanjir = (callback) => {
    const sql = "SELECT * FROM data_banjir ORDER BY id ASC";
    db.query(sql, callback);
};

// Ambil data berdasarkan ID
const getBanjirById = (id, callback) => {
    const sql = "SELECT * FROM data_banjir WHERE id = ?";
    db.query(sql, [id], callback);
};

// Tambah data banjir
const createBanjir = (data, callback) => {
    const sql = `
        INSERT INTO data_banjir
        (
            periode_data,
            triwulan,
            bulan,
            wilayah,
            kecamatan,
            kelurahan,
            jumlah_rata_rata_ketinggian_air,
            jumlah_rw_terdampak,
            jumlah_kk_terdampak,
            jumlah_jiwa_terdampak,
            jumlah_kejadian,
            jumlah_korban_meninggal,
            jumlah_korban_luka,
            jumlah_pengungsi,
            jumlah_tempat_pengungsian,
            latitude,
            longitude
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        data.periode_data,
        data.triwulan,
        data.bulan,
        data.wilayah,
        data.kecamatan,
        data.kelurahan,
        data.jumlah_rata_rata_ketinggian_air,
        data.jumlah_rw_terdampak,
        data.jumlah_kk_terdampak,
        data.jumlah_jiwa_terdampak,
        data.jumlah_kejadian,
        data.jumlah_korban_meninggal,
        data.jumlah_korban_luka,
        data.jumlah_pengungsi,
        data.jumlah_tempat_pengungsian,
        data.latitude,
        data.longitude
    ], callback);
};

// Update data banjir
const updateBanjir = (id, data, callback) => {
    const sql = `
        UPDATE data_banjir SET
            periode_data=?,
            triwulan=?,
            bulan=?,
            wilayah=?,
            kecamatan=?,
            kelurahan=?,
            jumlah_rata_rata_ketinggian_air=?,
            jumlah_rw_terdampak=?,
            jumlah_kk_terdampak=?,
            jumlah_jiwa_terdampak=?,
            jumlah_kejadian=?,
            jumlah_korban_meninggal=?,
            jumlah_korban_luka=?,
            jumlah_pengungsi=?,
            jumlah_tempat_pengungsian=?,
            latitude=?,
            longitude=?
        WHERE id=?
    `;

    db.query(sql, [
        data.periode_data,
        data.triwulan,
        data.bulan,
        data.wilayah,
        data.kecamatan,
        data.kelurahan,
        data.jumlah_rata_rata_ketinggian_air,
        data.jumlah_rw_terdampak,
        data.jumlah_kk_terdampak,
        data.jumlah_jiwa_terdampak,
        data.jumlah_kejadian,
        data.jumlah_korban_meninggal,
        data.jumlah_korban_luka,
        data.jumlah_pengungsi,
        data.jumlah_tempat_pengungsian,
        data.latitude,
        data.longitude,
        id
    ], callback);
};

// Hapus data banjir
const deleteBanjir = (id, callback) => {
    const sql = "DELETE FROM data_banjir WHERE id = ?";
    db.query(sql, [id], callback);
};

module.exports = {
    getAllBanjir,
    getBanjirById,
    createBanjir,
    updateBanjir,
    deleteBanjir
};

const getTop10Kelurahan = (callback) => {

    const sql = `
        SELECT
            kelurahan,
            SUM(jumlah_jiwa_terdampak) AS total_jiwa
        FROM data_banjir
        GROUP BY kelurahan
        ORDER BY total_jiwa DESC
        LIMIT 10
    `;

    db.query(sql, callback);

};

module.exports = {
    getAllBanjir,
    getBanjirById,
    createBanjir,
    updateBanjir,
    deleteBanjir,
    getTop10Kelurahan
};