import express from 'express';
import { getGanado, createGanado, updateGanado, deleteGanado} from '../controllers/ganadoController.js';

const router = express.Router();

router.get('/', getGanado);
router.post('/', createGanado);
router.put('/:id', updateGanado);
router.delete('/:id', deleteGanado);

export default router;
