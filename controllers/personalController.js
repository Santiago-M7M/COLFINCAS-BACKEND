import e from "express";
import db from "../config/db.js";

//------------------------ Obterner todos los personales -------------------------
export const getPersonales = async (req, res) => {
    try {
        const id_finca = req.user.id_finca; // 👈 Saco la finca del token

        const [rows] = await db.query(
            'SELECT * FROM personal WHERE id_finca = ?', 
            [id_finca]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error('❌ Error al obtener personal:', error);
        res.status(500).json({ error: 'Error al obtener personal' });
    }
};
//------------------------  Crear nuevo registro de personal --------------------------
export const createPersonal = async (req, res) => {
    try {
        console.log("📥 Datos recibidos:", req.body);
        const { id_finca, nombres, apellidos, cargo, fecha_ingreso, estado} = req.body;

        const [result] = await db.query(
            ` INSERT INTO personal (id_finca, nombres, apellidos, cargo, fecha_ingreso, estado)
                VALUES (?, ?, ?, ?, ?, ?)`,
            [id_finca, nombres, apellidos, cargo, fecha_ingreso, estado]
        );

        console.log("✅ Insert exitoso:", result);
        res.status(201).json({ message: 'Personal creado correctamente', id: result.insertId });
    }catch (error) {
        console.error("❌ Error en createPersonal:", error);
        res.status(500).json({ message: 'Error al crear el personal', error });
    }
}

//------------------------  Editar registros de personal (opcional) ----------------------------
export const updatePersonal = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_finca, nombres, apellidos, cargo, fecha_ingreso, estado} = req.body;

        const [result] = await db.query(
            ` UPDATE personal SET id_finca = ?, nombres = ?, apellidos = ?, cargo = ?, fecha_ingreso = ?, estado = ? WHERE id_personal = ?`,
            [id_finca, nombres, apellidos, cargo, fecha_ingreso, estado, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '⚠️ Personal no encontrado' });
        }
        res.status(200).json({ message: '✅ Personal actualizado correctamente' });
    }catch (error) {
        console.error('❌ Error en updatePersonal:', error);
        res.status(500).json({ message: 'Error al actualizar el personal', error });
    }
};

//------------------------  Eliminar registros de personal (opcional) -------------------------------
export const deletePersonal = async (req, res) => {
    try {
        const { id } = req.params;  
        const [result] = await db.query(
            ` DELETE FROM personal WHERE id_personal = ?`,
            [id]
        );  
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '⚠️ Personal no encontrado' });
        }

        res.status(200).json({ message: '✅ Personal eliminado correctamente' });
    }catch (error) {
        console.error('❌ Error en deletePersonal:', error);
        res.status(500).json({ message: 'Error al eliminar el personal', error });
    }
}