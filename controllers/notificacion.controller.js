const { getDB } = require("../config/db");
const notificationCreate = require("../models/notificacion.model.js");

// crear notificacion


exports.crearNotificacion = async (req, res) => {
    try {
        const db = getDB
        const {commentaryId, userId, elmensajito, fechacreacion, estate} = req.body;

        if(!commentaryId || !userId || !elmensajito || !fechacreacion || !estate ){
            return res.status(400).json({error: "Error al crear notificacion"});
        }

        const notification = new notificationCreate(
            commentaryId, userId, elmensajito, fechacreacion, "pendiente"
        );

        const result = await db.collection("notification").insertOne(notification);

        res.status(201).json({
            message: "Notificacion generada con exito",
            notificacion: {...notification, _id: result.insertId }
        });
    } catch (err) {
        console.error("Error en createNotification", err);
        res.status(500).json({ error: "Error interno del servidor"});
    }
}

// obtener notificacion

exports.obtenerNotificacion = async (req, res) => {
    try{
        const db = getDB();
        const notifica = await db.collection("notification").find().toArray();
        res.json(notifica);
    } catch (err){
        next(err);
    }
}