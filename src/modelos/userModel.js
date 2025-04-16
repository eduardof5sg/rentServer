import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    nombre: {type:String , required:true},
    apellidos:{type:String , required:true},
    direccion:{type:String, required:true},
    codigopostal:{type:String, required:true},
    telefono:{type:Number , unique:true, required:true},
    contraseña: {type:String, required:true},
    rol: {
      type: String,
      enum: ['user', 'admin', 'repartidor'],
      default: 'user'
    },
    fotoperfil: { type: String },
    estadocuenta: {
        type: String,
        enum: ['activo', 'suspendido', 'baneado'],
        default: 'activo'
      },
    
    
});

const userModel = mongoose.model('users', userSchema);
export default userModel ;