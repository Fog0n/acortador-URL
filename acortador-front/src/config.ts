// Variables de entorno expuestas por Vite (definidas en el archivo .env de acortador-front)
// Solo las variables con prefijo VITE_ son accesibles desde el código del cliente.
const rawApiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

// Quitamos la barra final si existe, para poder concatenar rutas de forma segura
export const API_URL = rawApiUrl.replace(/\/+$/, '');

// Endpoint base de la API del acortador (ej: http://localhost:3000/api/urls)
export const API_ENDPOINTS = `${API_URL}/api/urls`;

// Función auxiliar para construir la URL corta pública de un hash
export const getUrlCorta = (hashId: string): string => `${API_URL}/${hashId}`;
