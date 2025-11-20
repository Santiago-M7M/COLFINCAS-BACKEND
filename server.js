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
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import rgFotograficoRoutes from './routes/rgFotograficoRoutes.js';
import path from "path";



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
app.use('/api/auth', authRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/registro-fotografico', rgFotograficoRoutes);
/* app.use("/uploads", express.static("uploads")); */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
