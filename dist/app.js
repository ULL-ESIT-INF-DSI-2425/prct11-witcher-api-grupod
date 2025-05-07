// Archivo principal de la aplicación
// Importaciones
import express from "express";
import "./config/db.js"; // Conexión a la base de datos
import cazadorRoutes from "./rutas/cazador.rutas.js";
import mercaderRoutes from "./rutas/mercader.rutas.js";
import bienRoutes from "./rutas/bien.rutas.js";
import transaccionRoutes from "./rutas/transaccion.rutas.js";
import { errorHandler } from "./middlewares/errorHandler.js";
// Inicialización de la aplicación
export const app = express();
// Middleware para manejar el cuerpo de las solicitudes
app.use(express.json());
/**
 * Rutas de la API
 * - /hunters: Rutas para los cazadores
 * - /merchants: Rutas para los mercaderes
 * - /goods: Rutas para los bienes
 * - /transactions: Rutas para las transacciones
 */
app.use("/hunters", cazadorRoutes);
app.use("/merchants", mercaderRoutes);
app.use("/goods", bienRoutes);
app.use("/transactions", transaccionRoutes);
// Ruta de inicio
// Esta ruta se puede usar para verificar que el servidor está funcionando y para mostrar un mensaje de bienvenida.
app.get("/", (_req, res) => {
    res.send("Bienvenido a la Posada del Lobo Blanco");
});
// Middleware de errores
app.use(errorHandler);
