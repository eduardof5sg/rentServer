import express from "express"
import cors from "cors"
import userRutas from "./rutas/userRutas.js";
import juegoRoutes from "./rutas/juegosRutas.js";
import alquilerRoutes from "./rutas/alquilerRutas.js";
import authRoutes from "./rutas/loginRutas.js";
import deliveryRutas from "./rutas/deliveryRutas.js";
import reseñasRoutes from "./rutas/reseñasRutas.js";

// base de datos

import { db } from "./mongoDb/db.js"

//

const app = express();
app.use(cors());
app.use(express.json());

// rutas
app.use('/users', userRutas);
app.use('/juegos',juegoRoutes);
app.use('/alquiler', alquilerRoutes);
app.use('/login', authRoutes);
app.use('/delivery', deliveryRutas);
app.use('/reviews',reseñasRoutes)
//


const port = process.env.PORT || 3000
app.listen(port);
console.log('Servidor listo en puerto ', port);
db()