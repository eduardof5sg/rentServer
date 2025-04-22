import reseñaModel from "../modelos/reseñasModel.js";

export const nuevaReseña = async(req,res) =>{
    const receptorid = req.params.receptorid
    try {
        const {puntuacion , mensaje, emisorid} = req.body
        const nuevaReview = new reseñaModel({
            receptorid:receptorid,
            emisorid:emisorid,
            puntuacion:puntuacion,
            mensaje:mensaje,
        });
        await nuevaReview.save()
        res.status(200).json({message:"Reseña creada con exito", nuevaReview})
    } catch (error) {
        res.status(400).json({message:"no se pudo crear la reseña"})
    }
}

export const reseñasUser = async (req,res)=>{
    const receptorid = req.params.receptorid
    try {
        const allReseñas = await reseñaModel.find({receptorid});
        if(!allReseñas) {
            return res.status(400).json({message:"No existen reseñas para este  usuario"})
        }
        res.status(200).json(allReseñas)
    } catch (error) {
        res.status(400).json({message:"Error en el servidor de reseñas"})
    }
}