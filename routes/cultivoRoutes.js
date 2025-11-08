import express from 'express';
import { getCultivos, createCultivo,updateCultivo, deleteCultivo} from '../controllers/cultivoController.js';

const router = express.Router();

router.get('/', getCultivos);
router.post('/', createCultivo);
router.put('/:id', updateCultivo);
router.delete('/:id', deleteCultivo);

export default router;