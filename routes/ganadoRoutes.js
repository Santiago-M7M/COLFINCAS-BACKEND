import express from 'express';
import { getGanado, createGanado, updateGanado, deleteGanado} from '../controllers/ganadoController.js';
import { verifyToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',verifyToken, requireAdmin, getGanado);
router.post('/',verifyToken, requireAdmin, createGanado);
router.put('/:id',verifyToken, requireAdmin, updateGanado);
router.delete('/:id',verifyToken, requireAdmin, deleteGanado);

export default router;
