import db from "../config/db.js";

//------------------------  Obtener todos los registros de maquinaria --------------------------
export const getMaquinarias = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM maquinaria');
        res.status(200).json(rows);
    }catch (error) {
        console.error('❌ Error al obtener maquinarias:', error);
        res.status(500).json({ error: 'Error al obtener maquinarias' });
    }
};

//----------------------- Crear nuevo registro de maquinaria ----------------------------
export const createMaquinaria = async (req, res) => {
    try {
        console.log("📥 Datos recibidos:", req.body);
        const { id_finca, nombre, tipo, fecha_compra, estado } = req.body;

        const [result] = await db.query(
            ` INSERT INTO maquinaria (id_finca, nombre, tipo, fecha_compra, estado)
                VALUES (?, ?, ?, ?, ?)`,
            [id_finca, nombre, tipo, fecha_compra, estado]
        );

        console.log("✅ Insert exitoso:", result);
        res.status(201).json({ message: 'Maquinaria creada correctamente', id: result.insertId });
    }catch (error) {
        console.error("❌ Error en createMaquinaria:", error);
        res.status(500).json({ message: 'Error al crear la maquinaria', error });
    }
};

//-----------------------  Editar registros de maquinaria (opcional) -------------------------------------
export const updateMaquinaria = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_finca, nombre, tipo, fecha_compra, estado } = req.body;

        const [result] = await db.query(
            ` UPDATE maquinaria SET id_finca = ?, nombre = ?, tipo = ?, fecha_compra = ?, estado = ? WHERE id_maquinaria = ?`,
            [id_finca, nombre, tipo, fecha_compra, estado, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '⚠️ Maquinaria no encontrada' });
        }

        res.status(200).json({ message: '✅ Maquinaria actualizada correctamente' });
    }catch (error) {
        console.error('❌ Error en updateMaquinaria:', error);
        res.status(500).json({ message: 'Error al actualizar la maquinaria', error });
    }
}

//-----------------------  Eliminar registros de maquinaria (opcional) -------------------------------------
export const deleteMaquinaria = async (req, res) => {
    try {
        const { id } = req.params;  
        const [result] = await db.query(
            ` DELETE FROM maquinaria WHERE id_maquinaria = ?`,
            [id]
        );
        res.status(200).json({ message: '✅ Maquinaria eliminada correctamente' });
    }catch (error) {
        console.error('❌ Error en deleteMaquinaria:', error);
        res.status(500).json({ message: 'Error al eliminar la maquinaria', error });
    }   
};