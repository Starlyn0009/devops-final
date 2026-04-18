// test/app.test.js
// Pruebas unitarias e integración usando Jest + Supertest.
// Supertest levanta la app internamente sin necesidad de un puerto real,
// lo que permite correr las pruebas en cualquier entorno CI/CD.

const request = require('supertest');
const app = require('../app'); // Importamos solo la app, NO server.js

// ─── Suite de pruebas: Ruta GET "/" ──────────────────────────────────────────
describe('GET /', () => {
  /**
   * Prueba 1: Verificar código de estado HTTP 200
   * El servidor debe responder exitosamente a la ruta raíz.
   */
  test('debe responder con status 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  /**
   * Prueba 2: Verificar el contenido exacto de la respuesta
   * El cuerpo de la respuesta debe coincidir con el mensaje esperado.
   */
  test('debe responder con "Hola Mundo DevOps 🚀"', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hola Mundo DevOps 🚀');
  });

  /**
   * Prueba 3: Verificar el tipo de contenido de la respuesta
   * La respuesta debe ser de tipo texto plano.
   */
  test('debe responder con Content-Type text/html', async () => {
    const response = await request(app).get('/');
    expect(response.headers['content-type']).toMatch(/text\/html/);
  });
});

// ─── Suite de pruebas: Ruta GET "/health" ────────────────────────────────────
describe('GET /health', () => {
  /**
   * Prueba 4: El health-check debe responder con status 200
   */
  test('debe responder con status 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  /**
   * Prueba 5: El health-check debe devolver un JSON con status "ok"
   */
  test('debe devolver JSON con status "ok"', async () => {
    const response = await request(app).get('/health');
    expect(response.body.status).toBe('ok');
  });
});
