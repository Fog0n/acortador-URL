import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import {pool} from './db.js';
import { redireccionarUrl } from "./controllers/urlController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); //Permite leer el JSON en el body de las peticiones

// Rutas
app.use("/api/urls", urlRoutes);

pool.query('SELECT NOW()', (err,res)=>{
    if(err){
        console.error('Error conectando a la base de datos');
    } else {
        console.log('Conexion verificada con la base de datos');
    }
});
app.get('/:hash_id', redireccionarUrl);


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});