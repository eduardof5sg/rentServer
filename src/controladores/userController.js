import userModel from "../modelos/userModel.js";
import bcrypt from "bcrypt";

export const crearUsuario = async (req,res) =>{
    try {
        const  {
            nombre,
            apellidos,
            direccion,
            codigopostal,
            telefono,
            contraseña,
            repetirContraseña } = req.body;

            if (contraseña !== repetirContraseña) {
                return res.status(400).json({error:"Las contraseñas no coinciden"})
            }

            const existeUsuario = await userModel.findOne({telefono});
            
            if (existeUsuario) {
                return res.status(400).json({error:"Este telefono ya ha sido registrado"})
            }

            const salt = await bcrypt.genSalt(10)
            const hashearContraseña = await bcrypt.hash(contraseña, salt);

            const nuevoUsuario = new userModel ({
                nombre,
                apellidos,
                direccion,
                codigopostal,
                telefono,
                contraseña: hashearContraseña,
            })

            await nuevoUsuario.save();
            res.status(201).json({ mensaje: "Usuario registrado correctamente" });
        
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
}