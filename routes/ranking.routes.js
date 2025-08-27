const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.json({ message: "Inicio de sesión 🔑" });
});

router.post("/register", (req, res) => {
  res.json({ message: "Registro de usuario 📝" });
});

module.exports = router;
