import alquilerModel from "../modelos/alquilerModel.js";
import userModel from "../modelos/userModel.js";
import juegoModel from "../modelos/juegoModel.js";

export const solicitudAlquiler = async(req,res) =>{
    try {
        const {propietario, cliente,preciofinal,fechasolicitud} = req.body
        const juegoid = req.params.juegoid

        const userPropietario = await userModel.findById(propietario);
        const userCliente = await userModel.findById(cliente);

        if (!userPropietario || !userCliente) {
        return res.status(404).json({ message: "Cliente o propietario no encontrados" });
        }

        // Verificar coincidencia de código postal
        if (userPropietario.codigopostal !== userCliente.codigopostal) {
        return res.status(400).json({ message: "Operación fallida: Los codigos postales deben coincidir" });
        }

        const nuevoAlquiler = new alquilerModel ({
            juegoid,
            propietario,
            cliente,
            preciofinal,
            fechasolicitud
        });
        await nuevoAlquiler.save();
        res.status(201).json(nuevoAlquiler)
    } catch (error) {
        res.status(400).json({message:"Fallo en la solicitud de nuevo alquiler"})
    }
}

export const confirmarAlquiler = async(req,res) =>{
    try {
        const propietario = req.params.userid;
        const solicitudesUsuario = await alquilerModel.findOne({propietario});
        if(!solicitudesUsuario){
            return res.status(404).json({message:"No hay solicitudes de alquiler para este usuario"})
        }

        solicitudesUsuario.estado = "confirmado";
        await solicitudesUsuario.save();
        await juegoModel.findByIdAndUpdate(solicitudesUsuario.juegoid, {
            disponibilidad: false,
          });
      
          res.status(200).json({ message: "Alquiler confirmado", solicitudesUsuario });
    } catch (error) {
        res.status(500).json({ message: "Error interno al confirmar el alquiler" });
    }
}