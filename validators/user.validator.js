const { body } = require("express-validator");

exports.createUserValidator = [
  body("email").isEmail().withMessage("Debe ser un email válido"),
  body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
];