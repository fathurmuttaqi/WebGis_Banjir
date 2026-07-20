const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

require("dotenv").config();

/*
====================================
REGISTER
====================================
*/

const register = async (req, res) => {

    const { nama, email, password, role } = req.body;

    try {

        userModel.getUserByEmail(email, async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email sudah digunakan"
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

           const newUser = {
    nama,
    email,
    password: hashPassword,
    role: "user"
};

            userModel.createUser(newUser, (err) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Register berhasil"
                });

            });

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/*
====================================
LOGIN
====================================
*/

const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        userModel.getUserByEmail(email, async (err, result) => {


            if (err) {
                console.log("DATABASE ERROR:", err);

                return res.status(500).json({
                    success:false,
                    message:err.message
                });
            }


            if (result.length === 0) {

                return res.status(404).json({
                    success:false,
                    message:"Email tidak ditemukan"
                });

            }


            const user = result[0];


            const isMatch = await bcrypt.compare(
                password,
                user.password
            );


            if(!isMatch){

                return res.status(401).json({
                    success:false,
                    message:"Password salah"
                });

            }


            const token = jwt.sign(
                {
                    id:user.id,
                    nama:user.nama,
                    email:user.email,
                    role:user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"1d"
                }
            );


            return res.json({

                success:true,
                message:"Login berhasil",

                token,

                user:{
                    id:user.id,
                    nama:user.nama,
                    email:user.email,
                    role:user.role
                }

            });


        });


    } catch(error){

        console.log("LOGIN ERROR:",error);

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};