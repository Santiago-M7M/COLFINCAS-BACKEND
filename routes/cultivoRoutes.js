import express from 'express';
import { getCultivos, createCultivo,updateCultivo, deleteCultivo} from '../controllers/cultivoController.js';
import { verifyToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',verifyToken,requireAdmin, getCultivos);
router.post('/',verifyToken,requireAdmin, createCultivo);
router.put('/:id',verifyToken,requireAdmin, updateCultivo);
router.delete('/:id',verifyToken,requireAdmin, deleteCultivo);

export default router;