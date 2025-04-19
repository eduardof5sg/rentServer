import juegoModel from "../modelos/juegoModel.js";

import { firebaseConnection } from "../firebase/firebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

firebaseConnection(); // Asegúrate de que la conexión Firebase esté correctamente inicializada

const storage = getStorage();

export const registrarJuego = async (req, res) => {
  try { 
    
    const { consola, titulo, descripcion, genero, estado, precio, totalalquileres } = req.body;
    const userid = req.params.userid;
    // Verificar que se han subido exactamente 2 imágenes
    if (!req.files || req.files.length !== 2) {
      return res.status(400).json({ message: "Se deben subir exactamente 2 imágenes" });
    }

    const imagenUrls = [];

    // Procesar cada archivo subido
    for (const file of req.files) {
      // Redimensionamos y procesamos la imagen usando Sharp
      const processedBuffer = await sharp(file.buffer)
        .resize(640, 480) // Redimensionar la imagen
        .toFormat("jpeg") // Convertir a formato JPEG para optimizar
        .toBuffer(); // Obtener el buffer procesado

      // Generamos un nombre único para la imagen
      const fileRef = ref(storage, `juegos/${uuidv4()}.jpeg`); // Usamos uuid para nombres únicos

      // Subimos la imagen a Firebase Storage
      await uploadBytes(fileRef, processedBuffer);

      // Obtener la URL de la imagen subida
      const fileUrl = await getDownloadURL(fileRef);
      imagenUrls.push(fileUrl); // Guardamos la URL de la imagen
    }

    // Extraemos los datos del cuerpo de la solicitud
    // Asegúrate de que el parámetro de la ruta sea correcto

    // Crear un nuevo juego en el modelo
    const nuevoJuego = new juegoModel({
      consola,
      titulo,
      descripcion,
      genero,
      estado,
      precio,
      totalalquileres,
      imagenes: imagenUrls, // Almacenamos las URLs de las 2 imágenes
      userid: userid, // ID del usuario que sube el juego
    });

    // Guardamos el nuevo juego en la base de datos
    await nuevoJuego.save();

    // Respuesta exitosa
    res.status(201).json({ message: "Juego registrado correctamente", juego: nuevoJuego });
  } catch (error) {
    console.error("Error al registrar el juego:", error);
    res.status(500).json({ message: "Error interno al registrar el juego", error: error.message });
  }
};

export const listaDeJuegos = async (req, res) => {
  try {
    const { consola } = req.query; // Obtenemos el filtro por consola desde la query params

    // Si no se pasa el parámetro de consola, mostramos todos los juegos
    let juegos;
    if (consola) {
      // Filtramos por consola si se proporciona en los parámetros
      juegos = await juegoModel.find({ consola: { $in: [consola] } })
      .populate("userid", "codigopostal verificado");
    } else {
      // Si no se pasa consola, mostramos todos los juegos
      juegos = await juegoModel.find();
    }

    res.status(200).json(juegos);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al mostrar todos los juegos" });
  }
};

export const juegosUsuario = async (req,res) =>{
  try {
    const userid = req.params.userid
    const misjuegos = await juegoModel.find({userid});
    if(!misjuegos){
      return res.status(400).json({message:"No tienes ningun juego registrado"})
    }

    res.status(200).json(misjuegos)
  } catch (error) {
    res.status(400).json({message:"Fallo en el servidor"})
  }
}

export const juegounico = async(req,res) =>{
  try {
    const juegoid = req.params.juegoid
    const game = await juegoModel.findById({_id:juegoid})
    if(!game){
      return res.status(400).json({message:"Este juego no existe"})
    }
    res.status(200).json(game)
  } catch (error) {
    res.status(400).json({message:"Fallo en la peticion de detalles del juego"})
  }
}