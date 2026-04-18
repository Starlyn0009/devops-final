# 🚀 DevOps CI/CD — Node.js + Express + Docker + GitHub Actions

Proyecto de demostración de un pipeline CI/CD completo con Node.js, pruebas automatizadas con Jest/Supertest, contenerización con Docker y despliegue automático a Docker Hub mediante GitHub Actions.

---

## 📁 Estructura del proyecto

```
.
├── app.js                        # Módulo Express (rutas y middleware)
├── server.js                     # Punto de entrada — levanta el servidor HTTP
├── package.json                  # Dependencias y scripts npm
├── Dockerfile                    # Imagen de producción
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # Pipeline CI/CD de GitHub Actions
└── test/
    └── app.test.js               # Pruebas Jest + Supertest
```

---

## ⚙️ Requisitos previos

| Herramienta | Versión mínima |
|-------------|---------------|
| Node.js     | 18.x          |
| npm         | 9.x           |
| Docker      | 24.x          |
| Git         | 2.x           |

---

## 🖥️ Cómo ejecutar el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/<tu-usuario>/<tu-repo>.git
cd <tu-repo>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor

```bash
npm start
```

La aplicación estará disponible en → **http://localhost:3000**

Respuestas disponibles:

| Ruta      | Respuesta                      |
|-----------|-------------------------------|
| `GET /`   | `Hola Mundo DevOps 🚀`        |
| `GET /health` | JSON `{ status: "ok", ... }` |

### 4. Ejecutar las pruebas

```bash
npm test
```

Verás algo como:

```
 PASS  test/app.test.js
  GET /
    ✓ debe responder con status 200
    ✓ debe responder con "Hola Mundo DevOps 🚀"
    ✓ debe responder con Content-Type text/html
  GET /health
    ✓ debe responder con status 200
    ✓ debe devolver JSON con status "ok"
```

---

## 🐳 Ejecutar con Docker localmente

### Construir la imagen

```bash
docker build -t devops-cicd-app:latest .
```

### Correr el contenedor

```bash
docker run -p 3000:3000 devops-cicd-app:latest
```

Acceder en → **http://localhost:3000**

### Detener el contenedor

```bash
docker ps                          # ver el ID del contenedor
docker stop <CONTAINER_ID>
```

---

## 🔄 Pipeline CI/CD (GitHub Actions)

El archivo `.github/workflows/ci-cd.yml` ejecuta automáticamente los siguientes pasos cada vez que se hace **push a la rama `main`**:

```
Push a main
    │
    ▼
1. 📥  Checkout del repositorio
2. 🟢  Configurar Node.js 18
3. 📦  npm ci (instalar dependencias)
4. 🧪  npm test (Jest + Supertest)
5. 🐳  docker build (construir imagen)
6. 🔐  Login a Docker Hub (con secrets)
7. 🚀  docker push (subir imagen a Docker Hub)
```

> En Pull Requests, los pasos 6 y 7 se omiten por seguridad.

---

## 🔑 Configurar GitHub Secrets

Para que el pipeline pueda subir la imagen a Docker Hub, debes agregar estos **Secrets** en tu repositorio de GitHub:

1. Ve a tu repositorio → **Settings** → **Secrets and variables** → **Actions**
2. Haz clic en **New repository secret** y agrega:

| Secret            | Valor                          |
|-------------------|-------------------------------|
| `DOCKER_USERNAME` | Tu usuario de Docker Hub       |
| `DOCKER_PASSWORD` | Tu contraseña o Access Token   |

> ⚠️ **Recomendación de seguridad**: Usa un **Access Token** de Docker Hub en lugar de tu contraseña. Ve a [hub.docker.com](https://hub.docker.com) → Account Settings → Security → New Access Token.

---

## ☁️ Deploy en Render

Render puede desplegar directamente desde Docker Hub o desde el repositorio de GitHub.

### Opción A — Deploy desde Docker Hub (recomendado)

1. Ve a [render.com](https://render.com) y crea una cuenta.
2. Haz clic en **New** → **Web Service**.
3. Selecciona **Deploy an existing image from a registry**.
4. En **Image URL** ingresa:
   ```
   docker.io/<tu-usuario>/devops-cicd-app:latest
   ```
5. Configura:
   - **Name**: `devops-cicd-app`
   - **Region**: la más cercana a ti
   - **Instance Type**: Free
   - **Port**: `3000`
6. Haz clic en **Create Web Service**.

Render desplegará automáticamente cada vez que hagas un nuevo push (requiere configurar el webhook de Render en el pipeline).

### Opción B — Deploy desde GitHub

1. En Render → **New** → **Web Service**.
2. Conecta tu cuenta de GitHub y selecciona el repositorio.
3. Configura:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Port**: `3000`
4. Haz clic en **Create Web Service**.

---

## 📄 Licencia

MIT © 2024
