Claro, Manuel 😎. Aquí tienes un **README.md** completo y profesional para tu proyecto **KarenFlix**, adaptado a lo que me pediste:

````markdown
# KarenFlix - Backend

## Descripción del proyecto
KarenFlix es una aplicación full-stack desarrollada con **Node.js + Express** para el backend y **HTML + CSS + JavaScript puro** para el frontend. Permite a los usuarios registrar, calificar y rankear películas, animes y series geek, gestionando usuarios, reseñas, categorías y rankings, con roles diferenciados entre usuarios y administradores.  

La aplicación incluye:
- Autenticación segura mediante JWT.
- Validaciones robustas en todas las rutas.
- Gestión de películas, series, categorías y reseñas.
- Ranking de películas basado en calificaciones, likes/dislikes y comentarios.
- Frontend independiente que consume la API del backend.

---

## Tecnologías utilizadas
- **Backend:** Node.js, Express, MongoDB (driver oficial), dotenv, passport-jwt, jsonwebtoken, bcrypt, express-validator, express-rate-limit, swagger-ui-express, semver.
- **Frontend:** HTML, CSS, JavaScript puro.
- **Gestión de versiones:** GitHub.
- **Planeación de proyecto:** SCRUM, Trello/GitHub Projects (roles, sprints e historias de usuario).

---

## Instalación y uso

1. **Clonar repositorio:**
```bash
git clone https://github.com/Mateo-Paternina-Mercado/rankMyFandom_backend.git
````

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno** (.env):

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017
DB_NAME=peliculasdb
FRONTEND_URL=http://localhost:5173
JWT_SECRET=supersecreto
```

4. **Iniciar servidor en modo desarrollo:**

```bash
npm start
```

5. **Endpoints disponibles:**

* `/api/v1/auth` → Registro, login y autenticación.
* `/api/v1/users` → Gestión de usuarios.
* `/api/v1/movies` → CRUD de películas y series.
* `/api/v1/reviews` → CRUD de reseñas.
* `/api/v1/categories` → CRUD de categorías.
* `/api/v1/ranking` → Rankings de películas/series. (no disponible aun)

---

## Estructura del proyecto

```
/karenflix-backend
├─ /config         # Configuración de la base de datos y entorno
├─ /controllers    # Lógica de negocio por recurso
├─ /middlewares    # Middlewares (autenticación, errores, rate-limiter)
├─ /models         # Modelos de MongoDB
├─ /routes         # Definición de rutas de la API
├─ /services       # Funciones auxiliares y servicios externos
├─ /utils          # Utilidades generales
├─ /validators     # validaciones
├─ server.js       # Archivo principal
└─ README.md
```

---

## Principios aplicados

* **Arquitectura modular y escalable.**
* **Validaciones robustas** con express-validator.
* **Autenticación y autorización** con JWT.
* **Operaciones transaccionales** en MongoDB.
* **Documentación de API** con Swagger.
* **Rate limiting** para prevenir abusos.
* **Manejo centralizado de errores**.

---

## Consideraciones técnicas

* Se usa **MongoDB nativo**, sin Mongoose.
* El backend está diseñado para ser consumido por un frontend independiente.
* Roles diferenciados: `usuario` y `administrador`.
* Cada endpoint devuelve códigos HTTP correctos según la operación.
* Uso de variables de entorno para credenciales y configuraciones sensibles.

---

## Créditos

* **Desarrolladores:** \[Manuel], \[Mateo], \[Nombre 3]
* **Diseño Frontend:** Inspiración en interfaces modernas de ranking de películas.

---

## Link al frontend

[Repositorio Frontend rank my fandom](https://github.com/07Manu03M/rankMyFandom.git)

---

## Planeación SCRUM

* Documento PDF incluido en el repositorio: `https://drive.google.com/drive/folders/1LuciJVIX3DVWhyfSDMjpC8QhBAJhuOxJ?usp=sharing`

---

## Video demostrativo

Se incluye un enlace al video de entrega, mostrando:

* Explicación técnica del backend.
* Ejemplos de código.
* Demo funcional completa del frontend.
* Todos los integrantes presentes.

[Ver video de demostración](https://drive.google.com/drive/folders/194K9_hvwAl1fU2hHdeUI6siNqt6ev9eY?usp=sharing)

---

## Licencia

hecho por Mateo y Manuel :D


