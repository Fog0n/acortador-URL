import {nanoid} from 'nanoid';

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
        const nuevaUrl = {
            hash_id,
            url_original,
            url_corta,
            fecha_creacion: new Date()
        };

        //Respondemos al frontend con los datos creados
        res.status(201).json(nuevaUrl);
    } catch (error) {
        console.error('Error al acortar la URL:', error);  
        res.status(500).json({error: 'Error al acortar la URL'});
    }
};