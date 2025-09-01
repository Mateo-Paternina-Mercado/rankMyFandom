const { getDB } = require("../config/db");
const Moviecreate = require("../models/movie.model.js");

// Crear película
exports.createMovie = async (req, res, next) => {
  try {
    const db = getDB();
    const { titulo, descripcion, anio, tipo, categoria, img } = req.body;

    if (!titulo || !descripcion || !anio || !tipo || !categoria || !img) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Objeto película
    const newMovie = new Moviecreate(titulo, descripcion, anio, tipo, categoria, img);

    // Insertar en Mongo
    const result = await db.collection("movies").insertOne(newMovie);

    res.status(201).json({
      message: "Película creada con éxito",
      movie: { ...newMovie, _id: result.insertedId }
    });
  } catch (err) {
    next(err);
  }
};

// Obtener películas
exports.getMovies = async (req, res, next) => {
  try {
    const db = getDB();
    const movies = await db.collection("movies").find().toArray();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};
