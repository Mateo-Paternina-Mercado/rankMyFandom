const { getDB } = require("../config/db");
const User = require("../models/user.model");
const { ObjectId } = require("mongodb");

// Obtener todos los usuarios
exports.getUsers = async (req, res, next) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res, next) => {
  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Crear usuario
exports.createUser = async (req, res, next) => {
  try {
    const db = getDB();
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newUser = User({ username, email, password, role });
    const result = await db.collection("users").insertOne(newUser);

    res.status(201).json({ message: "Usuario creado con éxito", user: { ...newUser, _id: result.insertedId } });
  } catch (err) {
    next(err);
  }
};

// Actualizar usuario
exports.updateUser = async (req, res, next) => {
  try {
    const db = getDB();
    const { username, email, password, role } = req.body;

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { username, email, password, role } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};