import db from '../config/db.js';

//------------------------------  Obtener todos los registros de finca -----------------------
export const getFincas = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM finca');
        res.status(200).json(rows);
    } catch (error) {
        console.error('❌ Error al obtener fincas:', error);
        res.status(500).json({ error: 'Error al obtener fincas' });
    }
};


//-------------------------------  Crear nuevo registro de finca -----------------------
export const createFinca = async (req, res) => {
    try {
        console.log("📥 Datos recibidos:", req.body);

        const { nombre, ubicacion, extension_total } = req.body;

        const [result] = await db.query(
            `INSERT INTO finca (nombre, ubicacion, extension_total)
                VALUES (?, ?, ?)`,
            [nombre, ubicacion, extension_total]
        );

        console.log("✅ Insert exitoso:", result);
        res.status(201).json({ message: 'Finca creada correctamente', id: result.insertId });

    } catch (error) {
        console.error("ERROR AL GUARDAR FOTO:", error.sqlMessage || error.message || error);
        res.status(500).json({ message: "Error al guardar la imagen en BD", error });
    }

};


//---------------------------- Editar registros de finca (opcional) -----------------------
export const updateFinca = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, ubicacion, extension_total } = req.body;

        const [result] = await db.query(
            `UPDATE finca SET nombre = ?, ubicacion = ?, extension_total = ? WHERE id_finca = ?`,
            [nombre, ubicacion, extension_total, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '⚠️ Finca no encontrada' });
        }

        res.status(200).json({ message: '✅ Finca actualizada correctamente' });
    }catch (error) {
        console.error('❌ Error en updateFinca:', error);
        res.status(500).json({ message: 'Error al actualizar la finca', error });
    }
};

// ------------------------  Eliminar registros de finca (opcional) -----------------------

export const deleteFinca = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            `DELETE FROM finca WHERE id_finca = ?`,
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '⚠️ Finca no encontrada' });
        }

        res.status(200).json({ message: '✅ Finca eliminada correctamente' });
    }catch (error) {
        console.error('❌ Error en deleteFinca:', error);
        res.status(500).json({ message: 'Error al eliminar la finca', error });
    }
};