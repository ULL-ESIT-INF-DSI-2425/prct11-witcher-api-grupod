import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
// EJECUTAR CON EL COMANDO node src/server.js TRAS USAR sudo /home/usuario/mongodb/bin/mongod --dbpath /home/usuario/mongodb-data/ EN LA MV HAbiendo descargado mongodb
// y descomprimido en /home/usuario/mongodb
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
};

startServer();
