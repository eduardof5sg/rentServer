import express from "express" ;
import { crearUsuario } from "../controladores/userController.js";

const userRutas = express.Router();

userRutas.post("/registro", crearUsuario)

export default userRutas;