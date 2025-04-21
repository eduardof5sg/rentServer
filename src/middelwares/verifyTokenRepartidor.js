import  Jwt  from "jsonwebtoken";


export const verificarRepartidor = (req,res,next) =>{
    
    console.log("🔑 Token:", req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token){
        return res.status(400).json({message:"Token no proporcionado"})
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWTSECRET)
        if(decoded.rol !== 'repartidor'){
            return res.status(400).json({message:"Acceso denegado, tienes que ser repartidor"})
        }

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
}