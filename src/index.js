import express from "express"
import cors from "cors"
import userRutas from "./rutas/userRutas.js";
import juegoRoutes from "./rutas/juegosRutas.js";

// base de datos

import { db } from "./mongoDb/db.js"

//

const app = express();
app.use(cors());
app.use(express.json());

// rutas
app.use('/users', userRutas),
app.use('/juegos',juegoRoutes)
//


const port = process.env.PORT || 3000
app.listen(port);
console.log('Servidor listo en puerto ', port);
db()