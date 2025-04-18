import userModel from "../modelos/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async(req,res) =>{
    const {telefono,contraseña} = req.body;
    try {
        const phone = await userModel.findOne({telefono});
        if(!phone){
            return res.status(400).json({message:"Este telefono no ha sido registrado"})
        }
        const validarContraseña = await bcrypt.compare(contraseña, phone.contraseña);
        if(!validarContraseña){
            return res.status(400).json({message:"Revisa el telefono o la contraseña"})
        }
        const token = jwt.sign(
            {
                userid : phone._id,
                rol: phone.rol,
                codigopostal:phone.codigopostal
            },
            process.env.JWTSECRET,
            { expiresIn: '1h' }
        )
        res.header('Authorization','Bearer ' + token);
        res.status(200).json({ message: "Login Correcto", token});
    } catch (error) {
        res.status(500).json({ message: "No se ha iniciado sesión", error: error.message });
    }
}