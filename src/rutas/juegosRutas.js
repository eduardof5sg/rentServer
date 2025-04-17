import express from "express";
import { registrarJuego, listaDeJuegos, juegosUsuario, juegounico } from "../controladores/juegoController.js";
import { memory } from "../middelwares/multer.js";
const juegoRoutes = express.Router();

juegoRoutes.post('/:userid', memory.array('imagenes', 2), registrarJuego);
juegoRoutes.get('/', listaDeJuegos);
juegoRoutes.get('/:userid', juegosUsuario);
juegoRoutes.get("/detalles/:juegoid",juegounico)

export default juegoRoutes;