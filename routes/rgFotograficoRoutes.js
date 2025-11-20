import express from 'express';
/* import { body } from 'express-validator';
import { createUsuario } from '../controllers/usuarioController.js'; */


import {subirFoto, obtenerFotosPorRecurso,eliminarFoto} from "../controllers/registrofotograficoController.js";
import { upload } from "../config/multer.js";
import { verifyToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Subir foto
router.post("/",verifyToken,requireAdmin,upload.single("imagen"),subirFoto);

// Obtener fotos (ganado / cultivo / maquinaria / finca)
router.get("/:tipo/:id_recurso",verifyToken, requireAdmin, obtenerFotosPorRecurso);

// Eliminar foto
router.delete("/:id_registro",verifyToken, requireAdmin, eliminarFoto);

export default router;
