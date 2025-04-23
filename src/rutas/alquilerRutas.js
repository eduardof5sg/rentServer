import express from "express"
import { confirmarAlquiler, confirmarDevolucion, eliminarSolicitud, juegosAlquilados, juegosPedidos, solicitudAlquiler, solicitudjuego } from "../controladores/alquilerController.js";

const alquilerRoutes = express.Router();

alquilerRoutes.post('/:juegoid', solicitudAlquiler);
alquilerRoutes.put('/confirmar/:solicitudid', confirmarAlquiler);
alquilerRoutes.get('/solicitudes/:userid',solicitudjuego);
alquilerRoutes.delete('/:solicitudid' , eliminarSolicitud);
alquilerRoutes.get('/alquilados/:userid', juegosAlquilados)
alquilerRoutes.get('/pedidos/:userid', juegosPedidos)
alquilerRoutes.put('/devolucion/:alquilerid', confirmarDevolucion)

export default alquilerRoutes;