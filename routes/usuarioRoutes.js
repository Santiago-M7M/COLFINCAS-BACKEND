import express from 'express';
import { body } from 'express-validator';
import { createUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

// Ruta para crear un nuevo usuario con validacion 

const passwordValidator = body('contrasena')
    .isLength({ min: 8 }).withMessage('Min 8 caracteres')
    .matches(/[A-Z]/).withMessage('Debe tener mayúscula')
    .matches(/[a-z]/).withMessage('Debe tener minúscula')
    .matches(/\d/).withMessage('Debe tener un número')
    .matches(/[@$!%*?&#]/).withMessage('Debe tener un símbolo');

router.post(
    '/',
    [
        body('id_finca').isInt().withMessage('id_finca inválido'),
        body('nombre_usuario').notEmpty(),
        body('correo').isEmail(),
        passwordValidator,
        body('rol').notEmpty()
    ],
    createUsuario
);

export default router;