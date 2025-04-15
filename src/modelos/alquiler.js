import mongoose from "mongoose";

const alquilerSchema = mongoose.Schema({
    propietario : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true,
    },

    juego : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'juegos',
        required : true
    },

    cliente : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true,
    },

    preciofinal : {type:Number, required:true},
    fechainicio : {type: String, required:true }
})

const alquilerModel = mongoose.model('alquiler', alquilerSchema);
export default alquilerModel;