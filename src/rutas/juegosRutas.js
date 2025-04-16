import express from "express";
import { registrarJuego, listaDeJuegos, juegosUsuario } from "../controladores/juegoController.js";
import { memory } from "../middelwares/multer.js";
const juegoRoutes = express.Router();

juegoRoutes.post('/:userid', memory.array('imagenes', 2), registrarJuego);
juegoRoutes.get('/', listaDeJuegos);
juegoRoutes.get('/:userid', juegosUsuario);

export default juegoRoutes;