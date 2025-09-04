const express = require("express");
const router = express.Router();
const { crearNotificacion, obtenerNotificacion } = require("../controllers/notificacion.controller");

// crear notificacion

router.post("/", crearNotificacion);

// POST notificacion

router.get("/", obtenerNotificacion);
