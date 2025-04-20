import express from "express"
import { verificarRepartidor } from "../middelwares/verifyTokenRepartidor.js"
import { alquileresPorCP, deliveryReparto } from "../controladores/deliveryController.js"

const deliveryRutas = express.Router()

deliveryRutas.put('/reparto/:alquilerid', verificarRepartidor, deliveryReparto)
deliveryRutas.get('/reparto' ,verificarRepartidor, alquileresPorCP)

export default deliveryRutas