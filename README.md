# KarenFlix - Backend

# Descripción del proyecto
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

- url base http://localhost:3000

---

### 1️⃣ `/api/v1/auth`

**Registro (POST)**
URL: `http://localhost:3000/api/v1/auth/register`
Body (JSON):

```json
{
  "username": "Betty",
  "email": "betty@gmail.com",
  "password": "12345678"
}
```

**Login (POST)**
URL: `http://localhost:3000/api/v1/auth/login`
Body (JSON):

```json
{
  "email": "betty@gmail.com",
  "password": "12345678"
}
```

**Respuesta esperada (login)**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "68b668c7abc0313a6376ae69",
    "username": "Betty",
    "email": "betty@gmail.com",
    "role": "user"
  }
}
```

---

### 2️⃣ `/api/v1/users`

**Obtener todos los usuarios (GET)**
URL: `http://localhost:3000/api/v1/users`
Headers:
`Authorization: Bearer <TOKEN_DEL_LOGIN>`

**Respuesta ejemplo**:

```json
[
  {
    "_id": "68b668c7abc0313a6376ae69",
    "username": "Betty",
    "email": "betty@gmail.com",
    "role": "user",
    "createdAt": "2025-09-02T03:47:19.334+00:00"
  }
]
```

---

### 3️⃣ `/api/v1/movies`

**Crear película (POST)**
URL: `http://localhost:3000/api/v1/movies`

```json
{
  "titulo": "betty la fea",
  "descripcion": "la fea mas fea",
  "anio": "2025-09-23",
  "tipo": "Serie",
  "categoria": "Comedia",
  "img": "https://www.ecartelera.com/carteles-series/300/391/001_p.jpg",
  "banner": "https://www.dondeir.com/wp-content/uploads/2022/07/betty-fea-banner-1.jpg",
  "estado": "aceptada"
}
```

**Obtener películas (GET)**
URL: `http://localhost:3000/api/v1/movies`

**Respuesta ejemplo**:

```json
[
  {
    "_id": "68b6723440cc0ef50ea36fc1",
    "titulo": "betty la fea",
    "descripcion": "la fea mas fea",
    "anio": "2025-09-23",
    "tipo": "Serie",
    "categoria": "Comedia",
    "img": "https://www.ecartelera.com/carteles-series/300/391/001_p.jpg",
    "banner": "https://www.dondeir.com/wp-content/uploads/2022/07/betty-fea-banner-1.jpg",
    "estado": "aceptada",
    "likes": 1,
    "dislikes": 0,
    "comentarios": 0,
    "usersLiked": [{"id":"68b668c7abc0313a6376ae69","nombre":"Betty"}],
    "usersDisliked": []
  }
]
```

---

### 4️⃣ `/api/v1/reviews`

**Crear reseña (POST)**
URL: `http://localhost:3000/api/v1/reviews`
Headers:
`Authorization: Bearer <TOKEN_DEL_LOGIN>`
Body (JSON):

```json
{
  "movieId": "68b65a7e4d7626939386420e",
  "comment": "askdhasljdklasjdklas",
  "rating": 8
}
```

**Obtener reseñas (GET)**
URL: `http://localhost:3000/api/v1/reviews?movieId=68b65a7e4d7626939386420e`

**Respuesta ejemplo**:

```json
[
  {
    "_id": "68b66b6540cc0ef50ea36fbe",
    "userId": "68b668c7abc0313a6376ae69",
    "username": "Betty",
    "movieId": "68b65a7e4d7626939386420e",
    "comment": "askdhasljdklasjdklas",
    "rating": 8,
    "likes": [],
    "createdAt": "2025-09-02T03:58:29.042+00:00"
  }
]
```

---

### 5️⃣ `/api/v1/categories`

**Crear categoría (POST)**
URL: `http://localhost:3000/api/v1/categories`
Headers:
`Authorization: Bearer <TOKEN_DEL_ADMIN>`
Body (JSON):

```json
{
  "titulo": "Comedia",
  "descripcion": "se rien todos xd",
  "fecha": "2025-09-01"
}
```

**Obtener categorías (GET)**
URL: `http://localhost:3000/api/v1/categories`

**Respuesta ejemplo**:

```json
[
  {
    "_id": "68b62566d987d48c10442977",
    "titulo": "Comedia",
    "descripcion": "se rien todos xd",
    "fecha": "2025-09-01"
  }
]
```

---

💡 Tip: Para todos los POST/PUT que requieran autenticación, asegúrate de enviar en **Headers**:

```
Authorization: Bearer <TOKEN>
```

---

Si quieres, Manuel, puedo hacerte un **archivo JSON listo para importar en Postman** con **todos estos endpoints configurados**, para que solo le des click y los pruebes sin escribir nada.

¿Quieres que haga eso?


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

* **Desarrolladores:** \[Manuel], \[Mateo]
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
