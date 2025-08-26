const { body, validationResult } = require("express-validator");

const registerValidator = [
  body("username").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("Correo inválido"),
  body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const loginValidator = [
  body("email").isEmail().withMessage("Correo inválido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

module.exports = { registerValidator, loginValidator };
