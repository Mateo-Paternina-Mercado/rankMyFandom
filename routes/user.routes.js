const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const router = express.Router();

// Obtener todos los usuarios
router.get("/", async (req, res, next) => {
  try {
    const users = await getDB().collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Obtener un usuario por ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await getDB()
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Crear usuario
router.post("/", async (req, res, next) => {
  try {
    const { nombre, email, edad } = req.body;
    const result = await getDB().collection("users").insertOne({ nombre, email, edad });
    res.status(201).json({ _id: result.insertedId, nombre, email, edad });
  } catch (err) {
    next(err);
  }
});

// Actualizar usuario
router.put("/:id", async (req, res, next) => {
  try {
    const { nombre, email, edad } = req.body;
    const result = await getDB()
      .collection("users")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { nombre, email, edad } }
      );

    if (result.matchedCount === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (err) {
    next(err);
  }
});

// Eliminar usuario
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await getDB()
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
