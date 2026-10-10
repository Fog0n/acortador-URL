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
│   └── src/
│       ├── index.js            # Entrada del servidor y rutas de redirección
│       ├── db.js               # Pool de conexión a PostgreSQL
│       ├── controllers/
│       │   └── urlController.js# Lógica: crear, redirigir, historial, métricas
│       └── routes/
│           └── urlRoutes.js    # Rutas /api/urls
└── acortador-front/            # SPA (React + TypeScript + Vite)
    └── src/
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

> ⚠️ La cadena de conexión está definida directamente en `acortador-backend/src/db.js`
> (`postgresql://postgres:TU_CONTRASEÑA@localhost:5432/acortador_db`). Reemplaza la contraseña
> por la de tu instalación local de PostgreSQL.

### 2. Backend

```bash
cd acortador-backend
npm install
npm run dev        # Inicia con nodemon en http://localhost:3000
```

### 3. Frontend

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

- El frontend consume la API en `http://localhost:3000`; CORS está habilitado en el backend.
- `.env` del backend contiene `PORT` y `DATABASE_URL` (actualmente la conexión usa la URL fija en `db.js`).
