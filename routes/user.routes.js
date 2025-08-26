const express = require('express');
const router = express.Router();

// Ejemplo de ruta
router.get('/users', (req, res) => {
  res.json({ message: 'Lista de usuarios' });
});

module.exports = router;
