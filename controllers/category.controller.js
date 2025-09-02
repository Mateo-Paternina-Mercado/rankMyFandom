const { getDB } = require("../config/db");
const categorias = require("../models/category.model.js");

// Crear categoría
exports.createCategory = async (req, res, next) => {
  try {
    const db = getDB();
    const { titulo, descripcion, fecha } = req.body;

    if (!titulo || !descripcion || !fecha) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Objeto categoría
    const newCategory = new categorias(titulo, descripcion, fecha);


    // Insertar en Mongo
    const result = await db.collection("categories").insertOne(newCategory);

    res.status(201).json({
      message: "Categoría creada con éxito",
      category: { ...newCategory, _id: result.insertedId }
    });
  } catch (err) {
    next(err);
  }
};


// Obtener categorias
exports.getCategories = async (req, res, next) => {
  try {
    const db = getDB();
    const categories = await db.collection("categories").find().toArray();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

