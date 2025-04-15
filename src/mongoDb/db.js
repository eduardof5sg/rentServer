import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export const db = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB, {
            dbName: 'rentandgo'
        });
        console.log("Conexion a la base de datos")
    } catch (error) {
        console.log(error)
    }
}