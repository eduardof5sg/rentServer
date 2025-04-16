import express from "express";
import { login } from "../controladores/loginController.js";

const authRoutes = express.Router();

authRoutes.post('/', login)

export default authRoutes;