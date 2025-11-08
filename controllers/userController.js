import db from '../config/db.js';

// --------------------------------------------- Obtener todos los usuarios-----------------------------------------------
export const getUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuario');
        res.status(200).json(rows);
    }catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// --------------------------------------------- Crear nuevo usuario -------------------------------------------------------
export const createUser = async (req, res) => {
    try {
        console.log("📥 Datos recibidos:", req.body);
        const { id_finca, nombre_usuario, correo, contrasena, rol } = req.body;

        const [result] = await db.query(
            ` INSERT INTO usuario (id_finca, nombre_usuario, correo, contrasena, rol)
                VALUES (?, ?, ?, ?, ?)`,
            [id_finca, nombre_usuario, correo, contrasena, rol]
        );
        console.log("✅ Insert exitoso:", result);
        res.status(201).json({ message: 'Usuario creado correctamente', id: result.insertId }); 
    }catch (error) {
        console.error("❌ Error en createUser:", error);
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

// --------------------------------------------- Editar usuario (opcional) --------------------------------------------------
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_finca, nombre_usuario, correo, contrasena, rol } = req.body;

        const [result] = await db.query(
            ` UPDATE usuario SET id_finca = ?, nombre_usuario = ?, correo = ?, contrasena = ?, rol = ? WHERE id_usuario = ?`,
            [id_finca, nombre_usuario, correo, contrasena, rol, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '⚠️ Usuario no encontrado' });
        }

        res.status(200).json({ message: '✅ Usuario actualizado correctamente' });
    }catch (error) {
        console.error('❌ Error en updateUser:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// --------------------------------------------- Eliminar usuario (opcional) -------------------------------------------------
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;  
        const [result] = await db.query(
            ` DELETE FROM usuario WHERE id_usuario = ?`,
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '⚠️ Usuario no encontrado' });
        }

        res.status(200).json({ message: '✅ Usuario eliminado correctamente' });
    }catch (error) {
        console.error('❌ Error en deleteUser:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};