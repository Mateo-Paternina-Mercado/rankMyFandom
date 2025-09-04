const getDB = require("../config/db");
const createcsv = require("../models/createcsv.model");

exports.createCsv = async (req, res, next) => {
    try {
      const db = getDB();
      const { nombre, calificacion, comentario, fecha} = req.body;
  
      if (!nombre || !calificacion || !comentario || !fecha) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }
  
      // Objeto categoría
      const newCsv = new createcsv (nombre, calificacion, comentario, fecha);
  
  
      // Insertar en Mongo
      const result = await mkdir("/home/camper/Escritorio/rankMyFandom_backend/exports").insertOne(newCsv);
  
      res.status(201).csv({
        message: "Archivo creado con éxito",
        category: { ...newCsv, _id: result.insertedId }
      });
    } catch (err) {
      next(err);
    }
  };

exports.getcreatecsv = async (req, res, next) => {
    try {
        const db = getDB();
        const archivoCsv = await csv("exports/ejemplo.csv").find().toArray();
        res.json(archivoCsv);
    } catch (err) {
        next(err);
    }
};
