import express from 'express';
import { createFinca, getFincas, updateFinca, deleteFinca} from '../controllers/fincaController.js';
import { verifyToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',verifyToken, requireAdmin, getFincas);
router.post('/',verifyToken, requireAdmin, createFinca);
router.put('/:id',verifyToken, requireAdmin, updateFinca);
router.delete('/:id',verifyToken, requireAdmin, deleteFinca);

export default router;
