import express from 'express';
import { getMaquinarias, createMaquinaria, updateMaquinaria, deleteMaquinaria } from '../controllers/maquinariaController.js';
import { verifyToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',verifyToken,requireAdmin, getMaquinarias);
router.post('/',verifyToken,requireAdmin, createMaquinaria);
router.put('/:id',verifyToken,requireAdmin, updateMaquinaria);
router.delete('/:id',verifyToken,requireAdmin, deleteMaquinaria);

export default router;