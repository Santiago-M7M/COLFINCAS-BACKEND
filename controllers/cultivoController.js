import db from '../config/db.js';

// ------------------------ Obtener todos los registros de cultivo -----------------------
export const getCultivos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM cultivo');
        res.status(200).json(rows);
    }catch (error) {
        console.error('❌ Error al obtener cultivos:', error);
        res.status(500).json({ error: 'Error al obtener cultivos' });
    }
};

// ----------------------- Crear nuevo registro de cultivo ------------------------------
export const createCultivo = async (req, res) => {
    try{
        console.log("📥 Datos recibidos:", req.body);
        const { id_finca, tipo_cultivo, fecha_siembra, fecha_cosecha, area_sembrada, estado } = req.body;

        const [result] = await db.query(
            ` INSERT INTO cultivo (id_finca, tipo_cultivo, fecha_siembra, fecha_cosecha, area_sembrada, estado)
                VALUES (?, ?, ?, ?, ?, ?)`,
            [id_finca, tipo_cultivo, fecha_siembra, fecha_cosecha, area_sembrada, estado]   
        );

        console.log("✅ Insert exitoso:", result);
        res.status(201).json({ message: 'Cultivo creado correctamente', id: result.insertId });

    }catch (error) {
        console.error("❌ Error en createCultivo:", error);
        res.status(500).json({ message: 'Error al crear el cultivo', error });
    }
};

// ----------------------- Editar registros de cultivo (opcional) -------------------------------
export const updateCultivo = async (req, res) => {
    try{
        const { id } = req.params;
        const { id_finca, tipo_cultivo, fecha_siembra, fecha_cosecha, area_sembrada, estado } = req.body;

        const [result] = await db.query(
            ` UPDATE cultivo SET id_finca = ?, tipo_cultivo = ?, fecha_siembra = ?, fecha_cosecha = ?, area_sembrada = ?, estado = ? WHERE id_cultivo = ?`,
            [id_finca, tipo_cultivo, fecha_siembra, fecha_cosecha, area_sembrada, estado, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '⚠️ Cultivo no encontrado' });
        }

        res.status(200).json({ message: '✅ Cultivo actualizado correctamente' });
    }catch (error) {
        console.error('❌ Error en updateCultivo:', error);
        res.status(500).json({ message: 'Error al actualizar el cultivo', error });
    }
};

// ----------------------- Eliminar registros de cultivo (opcional) -----------------------------------
export const deleteCultivo = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            ` DELETE FROM cultivo WHERE id_cultivo = ?`,
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '⚠️ Cultivo no encontrado' });
        }
        res.status(200).json({ message: '✅ Cultivo eliminado correctamente' });
    }catch (error) {
        console.error('❌ Error en deleteCultivo:', error);
        res.status(500).json({ message: 'Error al eliminar el cultivo', error });
    }
}