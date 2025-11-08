import db from '../config/db.js';

//------------------------  Obtener todos los registros de ganado -----------------------
export const getGanado = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ganado');
    res.status(200).json(rows);
  }catch (error) {
    console.error('❌ Error al obtener ganado:', error);
    res.status(500).json({ error: 'Error al obtener ganado' });
  }
};

//----------------------- Crear nuevo registro de ganado -----------------------
export const createGanado = async (req, res) => {
  try {
    /* console.log("📥 Datos recibidos:", req.body); */
    const { id_finca, arete, especie, raza, sexo, fecha_nacimiento, peso_actual, estado_salud } = req.body;

    const [result] = await db.query ( 
      ` INSERT INTO ganado (id_finca, arete, especie, raza, sexo, fecha_nacimiento, peso_actual, estado_salud)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id_finca, arete, especie, raza, sexo, fecha_nacimiento, peso_actual, estado_salud]
    );

    console.log("✅ Insert exitoso:", result);
    res.status(201).json({ message: 'Ganado creado correctamente', id: result.insertId });

  }catch (error) {
    console.error("❌ Error en createGanado:", error);
    res.status(500).json({ message: 'Error al crear el ganado', error });
  }

};

//-----------------------  Editar registros de ganado (opcional) ---------------------------
export const updateGanado = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_finca, arete, especie, raza, sexo, fecha_nacimiento, peso_actual, estado_salud } = req.body;

    const [result] = await db.query(
      ` UPDATE ganado SET id_finca = ?, arete = ?, especie = ?, raza = ?, sexo = ?, fecha_nacimiento = ?, peso_actual = ?, estado_salud = ? WHERE id_ganado = ?`,
        [id_finca, arete, especie, raza, sexo, fecha_nacimiento, peso_actual, estado_salud, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '⚠️ Ganado no encontrado' });
    }

    res.status(200).json({ message: '✅ Ganado actualizado correctamente' });

  }catch (error) {
    console.error('❌ Error en updateGanado:', error);
    res.status(500).json({ message: 'Error al actualizar el ganado', error });
  }
};

//-----------------------  Eliminar registros de ganado (opcional) --------------------------------

export const deleteGanado = async (req, res) => {
  try{
    const { id } = req.params;

    const [result] = await db.query(
      ` DELETE FROM ganado WHERE id_ganado = ?`,
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '⚠️ Ganado no encontrado' });
    }

    res.status(200).json({ message: '✅ Ganado eliminado correctamente' });
  }catch (error) {
    console.error('❌ Error en deleteGanado:', error);
    res.status(500).json({ message: 'Error al eliminar el ganado', error });
  }
};
