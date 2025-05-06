import { getAllGoods, createGood, getGoodById, getGoodByName, updateGoodById, updateGoodByQuery, deleteGoodById, deleteGoodByQuery } from "../controladores/bien.controlador.js";
import { Router } from 'express';
const router = Router();
// Obtener todos los bienes
router.get('/', getAllGoods);
// Crear un nuevo bien
router.post('/', createGood);
// Obtener un bien por ID
router.get('/:id', getGoodById);
// Obtener un bien por query
router.get('/search/by-name', getGoodByName);
// Actualizar un bien por ID
router.put('/:id', updateGoodById);
// Actualizar un bien por query
router.put('/search', updateGoodByQuery);
// Borrar un bien por ID
router.delete('/:id', deleteGoodById);
// Borrar un bien por query
router.delete('/search', deleteGoodByQuery);
export default router;
