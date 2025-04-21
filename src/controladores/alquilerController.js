import alquilerModel from "../modelos/alquilerModel.js";
import userModel from "../modelos/userModel.js";
import juegoModel from "../modelos/juegoModel.js";

export const solicitudAlquiler = async(req,res) =>{
    try {
        const {propietario, cliente,preciofinal,semanas,fechasolicitud} = req.body
        const juegoid = req.params.juegoid

        const userPropietario = await userModel.findById(propietario);
        const userCliente = await userModel.findById(cliente);

        if (!userPropietario || !userCliente) {
        return res.status(404).json({ message: "Cliente o propietario no encontrados" });
        }

        // Verificar coincidencia de código postal
        if (userPropietario.codigopostal !== userCliente.codigopostal) {
        return res.status(400).json({ message: "Para evitar el incremento en el precio de envio, te sugerimos alquilar juegos dentro de tu codigo postal" });
        }

        const nuevoAlquiler = new alquilerModel ({
            juegoid,
            propietario,
            cliente,
            semanas,
            preciofinal,
            fechasolicitud
        });
        await nuevoAlquiler.save();
        await juegoModel.findByIdAndUpdate(juegoid, {
            disponibilidad: false,
          });
        res.status(201).json(nuevoAlquiler)
    } catch (error) {
        res.status(400).json({message:"Fallo en la solicitud de nuevo alquiler"})
    }
}

export const confirmarAlquiler = async(req,res) => {
    try {
        const solicitudId = req.params.solicitudid;
        const solicitud = await alquilerModel.findById(solicitudId);

        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada" });
        }

        solicitud.estado = "confirmado";
        await solicitud.save();

        res.status(200).json({ message: "Alquiler confirmado", solicitud });
    } catch (error) {
        res.status(500).json({ message: "Error interno al confirmar el alquiler" });
    }
};

export const solicitudjuego = async(req,res) =>{
    try {
        const propietario = req.params.userid ;
        const solicitudes = await alquilerModel.find({
            propietario,
            estado:"solicitado"
        }) 
        .populate("juegoid", "titulo consola imagenes") // puedes agregar más campos si deseas
        .populate("cliente", "nombre apellidos");
        if (!solicitudes) {
            return res.status(404).json({ message: "No hay solicitudes pendientes." });
          }
      
          res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las solicitudes." });
    }
}

export const juegosAlquilados = async(req,res) =>{
    try {
        const propietario = req.params.userid ;
        const solicitudes = await alquilerModel.find({
            propietario,
        }) 
        .populate("juegoid", "titulo") // puedes agregar más campos si deseas
        .populate("cliente", "nombre  telefono");
        if (solicitudes.length === 0) {
            return res.status(404).json({ message: "No hay solicitudes pendientes." });
          }
      
          res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las solicitudes." });
    }
}

export const juegosPedidos = async(req,res) =>{
    try {
        const cliente = req.params.userid ;
        const solicitudes = await alquilerModel.find({
            cliente
        }) 
        .populate("juegoid", "titulo") // puedes agregar más campos si deseas
        .populate("propietario", "nombre  telefono");
        if (solicitudes.length === 0) {
            return res.status(404).json({ message: "No hay solicitudes pendientes." });
          }
      
          res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las solicitudes." });
    }
}

export const eliminarSolicitud = async (req, res) => {
    try {
      const solicitudid = req.params.solicitudid;
      const { propietario } = req.body;
  
      if (!solicitudid || !propietario) {
        return res.status(400).json({ message: "Faltan datos necesarios" });
      }
  
      // Buscar el alquiler
      const alquiler = await alquilerModel.findById({_id:solicitudid});
  
      if (!alquiler) {
        return res.status(404).json({ message: "Solicitud de alquiler no encontrada" });
      }
  
      if (alquiler.propietario.toString() !== propietario) {
        return res.status(403).json({ message: "No tienes permiso para eliminar esta solicitud" });
      }
  
      // Cambiar la disponibilidad del juego a true
      await juegoModel.findByIdAndUpdate(alquiler.juegoid, {
        disponibilidad: true,
      });
  
      // Eliminar la solicitud de alquiler
      await alquilerModel.findByIdAndDelete(solicitudid);
  
      res.status(200).json({ message: "Solicitud eliminada y disponibilidad actualizada" });
    } catch (error) {
      console.error("Error al eliminar solicitud:", error);
      res.status(500).json({ message: "Error al eliminar la solicitud" });
    }
  };

  export const confirmarEntrega = async (req, res) => {
    try {
      const alquilerid = req.params.alquilerid;
      const { fechainicio, fechafin } = req.body;
  
      // Buscar el alquiler
      const alquiler = await alquilerModel.findById(alquilerid);
  
      if (!alquiler) {
        return res.status(404).json({ message: "Este pedido no existe." });
      }
  
      if (alquiler.estado !== "en reparto") {
        return res.status(400).json({ message: "Este pedido no está en reparto." });
      }
  
      // Actualizar campos
      alquiler.estado = "entregado";
      alquiler.fechainicio = fechainicio || new Date().toISOString(); // o puedes esperar que se lo mandes tú
      alquiler.fechafin = fechafin || new Date().toISOString();
  
      await alquiler.save();
  
      return res.status(200).json({ message: "Entrega confirmada.", alquiler });
    } catch (error) {
      console.error("Error al confirmar entrega:", error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  };
