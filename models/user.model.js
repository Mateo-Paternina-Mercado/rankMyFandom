function User(data) {
  return {
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role || "user",
    createdAt: new Date(),
  };
}

module.exports = User;
