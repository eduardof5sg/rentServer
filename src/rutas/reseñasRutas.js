import express from "express"
import { nuevaReseña, reseñasUser } from "../controladores/reseñaController.js";

const reseñasRoutes = express.Router() ;

reseñasRoutes.post('/:receptorid', nuevaReseña)
reseñasRoutes.get('/:receptorid', reseñasUser)

export default reseñasRoutes;