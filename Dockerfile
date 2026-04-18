# ──────────────────────────────────────────────────────────────────────────────
# Dockerfile
# Imagen de producción para la aplicación Node.js/Express DevOps CI/CD
# ──────────────────────────────────────────────────────────────────────────────

# ── Etapa base ────────────────────────────────────────────────────────────────
# Usar la imagen oficial de Node.js 18 en su variante slim (más ligera)
FROM node:18-slim

# ── Metadatos ─────────────────────────────────────────────────────────────────
LABEL maintainer="DevOps CI/CD Project"
LABEL version="1.0.0"
LABEL description="Aplicación Express Node.js con pipeline CI/CD"

# ── Directorio de trabajo ─────────────────────────────────────────────────────
# Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# ── Dependencias ──────────────────────────────────────────────────────────────
# Copiar primero solo los archivos de dependencias para aprovechar la caché de Docker.
# Si package.json no cambia, Docker reutiliza esta capa en builds posteriores.
COPY package*.json ./

# Instalar únicamente dependencias de producción
RUN npm install --omit=dev

# ── Código fuente ─────────────────────────────────────────────────────────────
# Copiar el resto del código fuente al contenedor
COPY . .

# ── Puerto ────────────────────────────────────────────────────────────────────
# Documentar el puerto que expone la aplicación (no lo publica por sí solo)
EXPOSE 3000

# ── Variables de entorno ──────────────────────────────────────────────────────
ENV NODE_ENV=production
ENV PORT=3000

# ── Comando de inicio ─────────────────────────────────────────────────────────
# Ejecutar la aplicación usando npm start (definido en package.json)
CMD ["npm", "start"]
