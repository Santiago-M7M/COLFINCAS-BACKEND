import express from 'express';
import {getPersonales, createPersonal, updatePersonal, deletePersonal} from '../controllers/personalController.js';
import { verifyToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 🔐 SOLO ADMIN puede entrar a estas rutas
router.post('/', verifyToken, requireAdmin, createPersonal);
router.get('/', verifyToken, requireAdmin, getPersonales);
router.put('/:id', verifyToken, requireAdmin, updatePersonal);
router.delete('/:id', verifyToken, requireAdmin, deletePersonal);

export default router;