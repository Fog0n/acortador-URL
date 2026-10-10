# 🔗 Acortador de URLs

Aplicación web full-stack para acortar URLs con métricas de clics e historial de enlaces. Consta de un backend en **Node.js/Express** conectado a **PostgreSQL** y un frontend en **React + TypeScript** construido con **Vite** y estilizado con **Bootstrap**.

## ✨ Funcionalidades

- ✂️ **Acortar URLs**: genera un enlace corto único (identificador `nanoid` de 6 caracteres).
- ↪️ **Redirección automática**: al visitar la URL corta se incrementa el contador de clics y se redirige a la URL original.
- 📊 **Panel de métricas**: total de URLs creadas y total de clics acumulados.
- 📋 **Historial de URLs**: últimas 10 URLs acortadas con su número de clics.

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| Frontend | React 19, TypeScript, Vite, Bootstrap / react-bootstrap, bootstrap-icons |
| Backend | Node.js, Express 5, nanoid, cors, dotenv, pg (node-postgres) |
| Base de datos | PostgreSQL |

## 📁 Estructura del Proyecto

```
.
├── acortador-backend/          # API REST (Express + PostgreSQL)
│   ├── .env                    # Variables reales (NO se sube a Git)
│   ├── .env.example            # Plantilla de variables de entorno
│   └── src/
│       ├── index.js            # Entrada del servidor y rutas de redirección
│       ├── db.js               # Pool de conexión a PostgreSQL (usa DATABASE_URL)
│       ├── controllers/
│       │   └── urlController.js# Lógica: crear, redirigir, historial, métricas
│       └── routes/
│           └── urlRoutes.js    # Rutas /api/urls
└── acortador-front/            # SPA (React + TypeScript + Vite)
    ├── .env                    # Variables reales (NO se sube a Git)
    ├── .env.example            # Plantilla de variables de entorno
    └── src/
        ├── config.ts           # Lee import.meta.env.VITE_API_URL
        ├── App.tsx             # Layout principal
        ├── componentes/
        │   ├── FormularioUrl.tsx   # Formulario para acortar URLs
        │   ├── PanelMetricas.tsx   # Métricas globales
        │   └── HistorialUrls.tsx   # Historial de URLs cortas
        └── types/
            └── index.ts        # Tipos (MetricasURL, DetalleClic)
```

## 🚀 Instalación y Ejecución

### Requisitos

- Node.js 18 o superior
- PostgreSQL instalado y corriendo localmente

### 1. Base de datos

Crear la base de datos y la tabla `urls`:

```sql
CREATE DATABASE acortador_db;

\c acortador_db

CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    hash_id VARCHAR(20) UNIQUE NOT NULL,
    url_original TEXT NOT NULL,
    url_corta TEXT NOT NULL,
    clicks INTEGER NOT NULL DEFAULT 0,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW()
);
```

> ⚠️ La cadena de conexión ya **no** está hardcodeada: se lee desde el archivo
> `acortador-backend/.env` (variable `DATABASE_URL`).

### 2. Variables de entorno (.env)

Cada proyecto incluye un `.env.example`. Copíalo a `.env` y ajusta los valores:

```bash
cp acortador-backend/.env.example acortador-backend/.env
cp acortador-front/.env.example acortador-front/.env
```

| Proyecto  | Variable        | Descripción                                                        | Ejemplo                                   |
|-----------|-----------------|--------------------------------------------------------------------|-------------------------------------------|
| backend   | `PORT`          | Puerto del servidor Express                                        | `3000`                                    |
| backend   | `BASE_URL`      | URL base pública usada para generar las URLs cortas                | `http://localhost:3000`                   |
| backend   | `DATABASE_URL`  | Cadena de conexión PostgreSQL                                      | `postgresql://postgres:TU_CONTRASENA@localhost:5432/acortador_db` |
| backend   | `CORS_ORIGIN`   | Origen permitido por CORS (dirección del frontend)                 | `http://localhost:5173`                   |
| frontend  | `VITE_API_URL`  | URL del backend; en Vite debe llevar el prefijo `VITE_`            | `http://localhost:3000`                   |

Los archivos `.env` están en `.gitignore` (solo se versiona `.env.example`), por lo que
las credenciales nunca se suben al repositorio. Si falta `DATABASE_URL`, el backend falla
al arrancar con un mensaje claro indicando que copies `.env.example` a `.env`.

### 3. Backend

```bash
cd acortador-backend
npm install
npm run dev        # Inicia con nodemon en http://localhost:3000
```

### 4. Frontend

```bash
cd acortador-front
npm install
npm run dev        # Inicia Vite (por defecto http://localhost:5173)
```

## 🔌 API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/urls/acortar` | Crea una URL corta. Body JSON: `{ "url_original": "https://..." }` |
| `GET` | `/api/urls` | Historial de URLs (últimas 10, ordenadas por fecha) |
| `GET` | `/api/urls/metricas` | Métricas globales: `{ totalUrls, totalClicks }` |
| `GET` | `/:hash_id` | Redirige a la URL original e incrementa el contador de clics |

### Ejemplo

```bash
curl -X POST http://localhost:3000/api/urls/acortar \
  -H "Content-Type: application/json" \
  -d '{"url_original": "https://www.ejemplo.com/pagina-muy-larga"}'
```

Respuesta `201 Created`:

```json
{
  "id": 1,
  "hash_id": "Ab3xYz",
  "url_original": "https://www.ejemplo.com/pagina-muy-larga",
  "url_corta": "http://localhost:3000/Ab3xYz",
  "clicks": 0,
  "fecha_creacion": "2026-10-10T12:00:00.000Z"
}
```

## 🧪 Scripts

**Backend (`acortador-backend`)**
- `npm run dev` — servidor con recarga automática (nodemon)

**Frontend (`acortador-front`)**
- `npm run dev` — entorno de desarrollo (Vite)
- `npm run build` — compilación de producción (tsc + vite build)
- `npm run lint` — análisis estático (oxlint)
- `npm run preview` — previsualizar la build

## 📝 Notas

- Toda la configuración vive en los archivos `.env` de cada proyecto (`acortador-backend/.env` y `acortador-front/.env`); ninguno se sube a Git.
- El frontend obtiene la URL del backend desde `VITE_API_URL` a través de `src/config.ts`; no hay direcciones hardcodeadas en los componentes.
- El backend valida `PORT`, `BASE_URL`, `DATABASE_URL` y `CORS_ORIGIN` desde `.env` mediante `dotenv`.
