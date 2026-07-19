const banjirModel = require("../models/banjirModel");

/*
====================================
GET ALL
====================================
*/
const getAllBanjir = (req, res) => {
    banjirModel.getAllBanjir((err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            total: result.length,
            data: result
        });

    });
};

/*
====================================
GET BY ID
====================================
*/
const getBanjirById = (req, res) => {

    const id = req.params.id;

    banjirModel.getBanjirById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data banjir tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            data: result[0]
        });

    });

};

/*
====================================
CREATE
====================================
*/
const createBanjir = (req, res) => {

    banjirModel.createBanjir(req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Data banjir berhasil ditambahkan",
            id: result.insertId
        });

    });

};

/*
====================================
UPDATE
====================================
*/
const updateBanjir = (req, res) => {

    const id = req.params.id;

    banjirModel.updateBanjir(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Data tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            message: "Data banjir berhasil diperbarui"
        });

    });

};

/*
====================================
DELETE
====================================
*/
const deleteBanjir = (req, res) => {

    const id = req.params.id;

    banjirModel.deleteBanjir(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Data tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            message: "Data banjir berhasil dihapus"
        });

    });

};

module.exports = {
    getAllBanjir,
    getBanjirById,
    createBanjir,
    updateBanjir,
    deleteBanjir
};

const getTop10Kelurahan = (req,res)=>{

    banjirModel.getTop10Kelurahan((err,result)=>{

        if(err){

            return res.status(500).json({
                success:false,
                message:err.message
            });

        }

        res.json({
            success:true,
            data:result
        });

    });

};

module.exports = {

    getAllBanjir,
    getBanjirById,
    createBanjir,
    updateBanjir,
    deleteBanjir,
    getTop10Kelurahan

} 