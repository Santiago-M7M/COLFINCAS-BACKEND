import express  from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import fincaRoutes from './routes/fincaRoutes.js';
import ganadoRoutes from './routes/ganadoRoutes.js';
import cultivoRoutes from './routes/cultivoRoutes.js';
import maquinariaRoutes from './routes/maquinariaRoutes.js';
import personalRoutes from './routes/personalRoutes.js';
import usurRoutes from './routes/usurRoutes.js';
import fincaDetalleRoutes from './routes/fincaDetalleRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/finca', fincaRoutes);
app.use('/api/ganado', ganadoRoutes);
app.use('/api/cultivo', cultivoRoutes);
app.use('/api/maquinaria', maquinariaRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/usuarios', usurRoutes);
app.use('/api/finca-detalle', fincaDetalleRoutes);

app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
