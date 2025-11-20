import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export const login = async (req, res) => {
    const { correo, contrasena } = req.body;
    console.log("req.body:", req.body);


    try {
        const [[user]] = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
        if (!user) {
            console.log('❌ Usuario no encontrado:', correo);
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Comprobar bloqueo
    if (user.lock_until && new Date(user.lock_until) > new Date()) {
        console.log('🔒 Cuenta bloqueada hasta:', user.lock_until);
        return res.status(423).json({ message: `Cuenta bloqueada hasta ${user.lock_until}` });
    }

    const valid = await bcrypt.compare(contrasena, user.contrasena);
    if (!valid) {
      // incrementar intentos fallidos
        const attempts = (user.failed_attempts || 0) + 1;
        let lockUntil = null;

    if (attempts >= MAX_ATTEMPTS) {
        const lockDate = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
        lockUntil = lockDate.toISOString().slice(0, 19).replace('T', ' ');
        await db.query('UPDATE usuario SET failed_attempts = ?, lock_until = ? WHERE id_usuario = ?', [attempts, lockUntil, user.id_usuario]);
        console.log(`❗ Cuenta bloqueada por ${LOCK_MINUTES} minutos para ${correo}`);
        return res.status(423).json({ message: `Cuenta bloqueada por ${LOCK_MINUTES} minutos` });
    } else {
            await db.query('UPDATE usuario SET failed_attempts = ? WHERE id_usuario = ?', [attempts, user.id_usuario]);
            console.log(`⚠️ Intento fallido ${attempts} para ${correo}`);
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }
    }

    // Si es válido, resetear intentos y bloqueo
    await db.query('UPDATE usuario SET failed_attempts = 0, lock_until = NULL WHERE id_usuario = ?', [user.id_usuario]);

    // Validar rol
    if (user.rol !== 'administrador' && user.rol !== 'dueno') {
        console.log('🚫 Rol no autorizado:', user.rol);
        return res.status(403).json({ message: 'No tienes permisos' });
    }

    // Generar JWT
    const payload = { 
        id_usuario: user.id_usuario, 
        id_finca: user.id_finca,
        nombre_usuario: user.nombre_usuario, 
        rol: user.rol, 
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '1h' });

    console.log('✅ Login exitoso:', correo);
    res.json({ message: 'Login exitoso', token, usuario: payload });
    } catch (error) {
        console.error('❌ Error en login:', error);
        res.status(500).json({ message: 'Error interno' });
    }
};
