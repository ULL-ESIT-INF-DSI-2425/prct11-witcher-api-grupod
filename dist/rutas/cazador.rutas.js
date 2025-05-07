// File: src/rutas/cazador.rutas.ts
//Importar las dependencias necesarias
import { Router } from 'express';
import { getAllHunters, createHunter, getHunterById, getHunterByName, updateHunterById, updateHunterByName, deleteHunterById, deleteHunterByName } from '../controladores/cazador.controlador.js';
const router = Router();
/**
 * Rutas para la gestión de cazadores
 * @route /api/hunters
 * @method GET    /api/hunters          - Obtener todos los cazadores
 * @method POST   /api/hunters          - Crear un nuevo cazador
 * @method GET    /api/hunters/:id      - Obtener un cazador por ID
 * @method GET    /api/hunters/search/by-name?name=Geralt - Obtener un cazador por nombre
 * @method PUT    /api/hunters/:id      - Actualizar un cazador por ID
 * @method PUT    /api/hunters/search/by-name?name=Geralt - Actualizar un cazador por nombre
 * @method DELETE /api/hunters/:id      - Borrar un cazador por ID
 * @method DELETE /api/hunters/search/by-name?name=Geralt - Borrar un cazador por nombre
 */
router.get('/', getAllHunters);
router.post('/', createHunter);
router.get('/:id', getHunterById);
router.get('/search/by-name', getHunterByName);
router.put('/:id', updateHunterById);
router.put('/search/by-name', updateHunterByName);
router.delete('/:id', deleteHunterById);
router.delete('/search/by-name', deleteHunterByName);
export default router;
