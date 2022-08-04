const {response} = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;
    try{
        const existEmail = await User.findOne({email: email});
        if (existEmail) {
            return res.status(400).json( {
                ok: false,
                msg: "El correo ya se encuentra registrado"
            });
            
        }

        const user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);
    
        res.json({
            ok: true,
            user,
            token
        });
        
    } catch(error) {
        console.log(error)
        res.status(500).json(
            {
                ok: false,
                msg: "Hable con el administrador"
            }
        )
    }

   
}

const loginUser = async (req, res = response) => {

    const {email, password} = req.body;
    try{

        const userDB = await User.findOne({email});
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: "Email no encontrado"
            });
        }

        // Validate password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: "La contraseña no es válida"
            });
        }

        // Generate JWT
        const token = await generateJWT(userDB.id);


        res.json({
            ok: true,
            user: userDB,
            token
        });
        
    } catch(error) {
        console.log(error)
        res.status(500).json(
            {
                ok: false,
                msg: "Hable con el administrador"
            }
        )
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generate JWT
    const token = await generateJWT(uid);

    const userDB = await User.findById(uid);


    res.json({
        ok: true,
        user: userDB,
        token
    });
}


module.exports = {
    crearUsuario, loginUser, renewToken,
}