const express = require("express");
const router = express.Router();
const { getMovies, createMovie } = require("../controllers/movie.controller");

// GET /api/movies
router.get("/", getMovies);

// POST /api/movies
router.post("/", createMovie);

module.exports = router;
