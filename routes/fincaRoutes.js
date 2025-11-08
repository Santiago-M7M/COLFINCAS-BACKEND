import express from 'express';
import { createFinca, getFincas, updateFinca, deleteFinca} from '../controllers/fincaController.js';

const router = express.Router();

router.get('/', getFincas);
router.post('/', createFinca);
router.put('/:id', updateFinca);
router.delete('/:id', deleteFinca);

export default router;
