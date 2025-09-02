const { getDB } = require("../config/db");
const Review = require("../models/review.model");
const { ObjectId } = require("mongodb");

// Crear comentario
exports.createReview = async (req, res) => {
  try {
    const db = getDB();
    const { userId, username, movieId, comment } = req.body;

    if (!userId || !username || !movieId || !comment) 
      return res.status(400).json({ message: "Datos incompletos" });

    const newReview = new Review(new ObjectId(), userId, username, movieId, comment);
    await db.collection("reviews").insertOne(newReview);

    res.status(201).json({ message: "Comentario creado", review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creando comentario" });
  }
};

// Obtener comentarios de una película
exports.getReviewsByMovie = async (req, res) => {
  try {
    const db = getDB();
    const { movieId } = req.params;

    const reviews = await db.collection("reviews").find({ movieId }).toArray();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error obteniendo comentarios" });
  }
};

// Dar like a un comentario
exports.likeReview = async (req, res) => {
  try {
    const db = getDB();
    const { reviewId } = req.params;
    const { userId } = req.body;

    const review = await db.collection("reviews").findOne({ _id: new ObjectId(reviewId) });
    if (!review) return res.status(404).json({ message: "Comentario no encontrado" });
    if (review.userId === userId) return res.status(400).json({ message: "No puedes dar like a tu propio comentario" });

    let likes = review.likes || [];
    if (likes.includes(userId)) likes = likes.filter(id => id !== userId);
    else likes.push(userId);

    await db.collection("reviews").updateOne({ _id: new ObjectId(reviewId) }, { $set: { likes } });
    res.json({ message: "Like actualizado", likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error dando like" });
  }
};

// Valorar comentario
exports.rateReview = async (req, res) => {
  try {
    const db = getDB();
    const { reviewId } = req.params;
    const { userId, rating } = req.body;

    if (rating < 1 || rating > 10) return res.status(400).json({ message: "Valoración 1-10" });

    const review = await db.collection("reviews").findOne({ _id: new ObjectId(reviewId) });
    if (!review) return res.status(404).json({ message: "Comentario no encontrado" });
    if (review.userId === userId) return res.status(400).json({ message: "No puedes valorar tu propio comentario" });

    let ratings = review.rating || {};
    ratings[userId] = rating;

    await db.collection("reviews").updateOne({ _id: new ObjectId(reviewId) }, { $set: { rating: ratings } });
    res.json({ message: "Valoración actualizada", rating: ratings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error valorando comentario" });
  }
};
