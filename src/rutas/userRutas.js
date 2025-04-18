import express from "express" ;
import { crearUsuario, datosEntrega, miusuario } from "../controladores/userController.js";

const userRutas = express.Router();

userRutas.post("/registro", crearUsuario);
userRutas.get("/:cliente", datosEntrega);
userRutas.get("/datos/:userid", miusuario)

export default userRutas;