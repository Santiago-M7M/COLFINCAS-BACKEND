import express from 'express';
import {getPersonales, createPersonal, updatePersonal, deletePersonal} from '../controllers/personalController.js';

const router = express.Router();

router.get('/', getPersonales);
router.post('/', createPersonal);
router.put('/:id', updatePersonal);
router.delete('/:id', deletePersonal);

export default router;