class Review {
  constructor(id, userId, movieId, comment, rating) {
    this.id = id;
    this.userId = userId;
    this.movieId = movieId;
    this.comment = comment;
    this.rating = rating;
  }
}
module.exports = Review;