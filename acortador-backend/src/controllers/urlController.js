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
        const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
        const url_corta = `${baseUrl}/${hash_id}`;
        
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

        const resultado = await pool.query(
            'UPDATE urls SET clicks = clicks + 1 WHERE hash_id = $1 RETURNING url_original',
            [hash_id]
        )

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

//Funcion para obtener el historial de urls
export const obtenerUrls = async (req, res)=>{
    try{
        const resultado= await pool.query(
            'SELECT * FROM urls ORDER BY fecha_creacion DESC LIMIT 10'
        );
        res.json(resultado.rows);
    } catch (error){
        console.error('Error al obtener el historial:',error);
        res.status(500).json({error: 'Error interno del servidor'});      
    }
};

//Funcion para obtener las metricas globales
export const obtenerMetricas = async (req, res)=>{
    try{
        //Consultamos el total de URLs y la suma total de clics
        const resultado = await pool.query(
            'SELECT COUNT(*) AS total_urls, COALESCE(SUM(clicks),0) AS total_clicks FROM urls'
        );

        const metricas = resultado.rows[0];

        res.json({
            totalUrls: parseInt(metricas.total_Urls) || 0,
            totalClicks: parseInt(metricas.total_Clicks) ||0,
        });
    } catch (error){
        console.error('Error al obtener las metricas:',error);
        res.status(500).json({ error: 'Error interno del servidor'});
    }

};