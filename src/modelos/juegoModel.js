import mongoose from "mongoose";

const juegoSchema = mongoose.Schema({

    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true,
    },
    consola : { type:String, required: true},
    titulo :{ type: String, required :true},
    descripcion: {type:String, required:true},
    genero: {type: String, required:true},
    estado: {type: String, required:true},
    disponibilidad : {type: Boolean, default:true},
    precio: {type:Number, required:true},
    totalAlquileres: { type: Number, default: 0 },
    imagenes: { type: [String], default: [], required:true },

})

const juegoModel = mongoose.model ('juegos', juegoSchema);
export default juegoModel;