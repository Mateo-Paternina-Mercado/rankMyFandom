const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

// Crear comentario
router.post("/", reviewController.createReview);

// Obtener comentarios de una película
router.get("/movie/:movieId", reviewController.getReviewsByMovie);

// Dar like
router.post("/:reviewId/like", reviewController.likeReview);

// Valorar comentario
router.post("/:reviewId/rate", reviewController.rateReview);

module.exports = router;

