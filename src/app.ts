import express from "express";
import cazadorRoutes from "./rutas/cazador.rutas.js";
// futuras rutas
import mercaderRoutes from "./rutas/mercader.rutas.js";
import bienRoutes from "./rutas/bien.rutas.js";
import transaccionRoutes from "./rutas/transaccion.rutas.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/hunters", cazadorRoutes);
app.use("/merchants", mercaderRoutes);
app.use("/goods", bienRoutes);
app.use("/transactions", transaccionRoutes);

// Ruta raíz
app.get("/", (_req, res) => {
  res.send("Bienvenido a la Posada del Lobo Blanco");
});

// Middleware de errores
app.use(errorHandler);

export default app;
