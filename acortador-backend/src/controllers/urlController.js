import {nanoid} from 'nanoid';
import { pool } from '../db.js';

export const createUrlCorta= async (req, res )=>{
    try{
        const {url_original} = req.body;

        if (!url_original) {
            return res.status(400).json({error: 'La URL original es requerida'});
        }

        // Generar un identificador único de 6 caracteres
        const hash_id = nanoid(6);
        const url_corta =`http://localhost:3000/${hash_id}`;
        
        //Aqui: mas adelante insertaremos esto en la base de datos SQL
        const consulta=`
            INSERT INTO urls (hash_id, url_original, url_corta)
            VALUES ($1, $2, $3)
            RETURNING *;
        `
        const valores=[hash_id, url_original, url_corta];
        const resultado = await pool.query(consulta, valores);

        //Respondemos al frontend con los datos creados
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al acortar la URL:', error);  
        res.status(500).json({error: 'Error al acortar la URL'});
    }
};

//Nueva funcion: Busca el hash en la DB y redirige a la URL original
export const redireccionarUrl = async (req, res) =>{
    try{
        const {hash_id} = req.params;

        const consulta = `SELECT url_original FROM urls WHERE hash_id = $1;`;
        const resultado = await pool.query(consulta, [hash_id]);

        if (resultado.rows.length === 0){
            return res.status(404).send('<h1>URL no encotrada</h1>');
        }

        const urlOriginal = resultado.rows[0].url_original;

        //Magia: catapultamos el usuario a la URL real
        res.redirect(urlOriginal);
    } catch (error){
         console.error('Error en la redireccion:', error);
         res.status(500).send('Error del servidor');
    }
};