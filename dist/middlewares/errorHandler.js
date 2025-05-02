export function errorHandler(err, _req, res, _next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
}
