import pg from 'pg';

const { Pool } = pg;

// Ponemos la URL directamente aquí. 
// Reemplaza TU_CONTRASEÑA con tu contraseña real de PostgreSQL
const miUrl = 'postgresql://postgres:DBhostlenovo@localhost:5432/acortador_db';

export const pool = new Pool({
  connectionString: miUrl,
});

pool.on('connect', () => {
  console.log('🐘 Conexión exitosa a PostgreSQL usando URL directa');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en PostgreSQL:', err.message);
});