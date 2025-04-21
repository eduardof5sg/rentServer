import express from "express"
import { verificarRepartidor } from "../middelwares/verifyTokenRepartidor.js"
import { alquileresPorCP, deliveryReparto,historialReparto } from "../controladores/deliveryController.js"
import { confirmarEntrega } from "../controladores/alquilerController.js"

const deliveryRutas = express.Router()

deliveryRutas.put('/reparto/:alquilerid', verificarRepartidor, deliveryReparto)
deliveryRutas.get('/reparto' ,verificarRepartidor, alquileresPorCP)
deliveryRutas.put('/entrega/:alquilerid', confirmarEntrega)
deliveryRutas.get('/historial', verificarRepartidor,historialReparto)

export default deliveryRutas;