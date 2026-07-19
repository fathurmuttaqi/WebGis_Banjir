const db = require("../config/db");

// Ambil semua user
const getAllUsers = (callback) => {
    const sql = `
        SELECT
            id,
            nama,
            email,
            role,
            created_at,
            updated_at
        FROM users
    `;

    db.query(sql, callback);
};

// Cari user berdasarkan email
const getUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], callback);
};

// Cari user berdasarkan ID
const getUserById = (id, callback) => {
    const sql = `
        SELECT
            id,
            nama,
            email,
            role,
            created_at,
            updated_at
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

// Tambah user
const createUser = (data, callback) => {

    const sql = `
        INSERT INTO users
        (
            nama,
            email,
            password,
            role
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [
        data.nama,
        data.email,
        data.password,
        data.role
    ], callback);

};

// Update user
const updateUser = (id, data, callback) => {

    const sql = `
        UPDATE users
        SET
            nama=?,
            email=?,
            password=?,
            role=?
        WHERE id=?
    `;

    db.query(sql, [
        data.nama,
        data.email,
        data.password,
        data.role,
        id
    ], callback);

};

// Hapus user
const deleteUser = (id, callback) => {

    const sql = "DELETE FROM users WHERE id=?";

    db.query(sql, [id], callback);

};

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};