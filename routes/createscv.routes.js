const express = require("express");
const router = express.Router();
const { createCsv, getcreatecsv } = require("../controllers/createcsv.controller.js");

// POST /api/categories
router.post("/", createCsv);

// GET /api/categories
router.get("/", getcreatecsv);

module.exports = router;
