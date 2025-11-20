import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

// Crear usuario (con hash de contraseña)
export const createUsuario = async (req, res) => {
    console.log('📥 createUsuario body:', req.body);

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        console.log('❗Errores de validación:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_finca, nombre_usuario, correo, contrasena, rol } = req.body;

    try {
        // Verificar usuario existente por correo
        const [existing] = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
        if (existing.length) {
            console.log('⚠️ Usuario ya existe:', correo);
        return res.status(400).json({ message: 'Correo ya registrado' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(contrasena, saltRounds);
    console.log('🔐 Password hashed for', correo);

    await db.query(
        `INSERT INTO usuario (id_finca, nombre_usuario, correo, contrasena, rol)
        VALUES (?, ?, ?, ?, ?)`,
        [id_finca, nombre_usuario, correo, passwordHash, rol]
    );

    console.log('✅ Usuario creado:', correo);
    res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        console.error('❌ Error createUsuario:', error);
        res.status(500).json({ message: 'Error interno' });
    }
};