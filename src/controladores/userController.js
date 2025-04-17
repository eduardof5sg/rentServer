import userModel from "../modelos/userModel.js";
import bcrypt from "bcrypt";

export const crearUsuario = async (req,res) =>{
    try {
        const  {
            nombre,
            apellidos,
            edad,
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
                edad,
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

export const datosEntrega = async (req,res) =>{
    try {
        const cliente = req.params.cliente
        const datosCliente = await userModel.findOne({ _id: cliente }).select('nombre telefono direccion codigopostal');
        if(!datosCliente){
            return res.status(400).json({message:"El cliente no existe"})
        }
        res.status(200).json(datosCliente)
    } catch (error) {
        res.status(400).json({message:"Fallo al obtener datos de la entrega"})
    }
}