const { getDB } = require("../config/db");
const Moviecreate = require("../models/movie.model.js");
const { ObjectId } = require("mongodb");

// Crear película
exports.createMovie = async (req, res, next) => {
  try {
    const db = getDB();
    const { titulo, descripcion, anio, tipo, categoria, img, banner } = req.body; // <-- Banner incluido

    if (!titulo || !descripcion || !anio || !tipo || !categoria || !img || !banner) {
      return res.status(400).json({ error: "Todos los campos obligatorios" });
    }

    const newMovie = new Moviecreate(
      titulo, descripcion, anio, tipo, categoria, img, banner, "pendiente"
    );

    const result = await db.collection("movies").insertOne(newMovie);

    res.status(201).json({
      message: "Película creada con éxito",
      movie: { ...newMovie, _id: result.insertedId }
    });
  } catch (err) {
    console.error("Error en createMovie:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener películas
exports.getMovies = async (req, res, next) => {
  try {
    const db = getDB();
    const movies = await db.collection("movies").find().toArray();

    const moviesWithUsernames = await Promise.all(movies.map(async (movie) => {
      let usersLiked = (movie.usersLiked || []).map(u => 
        typeof u === "string" ? { id: u, nombre: "Usuario Desconocido" } : u
      );
      let usersDisliked = (movie.usersDisliked || []).map(u => 
        typeof u === "string" ? { id: u, nombre: "Usuario Desconocido" } : u
      );

      usersLiked = await Promise.all(usersLiked.map(u => safeGetUsername(db, u)));
      usersDisliked = await Promise.all(usersDisliked.map(u => safeGetUsername(db, u)));

      return { ...movie, usersLiked, usersDisliked };
    }));

    res.json(moviesWithUsernames);
  } catch (err) {
    console.error("Error en getMovies:", err);
    res.status(500).json({ message: "Error al obtener películas" });
  }
};

// Actualizar estado de película
exports.updateMovieStatus = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) return res.status(400).json({ message: "Debes enviar un estado" });

    const result = await db.collection("movies").updateOne(
      { _id: new ObjectId(id) },
      { $set: { estado } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: "Película no encontrada" });

    res.json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};

// Función para obtener nombre de usuario seguro
const safeGetUsername = async (db, u) => {
  try {
    const uId = u.id || u; 
    if (!ObjectId.isValid(uId)) return { id: uId, nombre: u.nombre || "Usuario Desconocido" };

    const user = await db.collection("users").findOne({ _id: new ObjectId(uId) });
    return { id: uId, nombre: user ? user.username : u.nombre || "Usuario Eliminado" };
  } catch {
    return { id: u.id || u, nombre: "Usuario Desconocido" };
  }
};

// Dar like o dislike
exports.voteMovie = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { userId, username, action } = req.body;

    if (!["like", "dislike"].includes(action)) {
      return res.status(400).json({ message: "Acción inválida" });
    }

    const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
    if (!movie) return res.status(404).json({ message: "Película no encontrada" });

    let usersLiked = movie.usersLiked || [];
    let usersDisliked = movie.usersDisliked || [];

    usersLiked = usersLiked.map(u => typeof u === "string" ? { id: u, nombre: "Usuario Desconocido" } : u);
    usersDisliked = usersDisliked.map(u => typeof u === "string" ? { id: u, nombre: "Usuario Desconocido" } : u);

    if (action === "like") {
      usersDisliked = usersDisliked.filter(u => u.id !== userId);
      if (usersLiked.some(u => u.id === userId)) {
        usersLiked = usersLiked.filter(u => u.id !== userId);
      } else {
        usersLiked.push({ id: userId, nombre: username });
      }
    } else {
      usersLiked = usersLiked.filter(u => u.id !== userId);
      if (usersDisliked.some(u => u.id === userId)) {
        usersDisliked = usersDisliked.filter(u => u.id !== userId);
      } else {
        usersDisliked.push({ id: userId, nombre: username });
      }
    }

    const likes = usersLiked.length;
    const dislikes = usersDisliked.length;

    await db.collection("movies").updateOne(
      { _id: new ObjectId(id) },
      { $set: { usersLiked, usersDisliked, likes, dislikes } }
    );

    res.json({ likes, dislikes, usersLiked, usersDisliked });
  } catch (err) {
    console.error("Error en voteMovie:", err);
    res.status(500).json({ message: "Error al votar" });
  }
};

// Obtener película por ID
exports.getMovieById = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de película inválido" });
    }

    const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
    if (!movie) return res.status(404).json({ message: "Película no encontrada" });

    let usersLiked = (movie.usersLiked || []).map(u => typeof u === "string" ? { id: u, nombre: "Usuario Desconocido" } : u);
    let usersDisliked = (movie.usersDisliked || []).map(u => typeof u === "string" ? { id: u, nombre: "Usuario Desconocido" } : u);

    usersLiked = await Promise.all(usersLiked.map(u => safeGetUsername(db, u)));
    usersDisliked = await Promise.all(usersDisliked.map(u => safeGetUsername(db, u)));

    res.json({ ...movie, usersLiked, usersDisliked });
  } catch (err) {
    console.error("Error en getMovieById:", err);
    res.status(500).json({ message: "Error al obtener la película" });
  }
};







