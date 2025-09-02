const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controllers/category.controller.js");

// POST /api/categories
router.post("/", createCategory);

// GET /api/categories
router.get("/", getCategories);

module.exports = router;
