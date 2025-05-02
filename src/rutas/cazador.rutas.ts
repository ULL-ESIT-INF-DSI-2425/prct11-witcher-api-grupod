/**import { Router } from 'express';
import { getAllHunters, createHunter } from '../controladores/cazador.controlador.js';

const router = Router();

router.get('/', getAllHunters);
router.post('/', createHunter);

export default router;
*/
import { Router } from 'express';
import { getAllHunters, createHunter, getHunterById, getHunterByName, updateHunterById,
         updateHunterByName, deleteHunterById, deleteHunterByName } from '../controladores/cazador.controlador.js';

const router = Router();

// Obtener todos los cazadores
router.get('/', getAllHunters);

// Crear un nuevo cazador
router.post('/', createHunter);

// Obtener un cazador por ID
router.get('/:id', getHunterById);

// Obtener un cazador por nombre (query string: ?name=Geralt)
router.get('/search/by-name', getHunterByName);

// Actualizar un cazador por ID
router.put('/:id', updateHunterById);

// Actualizar un cazador por nombre (query string: ?name=Geralt)
router.put('/search/by-name', updateHunterByName);

// Borrar un cazador por ID
router.delete('/:id', deleteHunterById);

// Borrar un cazador por nombre (query string: ?name=Geralt)
router.delete('/search/by-name', deleteHunterByName);

export default router;
