import express from 'express';
import * as transactionController from '../controladores/transaccion.controlador.js';
const router = express.Router();
// Rutas para transacciones
// Obtener todas las transacciones
router.get('/', transactionController.getAllTransactions);
// Crear una nueva transacción
router.post('/', transactionController.createTransaction);
// Obtener transacciones por comprador
router.get('/search/by-buyer', transactionController.getTransactionsByBuyer);
// Obtener transacciones por fechas
router.get('/search/by-date', transactionController.getTransactionsByDate);
// Obtener transacciones por id
router.get('/:id', transactionController.getTransactionById);
// Actualizar una transacción por ID
router.put('/:id', transactionController.updateTransactionById);
// Eliminar una transacción por ID
router.delete('/:id', transactionController.deleteTransactionById);
export default router;
