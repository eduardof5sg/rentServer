import express from "express"
import { confirmarAlquiler, eliminarSolicitud, solicitudAlquiler, solicitudjuego } from "../controladores/alquilerController.js";

const alquilerRoutes = express.Router();

alquilerRoutes.post('/:juegoid', solicitudAlquiler);
alquilerRoutes.put('/confirmar/:solicitudid', confirmarAlquiler);
alquilerRoutes.get('/solicitudes/:userid',solicitudjuego);
alquilerRoutes.delete('/:solicitudid' , eliminarSolicitud)

export default alquilerRoutes;