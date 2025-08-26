const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log("✅ Conectado a MongoDB");
  return db;
}

function getDB() {
  if (!db) throw new Error("No hay conexión activa a la DB");
  return db;
}

module.exports = { connectDB, getDB, client };
