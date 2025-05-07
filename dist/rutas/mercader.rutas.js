// File: src/rutas/mercader.rutas.ts
import express from 'express';
import * as merchantController from '../controladores/mercader.controlador.js';
const router = express.Router();
/**
 * Rutas para la gestión de mercaderes
 * @method GET / - Obtener todos los mercaderes
 * @method POST / - Crear un nuevo mercader
 * @method GET /search/by-name - Buscar un mercader por nombre
 * @method GET /:id - Obtener un mercader por ID
 * @method PUT /search/by-name - Actualizar un mercader por nombre
 * @method PUT /:id - Actualizar un mercader por ID
 * @method DELETE /search/by-name - Eliminar un mercader por nombre
 * @method DELETE /:id - Eliminar un mercader por ID
 */
router.get('/', merchantController.getAllMerchants);
router.post('/', merchantController.createMerchant);
router.get('/search/by-name', merchantController.getMerchantByName);
router.get('/:id', merchantController.getMerchantById);
router.put('/search/by-name', merchantController.updateMerchantByName);
router.put('/:id', merchantController.updateMerchantById);
router.delete('/search/by-name', merchantController.deleteMerchantByName);
router.delete('/:id', merchantController.deleteMerchantById);
export default router;
