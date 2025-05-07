// File: src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para manejar errores en la API.
 * @param err - Error que se ha producido
 * @param _req - Objeto de solicitud de Express
 * @param res - Objeto de respuesta de Express
 * @param _next - Función para pasar al siguiente middleware
 * @description Este middleware captura cualquier error que ocurra en la API y envía una respuesta JSON con un mensaje de error.
 */
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
}
