// server.js
// Punto de entrada de la aplicación.
// Importa la app de app.js e inicia el servidor HTTP.
// Se mantiene separado de app.js para poder testear app.js sin levantar un servidor real.

const app = require('./app');

// Puerto configurable mediante variable de entorno (recomendado para producción)
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅  Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋  Entorno: ${process.env.NODE_ENV || 'development'}`);
});
