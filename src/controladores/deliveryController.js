import alquilerModel from "../modelos/alquilerModel.js";

export const deliveryReparto = async(req,res) =>{
    try {
        const alquilerid = req.params.alquilerid
        const cpRepartidor = req.user.codigopostal
        const reparto = await alquilerModel.findOne({ _id: alquilerid })
        .populate('cliente', 'direccion codigopostal nombre apellidos')
        .populate('propietario', 'direccion nombre apellidos');

        if (!reparto) {
            return res.status(404).json({ message: "No existe ninguna solicitud de reparto." });
        }
        if (reparto.cliente.codigopostal !== cpRepartidor) {
            return res.status(403).json({ message: "No tienes permiso para repartir en este código postal." });
        }

        if (reparto.estado !== 'confirmado') {
            return res.status(400).json({ message: "Este alquiler no está en estado confirmado." });
        }

        // Cambiar estado a "en reparto"
        reparto.estado = "en reparto";
        await reparto.save();

        return res.status(200).json({
            message: "Estado actualizado a 'en reparto'.",
            reparto
        });

    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor." });
    }
}

export const alquileresPorCP = async (req, res) => {
    try {
      
      const cpRepartidor = req.user.codigopostal;
  
     
      const alquileres = await alquilerModel.find({ estado: 'confirmado' })
  .populate({
    path: 'cliente',
    match: { codigopostal: cpRepartidor },
    select: 'codigopostal nombre direccion telefono' // Aquí seleccionamos los campos adicionales
  })
  .populate({
    path: 'propietario',
    select: 'nombre direccion telefono' // Seleccionamos los campos del propietario
  })
  .exec();
  
      
      const alquileresFiltrados = alquileres.filter(alquiler => alquiler.cliente !== null);
  
      return res.status(200).json(alquileresFiltrados);
    } catch (error) {
      console.error("Error al obtener los alquileres:", error);
      return res.status(500).json({ message: "Hubo un error al obtener los alquileres." });
    }
  };