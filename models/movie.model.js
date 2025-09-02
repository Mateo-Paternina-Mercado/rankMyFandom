class MovieCreate {
  constructor(titulo, descripcion, anio, tipo, categoria, img, banner, estado, likes = 0, dislikes = 0, comentarios = 0, usersLiked = [], usersDisliked = []) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.anio = anio;
    this.tipo = tipo;
    this.categoria = categoria;
    this.img = img;
    this.banner = banner;
    this.estado = estado;
    this.likes = likes;             
    this.dislikes = dislikes;       
    this.comentarios = comentarios;   
    this.usersLiked = usersLiked;     
    this.usersDisliked = usersDisliked; 
  }
}

module.exports = MovieCreate;
