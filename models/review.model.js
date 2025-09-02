class Review {
  constructor(id, userId, username, movieId, comment) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.movieId = movieId;
    this.comment = comment;
    this.likes = []; // ids de usuarios que dieron like
    this.rating = {}; // { usuarioId: 1-10 }
    this.createdAt = new Date();
  }
}
module.exports = Review;