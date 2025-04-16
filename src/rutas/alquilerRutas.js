import express from "express"
import { confirmarAlquiler, solicitudAlquiler } from "../controladores/alquilerController.js";

const alquilerRoutes = express.Router();

alquilerRoutes.post('/:juegoid', solicitudAlquiler);
alquilerRoutes.put('/:userid', confirmarAlquiler)

export default alquilerRoutes;