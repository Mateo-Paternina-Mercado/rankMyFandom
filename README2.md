# 🎬 API de Gestión de Películas y Reseñas

Este proyecto es una API RESTful construida con **Node.js**, **Express** y **MongoDB** (sin Mongoose), diseñada para gestionar usuarios, películas, reseñas, categorías y rankings.

---

## 🚀 Características

- Autenticación de usuarios (registro, login, JWT)
- CRUD de usuarios
- CRUD de películas
- CRUD de reseñas
- CRUD de categorías
- Rankings dinámicos
- Conexión directa a MongoDB usando **mongodb driver**
- Manejo centralizado de errores
- Rate limiting (protección contra spam de requests)
- CORS habilitado para frontend configurable

---

## 📂 Estructura del Proyecto

```
project/
│── config/
│   └── db.js          # Conexión a MongoDB
│
│── middlewares/
│   ├── error.middleware.js
│   └── rateLimiter.js
│
│── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── movie.routes.js
│   ├── review.routes.js
│   ├── category.routes.js
│   └── ranking.routes.js
│
│── server.js          # Archivo principal
│── .env               # Variables de entorno
│── package.json
```

---

## ⚙️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Mateo-Paternina-Mercado/rankMyFandom_backend
   cd tu-repo
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con lo siguiente:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017
   DB_NAME=peliculasdb
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=supersecreto
   ```

4. Inicia el servidor:
   ```bash
   npm start
   ```

---

## 📌 Endpoints Disponibles

### 👤 Usuarios
- `GET /api/v1/users` → Lista de usuarios
- `POST /api/v1/auth/register` → Registrar usuario
- `POST /api/v1/auth/login` → Login de usuario

### 🎬 Películas
- `GET /api/v1/movies` → Listar películas
- `POST /api/v1/movies` → Crear película
- `PUT /api/v1/movies/:id` → Editar película
- `DELETE /api/v1/movies/:id` → Eliminar película

### 📝 Reseñas
- `GET /api/v1/reviews` → Listar reseñas
- `POST /api/v1/reviews` → Crear reseña
- `PUT /api/v1/reviews/:id` → Editar reseña
- `DELETE /api/v1/reviews/:id` → Eliminar reseña

### 📂 Categorías
- `GET /api/v1/categories` → Listar categorías
- `POST /api/v1/categories` → Crear categoría

### ⭐ Ranking
- `GET /api/v1/ranking` → Obtener ranking de películas

---

## 🛠️ Tecnologías Usadas

- Node.js
- Express.js
- MongoDB (Driver oficial)
- JSON Web Tokens (JWT)
- CORS
- Rate Limiter

---

## 📌 Uso con Insomnia

Ejemplos de pruebas:

1. **Registrar Usuario**
   ```json
   POST http://localhost:3000/api/v1/auth/register
   {
     "nombre": "Mateo",
     "email": "mateo@example.com",
     "password": "123456"
   }
   ```

2. **Login**
   ```json
   POST http://localhost:3000/api/v1/auth/login
   {
     "email": "mateo@example.com",
     "password": "123456"
   }
   ```

3. **Crear Película**
   ```json
   POST http://localhost:3000/api/v1/movies
   {
     "titulo": "Inception",
     "director": "Christopher Nolan",
     "año": 2010,
     "categoria": "Ciencia Ficción"
   }
   ```

---

## ✨ Autor

👨‍💻 Mateo Paternina Mercado 
🚀 Proyecto desarrollado en **Campuslands**
