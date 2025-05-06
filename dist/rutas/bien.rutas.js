import { getAllGoods, createGood, getGoodbyQuery, getGoodById, getGoodByName, getGoodbyDescription, getGoodByPrice, getGoodByStock, updateGoodById, updateGoodByName, updateGoodByDescription, updateGoodByPrice, updateGoodByStock, updateGoodByQuery, deleteGoodById, deleteGoodByName, deleteGoodByDescription, deleteGoodByPrice, deleteGoodByQuery, deleteGoodByStock } from "../controladores/bien.controlador.js";
import { Router } from 'express';
const router = Router();
// Obtener todos los bienes
router.get('/', getAllGoods);
// Crear un nuevo bien
router.post('/', createGood);
// Obtener un bien por ID
router.get('/:id', getGoodById);
// Obtener un bien por nombre
router.get('/search/by-name', getGoodByName);
//Obtener un bien por descripción
router.get('/search/by-description', getGoodbyDescription);
// Obtener un bien por precio
router.get('/search/by-price', getGoodByPrice);
// Obtener un bien por stock
router.get('/search/by-stock', getGoodByStock);
// Obtener un bien por query
router.get('/search/by-all', getGoodbyQuery);
// Actualizar un bien por ID
router.put('/:id', updateGoodById);
// Actualizar un bien por query
router.put('/search/by-name', updateGoodByName);
// Actualizar un bien por descripción
router.put('/search/by-description', updateGoodByDescription);
// Actualizar un bien por precio
router.put('/search/by-price', updateGoodByPrice);
// Actualizar un bien por stock
router.put('/search/by-stock', updateGoodByStock);
// Actualizar un bien por query
router.put('/search/by-all', updateGoodByQuery);
// Borrar un bien por ID
router.delete('/:id', deleteGoodById);
// Borrar un bien por nombre
router.delete('/search/by-name', deleteGoodByName);
// Borrar un bien por descripción
router.delete('/search/by-description', deleteGoodByDescription);
// Borrar un bien por precio
router.delete('/search/by-price', deleteGoodByPrice);
// Borrar un bien por stock
router.delete('/search/by-stock', deleteGoodByStock);
// Borrar un bien por query
router.delete('/search/by-all', deleteGoodByQuery);
export default router;
