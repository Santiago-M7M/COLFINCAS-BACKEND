import express from 'express';
import { getDetalleFinca } from '../controllers/fincaDetalleController.js';

const router = express.Router();

// Ruta para obtener todos los datos asociados a una finca
router.get('/:id_finca', getDetalleFinca);

export default router;
