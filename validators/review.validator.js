const { body } = require("express-validator");

exports.createReviewValidator = [
  body("comment").notEmpty().withMessage("El comentario no puede estar vacío"),
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating entre 1 y 5"),
];