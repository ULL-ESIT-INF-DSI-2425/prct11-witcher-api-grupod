// Importar las funciones del controlador
// Importar el enrutador de Express
import { getAllGoods, createGood, getGoodbyQuery, getGoodById, getGoodByName, getGoodbyDescription, getGoodByPrice, getGoodByStock,
         updateGoodById, updateGoodByName, updateGoodByDescription, updateGoodByPrice, updateGoodByStock, updateGoodByQuery, 
         deleteGoodById, deleteGoodByName, deleteGoodByDescription, deleteGoodByPrice, deleteGoodByQuery, deleteGoodByStock } from "../controladores/bien.controlador.js"; 
import { Router } from 'express';

// Crear una instancia del enrutador
const router = Router();

/**
 * Rutas para manejar los bienes
 * @route GET /api/goods
 * @route POST /api/goods
 * @route GET /api/goods/:id 
 * @route GET /api/goods/search/by-name
 * @route GET /api/goods/search/by-description
 * @route GET /api/goods/search/by-price
 * @route GET /api/goods/search/by-stock
 * @route GET /api/goods/search/by-all
 * @route PUT /api/goods/:id
 * @route PUT /api/goods/search/by-name
 * @route PUT /api/goods/search/by-description
 * @route PUT /api/goods/search/by-price
 * @route PUT /api/goods/search/by-stock
 * @route PUT /api/goods/search/by-all
 * @route DELETE /api/goods/:id
 * @route DELETE /api/goods/search/by-name
 * @route DELETE /api/goods/search/by-description
 * @route DELETE /api/goods/search/by-price
 * @route DELETE /api/goods/search/by-stock
 * @route DELETE /api/goods/search/by-all
 */

router.get('/', getAllGoods);
router.post('/', createGood);
router.get('/:id', getGoodById);
router.get('/search/by-name', getGoodByName);
router.get('/search/by-description', getGoodbyDescription);
router.get('/search/by-price', getGoodByPrice);
router.get('/search/by-stock', getGoodByStock);
router.get('/search/by-all', getGoodbyQuery);
router.put('/:id', updateGoodById);
router.put('/search/by-name', updateGoodByName);
router.put('/search/by-description', updateGoodByDescription);
router.put('/search/by-price', updateGoodByPrice);
router.put('/search/by-stock', updateGoodByStock);
router.put('/search/by-all', updateGoodByQuery);
router.delete('/:id', deleteGoodById);
router.delete('/search/by-name', deleteGoodByName);
router.delete('/search/by-description', deleteGoodByDescription);
router.delete('/search/by-price', deleteGoodByPrice);
router.delete('/search/by-stock', deleteGoodByStock);
router.delete('/search/by-all', deleteGoodByQuery);

export default router;