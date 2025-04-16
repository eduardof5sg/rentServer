import express from "express" ;
import { crearUsuario, datosEntrega } from "../controladores/userController.js";

const userRutas = express.Router();

userRutas.post("/registro", crearUsuario);
userRutas.get("/:cliente", datosEntrega)

export default userRutas;