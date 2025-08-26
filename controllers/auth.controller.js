const { getDB } = require("../config/db");
const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res, next) => {
  try {
    const db = getDB();
    const { username, email, password } = req.body;

    const exists = await db.collection("users").findOne({ email });
    if (exists) return res.status(400).json({ error: "El correo ya existe" });

    const hashed = await hashPassword(password);
    const user = User({ username, email, password: hashed });

    await db.collection("users").insertOne(user);

    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const db = getDB();
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(400).json({ error: "Credenciales inválidas" });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ error: "Credenciales inválidas" });

    const token = generateToken({ id: user._id, role: user.role });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
