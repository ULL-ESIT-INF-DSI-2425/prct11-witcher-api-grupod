import express from "express";
const app = express();
// Middlewares
app.use(express.json());
// Rutas de prueba
app.get("/", (req, res) => {
    res.send("Bienvenido a la Posada del Lobo Blanco 🐺");
});
export default app;
