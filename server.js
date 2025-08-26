require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimiter = require("./middlewares/rateLimiter");
const { connectDB } = require("./config/db");

const app = express();

// Middlewares globales
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());
app.use(rateLimiter);

// Rutas
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/users", require("./routes/user.routes"));
app.use("/api/v1/movies", require("./routes/movie.routes"));
app.use("/api/v1/reviews", require("./routes/review.routes"));
app.use("/api/v1/categories", require("./routes/category.routes"));
app.use("/api/v1/ranking", require("./routes/ranking.routes"));

// Middleware de errores
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
});
