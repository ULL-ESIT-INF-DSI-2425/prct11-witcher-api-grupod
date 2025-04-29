import { Router } from 'express';
import { getAllHunters, createHunter } from '../controladores/cazador.controlador.js';
const router = Router();
router.get('/', getAllHunters);
router.post('/', createHunter);
export default router;
