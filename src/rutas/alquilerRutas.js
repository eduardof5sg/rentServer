import express from "express"
import { confirmarAlquiler, solicitudAlquiler, solicitudjuego } from "../controladores/alquilerController.js";

const alquilerRoutes = express.Router();

alquilerRoutes.post('/:juegoid', solicitudAlquiler);
alquilerRoutes.put('/confirmar/:solicitudid', confirmarAlquiler);
alquilerRoutes.get('/solicitudes/:userid',solicitudjuego)

export default alquilerRoutes;