const express = require("express");
const router = express.Router();

// Ejemplo de endpoint GET
router.get("/", (req, res) => {
  res.json({ message: "Lista de películas 🎬" });
});

module.exports = router;
