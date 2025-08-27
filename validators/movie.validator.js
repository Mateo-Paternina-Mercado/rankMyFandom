const { body } = require("express-validator");

exports.createMovieValidator = [
  body("title").notEmpty().withMessage("El título es obligatorio"),
];