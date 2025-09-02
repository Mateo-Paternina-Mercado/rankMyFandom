const express = require("express");
const router = express.Router();
const { getMovies, createMovie, updateMovieStatus, voteMovie, getMovieById } = require("../controllers/movie.controller");

// GET /api/movies
router.get("/", getMovies);

// POST /api/movies
router.post("/", createMovie);

router.patch("/:id", updateMovieStatus);

// POST /api/movies/:id/vote
router.post("/:id/vote", voteMovie);

// Rutas existentes...
router.get("/:id", getMovieById);

module.exports = router;
