import mongoose from "mongoose";

const reseñaSchema = mongoose.Schema({
    emisorid: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    receptorid: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    puntuacion : {type:Number, required:true},
    mensaje :{type:String , required:true}
})

const reseñaModel = mongoose.model('reseñas', reseñaSchema);
export default reseñaModel