import db from '../config/db.js';
import fs from "fs";


/* ------------------------------ Subir foto ------------------------------- */


export const subirFoto = async (req, res) => {
  try {
    const { tipo_recurso, id_recurso } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No se envió ninguna imagen" });
    }

    const filename = req.file.filename;

    // Guardar en BD
    const [result] = await db.query(
      "INSERT INTO registro_fotografico (tipo_recurso, id_recurso, url_imagen, fecha_subida) VALUES (?, ?, ?, NOW())",
      [tipo_recurso, id_recurso, filename]
    );

    res.json({
      message: "Imagen guardada correctamente",
      id_registro: result.insertId,
      archivo: filename
    });

  } catch (error) {
    console.error("ERROR AL GUARDAR FOTO:", error);
    res.status(500).json({ message: "Error al guardar la imagen en BD" });
  }
};



/* ------------------------------ Obtener fotos ------------------------------- */
export const obtenerFotosPorRecurso = async (req, res) => {
  try {
    const { tipo, id_recurso } = req.params;

    const [rows] = await db.execute(
      "SELECT * FROM registro_fotografico WHERE tipo_recurso = ? AND id_recurso = ?",
      [tipo, id_recurso]
    );

    rows.forEach(foto => {
      foto.url_completa = `${req.protocol}://${req.get("host")}/uploads/${foto.url_imagen}`;
    });

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener imágenes" });
  }
};


/* -----------------------------Eliminar Foto ----------------------------- */
export const eliminarFoto = async (req, res) => {
  try {
    const { id_registro } = req.params;

    const [foto] = await db.execute(
      "SELECT url_imagen FROM registro_fotografico WHERE id_registro = ?",
      [id_registro]
    );

    if (!foto.length)
      return res.status(404).json({ message: "Imagen no encontrada" });

    const ruta = foto[0].url_imagen;

    // eliminar archivo físico
    fs.unlink(ruta, (err) => {
      if (err) console.warn("No se pudo borrar archivo, pero continúa...");
    });

    // eliminar registro
    await db.execute(
      "DELETE FROM registro_fotografico WHERE id_registro = ?",
      [id_registro]
    );

    res.json({ message: "Imagen eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar imagen" });
  }
};
