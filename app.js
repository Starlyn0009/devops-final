// app.js
// Módulo principal de la aplicación Express.
// Se separa de server.js para facilitar las pruebas unitarias con Supertest.

const express = require('express');

// Crear una instancia de la aplicación Express
const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// Parsear cuerpos de solicitudes JSON
app.use(express.json());

// ─── Rutas ────────────────────────────────────────────────────────────────────

/**
 * GET /
 * Ruta principal que devuelve un mensaje de bienvenida.
 * Esta es la ruta que valida el pipeline CI/CD.
 */
app.get('/', (req, res) => {
  res.status(200).send('Hola Mundo DevOps 🚀');
});

/**
 * GET /health
 * Ruta de salud para verificar que el servicio está activo.
 * Útil para health-checks en Render, Docker y Kubernetes.
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Exportar la app para que pueda ser usada en server.js y en los tests
module.exports = app;
