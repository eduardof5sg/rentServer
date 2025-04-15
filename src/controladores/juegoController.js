import juegoModel from "../modelos/juegoModel.js";

import { firebaseConnection } from "../firebase/firebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

firebaseConnection(); // Asegúrate de que la conexión Firebase esté correctamente inicializada

const storage = getStorage();

export const registrarJuego = async (req, res) => {
  try {
    // Verificar que se han subido exactamente 2 imágenes
    if (!req.files || req.files.length === 2) {
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
    const { consola, titulo, descripcion, genero, estado, precio, totalAlquileres } = req.body;
    const userid = req.params.userid; // Asegúrate de que el parámetro de la ruta sea correcto

    // Crear un nuevo juego en el modelo
    const nuevoJuego = new juegoModel({
      consola,
      titulo,
      descripcion,
      genero,
      estado,
      precio,
      totalAlquileres,
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
