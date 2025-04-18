import mongoose from "mongoose";

const alquilerSchema = mongoose.Schema({
    propietario : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true,
    },

    juegoid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'juegos',
        required : true
    },

    cliente : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true,
    },
    metodopago:{type:String ,default:"efectivo"},

    preciofinal : {type:Number, required:true},
    fechasolicitud:{type:String, required:true},
    fechainicio : {type: String },
    fechafin : {type: String },
    estado: {
        type: String,
        enum: ["solicitado", "confirmado", "en reparto", "entregado", "cancelado"],
        default: "solicitado"
      },

})

const alquilerModel = mongoose.model('alquiler', alquilerSchema);
export default alquilerModel;