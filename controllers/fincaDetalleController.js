import db from '../config/db.js';

export const getDetalleFinca = async (req, res) => {
    const { id_finca } = req.params;

    try {
        // Consulta principal
        const [finca] = await db.query('SELECT * FROM finca WHERE id_finca = ?', [id_finca]);

        if (finca.length === 0) {
            return res.status(404).json({ message: 'Finca no encontrada' });
        }

        // Consultas relacionadas
        const [ganado] = await db.query('SELECT * FROM ganado WHERE id_finca = ?', [id_finca]);
        const [cultivo] = await db.query('SELECT * FROM cultivo WHERE id_finca = ?', [id_finca]);
        const [maquinaria] = await db.query('SELECT * FROM maquinaria WHERE id_finca = ?', [id_finca]);
        const [personal] = await db.query('SELECT * FROM personal WHERE id_finca = ?', [id_finca]);

        // Respuesta agrupada
        res.json({
            finca: finca[0],
            ganado,
            cultivo,
            maquinaria,
            personal,
        });

    } catch (error) {
        console.error('❌ Error en obtenerDetalleFinca:', error);
        res.status(500).json({ message: 'Error al obtener los datos de la finca' });
    }
};
