import pg from 'pg';
import dotenv from 'dotenv';

// Carga el .env para que DATABASE_URL esté disponible aquí y en cualquier otro módulo
dotenv.config();

const { Pool } = pg;

// La cadena de conexión se lee desde la variable de entorno DATABASE_URL (.env)
if (!process.env.DATABASE_URL) {
  throw new Error(
    'Falta la variable de entorno DATABASE_URL. Copia el archivo .env.example a .env y complétalo.'
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('🐘 Conexión exitosa a PostgreSQL (configurada vía .env)');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en PostgreSQL:', err.message);
});
