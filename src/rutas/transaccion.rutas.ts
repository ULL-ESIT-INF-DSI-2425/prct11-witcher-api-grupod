import express from 'express';
import * as transactionController from '../controladores/transaccion.controlador.js';

const router = express.Router();

/** 
 * Rutas para transacciones
 * @method GET '/' - Obtener todas las transacciones
 * @method POST '/' - Crear una nueva transacción
 * @method GET '/search/by-buyer' - Obtener transacciones por comprador
 * @method GET '/search/by-date' - Obtener transacciones por fechas
 * @method GET '/search/by-merchant' - Obtener transacciones por vendedor
 * @method GET '/:id' - Obtener transacciones por id
 * @method PUT '/:id' - Actualizar una transacción por ID
 * @method DELETE '/:id' - Eliminar una transacción por ID
*/

router.get('/', transactionController.getAllTransactions);

router.post('/', transactionController.createTransaction);

router.get('/search/by-buyer', transactionController.getTransactionsByBuyer);
router.get('/search/by-date', transactionController.getTransactionsByDate);
router.get('/search/by-merchant', transactionController.getTransactionsByMerchant);
router.get('/:id', transactionController.getTransactionById);

router.put('/:id', transactionController.updateTransactionById);

router.delete('/:id', transactionController.deleteTransactionById);

export default router;
