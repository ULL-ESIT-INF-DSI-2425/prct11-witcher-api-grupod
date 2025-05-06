import dotenv from "dotenv";
dotenv.config({ path: "../config/dev.env" }); // Ruta al archivo dev.env
import app from "./app.js";
import connectDB from "./config/db.js";
// EJECUTAR CON EL COMANDO node src/server.js TRAS USAR ...
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/posada-db";
const startServer = async () => {
    // Conectar a la base de datos
    await connectDB();
    console.log("Conectado a la base de datos");
    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
};
startServer();
