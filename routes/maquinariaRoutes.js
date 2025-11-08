import express from 'express';
import { getMaquinarias, createMaquinaria, updateMaquinaria, deleteMaquinaria } from '../controllers/maquinariaController.js';

const router = express.Router();

router.get('/', getMaquinarias);
router.post('/', createMaquinaria);
router.put('/:id', updateMaquinaria);
router.delete('/:id', deleteMaquinaria);

export default router;