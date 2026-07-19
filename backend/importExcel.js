require("dotenv").config();

const XLSX = require("xlsx");
const db = require("./config/db");

// Nama file Excel
const workbook = XLSX.readFile("./dataset/Data_Kejadian_Bencana_Banjir_Koordinat_dilengkapi.xlsx");

// Ambil sheet pertama
const sheetName = workbook.SheetNames[0];

const sheet = workbook.Sheets[sheetName];

// Ubah menjadi JSON
const data = XLSX.utils.sheet_to_json(sheet);
console.log(data[0]);

console.log("Jumlah data :", data.length);

// Import satu per satu
data.forEach((item) => {

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
        Latitude,
        Longitude
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(sql, [

        item.periode_data,
        item.triwulan,
        item.bulan,
        item.wilayah,
        item.kecamatan,
        item.kelurahan,
        item.jumlah_rata_rata_ketinggian_air,
        item.jumlah_rw_terdampak,
        item.jumlah_kk_terdampak,
        item.jumlah_jiwa_terdampak,
        item.jumlah_kejadian,
        item.jumlah_korban_meninggal,
        item.jumlah_korban_luka,
        item.jumlah_pengungsi,
        item.jumlah_tempat_pengungsian,
        Number(String(item.Latitude).replace(",", ".")),
        Number(String(item.Longitude).replace(",", "."))

    ], (err) => {

        if (err) {
            console.log(err);
        }

    });

});

console.log("Import selesai.");