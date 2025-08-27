const { body } = require("express-validator");

exports.createCategoryValidator = [
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
];